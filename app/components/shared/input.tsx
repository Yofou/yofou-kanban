import { useState } from "react";

type InputProps = React.PropsWithChildren<{
  type?: React.HTMLInputTypeAttribute;
  autoFocus?: boolean;
  required?: boolean;
  defaultValue?: string;
  error?: string;
}>;
export const Input: React.FC<InputProps> = ({
  children,
  type = "text",
  autoFocus = false,
  required = false,
  defaultValue = "",
  error,
}) => {
  const [value, setValue] = useState(defaultValue);
  const showError = error && defaultValue === value;

  return (
    <label className="text-body-m flex flex-col gap-4 w-full text-grey-400 dark:text-white">
      {children} {showError && `- ${error}`}
      <input
        className={`px-4 py-2 text-body-l rounded-[4px] ${
          showError ? "border-red-600" : "border-[#828FA3]/25"
        } outline-none focus:outline-none focus:border-purple-600 bg-[transparent] border`}
        type={type}
        name={children?.toString()}
        autoFocus={autoFocus}
        required={required}
        value={value}
        onChange={(el) => setValue(el.target.value)}
      />
    </label>
  );
};
