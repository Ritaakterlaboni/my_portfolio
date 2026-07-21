export default function SectionHeading({ eyebrow, title, className = '' }) {
  return (
    <div className={`mb-7 ${className}`}>
      <div className="mb-3 text-[13px] font-semibold uppercase tracking-[0.24em] text-[var(--brand-2)]">
        {eyebrow}
      </div>
      <h2 className="text-[clamp(22px,3.2vw,34px)] font-semibold text-white">{title}</h2>
    </div>
  );
}
