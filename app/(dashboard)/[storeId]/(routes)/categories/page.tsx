
import { format } from "date-fns";

import { CategoryColumn } from "./components/columns";
import { CategoryClient } from "./components/client";
import Category from "@/models/Category";
import mongoose from "mongoose";
mongoose.set('strictPopulate', false);

const CategoriesPage = async({params}: {params: { storeId: string }}) => {
    const categories = await Category.find({ 
        storeId: params.storeId 
    })
    .populate('billboardId')
    .sort({ createdAt: 'desc' });
    
    const formattedCategories: CategoryColumn[] = categories.map((category)=>({
        id: category._id.toString(),
        name: category.name,
        billboardLabel: category.billboardId.label,
        createdAt: format(category?.createdAt as Date, "MMMM do, yyyy")
    }));

    return (
        <div className="flex-col">
            <div className="flex-1 space-y-4 p-8 pt-6">
                <CategoryClient data={JSON.parse(JSON.stringify(formattedCategories))} />
            </div>
        </div>
    )
}
export default CategoriesPage;