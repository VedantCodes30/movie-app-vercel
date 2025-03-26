import { Link } from "react-router-dom";
import PageWrapper from "../components/PageWrapper";

const NotFound = () => {
  return (
    <PageWrapper>
      <div className="h-dvh flex flex-col items-center justify-center text-center px-4">
        <h1 className="text-gradient text-[150px] leading-none sm:text-[200px] font-bold mb-4">
          404
        </h1>
        <h2 className="text-white text-3xl sm:text-4xl font-bold mb-4">
          Oops! Page Not Found
        </h2>
        <p className="text-light-200 mb-8 max-w-md">
          The page you are looking for doesn't exist or has been moved. Maybe
          you mistyped the URL or followed a broken link.
        </p>
        <Link
          to="/"
          className="bg-purple-600 rounded-2xl px-6 py-3 text-white font-medium hover:bg-purple-700 shadow-md transition"
        >
          Go Back Home
        </Link>
      </div>
    </PageWrapper>
  );
};

export default NotFound;
