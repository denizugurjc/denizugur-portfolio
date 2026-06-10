"use client";

import { useActionState, useState } from "react";
import { sendContactMessage, type ContactState } from "@/app/actions/contact";
import { ArrowIcon } from "./ui/Icons";
import { useDictionary } from "./language";

const initialState: ContactState = { status: "idle" };

/**
 * Contact form wired to the `sendContactMessage` Server Action. Uses
 * `useActionState` for pending/success/error states with progressive
 * enhancement, plus a hidden honeypot field for basic spam protection.
 */
export function ContactForm() {
  const dict = useDictionary();
  const t = dict.contact.form;
  const [state, formAction, pending] = useActionState(
    sendContactMessage,
    initialState,
  );
  // `useActionState` keeps the last result; this lets "send another" return to
  // a fresh form. It's reset on each new submit so a later success shows again.
  const [dismissed, setDismissed] = useState(false);

  function action(formData: FormData) {
    setDismissed(false);
    return formAction(formData);
  }

  const inputClass =
    "w-full rounded-xl border border-border-soft bg-background/60 px-4 py-3 text-sm text-foreground placeholder:text-muted/70 transition-colors focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/30";
  const errorRing = "border-red-500/60 focus:border-red-500 focus:ring-red-500/30";

  const fieldErrors = state.status === "error" ? state.fields : undefined;
  const errorMessage =
    state.status === "error"
      ? state.reason === "validation"
        ? t.errorValidation
        : t.errorGeneric
      : null;

  if (state.status === "success" && !dismissed) {
    return (
      <div className="flex h-full min-h-72 flex-col items-center justify-center rounded-2xl border border-border-soft bg-card/60 p-8 text-center backdrop-blur">
        <div className="grid h-14 w-14 place-items-center rounded-full bg-gradient-to-br from-accent to-accent-2 text-2xl text-white">
          ✓
        </div>
        <h3 className="mt-4 text-lg font-semibold">{t.successTitle}</h3>
        <p className="mt-2 max-w-xs text-sm text-muted">{t.successText}</p>
        <button
          type="button"
          onClick={() => setDismissed(true)}
          className="mt-5 text-sm font-medium text-accent hover:underline"
        >
          {t.sendAnother}
        </button>
      </div>
    );
  }

  return (
    <form
      action={action}
      className="rounded-2xl border border-border-soft bg-card/60 p-6 backdrop-blur sm:p-8"
    >
      {/* Honeypot — hidden from users, tempting to bots. */}
      <div aria-hidden className="hidden">
        <label htmlFor="company">Company</label>
        <input id="company" name="company" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div className="flex flex-col gap-1.5">
          <label htmlFor="name" className="text-sm font-medium">
            {t.name}
          </label>
          <input
            id="name"
            name="name"
            type="text"
            required
            aria-invalid={fieldErrors?.name || undefined}
            placeholder={t.namePlaceholder}
            className={`${inputClass} ${fieldErrors?.name ? errorRing : ""}`}
          />
        </div>
        <div className="flex flex-col gap-1.5">
          <label htmlFor="email" className="text-sm font-medium">
            {t.email}
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            aria-invalid={fieldErrors?.email || undefined}
            placeholder={t.emailPlaceholder}
            className={`${inputClass} ${fieldErrors?.email ? errorRing : ""}`}
          />
        </div>
      </div>

      <div className="mt-4 flex flex-col gap-1.5">
        <label htmlFor="message" className="text-sm font-medium">
          {t.message}
        </label>
        <textarea
          id="message"
          name="message"
          required
          rows={5}
          aria-invalid={fieldErrors?.message || undefined}
          placeholder={t.messagePlaceholder}
          className={`${inputClass} resize-none ${fieldErrors?.message ? errorRing : ""}`}
        />
      </div>

      {errorMessage && (
        <p
          role="alert"
          className="mt-4 rounded-xl border border-red-500/40 bg-red-500/10 px-4 py-3 text-sm text-red-400"
        >
          {errorMessage}
        </p>
      )}

      <button
        type="submit"
        disabled={pending}
        className="group mt-6 inline-flex h-12 w-full items-center justify-center gap-2 rounded-full bg-accent font-medium text-white shadow-[0_8px_30px_-8px_var(--accent)] transition-all hover:-translate-y-0.5 hover:shadow-[0_14px_40px_-8px_var(--accent)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:cursor-not-allowed disabled:opacity-70 disabled:hover:translate-y-0"
      >
        {pending ? (
          <>
            <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/40 border-t-white" />
            {t.sending}
          </>
        ) : (
          <>
            {t.send}
            <ArrowIcon className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </>
        )}
      </button>
    </form>
  );
}
