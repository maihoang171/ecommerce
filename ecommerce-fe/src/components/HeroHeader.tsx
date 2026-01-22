import { useEffect, useState } from "react";
import { useFetchCategoryList } from "../hooks/use-category";
import { useCategoryStore } from "../stores/useCategoryStore";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBars,
  faChevronDown,
  faPhone,
} from "@fortawesome/free-solid-svg-icons";
import { NavLink, useNavigate } from "react-router-dom";
import { useFetchProductList } from "../hooks/use-product";

function HeroHeader() {
  const [keyword, setKeyword] = useState("");
  const { handleFetchCategoryList } = useFetchCategoryList();
  const categoryList = useCategoryStore((state) => state.categoryList);
  const { handleFetchProductList } = useFetchProductList();
  const navigate = useNavigate()

  const handleSearch = async () => {
    const trimmedKeyword = keyword.trim();
    await handleFetchProductList(trimmedKeyword);
    navigate(`/products?keyword=${encodeURIComponent(trimmedKeyword)}`);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") handleSearch();
  };

  useEffect(() => {
    if (categoryList.length === 0) {
      handleFetchCategoryList();
    }
  }, [categoryList.length, handleFetchCategoryList]);

  return (
    <>
      <div className="flex flex-row justify-between">
        <div className="relative group cursor-pointer w-full md:w-72">
          <div className="bg-brand-green text-white flex items-center justify-between px-6 h-full w-full z-30 relative">
            <div className="flex items-center gap-3">
              <FontAwesomeIcon icon={faBars} />
              <span className="font-bold">All Categories</span>
            </div>
            <FontAwesomeIcon
              icon={faChevronDown}
              className="text-xs transition-transform duration-500 group-hover:rotate-180"
            />
          </div>
          {/* Dropdown category List */}
          <div
            className={`
    absolute left-0 w-full bg-white border-x border-b border-gray-200 z-20 shadow-md
    grid grid-rows-[0fr] transition-[grid-template-rows] duration-500 ease-in-out
    group-hover:grid-rows-[1fr]
  `}
          >
            <ul className="overflow-hidden">
              {categoryList.map((c) => (
                <NavLink key={c.id} to={`/categories/${c.id}`}>
                  <li
                    key={c.id}
                    className="px-6 py-2 hover:text-brand-green hover:bg-gray-50 transition-colors border-b border-gray-50 last:border-none"
                  >
                    {c.name}
                  </li>
                </NavLink>
              ))}
            </ul>
          </div>
        </div>

        <div>
          <label className="">
            <input
              placeholder="What do you need?"
              className="border h-full border-gray-200 min-w-xs p-4 focus:outline-none focus:outline-2 focus:outline-brand-green focus:outline-offset-0"
              value={keyword}
              onChange={(e) => setKeyword(e.target.value)}
              onKeyDown={handleKeyDown}
            />
            <button
              onClick={handleSearch}
              className="bg-brand-green text-white h-full px-6 uppercase hover:cursor-pointer"
            >
              Search
            </button>
          </label>
        </div>

        <a
          href="tel:+6511188888"
          className="flex flex-row items-center gap-4 cursor-pointer group"
        >
          <FontAwesomeIcon icon={faPhone} className="text-brand-green" />
          <div>
            <span className="font-bold">+65 11.188.888</span>
            <p className="text-gray-400 text-xs">support 24/7 time</p>
          </div>
        </a>
      </div>
    </>
  );
}
export default HeroHeader;
