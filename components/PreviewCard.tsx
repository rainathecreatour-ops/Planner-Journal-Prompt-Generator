type Props = {
  title: string;
  subtitle?: string;
  fontClass: string;
  bgStyle: string;
  accent: string;
  children: React.ReactNode;
};

export default function PreviewCard({ title, subtitle, fontClass, bgStyle, accent, children }: Props) {
  return (
    <div
      className={`rounded-xl border border-neutral-200 shadow-sm overflow-hidden ${bgStyle}`}
      style={{ borderColor: accent }}
    >
      <div className="p-4 md:p-5 bg-white/70 backdrop-blur">
        <div className={`text-lg font-semibold ${fontClass}`} style={{ color: accent }}>
          {title}
        </div>
        {subtitle ? <div className="text-xs text-neutral-600 mt-1">{subtitle}</div> : null}
      </div>
      <div className="p-4 md:p-5 bg-white/70 backdrop-blur">{children}</div>
    </div>
  );
}
