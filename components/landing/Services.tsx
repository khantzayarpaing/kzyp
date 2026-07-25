import { Briefcase, MonitorSmartphone, Wrench } from "lucide-react";
import { services } from "@/config/business";

const icons = [Briefcase, MonitorSmartphone, Wrench];

export function Services() {
  return (
    <section id="services" className="py-16 sm:py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <h2 className="text-center text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
          {services.heading}
        </h2>
        <div className="mt-12 grid gap-8 md:grid-cols-3">
          {services.items.map((item, index) => {
            const Icon = icons[index];
            return (
              <article
                key={item.title}
                className="rounded-2xl border border-slate-200 p-6"
              >
                <div className="mb-4 inline-flex rounded-lg bg-blue-600 p-3 text-white">
                  <Icon className="h-6 w-6" aria-hidden="true" />
                </div>
                <h3 className="text-xl font-semibold text-slate-900">
                  {item.title}
                </h3>
                <p className="mt-3 leading-7 text-slate-600">{item.description}</p>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
