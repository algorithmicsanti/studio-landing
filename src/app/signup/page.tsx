import Link from 'next/link'

export default function SignupPage() {
    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-black text-white p-4">
            <h1 className="text-4xl font-bold mb-4">Get Started with Adnova Studio</h1>
            <p className="text-xl text-gray-400 mb-8">Sign up coming soon.</p>
            <Link
                href="/"
                className="px-6 py-3 bg-white text-black rounded-full font-semibold hover:bg-gray-200 transition-colors"
            >
                Back to Home
            </Link>
        </div>
    )
}
