"use client"
import clsx from 'clsx'
import { FieldErrors, FieldValues, UseFormRegister } from 'react-hook-form'

interface InputProp {
  label:string
  id:string
  type?: "password" | "email" | "text" | "date"
  required?:boolean
  register: UseFormRegister<FieldValues>
  errors: FieldErrors
  disabled?: boolean
}

const Input:React.FC<InputProp> = ({
  label,
  type,
  id,
  required,
  register,
  errors,
  disabled,
}) => {
  return (
    <div>
      <label 
      className='block text-sm font-medium leading-6 text-gray-900'
      htmlFor={id}
      >
        {label}
      </label>
      <div className="mt-2">
        <input 
        type={type} 
        id={id} 
        autoComplete={id} 
        disabled={disabled}
        {...register(id, { required })}
        className={clsx(`
            form-input
            rounded-md
            w-full
            block
            border-0
            py-1.5
            text-gray-900
            shadow-sm
            ring-1
            ring-inset
            ring-gray-400
            focus:ring-2
            focus:ring-inset
            focus:ring-sky-600
            sm:text-sm
            sm:leading-6`, 
            errors[id] && "focus:ring-rose-5000",
            disabled && "opacity-50 cursor-default"
          )}
        />
      </div>
    </div>
  )
}

export default Input