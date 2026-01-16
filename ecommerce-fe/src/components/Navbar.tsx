import logo from "../assets/logo.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBagShopping, faUser } from "@fortawesome/free-solid-svg-icons";
import { NavLink } from "react-router-dom";
import { useLogout } from "../hooks/use-user";
import { useUserStore } from "../stores/useUserStore";
import { useNavigate } from "react-router-dom";
import { useState, useRef, useEffect } from "react";

function Navbar() {
  const user = useUserStore((state) => state.user);
  const setUser = useUserStore((state) => state.setUser);
  console.log(user);
  const navigate = useNavigate();
  const { handleLogout } = useLogout();
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleClickLogout = async () => {
    await handleLogout();
    setIsOpen(false);
    setUser(null);
    navigate("/");
  };
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
          <div className="h-5 border-l border-gray-300 mx-1"></div>
          {user ? (
            <div className="relative" ref={menuRef}>
              <div
                onClick={toggleMenu}
                className="w-10 h-10 rounded-full bg-brand-green text-white flex items-center justify-center font-bold cursor-pointer select-none"
              >
                {user.fullName?.charAt(0).toUpperCase()}
              </div>

              {isOpen && (
                <div className="absolute right-0 border w-36 mt-2 border-gray-200 p-2 bg-gray-50 z-20 overflow-hidden">
                  <ul className="flex flex-col">
                    <li className="w-full">
                      <NavLink
                        to={"/personal-page"}
                        className="block w-full p-2 rounded-full hover:bg-gray-300 transition-colors"
                      >
                        Personal
                      </NavLink>
                    </li>

                    <li className="w-full">
                      <button
                        onClick={handleClickLogout}
                        className="block w-full  cursor-pointer p-2 text-left rounded-full hover:bg-gray-300 transition-colors"
                      >
                        Log out
                      </button>
                    </li>
                  </ul>
                </div>
              )}
            </div>
          ) : (
            <div className="flex items-center pl-4 h-5 align-self: center">
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
          )}
        </div>
      </nav>
    </>
  );
}

export default Navbar;
