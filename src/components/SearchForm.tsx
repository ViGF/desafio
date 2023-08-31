import { Controller, useForm } from 'react-hook-form'
import { Input } from '@/components/Input'
import { useRouter } from 'next/navigation'

type Inputs = {
  city: string
  uf: string
  street: string
}

export function SearchForm() {
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<Inputs>()

  const router = useRouter()

  function onSubmit({ city, street, uf }: Inputs) {
    const url = `?uf=${uf}&city=${city}&street=${street}`

    router.push(url)
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      method="GET"
      action="/search"
      className="flex flex-col w-60"
    >
      <Controller
        name="uf"
        control={control}
        render={({ field: { onChange, onBlur, ref } }) => (
          <Input
            placeholder="Ex. SP"
            label="Informe seu UF:"
            onBlur={onBlur} // notify when input is touched
            onChange={onChange} // send value to hook form
            inputRef={ref}
          />
        )}
        rules={{
          required: {
            value: true,
            message: 'É necessário um UF',
          },
          minLength: {
            value: 2,
            message: 'O UF deve possuir 2 caracteres',
          },
        }}
      />
      <Controller
        name="city"
        control={control}
        render={({ field: { onChange, onBlur, ref } }) => (
          <Input
            placeholder="Ex. São Paulo"
            label="Informe seu Cidade:"
            onBlur={onBlur} // notify when input is touched
            onChange={onChange} // send value to hook form
            inputRef={ref}
          />
        )}
        rules={{
          required: {
            value: true,
            message: 'É necessário uma Cidade',
          },
          minLength: {
            value: 3,
            message: 'A cidade deve possuir no mínimo 3 caracteres',
          },
        }}
      />
      <Controller
        name="street"
        control={control}
        render={({ field: { onChange, onBlur, ref } }) => (
          <Input
            placeholder="Ex. Rua João Algor"
            label="Informe seu Logradouro:"
            onBlur={onBlur} // notify when input is touched
            onChange={onChange} // send value to hook form
            inputRef={ref}
          />
        )}
        rules={{
          required: {
            value: true,
            message: 'É necessário um logradouro',
          },
          minLength: {
            value: 3,
            message: 'A cidade deve possuir no mínimo 3 caracteres',
          },
        }}
      />
      <input
        type="submit"
        title="Buscar"
        className="mt-5 bg-blue font-semibold p-1 py-2 rounded cursor-pointer"
      />
      {errors.uf && <p role="alert">{errors.uf.message}</p>}
      {errors.city && <p role="alert">{errors.city.message}</p>}
      {errors.street && <p role="alert">{errors.street.message}</p>}
    </form>
  )
}
