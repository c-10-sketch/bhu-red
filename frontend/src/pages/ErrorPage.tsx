import { Link } from "react-router-dom";

const ErrorPage = () => {
  return (
    <main className="relative flex min-h-screen items-center justify-center p-6">
      <section className="w-full max-w-xl rounded-2xl border border-rose-300/30 bg-slate-900/60 p-8 text-center shadow-neon backdrop-blur-xl">
        <h1 className="text-3xl font-bold text-rose-100">Missing Redirect Parameter</h1>
        <p className="mt-3 text-slate-300">Redirect parameter not found.</p>
        <Link
          to="/"
          className="mt-6 inline-block rounded-lg border border-cyan-400/40 bg-cyan-500/20 px-5 py-2 text-cyan-100 transition hover:bg-cyan-500/30"
        >
          Go Home
        </Link>
      </section>
    </main>
  );
};

export default ErrorPage;
