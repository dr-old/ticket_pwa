import React, { ReactNode } from "react";
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

  const handleSubmit = async (data: any) => {
    await onSubmit(data);
    methods.reset();
  };

  if (card) {
    return (
      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit(handleSubmit)}>
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
  iconSuffix?: ReactNode;
  iconPrefix?: ReactNode;
  rules?: any;
  errors?: any;
  [key: string]: any;
}

export const Input: React.FC<InputProps> = ({
  register,
  name,
  placeholder,
  iconSuffix,
  iconPrefix,
  rules,
  errors,
  ...rest
}) => {
  return (
    <FormContainer
      name={name}
      labelLeft={name}
      error={errors[name] && <ErrorMessage message={errors[name].message} />}
      iconPrefix={iconPrefix}
      iconSuffix={iconSuffix}>
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
    </FormContainer>
  );
};

interface TextareaProps {
  register?: any;
  name: string;
  iconSuffix?: ReactNode;
  iconPrefix?: ReactNode;
  rules?: any;
  errors?: any;
  [key: string]: any;
}

export const Textarea: React.FC<TextareaProps> = ({
  register,
  name,
  placeholder,
  iconSuffix,
  iconPrefix,
  rules,
  errors,
  ...rest
}) => {
  return (
    <FormContainer
      name={name}
      labelLeft={name}
      error={errors[name] && <ErrorMessage message={errors[name].message} />}
      iconPrefix={iconPrefix}
      iconSuffix={iconSuffix}>
      <textarea
        {...register(name, rules)}
        {...rest}
        rows={3}
        placeholder={placeholder}
        className={`block w-full text-xs rounded-lg py-3 px-3 md:py-2 md text-gray-900 dark:text-gray-100 bg-gray-100/40 dark:bg-gray-700/30 border-[1px] placeholder:text-gray-400 dark:placeholder-gray-500 focus:border-[1px] sm:text-xs sm:leading-6 ${
          errors[name]
            ? "border-red-500 dark:border-red-600"
            : "border-gray-200 dark:border-gray-600 focus:border-indigo-600"
        }`}
      />
    </FormContainer>
  );
};

interface SelectProps {
  register?: any;
  name: string;
  placeholder?: string;
  type?: number;
  options: any;
  iconSuffix?: ReactNode;
  iconPrefix?: ReactNode;
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
  iconSuffix,
  iconPrefix,
  rules,
  errors,
  ...rest
}) => {
  return (
    <FormContainer
      name={name}
      labelLeft={name}
      error={errors[name] && <ErrorMessage message={errors[name].message} />}
      iconPrefix={iconPrefix}
      iconSuffix={iconSuffix}>
      <select
        {...register(name, rules)}
        {...rest}
        placeholder={placeholder}
        className={`block w-full appearance-none text-xs rounded-lg py-3 px-3 md:py-2 md text-gray-900 dark:text-gray-100 bg-gray-100/40 dark:bg-gray-700/30 border-[1px] placeholder:text-gray-400 dark:placeholder-gray-500 focus:border-[1px] sm:text-xs sm:leading-6 ${
          errors[name]
            ? "border-red-500 dark:border-red-600"
            : "border-gray-200 dark:border-gray-600 focus:border-indigo-600"
        }`}>
        {/* Default empty option */}
        <option value="">{placeholder || `Select ${name}`}</option>
        {/* Render options based on type */}
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
    </FormContainer>
  );
};

interface RadioProps {
  register?: any;
  name: string;
  options: { value: string; label: string }[];
  rules?: any;
  errors?: any;
  [key: string]: any;
}

export const Radio: React.FC<RadioProps> = ({
  register,
  name,
  options,
  rules,
  errors,
  ...rest
}) => {
  return (
    <FormContainer
      name={name}
      labelLeft={name}
      error={errors[name] && <ErrorMessage message={errors[name].message} />}>
      <div className="flex flex-col space-y-2">
        {options.map((option) => (
          <label key={option.value} className="flex items-center space-x-2">
            <input
              type="radio"
              value={option.value}
              {...register(name, rules)}
              {...rest}
              className={`text-blue-500 dark:text-blue-400 bg-gray-100/40 dark:bg-gray-700/30 border-[1px] focus:ring-0 ${
                errors[name]
                  ? "border-red-500 dark:border-red-600"
                  : "border-gray-200 dark:border-gray-600"
              }`}
            />
            <span className="text-gray-900 dark:text-gray-100 text-xs">
              {option.label}
            </span>
          </label>
        ))}
      </div>
    </FormContainer>
  );
};

interface CheckboxProps {
  register?: any;
  name: string;
  label: string;
  rules?: any;
  errors?: any;
  [key: string]: any;
}

export const Checkbox: React.FC<CheckboxProps> = ({
  register,
  name,
  label,
  rules,
  errors,
  ...rest
}) => {
  return (
    <FormContainer
      name={name}
      labelLeft={name}
      error={errors[name] && <ErrorMessage message={errors[name].message} />}>
      <label className="flex items-center space-x-2">
        <input
          type="checkbox"
          {...register(name, rules)}
          {...rest}
          className={`text-blue-500 dark:text-blue-400 bg-gray-100/40 dark:bg-gray-700/30 border-[1px] focus:ring-0 ${
            errors[name]
              ? "border-red-500 dark:border-red-600"
              : "border-gray-200 dark:border-gray-600"
          }`}
        />
        <span className="text-gray-900 dark:text-gray-100 text-xs">
          {label}
        </span>
      </label>
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
