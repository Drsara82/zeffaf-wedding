export default function SharedInput({
  label,
  type = "text",
  name,
  placeholder = "",
  value,
  onChange,
  error,
  disabled,
  icon,
  required = false,
  className = "",
  labelClass = "text-gray-700",
  ...props
}) {
  return (
    <div className={`flex flex-col gap-2 ${className}`}>
      {label && (
        <label
          className={`text-sm font-medium flex items-center gap-1 ${labelClass}`}
        >
          {label}
          {required && <span className="text-red-500">*</span>}
        </label>
      )}

      <div className="relative group">
        {icon && (
          <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-primary transition-colors duration-200">
            {icon}
          </span>
        )}

        <input
          type={type}
          name={name}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          disabled={disabled}
          className={`
            w-full h-[50px] border
            ${
              error ? "border-red-500" : "border-[#E4E7EC] dark:border-gray-700"
            }
            rounded-md
            ${icon ? "pl-12" : "px-4"} pr-4
            text-base outline-none bg-white dark:bg-[#172235]
            text-black dark:text-white
            placeholder:text-[#98A2B3] dark:placeholder:text-gray-500
            focus:border-primary/50
            transition
            disabled:bg-gray-100 dark:disabled:bg-gray-800 disabled:cursor-not-allowed
          `}
          {...props}
        />
      </div>

      {error && <span className="text-sm text-red-500">{error}</span>}
    </div>
  );
}
