export function ScrollCue() {
  return (
    <div
      aria-hidden="true"
      className="mt-16 flex flex-col items-center gap-2 w-fit opacity-70"
    >
      <span className="scroll-cue-track">
        <span className="scroll-cue-dot" />
      </span>
      <span className="text-xs text-muted">Scroll</span>
    </div>
  );
}
