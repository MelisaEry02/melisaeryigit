type Props = {
  children: React.ReactNode;
  className?: string;
  eyebrow?: string;
};

/** Ana sayfa scroll bölümleri için yumuşak çerçeveli panel. */
export function SectionPanel({ children, className = "", eyebrow }: Props) {
  return (
    <section className={`site-shell home-section py-10 md:py-12 ${className}`.trim()}>
      <div className="section-panel">
        {eyebrow ? <p className="section-panel__eyebrow">{eyebrow}</p> : null}
        {children}
      </div>
    </section>
  );
}
