import { InputHTMLAttributes } from 'react'
import { RefCallBack } from 'react-hook-form'
import { twMerge } from 'tw-merge'

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string
  inputRef: RefCallBack
}

export function Input({ label, className, inputRef, ...rest }: InputProps) {
  return (
    <>
      <label className="mt-2">{label}</label>
      <input
        className={twMerge(
          `bg-primary py-2 px-3 border-[0.5px] text-smoke rounded mt-1
          ${className}`,
        )}
        {...rest}
        ref={inputRef}
      />
    </>
  )
}
