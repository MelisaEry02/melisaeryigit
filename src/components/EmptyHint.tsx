type Props = {
  title: string;
  body: string;
};

export function EmptyHint({ title, body }: Props) {
  return (
    <div className="empty-hint">
      <p className="empty-hint__title">{title}</p>
      <p className="empty-hint__body">{body}</p>
    </div>
  );
}
