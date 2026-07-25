"use client";

import { useState, type FormEvent } from "react";
import { enquiry } from "@/config/business";
import { Button } from "@/components/ui/Button";
import { Loader2, CheckCircle2, AlertCircle } from "lucide-react";

type FormState = "idle" | "loading" | "success" | "error";

interface FormData {
  fullName: string;
  email: string;
  phone: string;
  company: string;
  message: string;
}

interface FormErrors {
  fullName?: string;
  email?: string;
  phone?: string;
  company?: string;
  message?: string;
  form?: string;
}

const initialFormData: FormData = {
  fullName: "",
  email: "",
  phone: "",
  company: "",
  message: "",
};

function validateClient(data: FormData): FormErrors {
  const errors: FormErrors = {};

  if (!data.fullName.trim()) {
    errors.fullName = "Please enter your full name.";
  }

  if (!data.email.trim()) {
    errors.email = "Please enter your email address.";
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email.trim())) {
    errors.email = "Please enter a valid email address.";
  }

  if (!data.message.trim()) {
    errors.message = "Please enter a message.";
  }

  return errors;
}

export function EnquiryForm() {
  const [formData, setFormData] = useState<FormData>(initialFormData);
  const [errors, setErrors] = useState<FormErrors>({});
  const [formState, setFormState] = useState<FormState>("idle");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (formState === "loading") {
      return;
    }

    const clientErrors = validateClient(formData);
    if (Object.keys(clientErrors).length > 0) {
      setErrors(clientErrors);
      return;
    }

    setErrors({});
    setFormState("loading");

    try {
      const response = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const result = (await response.json()) as {
        message?: string;
        errors?: Record<string, string[]>;
      };

      if (!response.ok) {
        if (result.errors) {
          const fieldErrors: FormErrors = {};
          for (const [field, messages] of Object.entries(result.errors)) {
            if (messages[0]) {
              fieldErrors[field as keyof FormErrors] = messages[0];
            }
          }
          setErrors(fieldErrors);
        } else {
          setErrors({
            form: result.message ?? "Something went wrong. Please try again.",
          });
        }
        setFormState("error");
        return;
      }

      setFormData(initialFormData);
      setFormState("success");
    } catch {
      setErrors({
        form: "Unable to submit your enquiry. Please check your connection and try again.",
      });
      setFormState("error");
    }
  }

  function handleChange(
    field: keyof FormData,
    value: string,
  ) {
    setFormData((current) => ({ ...current, [field]: value }));
    if (errors[field]) {
      setErrors((current) => {
        const next = { ...current };
        delete next[field];
        return next;
      });
    }
    if (formState === "success" || formState === "error") {
      setFormState("idle");
    }
  }

  return (
    <section id="contact" className="py-16 sm:py-20">
      <div className="mx-auto max-w-2xl px-4 sm:px-6">
        <div className="text-center">
          <h2 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
            {enquiry.heading}
          </h2>
          <p className="mt-4 text-lg leading-8 text-slate-600">
            {enquiry.supportingMessage}
          </p>
        </div>

        {formState === "success" ? (
          <div
            className="mt-10 rounded-2xl border border-green-200 bg-green-50 p-6 text-center"
            role="status"
          >
            <CheckCircle2
              className="mx-auto h-10 w-10 text-green-600"
              aria-hidden="true"
            />
            <p className="mt-4 text-lg font-medium text-green-800">
              {enquiry.successMessage}
            </p>
          </div>
        ) : (
          <form
            onSubmit={handleSubmit}
            noValidate
            className="mt-10 space-y-6 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8"
          >
            {errors.form && (
              <div
                className="flex items-start gap-3 rounded-lg border border-red-200 bg-red-50 p-4 text-red-800"
                role="alert"
              >
                <AlertCircle className="mt-0.5 h-5 w-5 shrink-0" aria-hidden="true" />
                <p>{errors.form}</p>
              </div>
            )}

            <div>
              <label htmlFor="fullName" className="block text-sm font-medium text-slate-700">
                Full name <span className="text-red-600">*</span>
              </label>
              <input
                id="fullName"
                name="fullName"
                type="text"
                autoComplete="name"
                required
                value={formData.fullName}
                onChange={(event) => handleChange("fullName", event.target.value)}
                aria-invalid={Boolean(errors.fullName)}
                aria-describedby={errors.fullName ? "fullName-error" : undefined}
                className="mt-2 block w-full rounded-lg border border-slate-300 px-4 py-2.5 text-slate-900 focus-visible:border-blue-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600"
              />
              {errors.fullName && (
                <p id="fullName-error" className="mt-1 text-sm text-red-600">
                  {errors.fullName}
                </p>
              )}
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-slate-700">
                Email address <span className="text-red-600">*</span>
              </label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                value={formData.email}
                onChange={(event) => handleChange("email", event.target.value)}
                aria-invalid={Boolean(errors.email)}
                aria-describedby={errors.email ? "email-error" : undefined}
                className="mt-2 block w-full rounded-lg border border-slate-300 px-4 py-2.5 text-slate-900 focus-visible:border-blue-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600"
              />
              {errors.email && (
                <p id="email-error" className="mt-1 text-sm text-red-600">
                  {errors.email}
                </p>
              )}
            </div>

            <div>
              <label htmlFor="phone" className="block text-sm font-medium text-slate-700">
                Phone number <span className="text-slate-400">(optional)</span>
              </label>
              <input
                id="phone"
                name="phone"
                type="tel"
                autoComplete="tel"
                value={formData.phone}
                onChange={(event) => handleChange("phone", event.target.value)}
                aria-invalid={Boolean(errors.phone)}
                aria-describedby={errors.phone ? "phone-error" : undefined}
                className="mt-2 block w-full rounded-lg border border-slate-300 px-4 py-2.5 text-slate-900 focus-visible:border-blue-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600"
              />
              {errors.phone && (
                <p id="phone-error" className="mt-1 text-sm text-red-600">
                  {errors.phone}
                </p>
              )}
            </div>

            <div>
              <label htmlFor="company" className="block text-sm font-medium text-slate-700">
                Company name <span className="text-slate-400">(optional)</span>
              </label>
              <input
                id="company"
                name="company"
                type="text"
                autoComplete="organization"
                value={formData.company}
                onChange={(event) => handleChange("company", event.target.value)}
                aria-invalid={Boolean(errors.company)}
                aria-describedby={errors.company ? "company-error" : undefined}
                className="mt-2 block w-full rounded-lg border border-slate-300 px-4 py-2.5 text-slate-900 focus-visible:border-blue-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600"
              />
              {errors.company && (
                <p id="company-error" className="mt-1 text-sm text-red-600">
                  {errors.company}
                </p>
              )}
            </div>

            <div>
              <label htmlFor="message" className="block text-sm font-medium text-slate-700">
                Message <span className="text-red-600">*</span>
              </label>
              <textarea
                id="message"
                name="message"
                rows={5}
                required
                value={formData.message}
                onChange={(event) => handleChange("message", event.target.value)}
                aria-invalid={Boolean(errors.message)}
                aria-describedby={errors.message ? "message-error" : undefined}
                className="mt-2 block w-full rounded-lg border border-slate-300 px-4 py-2.5 text-slate-900 focus-visible:border-blue-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600"
              />
              {errors.message && (
                <p id="message-error" className="mt-1 text-sm text-red-600">
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
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" aria-hidden="true" />
                  Submitting...
                </>
              ) : (
                enquiry.submitButton
              )}
            </Button>
          </form>
        )}
      </div>
    </section>
  );
}
