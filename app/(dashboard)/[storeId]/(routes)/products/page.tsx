
import { format } from "date-fns";

import { ProductsColumn } from "./components/columns";
import { ProductsClient } from "./components/client";
import Product from "@/models/Product";
import { formatter } from "@/lib/utils";

const ProductsPage = async({params}: {params: { storeId: string }}) => {
    const products = await Product.find({
        storeId: params.storeId
    })
    .populate('categoryId')
    .populate('sizeId')
    .populate('colorId')
    .sort({ createdAt: 'desc' });

    const formattedProducts: ProductsColumn[] = products.map((product)=>({
        id: product._id.toString(),
        name: product.name,
        isFeatured: product.isFeatured,
        isArchived: product.isArchived,
        price: formatter.format(parseFloat(product.price.toString())),
        category: product.categoryId.name,
        size: product.sizeId.name,
        color: product.colorId.value,
        createdAt: format(product.createdAt as Date, "MMMM do, yyyy")
    }))
    return (
        <div className="flex-col">
            <div className="flex-1 space-y-4 p-8 pt-6">
                <ProductsClient data={JSON.parse(JSON.stringify(formattedProducts))} />
            </div>
        </div>
    )
}
export default ProductsPage;