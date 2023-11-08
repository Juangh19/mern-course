import { Link, useRouteError } from 'react-router-dom';
import notFoundImg from '../assets/images/not-found.svg';

const Error = () => {
  const error = useRouteError();
  console.log(error);

  if ((error as { status: number }).status === 404) {
    return (
      <div className="max-w-4xl h-[100svh] grid place-content-center px-8 mx-auto text-center">
        <img src={notFoundImg} alt="not found" className="mb-4" />
        <h3 className="mb-2 text-2xl font-semibold">Ohh! page not found</h3>
        <Link to="/" className="text-xl underline text-primary ">
          back Home
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-4xl h-[100svh] grid place-content-center px-8 mx-auto text-center">
      <h3 className="mb-2 text-2xl font-semibold">Something went wrong</h3>
      <Link to="/" className="text-xl underline text-primary ">
        back Home
      </Link>
    </div>
  );
};
export default Error;
