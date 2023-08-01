import { NextResponse } from 'next/server';

import { connectToDatabase } from '@/dbConfig/dbConfig';
import { auth } from '@clerk/nextjs';
import Store from '@/models/Store';
import Color from '@/models/Color';

connectToDatabase();
export async function POST(req: Request, {params}: {params: { storeId: string}}) {
    try {
        const {userId} = auth();
        const body = await req.json();
        const { name, value } = body;
        if(!userId) {
            return new NextResponse("Unauthenticated", {status: 401 })
        }
        if(!name) {
            return new NextResponse("Name is required", { status: 400 })
        }
        if(!value) {
            return new NextResponse("Value is required", { status: 400 })
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
        
        const createdColor = await Color.create({
            name,
            value,
            storeId: params.storeId
        })
        return NextResponse.json(createdColor)
    } catch (error) {
        console.log("[COLORS_POST]: ", error);
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
        
        const colors = await Color.find({
            storeId: params.storeId
        })
        return NextResponse.json(colors)
    } catch (error) {
        console.log("[COLORS_GET]: ", error);
        return new NextResponse("Internal Error", { status: 500 })
    }
}
