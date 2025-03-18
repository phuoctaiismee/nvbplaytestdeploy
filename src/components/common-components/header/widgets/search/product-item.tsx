import Image from "@/components/base-components/images/image";
import { Product } from "@/services/products/type";
import { FormatCurrency } from "@/utilities/text";
import Link from "next/link";

type ProductProps = Product & {
  onClick?: () => void;
};

const ProductItems = ({ ...rest }: ProductProps) => {
    const variant = rest.variants[0];
    const isSale = variant.calculated_price.calculated_price.price_list_type === "sale"
    const salePrice = variant.calculated_price.calculated_amount;
    const originalPrice = variant.calculated_price.original_amount;
    const discountedAmount = originalPrice - salePrice;
    const percentSale = (discountedAmount / originalPrice) * 100;

  return (
    <Link
      href={`/products/${rest.handle}`}
      className="flex items-center gap-2 hover:bg-gray-100 p-2 rounded-md"
      onClick={rest.onClick}
    >
      <div className="aspect-square size-20">
        <Image src={rest.thumbnail ? rest.thumbnail : undefined} />
      </div>
      <div className="flex flex-col gap-1">
        <p className="text-sm font-medium">{rest.title}</p>
        <p className="text-sm font-semibold">{FormatCurrency(originalPrice)}</p>
        {isSale && (
          <p className="text-sm text-muted-foreground  flex items-center gap-2">
            <span className="line-through">{FormatCurrency(salePrice)}</span>
            <span className="text-xs px-1.5 py-0.5 bg-red-100 text-primary rounded-md">
              -{percentSale.toFixed(0)}%
            </span>
          </p>
        )}
      </div>
    </Link>
  );
};

export default ProductItems;
