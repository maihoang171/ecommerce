import ProductCart from "../components/ProductCart"
import { useProductListStore } from "../stores/useProductStore"

function Products () {
    const productList = useProductListStore(state => state.productList)
    return (
        <>
         <section className="flex flex-row">
          <aside className="hidden lg:block lg:w-1/3"></aside>

          <div className="w-full lg:w-3/4 grid grid-cols-4 gap-5">
            {productList.map(p => 
                <ProductCart product={p}/>
            )}
          </div>
        </section>
            
        </>
    )
}

export default Products