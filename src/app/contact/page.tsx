import { ContactForm } from '@/components/ContactForm'

export default function Contact() {
  return (
    <main className="flex flex-1 min-h-full flex-col justify-center pl-6 md:pl-16 gap-10 flex-wrap text-smoke">
      <div>
        <h1 className="font-bold text-4xl">Entre em contato conosco</h1>
        <p className="mt-1">Nos envie um arquivo</p>
      </div>
      <ContactForm />
    </main>
  )
}
