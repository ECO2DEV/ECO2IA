import Link from 'next/link';

const NotFoundPage = () => {
  return (
    <section className="min-h-screen flex items-center justify-center">
      <img
        src="https://images.unsplash.com/photo-1545972154-9bb223aac798?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=3050&q=80&exp=8&con=-15&sat=-75"
        alt=""
        className="absolute inset-0 w-full h-full object-cover"
      />
      <div className="relative text-center text-white z-10">
        <p className="text-base font-semibold leading-8">404</p>
        <h1 className="mt-4 text-3xl font-bold tracking-tight sm:text-5xl">
        Página no encontrada.
        </h1>
        <p className="mt-4 text-base text-white/70">
        Lo sentimos, no pudimos encontrar la página que estabas buscando.
        </p>
        <div className="mt-10 flex justify-center">
          <Link href="/" className="text-sm font-semibold leading-7 text-white">
            <span aria-hidden="true">&larr;</span> Volver a la página inicial
          </Link>
        </div>
      </div>
    </section>
  );
};

export default NotFoundPage;
