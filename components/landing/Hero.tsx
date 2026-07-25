import { business } from "@/config/business";
import { LinkButton } from "@/components/ui/LinkButton";

function DashboardIllustration() {
  return (
    <div
      className="relative w-full max-w-md rounded-2xl border border-slate-200 bg-white p-6 shadow-lg"
      aria-hidden="true"
    >
      <div className="mb-4 flex items-center justify-between">
        <div className="h-3 w-20 rounded-full bg-blue-100" />
        <div className="flex gap-2">
          <div className="h-3 w-3 rounded-full bg-blue-200" />
          <div className="h-3 w-3 rounded-full bg-blue-300" />
          <div className="h-3 w-3 rounded-full bg-blue-400" />
        </div>
      </div>
      <div className="mb-4 grid grid-cols-3 gap-3">
        <div className="rounded-lg bg-blue-50 p-3">
          <div className="mb-2 h-2 w-8 rounded bg-blue-200" />
          <div className="h-5 w-10 rounded bg-blue-600" />
        </div>
        <div className="rounded-lg bg-slate-50 p-3">
          <div className="mb-2 h-2 w-8 rounded bg-slate-200" />
          <div className="h-5 w-10 rounded bg-slate-400" />
        </div>
        <div className="rounded-lg bg-slate-50 p-3">
          <div className="mb-2 h-2 w-8 rounded bg-slate-200" />
          <div className="h-5 w-10 rounded bg-slate-400" />
        </div>
      </div>
      <div className="space-y-3">
        <div className="flex items-center gap-3 rounded-lg bg-slate-50 p-3">
          <div className="h-8 w-8 rounded-full bg-blue-100" />
          <div className="flex-1 space-y-1">
            <div className="h-2 w-24 rounded bg-slate-200" />
            <div className="h-2 w-16 rounded bg-slate-100" />
          </div>
          <div className="h-6 w-14 rounded-full bg-green-100" />
        </div>
        <div className="flex items-center gap-3 rounded-lg bg-slate-50 p-3">
          <div className="h-8 w-8 rounded-full bg-blue-100" />
          <div className="flex-1 space-y-1">
            <div className="h-2 w-20 rounded bg-slate-200" />
            <div className="h-2 w-12 rounded bg-slate-100" />
          </div>
          <div className="h-6 w-14 rounded-full bg-blue-100" />
        </div>
        <div className="flex items-center gap-3 rounded-lg bg-slate-50 p-3">
          <div className="h-8 w-8 rounded-full bg-blue-100" />
          <div className="flex-1 space-y-1">
            <div className="h-2 w-28 rounded bg-slate-200" />
            <div className="h-2 w-14 rounded bg-slate-100" />
          </div>
          <div className="h-6 w-14 rounded-full bg-amber-100" />
        </div>
      </div>
    </div>
  );
}

export function Hero() {
  return (
    <section
      id="home"
      className="bg-gradient-to-b from-blue-50 to-white py-16 sm:py-24"
    >
      <div className="mx-auto grid max-w-6xl items-center gap-12 px-4 sm:px-6 lg:grid-cols-2">
        <div>
          <h1 className="text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl">
            {business.headline}
          </h1>
          <p className="mt-6 text-lg leading-8 text-slate-600">
            {business.supportingMessage}
          </p>
          <div className="mt-8 flex flex-col gap-4 sm:flex-row">
            <LinkButton href="#contact">{business.cta}</LinkButton>
            <LinkButton href="#services" variant="secondary">
              Explore Our Services
            </LinkButton>
          </div>
        </div>
        <div className="flex justify-center lg:justify-end">
          <DashboardIllustration />
        </div>
      </div>
    </section>
  );
}
