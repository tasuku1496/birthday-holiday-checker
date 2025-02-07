import React from "react";

type CustomButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variantType?: "blue" | "gray";
  className?: string;
};

const CustomButton = ({
  variantType = "blue",
  className = "",
  children,
  disabled,
  ...rest
}: CustomButtonProps) => {
  const baseClasses =
    "font-kaiseiTokumin text-base normal-case rounded py-2 px-4 transition-colors duration-200";

  const variantClasses = disabled
    ? "bg-gray-300 text-gray-600 cursor-not-allowed"
    : variantType === "blue"
    ? "bg-blue-500 text-white hover:bg-blue-700"
    : "bg-gray-500 text-black hover:bg-gray-700";

  const combinedClasses = `${baseClasses} ${variantClasses} ${className}`;

  return (
    <button className={combinedClasses} disabled={disabled} {...rest}>
      {children}
    </button>
  );
};

export default CustomButton;
