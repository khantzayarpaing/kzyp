import { business, footer } from "@/config/business";
import { Mail, MapPin, Phone } from "lucide-react";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-slate-200 bg-slate-900 py-12 text-slate-300">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="grid gap-8 md:grid-cols-2">
          <div>
            <h2 className="text-xl font-bold text-white">{business.name}</h2>
            <p className="mt-3 max-w-md leading-7">{footer.tagline}</p>
          </div>
          <div className="space-y-3">
            <p className="flex items-center gap-3">
              <Mail className="h-5 w-5 shrink-0 text-blue-400" aria-hidden="true" />
              <a
                href={`mailto:${business.contact.email}`}
                className="hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400"
              >
                {business.contact.email}
              </a>
            </p>
            <p className="flex items-center gap-3">
              <Phone className="h-5 w-5 shrink-0 text-blue-400" aria-hidden="true" />
              <span>{business.contact.phone}</span>
            </p>
            <p className="flex items-center gap-3">
              <MapPin className="h-5 w-5 shrink-0 text-blue-400" aria-hidden="true" />
              <span>{business.contact.address}</span>
            </p>
          </div>
        </div>
        <p className="mt-8 border-t border-slate-700 pt-8 text-sm text-slate-400">
          &copy; {year} {business.name}. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
