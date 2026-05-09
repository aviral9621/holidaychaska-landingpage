import { ReactNode } from "react";

export function LegalShell({
  title,
  subtitle,
  children,
}: {
  title: string;
  subtitle?: string;
  children: ReactNode;
}) {
  return (
    <article
      style={{ background: "var(--color-cream)" }}
      className="min-h-screen pt-[120px] pb-20"
    >
      <div className="max-w-[820px] mx-auto px-5 sm:px-8">
        <header className="mb-8 text-center">
          <h1 className="font-[family-name:var(--font-playfair)] font-bold text-[var(--color-navy)] text-3xl sm:text-4xl mb-2">
            {title}
          </h1>
          {subtitle && <p className="text-[var(--color-muted)] text-sm">{subtitle}</p>}
          <div className="mt-3 mx-auto w-16 h-px bg-[var(--color-gold)]" />
        </header>
        <div className="prose prose-slate max-w-none text-[15px] leading-relaxed text-[#2a3548]
          [&_h2]:font-[family-name:var(--font-playfair)] [&_h2]:font-bold [&_h2]:text-[var(--color-navy)] [&_h2]:text-xl [&_h2]:mt-7 [&_h2]:mb-3
          [&_p]:mb-4
          [&_ul]:list-disc [&_ul]:pl-6 [&_ul]:mb-4 [&_li]:mb-1
          [&_a]:text-[var(--color-gold)] [&_a]:underline
          [&_table]:w-full [&_table]:border-collapse [&_table]:my-4
          [&_th]:bg-[var(--color-navy)] [&_th]:text-white [&_th]:p-2 [&_th]:text-left
          [&_td]:border [&_td]:border-[#E8D9B8] [&_td]:p-2">
          {children}
        </div>
      </div>
    </article>
  );
}
