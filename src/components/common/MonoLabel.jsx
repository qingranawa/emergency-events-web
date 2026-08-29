export function MonoLabel({ children, className = "" }) {
  return <div className={`mono ${className}`.trim()}>{children}</div>;
}

