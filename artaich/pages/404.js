import Link from 'next/link';

const NotFoundPage = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-indigo-600 text-white">
      <div className="text-center">
        <h1 className="text-5xl font-semibold mb-4">404 - Page Not Found</h1>
        <p className="text-xl mb-8">
          The page you're looking for does not exist.
        </p>
        <Link href="/dashboard" legacyBehavior>
          <a className="text-lg text-indigo-100 hover:text-indigo-900">
            Go back ⬅️
          </a>
        </Link>
      </div>
    </div>
  );
};

export default NotFoundPage;
