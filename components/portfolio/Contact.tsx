import { Mail, MapPin, Phone } from "lucide-react";
import { portfolioConfig } from "@/config/portfolio";
import { LinkedInIcon } from "@/components/ui/icons/LinkedInIcon";
import { Section } from "@/components/ui/Section";
import { SocialLinks } from "@/components/ui/SocialLinks";
import { RevealOnScroll } from "@/components/ui/RevealOnScroll";
import { ContactForm } from "@/components/portfolio/ContactForm";

export function Contact() {
  const { contact, personal } = portfolioConfig;
  const { location, email, phone, linkedin } = personal.contact;

  return (
    <Section
      id="contact"
      variant="alt"
      heading={contact.heading}
      description={contact.supportingMessage}
    >
      <div className="grid gap-10 md:grid-cols-[0.85fr_1fr] md:gap-14">
        <RevealOnScroll>
          <dl className="space-y-6">
            <div className="flex items-start gap-3">
              <MapPin
                className="mt-0.5 h-5 w-5 shrink-0 text-[#6e6e73]"
                aria-hidden="true"
              />
              <div>
                <dt className="text-sm font-medium text-[#1d1d1f]">Location</dt>
                <dd className="mt-1 text-[#6e6e73]">{location}</dd>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <Mail
                className="mt-0.5 h-5 w-5 shrink-0 text-[#6e6e73]"
                aria-hidden="true"
              />
              <div>
                <dt className="text-sm font-medium text-[#1d1d1f]">Email</dt>
                <dd className="mt-1">
                  <a
                    href={`mailto:${email}`}
                    className="rounded-md text-[#0071e3] transition-colors hover:text-[#0077ed] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0071e3] focus-visible:ring-offset-2"
                  >
                    {email}
                  </a>
                </dd>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <Phone
                className="mt-0.5 h-5 w-5 shrink-0 text-[#6e6e73]"
                aria-hidden="true"
              />
              <div>
                <dt className="text-sm font-medium text-[#1d1d1f]">Phone</dt>
                <dd className="mt-1">
                  <a
                    href={`tel:${phone.replace(/\s+/g, "")}`}
                    className="rounded-md text-[#0071e3] transition-colors hover:text-[#0077ed] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0071e3] focus-visible:ring-offset-2"
                  >
                    {phone}
                  </a>
                </dd>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <LinkedInIcon className="mt-0.5 h-[18px] w-[18px] shrink-0 text-[#6e6e73]" />
              <div>
                <dt className="text-sm font-medium text-[#1d1d1f]">LinkedIn</dt>
                <dd className="mt-1">
                  <a
                    href={linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="rounded-md text-[#0071e3] transition-colors hover:text-[#0077ed] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0071e3] focus-visible:ring-offset-2"
                  >
                    /in/khantzayarpaing
                    <span className="sr-only"> (opens in a new tab)</span>
                  </a>
                </dd>
              </div>
            </div>
          </dl>

          <SocialLinks className="mt-9" />
        </RevealOnScroll>

        <RevealOnScroll delayMs={80}>
          <ContactForm />
        </RevealOnScroll>
      </div>
    </Section>
  );
}
