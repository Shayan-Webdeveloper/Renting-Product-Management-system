export default function SignupPage() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-gray-50 p-6">
      <form className="w-full max-w-md rounded-lg bg-white p-6 shadow-md">
        <h1 className="mb-6 text-2xl font-bold">Create account</h1>

        <div className="mb-4">
          <label className="mb-1 block font-medium">Full name</label>
          <input
            type="text"
            className="w-full rounded border border-gray-300 p-2"
            placeholder="Your name"
          />
        </div>

        <div className="mb-4">
          <label className="mb-1 block font-medium">Email</label>
          <input
            type="email"
            className="w-full rounded border border-gray-300 p-2"
            placeholder="you@example.com"
          />
        </div>

        <div className="mb-4">
          <label className="mb-1 block font-medium">Password</label>
          <input
            type="password"
            className="w-full rounded border border-gray-300 p-2"
            placeholder="••••••••"
          />
        </div>

        <button
          type="submit"
          className="w-full rounded bg-blue-600 px-4 py-2 font-medium text-white"
        >
          Sign up
        </button>
      </form>
    </main>
  );
}
