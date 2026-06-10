"use server";

export type ContactState =
  | { status: "idle" }
  | { status: "success" }
  | {
      status: "error";
      /** Which message the UI should show (mapped to i18n on the client). */
      reason: "validation" | "send";
      /** Field-level flags so inputs can be highlighted. */
      fields?: { name?: boolean; email?: boolean; message?: boolean };
    };

const TO_EMAIL = process.env.CONTACT_TO_EMAIL ?? "denizugur.dev@gmail.com";
const FROM_EMAIL =
  process.env.CONTACT_FROM_EMAIL ?? "Portfolio Contact <onboarding@resend.dev>";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

export async function sendContactMessage(
  _prevState: ContactState,
  formData: FormData,
): Promise<ContactState> {
  const name = String(formData.get("name") ?? "").trim();
  const email = String(formData.get("email") ?? "").trim();
  const message = String(formData.get("message") ?? "").trim();
  // Honeypot: real users never fill this hidden field. Bots that do get a
  // silent "success" so they don't retry.
  const honeypot = String(formData.get("company") ?? "").trim();

  if (honeypot) return { status: "success" };

  const fields = {
    name: name.length < 1,
    email: !EMAIL_RE.test(email),
    message: message.length < 10,
  };
  if (fields.name || fields.email || fields.message) {
    return { status: "error", reason: "validation", fields };
  }

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.error(
      "[contact] RESEND_API_KEY is not set — cannot send the contact email.",
    );
    return { status: "error", reason: "send" };
  }

  try {
    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: FROM_EMAIL,
        to: [TO_EMAIL],
        reply_to: email,
        subject: `New portfolio message from ${name}`,
        text: `Name: ${name}\nEmail: ${email}\n\n${message}`,
        html: `
          <div style="font-family:system-ui,Segoe UI,Roboto,sans-serif;line-height:1.6">
            <h2 style="margin:0 0 12px">New portfolio message</h2>
            <p style="margin:0"><strong>Name:</strong> ${escapeHtml(name)}</p>
            <p style="margin:0 0 12px"><strong>Email:</strong>
              <a href="mailto:${escapeHtml(email)}">${escapeHtml(email)}</a>
            </p>
            <p style="white-space:pre-wrap;margin:0">${escapeHtml(message)}</p>
          </div>
        `,
      }),
      // Never cache a transactional POST.
      cache: "no-store",
    });

    if (!response.ok) {
      const detail = await response.text().catch(() => "");
      console.error(
        `[contact] Resend responded ${response.status}: ${detail}`,
      );
      return { status: "error", reason: "send" };
    }

    return { status: "success" };
  } catch (error) {
    console.error("[contact] Failed to send email:", error);
    return { status: "error", reason: "send" };
  }
}
