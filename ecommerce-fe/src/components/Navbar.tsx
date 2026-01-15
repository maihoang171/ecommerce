import logo from "../assets/logo.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBagShopping, faUser } from "@fortawesome/free-solid-svg-icons";
import { NavLink } from "react-router-dom";

function Navbar() {
  return (
    <>
      <nav className="flex flex-row w-full justify-between items-center">
        <img src={logo} />

        <ul className="hidden md:flex gap-8 font-bold items-center">
          <li>
            <NavLink
              to="/"
              className={({ isActive }) =>
                isActive
                  ? "text-brand-green font-bold"
                  : "hover:text-brand-green transition-colors"
              }
            >
              HOME
            </NavLink>
          </li>

          <li>
            <NavLink
              to="/products"
              className={({ isActive }) =>
                isActive
                  ? "text-brand-green font-bold"
                  : "hover:text-brand-green transition-colors"
              }
            >
              SHOP
            </NavLink>
          </li>

          {/* //TODO: update link */}
          <li className="relative group py-4 cursor-pointer">
            <span className="hover:text-brand-green transition-colors">
              PAGES
            </span>
            <ul
              className="absolute left-0 top-full bg-[#222222] min-w-50 text-white
              opacity-0 invisible translate-y-2
              group-hover:opacity-100 group-hover:visible group-hover:translate-y-0
              transition-all duration-300 ease-out z-50"
            >
              <li className="hover:text-brand-green font-medium transition-colors">
                <NavLink to="/" className="block px-5 py-2 text-sm">
                  Shopping Cart
                </NavLink>
              </li>
              <li className="hover:text-brand-green font-medium transition-colors">
                <NavLink to="/" className="block px-5 py-2 text-sm">
                  Checkout
                </NavLink>
              </li>
            </ul>
          </li>

          <li>
            <NavLink
              to="/contacts"
              className={({ isActive }) =>
                isActive
                  ? "text-brand-green font-bold"
                  : "hover:text-brand-green transition-colors"
              }
            >
              CONTACT
            </NavLink>
          </li>
        </ul>

        {/* //TODO: update link */}
        <div className="flex flex-row gap-5 items-center">
          <NavLink
            to=""
            className={({ isActive }) =>
              `relative inline-block transition-transform hover:scale-110 ${
                isActive
                  ? "text-brand-green"
                  : "text-gray-700 hover:text-brand-green"
              }`
            }
          >
            <FontAwesomeIcon icon={faBagShopping} className="text-2xl" />
            <span className="absolute -top-2 -right-2 bg-brand-green text-xs text-white font-bold rounded-full w-5 h-5 flex justify-center items-center border-2 border-white">
              3
            </span>
          </NavLink>
          {/* //todo: update price */}
          <div className="text-sm text-gray-700 flex items-center h-full">
            <span>item:</span>
            <span className="font-bold ml-1"> $150.00</span>
          </div>

          <div className="flex items-center border-l border-gray-300 pl-4 h-5 align-self: center">
            <NavLink
              to="/login"
              className={({ isActive }) =>
                isActive
                  ? "text-brand-green"
                  : "text-gray-700 hover:text-brand-green"
              }
            >
              <FontAwesomeIcon icon={faUser} />
              <span className="text-sm">Login</span>
            </NavLink>
          </div>
        </div>
      </nav>
    </>
  );
}

export default Navbar;
