

import BillboardForm from './components/category-form';
import { connectToDatabase } from '@/dbConfig/dbConfig';
import Category from '@/models/Category';
import CategoryForm from './components/category-form';
import Billboard from '@/models/Billboard';

connectToDatabase();
const CategoryPage = async({params}: {params: { categoryId: string; storeId: string }}) => {
    let category = null;
    let billboards:any[] = await Billboard.find({storeId: params.storeId});
    if (params.categoryId !== "new") {
        category = await Category.findOne({_id: params.categoryId}); 
    }
    
    return (
        <div className="flex-col">
            <div className="flex-1 space-y-4 p-8 pt-6">
                <CategoryForm 
                    initialData={JSON.parse(JSON.stringify(category))}
                    billboards={JSON.parse(JSON.stringify(billboards))}
                />
            </div>
        </div>
    )
}
export default CategoryPage