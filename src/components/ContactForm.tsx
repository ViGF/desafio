'use client'

import { Controller, useForm } from 'react-hook-form'
import { Input } from '@/components/Input'

type Inputs = {
  name: string
  email: string
  file: string
}

export function ContactForm() {
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<Inputs>()

  function onSubmit(data: Inputs) {
    console.log({ data })

    return null
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      method="GET"
      action="/search"
      className="flex flex-col w-60"
    >
      <Controller
        name="name"
        control={control}
        render={({ field: { onChange, onBlur, ref } }) => (
          <Input
            placeholder="Ex. Carlos"
            label="Nome:"
            onBlur={onBlur} // notify when input is touched
            onChange={onChange} // send value to hook form
            inputRef={ref}
          />
        )}
        rules={{
          required: {
            value: true,
            message: 'É necessário um nome',
          },
          minLength: {
            value: 2,
            message: 'O UF deve possuir 2 caracteres',
          },
        }}
      />
      <Controller
        name="email"
        control={control}
        render={({ field: { onChange, onBlur, ref } }) => (
          <Input
            placeholder="Ex. email@on.com"
            type="email"
            label="Email:"
            onBlur={onBlur} // notify when input is touched
            onChange={onChange} // send value to hook form
            inputRef={ref}
          />
        )}
        rules={{
          required: {
            value: true,
            message: 'É necessário um email',
          },
        }}
      />
      <Controller
        name="file"
        control={control}
        render={({ field: { onChange, onBlur, ref } }) => (
          <Input
            placeholder="Ex. Rua João Algor"
            label="Arquivo (Somente PDF):"
            type="file"
            accept=".pdf"
            onBlur={onBlur} // notify when input is touched
            onChange={onChange} // send value to hook form
            inputRef={ref}
          />
        )}
        rules={{
          required: {
            value: true,
            message: 'É necessário um arquivo',
          },
        }}
      />
      <input
        type="submit"
        title="Enviar"
        className="mt-5 bg-blue font-semibold p-1 py-2 rounded cursor-pointer"
      />
      {errors.name && <p role="alert">{errors.name.message}</p>}
      {errors.email && <p role="alert">{errors.email.message}</p>}
      {errors.file && <p role="alert">{errors.file.message}</p>}
    </form>
  )
}
