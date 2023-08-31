'use client'

import { SearchTable } from '@/components/SearchTable'
import { SearchForm } from '@/components/SearchForm'

export default function Search() {
  return (
    <main className="md:flex flex-wrap py-12">
      <div className="flex flex-1 h-full flex-col justify-center pl-8 md:items-start gap-10 md:border-r md:pl-32 text-smoke pb-10 md:pb-0 md:mt-10">
        <div>
          <h1 className="font-bold text-4xl">Busca de CEP</h1>
          <p className="">Encontre o seu CEP a partir do seu endereço</p>
        </div>
        <div>
          <SearchForm />
        </div>
      </div>
      <div className="flex pl-2 pr-2 items-center flex-1 md:mt-0">
        <SearchTable />
      </div>
    </main>
  )
}
