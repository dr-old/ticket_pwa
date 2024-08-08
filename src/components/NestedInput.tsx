import React, { memo, ReactNode } from "react";
import { useFormContext, UseFormRegister } from "react-hook-form";

interface NestedInputProps {
  name: string;
  register: UseFormRegister<any>;
  formState: {
    errors: any;
  };
}

const NestedInput: React.FC<NestedInputProps> = memo(
  ({ name, register, formState: { errors } }) => {
    console.log(errors[name]);

    return (
      <div>
        <input {...register(name, { required: "This field is required" })} />
        {errors[name] && (
          <p className="text-red-500 dark:text-red-400 text-xs mt-1">
            {errors[name].message}
          </p>
        )}
      </div>
    );
  },
  (prevProps, nextProps) =>
    prevProps.formState.errors[prevProps.name]?.message ===
    nextProps.formState.errors[nextProps.name]?.message
);

interface NestedInputContainerProps {
  name: string;
  children?: ReactNode;
}

export const NestedInputContainer: React.FC<NestedInputContainerProps> = ({
  name,
  children,
}) => {
  const methods = useFormContext();

  return <NestedInput name={name} {...methods} />;
};
