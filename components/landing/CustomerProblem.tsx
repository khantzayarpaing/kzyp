import { customerProblem } from "@/config/business";

export function CustomerProblem() {
  return (
    <section className="py-16 sm:py-20">
      <div className="mx-auto max-w-3xl px-4 text-center sm:px-6">
        <h2 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
          {customerProblem.heading}
        </h2>
        <div className="mt-6 space-y-4 text-lg leading-8 text-slate-600">
          {customerProblem.paragraphs.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </div>
      </div>
    </section>
  );
}
