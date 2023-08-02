
import ProductForm from './components/product-form';
import { connectToDatabase } from '@/dbConfig/dbConfig';
import Category from '@/models/Category';
import Color from '@/models/Color';
import Product from '@/models/Product';
import Size from '@/models/Size';

connectToDatabase();
const ProductPage = async({params}: {params: { productId: string; storeId: string }}) => {
    let product = null;
    if (params.productId !== "new") {
        product = await Product.findOne({_id: params.productId}).populate('images');
    }
    const categories = await Category.find({storeId: params.storeId});
    const sizes = await Size.find({storeId: params.storeId});
    const colors = await Color.find({storeId: params.storeId});

    return (
        <div className="flex-col">
            <div className="flex-1 space-y-4 p-8 pt-6">
                <ProductForm 
                    initialData={JSON.parse(JSON.stringify(product))}
                    categories={JSON.parse(JSON.stringify(categories))}
                    sizes={JSON.parse(JSON.stringify(sizes))}
                    colors={JSON.parse(JSON.stringify(colors))}
                />
            </div>
        </div>
    )
}
export default ProductPage