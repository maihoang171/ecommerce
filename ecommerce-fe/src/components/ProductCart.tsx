import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import type { IProduct } from "../services/product";
import { faShoppingCart } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import { useCategoryStore } from "../stores/useCategoryStore";

interface ProductCartProps {
  product: IProduct;
  onAddToCart?: (product: IProduct) => void;
}

function ProductCart({ product, onAddToCart }: ProductCartProps) {
  const categoryList = useCategoryStore((state) => state.categoryList);
  const categoryName = categoryList.find(
    (c) => product.categoryId === c.id
  )?.name;
  const isSale =
    product.discountPrice > 0 &&
    Number(product.discountPrice) < Number(product.price);
  const discountPercent = isSale
    ? Math.round(
        ((product.price - product.discountPrice) / product.price) * 100
      )
    : 0;

  return (
    <>
      <Link to={`/products/${product.id}`} className="group block">
        <div className="relative overflow-hidden bg-gray-100">
          {isSale && (
            <div className="absolute top-5 left-5 bg-red-600 w-10 h-10 rounded-full flex justify-center items-center text-xs text-white">
              -{discountPercent}%
            </div>
          )}

          <img
            src={product.imageUrl}
            alt={product.name}
            className="w-full h-full p-16"
          />
          <div className="absolute -bottom-12.5 group-hover:bottom-5 transition-all duration-300  w-full flex justify-center">
            <div className="flex items-center object-contain bg-white justify-center border w-10 h-10 rounded-full border-gray-200 transition-transform duration-500 hover:rotate-360 hover:bg-brand-green hover:text-white">
              <button
                className="cursor-pointer"
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  onAddToCart?.(product);
                }}
              >
                <FontAwesomeIcon icon={faShoppingCart} />
              </button>
            </div>
          </div>
        </div>
        <div className="text-center mt-4">
          {isSale && categoryName && (
            <h4 className="text-gray-300 text-sm">{categoryName}</h4>
          )}
          <h3 className="font-medium text-gray-700 group-hover:text-brand-green transition-colors">
            {product.name}
          </h3>
          <div>
            {isSale ? (
              <>
                <span className="font-bold text-lg text-gray-900 pr-4">
                  ${Number(product.discountPrice).toFixed(2)}
                </span>
                <span className="text-sm text-gray-400 line-through">
                  ${Number(product.price).toFixed(2)}
                </span>
              </>
            ) : (
              <span className="font-bold text-lg text-gray-900">
                ${Number(product.price).toFixed(2)}
              </span>
            )}
          </div>
        </div>
      </Link>
    </>
  );
}

export default ProductCart;
