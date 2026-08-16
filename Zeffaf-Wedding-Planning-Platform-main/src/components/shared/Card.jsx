export function Card({ children, className, hover = true }) {
  return (
    <div
      className={`
      bg-white rounded-lg shadow-md overflow-hidden
      ${hover ? "hover:shadow-xl hover:-translate-y-1 transition-all" : ""}
      ${className}
    `}
    >
      {children}
    </div>
  );
}
