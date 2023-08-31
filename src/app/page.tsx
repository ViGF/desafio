import { Weather } from '@/components/Weather'

export default function Home() {
  return (
    <main className="bg-secondary flex flex-col h-full justify-center md:flex-row items-center text-smoke">
      <Weather />
    </main>
  )
}
