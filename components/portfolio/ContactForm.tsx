"use client";

import { useState, type FormEvent } from "react";
import { CircleCheck, CircleAlert, LoaderCircle } from "lucide-react";
import { portfolioConfig } from "@/config/portfolio";
import { Button } from "@/components/ui/Button";

type FormState = "idle" | "loading" | "success" | "error";

interface ContactFormFields {
  name: string;
  email: string;
  company: string;
  subject: string;
  message: string;
}

type FieldErrors = Partial<Record<keyof ContactFormFields, string>> & {
  form?: string;
};

const emptyForm: ContactFormFields = {
  name: "",
  email: "",
  company: "",
  subject: "",
  message: "",
};

function validate(fields: ContactFormFields): FieldErrors {
  const errors: FieldErrors = {};

  if (!fields.name.trim()) {
    errors.name = "Please enter your full name.";
  }

  if (!fields.email.trim()) {
    errors.email = "Please enter your email address.";
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(fields.email.trim())) {
    errors.email = "Please enter a valid email address.";
  }

  if (!fields.message.trim()) {
    errors.message = "Please enter a message.";
  }

  return errors;
}

const fieldClasses =
  "mt-2 block w-full rounded-xl border border-[#d2d2d7] bg-white px-4 py-3 text-[#1d1d1f] placeholder:text-[#6e6e73]/70 focus-visible:border-[#0071e3] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0071e3] focus-visible:ring-offset-1 aria-[invalid=true]:border-red-500";

const labelClasses = "block text-sm font-medium text-[#1d1d1f]";

export function ContactForm() {
  const { contact } = portfolioConfig;
  const [fields, setFields] = useState<ContactFormFields>(emptyForm);
  const [errors, setErrors] = useState<FieldErrors>({});
  const [formState, setFormState] = useState<FormState>("idle");

  function updateField(field: keyof ContactFormFields, value: string) {
    setFields((current) => ({ ...current, [field]: value }));

    if (errors[field]) {
      setErrors((current) => {
        const next = { ...current };
        delete next[field];
        return next;
      });
    }

    if (formState === "error") {
      setFormState("idle");
    }
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    // Guard against duplicate submits.
    if (formState === "loading") {
      return;
    }

    const clientErrors = validate(fields);
    if (Object.keys(clientErrors).length > 0) {
      setErrors(clientErrors);
      setFormState("error");
      return;
    }

    setErrors({});
    setFormState("loading");

    try {
      const response = await fetch("/api/messages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(fields),
      });

      const result = (await response.json()) as {
        message?: string;
        errors?: Record<string, string[]>;
      };

      if (!response.ok) {
        if (result.errors) {
          const serverErrors: FieldErrors = {};
          for (const [field, messages] of Object.entries(result.errors)) {
            if (messages[0]) {
              serverErrors[field as keyof ContactFormFields] = messages[0];
            }
          }
          setErrors(serverErrors);
        } else {
          setErrors({
            form: result.message ?? "Something went wrong. Please try again.",
          });
        }
        setFormState("error");
        return;
      }

      setFields(emptyForm);
      setFormState("success");
    } catch {
      setErrors({
        form: "Unable to send your message. Please check your connection and try again.",
      });
      setFormState("error");
    }
  }

  if (formState === "success") {
    return (
      <div
        role="status"
        className="rounded-2xl border border-[#d2d2d7] bg-white p-8 text-center"
      >
        <CircleCheck
          className="mx-auto h-10 w-10 text-[#0071e3]"
          aria-hidden="true"
        />
        <p className="mt-4 text-lg font-medium text-[#1d1d1f]">
          {contact.successMessage}
        </p>
        <Button
          variant="secondary"
          className="mt-6"
          onClick={() => setFormState("idle")}
        >
          Send another message
        </Button>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      className="space-y-5 rounded-2xl border border-[#d2d2d7] bg-white p-6 md:p-8"
    >
      {errors.form && (
        <div
          role="alert"
          className="flex items-start gap-3 rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-800"
        >
          <CircleAlert className="mt-0.5 h-5 w-5 shrink-0" aria-hidden="true" />
          <p>{errors.form}</p>
        </div>
      )}

      <div>
        <label htmlFor="name" className={labelClasses}>
          Full name <span className="text-red-600">*</span>
        </label>
        <input
          id="name"
          name="name"
          type="text"
          autoComplete="name"
          required
          value={fields.name}
          onChange={(event) => updateField("name", event.target.value)}
          aria-invalid={Boolean(errors.name)}
          aria-describedby={errors.name ? "name-error" : undefined}
          className={fieldClasses}
        />
        {errors.name && (
          <p id="name-error" className="mt-1.5 text-sm text-red-600">
            {errors.name}
          </p>
        )}
      </div>

      <div>
        <label htmlFor="email" className={labelClasses}>
          Email address <span className="text-red-600">*</span>
        </label>
        <input
          id="email"
          name="email"
          type="email"
          autoComplete="email"
          required
          value={fields.email}
          onChange={(event) => updateField("email", event.target.value)}
          aria-invalid={Boolean(errors.email)}
          aria-describedby={errors.email ? "email-error" : undefined}
          className={fieldClasses}
        />
        {errors.email && (
          <p id="email-error" className="mt-1.5 text-sm text-red-600">
            {errors.email}
          </p>
        )}
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="company" className={labelClasses}>
            Company / organization{" "}
            <span className="font-normal text-[#6e6e73]">(optional)</span>
          </label>
          <input
            id="company"
            name="company"
            type="text"
            autoComplete="organization"
            value={fields.company}
            onChange={(event) => updateField("company", event.target.value)}
            aria-invalid={Boolean(errors.company)}
            aria-describedby={errors.company ? "company-error" : undefined}
            className={fieldClasses}
          />
          {errors.company && (
            <p id="company-error" className="mt-1.5 text-sm text-red-600">
              {errors.company}
            </p>
          )}
        </div>

        <div>
          <label htmlFor="subject" className={labelClasses}>
            Subject{" "}
            <span className="font-normal text-[#6e6e73]">(optional)</span>
          </label>
          <input
            id="subject"
            name="subject"
            type="text"
            value={fields.subject}
            onChange={(event) => updateField("subject", event.target.value)}
            aria-invalid={Boolean(errors.subject)}
            aria-describedby={errors.subject ? "subject-error" : undefined}
            className={fieldClasses}
          />
          {errors.subject && (
            <p id="subject-error" className="mt-1.5 text-sm text-red-600">
              {errors.subject}
            </p>
          )}
        </div>
      </div>

      <div>
        <label htmlFor="message" className={labelClasses}>
          Message <span className="text-red-600">*</span>
        </label>
        <textarea
          id="message"
          name="message"
          rows={5}
          required
          value={fields.message}
          onChange={(event) => updateField("message", event.target.value)}
          aria-invalid={Boolean(errors.message)}
          aria-describedby={errors.message ? "message-error" : undefined}
          className={fieldClasses}
        />
        {errors.message && (
          <p id="message-error" className="mt-1.5 text-sm text-red-600">
            {errors.message}
          </p>
        )}
      </div>

      <Button
        type="submit"
        disabled={formState === "loading"}
        className="w-full sm:w-auto"
      >
        {formState === "loading" ? (
          <span className="inline-flex items-center gap-2">
            <LoaderCircle className="h-4 w-4 animate-spin" aria-hidden="true" />
            Sending…
          </span>
        ) : (
          contact.submitButton
        )}
      </Button>
    </form>
  );
}
