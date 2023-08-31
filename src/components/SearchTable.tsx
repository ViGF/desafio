'use client'

import { useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'

interface ResultProps {
  cep: string
  uf: string
  localidade: string
  logradouro: string
}

export function SearchTable() {
  const [result, setResult] = useState<ResultProps[] | []>([])
  const searchParams = useSearchParams()

  const uf = searchParams.get('uf')
  const city = searchParams.get('city')
  const street = searchParams.get('street')

  useEffect(() => {
    function sendData() {
      if (uf && city && street) {
        fetch(`https://viacep.com.br/ws/${uf}/${city}/${street}/json/`)
          .then((data) => data.json())
          .then((data) => setResult(data))
      }
    }

    sendData()
  }, [city, street, uf])

  return (
    <div className="text-smoke md:pl-10 max-h-[30rem] min-w-min">
      {result.length > 0 && (
        <>
          <h2 className="text-2xl">Principais resultados:</h2>
          <table className="rounded mt-2 overflow-auto block max-h-[28rem]">
            <thead className="bg-blue py-2 px-3">
              <tr>
                <th className="pl-4 md:pr-14 py-1">Localidade/UF</th>
                <th>Logradouro</th>
                <th className="pr-4 md:pl-14 py-1">CEP</th>
              </tr>
            </thead>
            <tbody className="bg-primary">
              {result.map((data) => (
                <tr key={data.cep}>
                  <td className="px-4 py-2">
                    {data.localidade}/{data.uf}
                  </td>
                  <td className="px-4 py-2">{data.logradouro}</td>
                  <td className="px-4 py-2">{data.cep}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </>
      )}
      {result.length === 0 && (
        <>
          <h2 className="text-2xl md:hidden">Principais resultados:</h2>
          <p className="text-center mt-2">Não encontramos nada ainda!</p>
        </>
      )}
    </div>
  )
}
