import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs";

import Store from "@/models/Store";
import { connectToDatabase } from "@/dbConfig/dbConfig";
import Size from "@/models/Size";

connectToDatabase();
export async function GET(
    req: Request, 
    {params}: {params: { sizeId: string;}}
) {
    try {
        if(!params.sizeId) {
            return new NextResponse("Size id is required", { status: 400 })
        }
        const size = await Size.find(
            {
                _id: params.sizeId,
            },
        );
        return NextResponse.json(size);
    } catch (error) {
        console.log("[SIZE_GET]: ", error);
        return new NextResponse("Internal Error", { status: 500 })
    }
}

export async function PATCH(
    req: Request, 
    {params}: {params: {storeId: string, sizeId: string}}
) {
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
            return new NextResponse("Store id is required", { status: 400 })
        }
        if(!params.sizeId) {
            return new NextResponse("Size id is required", { status: 400 })
        }
        const storeByuserId = await Store.findOne({
            $and: [{ _id: params.storeId }, { userId: userId }],
        });
        if(!storeByuserId) {
            return new NextResponse("Unauthorized", {status: 403 })
        }
        const updatedSize = await Size.findByIdAndUpdate(
            {
                _id: params.sizeId,
            },
            { $set: { name: name, value: value, storeId: params.storeId } },
            { new: true }
        );
        return NextResponse.json(updatedSize);
    } catch (error) {
        console.log("[SIZE_PATCH]: ", error);
        return new NextResponse("Internal Error", { status: 500 })
    }
}

export async function DELETE(
    req: Request, 
    {params}: {params: {storeId: string; sizeId: string;}}
) {
    try {
        const {userId} = auth();
        if(!userId) {
            return new NextResponse("Unauthenticated", {status: 401 })
        }
        
        if(!params.storeId) {
            return new NextResponse("Store id is required", { status: 400 })
        }

        if(!params.sizeId) {
            return new NextResponse("Size id is required", { status: 400 })
        }
        const storeByuserId = await Store.findOne({
            $and: [{ _id: params.storeId }, { userId: userId }],
        });
        if(!storeByuserId) {
            return new NextResponse("Unauthorized", {status: 403 })
        }
        const deletedSize = await Size.findByIdAndDelete(
            {
                _id: params.sizeId,
            },
        );
        return NextResponse.json(deletedSize);
    } catch (error) {
        console.log("[SIZE_DELETE]: ", error);
        return new NextResponse("Internal Error", { status: 500 })
    }
}