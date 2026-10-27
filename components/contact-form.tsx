"use client";

import { useState } from "react";

export function ContactForm() {
  const [note, setNote] = useState("");
  const submit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const subject = encodeURIComponent(`${data.get("type")} enquiry from ${data.get("name")}`);
    const body = encodeURIComponent(`Name: ${data.get("name")}\nEmail: ${data.get("email")}\nProject: ${data.get("type")}\nBudget: ${data.get("budget")}\n\n${data.get("message")}`);
    setNote("Your email draft is ready. Nothing is sent until you press send.");
    window.location.href = `mailto:aslam812943@gmail.com?subject=${subject}&body=${body}`;
  };
  return (
    <form className="contact-form" onSubmit={submit}>
      <label><span>Name</span><input name="name" autoComplete="name" required /></label>
      <label><span>Email</span><input name="email" type="email" autoComplete="email" required /></label>
      <label><span>Project type</span><select name="type" required defaultValue=""><option value="" disabled>Select one</option>{["Website", "Web Application", "Creative Portfolio", "Wedding Website", "Creative Video", "Other"].map((item) => <option key={item}>{item}</option>)}</select></label>
      <label><span>Budget range <em>optional</em></span><select name="budget" defaultValue="Not specified"><option>Not specified</option><option>Under ₹50k</option><option>₹50k–₹1.5L</option><option>₹1.5L+</option></select></label>
      <label className="full"><span>Tell me about the idea</span><textarea name="message" rows={5} required /></label>
      <div className="form-footer"><button className="pill light" type="submit">OPEN EMAIL DRAFT ↗</button><p aria-live="polite">{note || "Opens a ready-to-send draft in your email app. Nothing is sent until you press send."}</p></div>
    </form>
  );
}

