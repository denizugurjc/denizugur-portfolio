"use client";

import { useState, type FormEvent } from "react";
import { ArrowIcon } from "./ui/Icons";

/**
 * UI-only contact form. There is no backend — on submit it shows a friendly
 * confirmation state. Wire `handleSubmit` to your API/email service later.
 */
export function ContactForm() {
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitted(true);
  }

  const inputClass =
    "w-full rounded-xl border border-border-soft bg-background/60 px-4 py-3 text-sm text-foreground placeholder:text-muted/70 transition-colors focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/30";

  if (submitted) {
    return (
      <div className="flex h-full min-h-72 flex-col items-center justify-center rounded-2xl border border-border-soft bg-card/60 p-8 text-center backdrop-blur">
        <div className="grid h-14 w-14 place-items-center rounded-full bg-gradient-to-br from-accent to-accent-2 text-2xl text-white">
          ✓
        </div>
        <h3 className="mt-4 text-lg font-semibold">Message sent!</h3>
        <p className="mt-2 max-w-xs text-sm text-muted">
          Thanks for reaching out — I&apos;ll get back to you as soon as I can.
        </p>
        <button
          type="button"
          onClick={() => setSubmitted(false)}
          className="mt-5 text-sm font-medium text-accent hover:underline"
        >
          Send another message
        </button>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-2xl border border-border-soft bg-card/60 p-6 backdrop-blur sm:p-8"
    >
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="flex flex-col gap-1.5">
          <label htmlFor="name" className="text-sm font-medium">
            Name
          </label>
          <input
            id="name"
            name="name"
            type="text"
            required
            placeholder="Jane Doe"
            className={inputClass}
          />
        </div>
        <div className="flex flex-col gap-1.5">
          <label htmlFor="email" className="text-sm font-medium">
            Email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            placeholder="jane@example.com"
            className={inputClass}
          />
        </div>
      </div>

      <div className="mt-4 flex flex-col gap-1.5">
        <label htmlFor="message" className="text-sm font-medium">
          Message
        </label>
        <textarea
          id="message"
          name="message"
          required
          rows={5}
          placeholder="Tell me about your project..."
          className={`${inputClass} resize-none`}
        />
      </div>

      <button
        type="submit"
        className="group mt-6 inline-flex h-12 w-full items-center justify-center gap-2 rounded-full bg-accent font-medium text-white shadow-[0_8px_30px_-8px_var(--accent)] transition-all hover:-translate-y-0.5 hover:shadow-[0_14px_40px_-8px_var(--accent)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-background"
      >
        Send Message
        <ArrowIcon className="h-4 w-4 transition-transform group-hover:translate-x-1" />
      </button>
    </form>
  );
}
