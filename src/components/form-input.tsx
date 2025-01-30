import React from "react";

interface FormInputProps {
    type: string;
    placeholder: string;
    required: boolean;
    errors: string[];
    name: string;
    defaultValue: string;
    icon?: React.ReactNode;
}

const FormInput: React.FC<FormInputProps> = ({
    type,
    placeholder,
    required,
    errors,
    name,
    icon,
    defaultValue,
}) => {
    return (
        <div className="flex flex-col gap-2">
            <div className="relative flex items-center">
                {icon && (
                    <span className="absolute left-3">
                        {icon}
                    </span>
                )}
                <input
                    className="bg-transparent rounded-full w-full h-10 pl-10 focus:outline-none ring-2 focus:ring-4 transition ring-neutral-200 focus:ring-orange-500 border-none placeholder:text-neutral-400"
                    type={type}
                    placeholder={placeholder}
                    required={required}
                    name={name}
                    defaultValue={defaultValue}
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

export default FormInput;