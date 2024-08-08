import React from "react";
import { useForm, FormProvider } from "react-hook-form";
import FormContainer from "./FormContainer";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faExclamationTriangle } from "@fortawesome/free-solid-svg-icons";
import Card from "./Card";

interface FormProps {
  title?: string;
  footer?: any;
  defaultValues: any;
  children: React.ReactNode;
  onSubmit: (data: any) => void;
  card?: boolean;
}

export const Form: React.FC<FormProps> = ({
  title,
  footer,
  defaultValues,
  children,
  onSubmit,
  card,
}) => {
  const methods = useForm({ defaultValues });

  if (card) {
    return (
      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit(onSubmit)}>
          <Card header={title} footer={footer}>
            {Array.isArray(children)
              ? children.map((child) => {
                  return child.props.name
                    ? React.createElement(child.type, {
                        ...{
                          ...child.props,
                          register: methods.register,
                          key: child.props.name,
                          errors: methods.formState.errors,
                        },
                      })
                    : child;
                })
              : children}
          </Card>
        </form>
      </FormProvider>
    );
  }

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)}>
        {Array.isArray(children)
          ? children.map((child) => {
              return child.props.name
                ? React.createElement(child.type, {
                    ...{
                      ...child.props,
                      register: methods.register,
                      key: child.props.name,
                      errors: methods.formState.errors,
                    },
                  })
                : child;
            })
          : children}
      </form>
    </FormProvider>
  );
};

export const ErrorMessage = ({ message }: { message: any }) => {
  return (
    <p className="text-red-500 dark:text-red-400 text-xs mt-2">
      <FontAwesomeIcon
        icon={faExclamationTriangle}
        className={`mr-3 w-4 h-4 `}
      />
      {message}
    </p>
  );
};

interface InputProps {
  register?: any;
  name: string;
  rules?: any;
  errors?: any;
  [key: string]: any;
}

export const Input: React.FC<InputProps> = ({
  register,
  name,
  placeholder,
  rules,
  errors,
  ...rest
}) => {
  return (
    <FormContainer name={name} labelLeft={name}>
      <input
        {...register(name, rules)}
        {...rest}
        placeholder={placeholder}
        className={`block w-full text-xs rounded-lg py-3 px-3 md:py-2 md text-gray-900 dark:text-gray-100 bg-gray-100/40 dark:bg-gray-700/30 border-[1px] placeholder:text-gray-400 dark:placeholder-gray-500 focus:border-[1px] sm:text-xs sm:leading-6 ${
          errors[name]
            ? "border-red-500 dark:border-red-600"
            : "border-gray-200 dark:border-gray-600 focus:border-indigo-600"
        }`}
      />
      {errors[name] && <ErrorMessage message={errors[name].message} />}
    </FormContainer>
  );
};

interface SelectProps {
  register?: any;
  name: string;
  placeholder?: string;
  type?: number;
  options: any;
  rules?: any;
  errors?: any;
  [key: string]: any;
}

export const SelectOption: React.FC<SelectProps> = ({
  register,
  name,
  type = 1,
  options,
  placeholder,
  rules,
  errors,
  ...rest
}) => {
  return (
    <FormContainer name={name} labelLeft={name}>
      <select
        {...register(name, rules)}
        {...rest}
        placeholder={placeholder}
        className={`text-xs rounded-lg py-3 px-3 md:py-2 md text-gray-900 dark:text-gray-100 bg-gray-100/40 dark:bg-gray-700/30 border-[1px] placeholder:text-gray-400 dark:placeholder-gray-500 focus:border-[1px] sm:text-xs sm:leading-6 ${
          errors[name]
            ? "border-red-500 dark:border-red-600"
            : "border-gray-200 dark:border-gray-600 focus:border-indigo-600"
        }`}>
        {type === 2
          ? options.map((i: any) => (
              <option key={i.value} value={i.value}>
                {i.label}
              </option>
            ))
          : options.map((value: any) => (
              <option key={value} value={value}>
                {value}
              </option>
            ))}
      </select>
      {errors[name] && <ErrorMessage message={errors[name].message} />}
    </FormContainer>
  );
};

interface ButtonProps {
  disabled: boolean;
  label: string;
}

export const Button = ({ disabled, label }: ButtonProps) => {
  return (
    <button
      type="submit"
      disabled={disabled}
      className={`bg-blue-500 hover:bg-blue-600 font-medium text-white px-4 py-2 rounded-lg w-full md:max-w-44 shadow-md ${
        disabled ? "opacity-50 cursor-not-allowed" : ""
      }`}>
      {label}
    </button>
  );
};
