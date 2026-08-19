export function InlinePlaceholder({ children }: { children: React.ReactNode }) {
  return (
    <span className="placeholder-tile inline-block px-2 py-0.5 rounded text-sm">
      {children}
    </span>
  );
}

export function TilePlaceholder({
  label,
  className = "",
}: {
  label: string;
  className?: string;
}) {
  return (
    <div
      className={`placeholder-tile rounded-xl flex items-center justify-center text-center px-4 text-sm ${className}`}
    >
      {label}
    </div>
  );
}
