import Link from 'next/link'

export default function ThankYouPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-black text-white p-4 pt-32">
      {/* Container principal */}
      <div className="max-w-2xl w-full text-center space-y-8">
        {/* Ícono de checkmark */}
        <div className="flex justify-center">
          <div className="w-24 h-24 rounded-full bg-[#4BE3B2] flex items-center justify-center">
            <svg
              className="w-12 h-12 text-black"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={3}
                d="M5 13l4 4L19 7"
              />
            </svg>
          </div>
        </div>

        {/* Heading principal */}
        <div className="space-y-4">
          <h1 className="text-5xl md:text-6xl font-bold font-georgia">
            ¡Gracias!
          </h1>
          <p className="text-xl md:text-2xl text-gray-300">
            Tu solicitud ha sido recibida
          </p>
        </div>

        {/* Descripción */}
        <div className="space-y-3 text-gray-400 text-lg">
          <p>
            Nos pondremos en contacto contigo muy pronto para agendar una demostración personalizada.
          </p>
          <p>
            Mientras tanto, explora más sobre cómo Adnova Studio puede transformar tu visión en una experiencia increíble.
          </p>
        </div>

        {/* Botón CTA */}
        <div className="pt-4">
          <Link
            href="/"
            className="inline-block px-8 py-4 bg-[#4BE3B2] text-black rounded-full font-semibold hover:bg-white transition-all duration-300 transform hover:scale-105"
          >
            Volver a inicio
          </Link>
        </div>

        {/* Información adicional */}
        <div className="pt-8 border-t border-gray-700 mt-8">
          <p className="text-sm text-gray-500">
            Si tienes una pregunta urgente, contáctanos en:{' '}
            <a
              href="mailto:contact@adnova.digital"
              className="text-[#4BE3B2] hover:text-white transition-colors"
            >
              contact@adnova.digital
            </a>
          </p>
        </div>
      </div>
    </div>
  )
}
