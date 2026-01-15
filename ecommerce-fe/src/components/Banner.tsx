import { useNavigate } from "react-router-dom";
import banner from "../assets/banner.jpg";

function Banner() {
  const navigate = useNavigate();
  const handleClickBanner = () => {
    navigate("/products");
  };
  return (
    <>
      <div className="relative">
        <img src={banner} className="w-full" />
        <div className="absolute space-y-4 px-10 inset-0 flex flex-col justify-center">
          <p className=" text-brand-green font-bold">Fruit Fresh</p>
          <p className="font-bold text-5xl">
            Vegetable <br />
            100% Organic
          </p>
          <p className="text-sm text-gray-400">
            Free pickup and Delivery Available
          </p>
          <button
            onClick={handleClickBanner}
            className=" bg-brand-green w-40 h-10 uppercase text-white hover:cursor-pointer font-bold"
          >
            Shop now
          </button>
        </div>
      </div>
    </>
  );
}

export default Banner;
