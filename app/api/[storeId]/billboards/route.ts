import { NextResponse } from 'next/server';

import { connectToDatabase } from '@/dbConfig/dbConfig';
import { auth } from '@clerk/nextjs';
import Billboard from '@/models/Billboard';
import Store from '@/models/Store';

connectToDatabase();
export async function POST(req: Request, {params}: {params: { storeId: string}}) {
    try {
        const {userId} = auth();
        const body = await req.json();
        const { label, imageUrl } = body;
        if(!userId) {
            return new NextResponse("Unauthenticated", {status: 401 })
        }
        if(!label) {
            return new NextResponse("Label is required", { status: 400 })
        }
        if(!imageUrl) {
            return new NextResponse("Image URL is required", { status: 400 })
        }
        if(!params.storeId) {
            return new NextResponse("Store ID is required", { status: 400 })
        }
        console.log("params.storeId in post: ", params.storeId);
        const storeByuserId = await Store.findOne({
            $and: [{ _id: params.storeId }, { userId: userId }],
        });
        if(!storeByuserId) {
            return new NextResponse("Unauthorized", {status: 403 })
        }
        console.log("storeByuserId in post: ", storeByuserId);
        const createdBillboard = await Billboard.create({
            label,
            imageUrl,
            storeId: params.storeId
        })
        return NextResponse.json(createdBillboard)
    } catch (error) {
        console.log("[BILLBOARD_POST]: ", error);
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
        
        const Billboards = await Billboard.find({
            storeId: params.storeId
        })
        return NextResponse.json(Billboards)
    } catch (error) {
        console.log("[BILLBOARD_GET]: ", error);
        return new NextResponse("Internal Error", { status: 500 })
    }
}
