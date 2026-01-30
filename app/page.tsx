import GeneratorForm from "@/components/GeneratorForm";

export default function HomePage() {
  return (
    <main className="min-h-screen p-6 md:p-10">
      <div className="mx-auto max-w-5xl">
        <header className="mb-6">
          <h1 className="text-2xl md:text-3xl font-semibold tracking-tight">
            Planner & Journal Prompt Generator
          </h1>
          <p className="text-sm md:text-base text-neutral-600 mt-2">
            Pick a style, format, theme, and topics — then copy a perfect AI prompt (or generate the content).
          </p>
        </header>

        <GeneratorForm />
        <footer className="mt-10 text-xs text-neutral-500">
          Tip: Start with “Daily Planner” + “Minimal” + “Neutral” for clean outputs.
        </footer>
      </div>
    </main>
  );
}
