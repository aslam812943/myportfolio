import { existsSync, readFileSync, renameSync, unlinkSync, writeFileSync } from "node:fs";
import { resolve, sep } from "node:path";

const root = resolve(process.cwd());
const input = resolve(process.argv[2] ?? "");
if (!input.startsWith(`${root}${sep}`) || !input.endsWith(".mp4")) {
  throw new Error("Provide an MP4 path inside this project.");
}

const original = readFileSync(input);

function boxes(buffer, start, end) {
  const result = [];
  for (let offset = start; offset < end;) {
    if (offset + 8 > end) throw new Error("Incomplete MP4 box header.");
    let size = buffer.readUInt32BE(offset);
    const type = buffer.toString("ascii", offset + 4, offset + 8);
    let headerSize = 8;
    if (size === 1) {
      if (offset + 16 > end) throw new Error("Incomplete extended MP4 box header.");
      size = Number(buffer.readBigUInt64BE(offset + 8));
      headerSize = 16;
    } else if (size === 0) {
      size = end - offset;
    }
    if (!Number.isSafeInteger(size) || size < headerSize || offset + size > end) {
      throw new Error(`Invalid ${type} MP4 box size.`);
    }
    result.push({ type, start: offset, end: offset + size, headerSize });
    offset += size;
  }
  return result;
}

const top = boxes(original, 0, original.length);
const mdat = top.find((box) => box.type === "mdat");
const moov = top.find((box) => box.type === "moov");
if (!mdat || !moov || moov.start < mdat.start || top.filter((box) => box.type === "mdat").length !== 1) {
  throw new Error("Expected one media box followed by one movie index box.");
}

const movie = Buffer.from(original.subarray(moov.start, moov.end));
const shift = BigInt(movie.length);
const dataStart = BigInt(mdat.start + mdat.headerSize);
const dataEnd = BigInt(mdat.end);
const containers = new Set(["moov", "trak", "mdia", "minf", "stbl"]);
let updatedOffsets = 0;

function updateOffsets(start, end) {
  for (const box of boxes(movie, start, end)) {
    if (containers.has(box.type)) {
      updateOffsets(box.start + box.headerSize, box.end);
      continue;
    }
    if (box.type !== "stco" && box.type !== "co64") continue;
    const count = movie.readUInt32BE(box.start + box.headerSize + 4);
    const entrySize = box.type === "co64" ? 8 : 4;
    const entriesStart = box.start + box.headerSize + 8;
    if (entriesStart + count * entrySize > box.end) throw new Error("Invalid chunk offset table.");
    for (let index = 0; index < count; index += 1) {
      const entry = entriesStart + index * entrySize;
      const offset = box.type === "co64" ? movie.readBigUInt64BE(entry) : BigInt(movie.readUInt32BE(entry));
      if (offset < dataStart || offset >= dataEnd) throw new Error("Chunk offset points outside the media box.");
      const shifted = offset + shift;
      if (box.type === "co64") movie.writeBigUInt64BE(shifted, entry);
      else {
        if (shifted > 0xffffffffn) throw new Error("32-bit chunk offset overflow.");
        movie.writeUInt32BE(Number(shifted), entry);
      }
      updatedOffsets += 1;
    }
  }
}

updateOffsets(0, movie.length);
if (!updatedOffsets) throw new Error("No chunk offsets found; leaving the video unchanged.");

const optimized = Buffer.concat([
  original.subarray(0, mdat.start),
  movie,
  original.subarray(mdat.start, moov.start),
  original.subarray(moov.end),
]);
const updatedTop = boxes(optimized, 0, optimized.length);
const updatedMdat = updatedTop.find((box) => box.type === "mdat");
const updatedMoov = updatedTop.find((box) => box.type === "moov");
if (!updatedMdat || !updatedMoov || updatedMoov.start > updatedMdat.start ||
    !optimized.subarray(updatedMdat.start, updatedMdat.end).equals(original.subarray(mdat.start, mdat.end))) {
  throw new Error("Optimized MP4 validation failed.");
}

const temporary = `${input}.faststart.tmp`;
const backup = `${input}.faststart.backup`;
if (existsSync(temporary) || existsSync(backup)) throw new Error("Temporary or backup file already exists.");
writeFileSync(temporary, optimized);
renameSync(input, backup);
try {
  renameSync(temporary, input);
  unlinkSync(backup);
} catch (error) {
  renameSync(backup, input);
  throw error;
}

console.log(`Moved the MP4 index before the media data and updated ${updatedOffsets} chunk offsets.`);
