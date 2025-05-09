import { Link } from "react-router-dom";
import { useAppContext } from "../Context/AppContext";
import SignOut from "./SignOut";

const Header = () => {
  const { isLoggedIn } = useAppContext();
  return (
    <div className="bg-blue-800 py-6 px-3">
      <div className="container mx-auto flex flex-col justify-between sm:flex-row">
        <span className="text-3xl text-white font-bold tracking-tight">
          <Link to={"/"}>Mybookings.com</Link>
        </span>
        <span className="flex space-x-2 mt-3 sm:mt-auto">
          {isLoggedIn ? (
            <>
              <Link
                to="/my-bookings"
                className="flex items-center h-full text-white px-3 font-bold hover:bg-blue-600"
              >
                My Bookings
              </Link>
              <Link
                to="/my-hotels"
                className="flex items-center h-full text-white px-3 font-bold hover:bg-blue-600"
              >
                My Hotels
              </Link>
              <SignOut />
            </>
          ) : (
            <>
              <Link
                to="/sign-in"
                className="flex bg-white items-center h-full text-blue-600 px-3 font-bold hover:bg-gray-100"
              >
                Sign In
              </Link>
            </>
          )}
        </span>
      </div>
    </div>
  );
};

export default Header;
