import React, { InputHTMLAttributes } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
    name: string;
    errors?: string[];
    icon?: React.ReactNode;
}

const Input: React.FC<InputProps> = ({
    name,
    errors = [],
    icon,
    ...rest
}: InputProps ) => {
    return (
        <div className="flex flex-col gap-2">
            <div className="relative flex items-center">
                {icon && (
                    <span className="absolute left-3">
                        {icon}
                    </span>
                )}
                <input
                    className="bg-transparent rounded-fullb  w-full h-10 pl-10 focus:outline-none ring-2 focus:ring-4 transition ring-neutral-200 focus:ring-orange-500 border-none placeholder:text-neutral-400"
                    name={name}
                    {...rest}
                />
            </div>
            {errors.map((error, index) => (
                <span key={index} className="text-red-500 font-medium">
                    {error}
                </span>
            ))}
        </div>
    );
};

export default Input;