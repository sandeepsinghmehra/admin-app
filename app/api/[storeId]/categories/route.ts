import { NextResponse } from 'next/server';

import { connectToDatabase } from '@/dbConfig/dbConfig';
import { auth } from '@clerk/nextjs';
import Store from '@/models/Store';
import Category from '@/models/Category';

connectToDatabase();
export async function POST(req: Request, {params}: {params: { storeId: string}}) {
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
            return new NextResponse("Billboard Id is required", { status: 400 })
        }
        if(!params.storeId) {
            return new NextResponse("Store ID is required", { status: 400 })
        }
        const storeByuserId = await Store.findOne({
            $and: [{ _id: params.storeId }, { userId: userId }],
        });
        if(!storeByuserId) {
            return new NextResponse("Unauthorized", {status: 403 })
        }
        const createdCategory = await Category.create({
            name,
            billboardId,
            storeId: params.storeId
        })
        return NextResponse.json(createdCategory)
    } catch (error) {
        console.log("[CATEGORIES_POST]: ", error);
        return new NextResponse("Internal Error", { status: 500 })
    }
}

export async function GET(
    req: Request, 
    {params}: {params: { storeId: string}}
) {
    try {
       
        if(!params.storeId) {
            return new NextResponse("Store ID is required", { status: 400 })
        }
        
        const Categories = await Category.find({
            storeId: params.storeId
        })
        return NextResponse.json(Categories)
    } catch (error) {
        console.log("[CATEGORIES_GET]: ", error);
        return new NextResponse("Internal Error", { status: 500 })
    }
}
