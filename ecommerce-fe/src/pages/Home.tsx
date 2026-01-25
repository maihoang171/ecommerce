import { useEffect } from "react";
import { useProductListStore } from "../stores/useProductStore";
import { useFetchProductList } from "../hooks/use-product";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import ProductCart from "../components/ProductCart";
import "swiper/css";
import "swiper/css/pagination";

import Banner from "../components/Banner";
function Home() {
  const { handleFetchSaleProductList } = useFetchProductList();
  const saleProductList = useProductListStore((state) => state.saleProductList);

  useEffect(() => {
    if (saleProductList.length === 0) {
      handleFetchSaleProductList();
    }
  }, []);

  return (
    <>
      <div>
        <section className="flex flex-row">
          <aside className="hidden lg:block lg:w-1/3"></aside>

          <div className="w-full lg:w-3/4">
            <Banner />
          </div>
        </section>

        <section>
          <h2 className="font-bold text-center text-3xl mt-5">Sale Off</h2>

          <Swiper
            modules={[Autoplay, Pagination]}
            spaceBetween={30}
            slidesPerView={4}
            slidesPerGroup={4}
            speed={3000}
            grabCursor={true}
            autoplay={{ delay: 3000 }}
            pagination={{ clickable: true }}
          >
            {saleProductList.map((p) => (
              <SwiperSlide key={p.id} className="pb-10">
                <ProductCart product={p} />
              </SwiperSlide>
            ))}
          </Swiper>
        </section>
      </div>
    </>
  );
}
export default Home;
