import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs";

import Store from "@/models/Store";
import { connectToDatabase } from "@/dbConfig/dbConfig";
import Category from "@/models/Category";

connectToDatabase();
export async function GET(
    req: Request, 
    {params}: {params: { categoryId: string;}}
) {
    try {
        if(!params.categoryId) {
            return new NextResponse("Category id is required", { status: 400 })
        }
        const category = await Category.findOne(
            {
                _id: params.categoryId,
            },
        );
        return NextResponse.json(category);
    } catch (error) {
        console.log("[CATEGORY_GET]: ", error);
        return new NextResponse("Internal Error", { status: 500 })
    }
}

export async function PATCH(
    req: Request, 
    {params}: {params: {storeId: string, categoryId: string}}
) {
    try {
        const {userId} = auth();
        const body = await req.json();
        const { name, billboardId } = body;
        if(!userId) {
            return new NextResponse("Unauthenticated", {status: 401 })
        }
        if(!name) {
            return new NextResponse("Name is required", { status: 400 })
        }
        if(!billboardId) {
            return new NextResponse("Billboard id is required", { status: 400 })
        }
        if(!params.storeId) {
            return new NextResponse("Store id is required", { status: 400 })
        }
        if(!params.categoryId) {
            return new NextResponse("Category id is required", { status: 400 })
        }
        const storeByuserId = await Store.findOne({
            $and: [{ _id: params.storeId }, { userId: userId }],
        });
        if(!storeByuserId) {
            return new NextResponse("Unauthorized", {status: 403 })
        }
        const updatedCategory = await Category.findByIdAndUpdate(
            {
                _id: params.categoryId,
            },
            { $set: { name: name, billboardId: billboardId, storeId: params.storeId } },
            { new: true }
        );
        return NextResponse.json(updatedCategory);
    } catch (error) {
        console.log("[CATEGORY_PATCH]: ", error);
        return new NextResponse("Internal Error", { status: 500 })
    }
}

export async function DELETE(
    req: Request, 
    {params}: {params: {storeId: string; categoryId: string;}}
) {
    try {
        const {userId} = auth();
        if(!userId) {
            return new NextResponse("Unauthenticated", {status: 401 })
        }
        
        if(!params.storeId) {
            return new NextResponse("Store id is required", { status: 400 })
        }

        if(!params.categoryId) {
            return new NextResponse("Category id is required", { status: 400 })
        }
        const storeByuserId = await Store.findOne({
            $and: [{ _id: params.storeId }, { userId: userId }],
        });
        if(!storeByuserId) {
            return new NextResponse("Unauthorized", {status: 403 })
        }
        const deletedCategory = await Category.findByIdAndDelete(
            {
                _id: params.categoryId,
            },
        );
        return NextResponse.json(deletedCategory);
    } catch (error) {
        console.log("[CATEGORY_DELETE]: ", error);
        return new NextResponse("Internal Error", { status: 500 })
    }
}