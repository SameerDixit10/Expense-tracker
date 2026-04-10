export default function Button({
  children,
  onClick,
  variant = 'primary',
  className = '',
  ...props
}) {
  const base = 'px-4 py-2 rounded text-sm font-medium cursor-pointer transition-colors';
  const variants = {
    primary: 'bg-primary text-primary-foreground hover:opacity-90',
    danger: 'bg-expense text-white hover:opacity-90',
    success: 'bg-income text-white hover:opacity-90',
    outline: 'border border-border text-foreground hover:bg-accent',
  };

  return (
    <button
      onClick={onClick}
      className={`${base} ${variants[variant] || variants.primary} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
