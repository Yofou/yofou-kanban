type InputProps = React.PropsWithChildren<{
  type?: React.HTMLInputTypeAttribute;
  autoFocus?: boolean;
  required?: boolean;
}>;
export const Input: React.FC<InputProps> = ({
  children,
  type = "text",
  autoFocus = false,
  required = false,
}) => {
  return (
    <label className="text-body-m flex flex-col gap-4 w-full text-grey-400 dark:text-white">
      {children}
      <input
        className="px-4 py-2 text-body-l rounded-[4px] border-[#828FA3]/25 outline-none focus:outline-none focus:border-purple-600 bg-[transparent] border"
        type={type}
        name={children?.toString()}
        autoFocus={autoFocus}
        required={required}
      />
    </label>
  );
};
