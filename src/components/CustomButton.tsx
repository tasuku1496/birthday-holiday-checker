import React from "react";

type CustomButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variantType?: "blue" | "gray";
  className?: string;
};

const CustomButton: React.FC<CustomButtonProps> = ({
  variantType = "blue",
  className = "",
  children,
  ...rest
}) => {
  const baseClasses =
    "font-kaiseiTokumin text-base normal-case rounded py-2 px-4 transition-colors duration-200";

  const variantClasses =
    variantType === "blue"
      ? "bg-blue-500 text-white hover:bg-blue-700"
      : "bg-gray-500 text-black hover:bg-gray-700";

  const combinedClasses = `${baseClasses} ${variantClasses} ${className}`;

  return (
    <button className={combinedClasses} {...rest}>
      {children}
    </button>
  );
};

export default CustomButton;
