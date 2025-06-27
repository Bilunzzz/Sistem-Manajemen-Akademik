const Button = ({
  children,
  onClick,
  type = "button",
  variant = "primary", // 'primary', 'secondary', 'danger', 'warning'
  size = "md", // 'sm', 'md', 'lg'
  className = "",
  ...props // Untuk props lain seperti 'disabled'
}) => {
  // Style dasar untuk semua tombol
  const baseStyles =
    "font-semibold rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 transition-colors duration-200";

  // Variasi warna tombol
  const variantStyles = {
    primary: "bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500",
    secondary:
      "bg-gray-200 text-gray-800 hover:bg-gray-300 focus:ring-gray-400",
    danger: "bg-red-600 text-white hover:bg-red-700 focus:ring-red-500",
    warning:
      "bg-yellow-500 text-white hover:bg-yellow-600 focus:ring-yellow-400",
  };

  // Variasi ukuran tombol
  const sizeStyles = {
    sm: "px-3 py-1 text-xs",
    md: "px-4 py-2 text-sm",
    lg: "px-6 py-3 text-base",
  };

  return (
    <button
      type={type}
      onClick={onClick}
      className={`${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
