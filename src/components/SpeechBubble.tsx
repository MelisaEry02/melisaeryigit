type Props = {
  children: React.ReactNode;
  label?: string;
  className?: string;
};

/** Soft pastel konuşma balonu — nav sayfa içerikleri için. */
export function SpeechBubble({ children, label, className = "" }: Props) {
  return (
    <div className={`speech-bubble-wrap ${className}`.trim()}>
      {label ? <p className="speech-bubble__eyebrow">{label}</p> : null}
      <div className="speech-bubble" role="region" aria-label={label || "İçerik"}>
        <div className="speech-bubble__body">{children}</div>
        <span className="speech-bubble__tail" aria-hidden />
      </div>
    </div>
  );
}
