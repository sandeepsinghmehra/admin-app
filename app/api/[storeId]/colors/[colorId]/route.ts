import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs";

import Store from "@/models/Store";
import { connectToDatabase } from "@/dbConfig/dbConfig";
import Color from "@/models/Color";

connectToDatabase();
export async function GET(
    req: Request, 
    {params}: {params: { colorId: string;}}
) {
    try {
        if(!params.colorId) {
            return new NextResponse("Color id is required", { status: 400 })
        }
        const color = await Color.find(
            {
                _id: params.colorId,
            },
        );
        return NextResponse.json(color);
    } catch (error) {
        console.log("[COLOR_GET]: ", error);
        return new NextResponse("Internal Error", { status: 500 })
    }
}

export async function PATCH(
    req: Request, 
    {params}: {params: {storeId: string, colorId: string}}
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
        if(!params.colorId) {
            return new NextResponse("Color id is required", { status: 400 })
        }
        const storeByuserId = await Store.findOne({
            $and: [{ _id: params.storeId }, { userId: userId }],
        });
        if(!storeByuserId) {
            return new NextResponse("Unauthorized", {status: 403 })
        }
        const updatedColor = await Color.findByIdAndUpdate(
            {
                _id: params.colorId,
            },
            { $set: { name: name, value: value, storeId: params.storeId } },
            { new: true }
        );
        return NextResponse.json(updatedColor);
    } catch (error) {
        console.log("[COLOR_PATCH]: ", error);
        return new NextResponse("Internal Error", { status: 500 })
    }
}

export async function DELETE(
    req: Request, 
    {params}: {params: {storeId: string; colorId: string;}}
) {
    try {
        const {userId} = auth();
        if(!userId) {
            return new NextResponse("Unauthenticated", {status: 401 })
        }
        
        if(!params.storeId) {
            return new NextResponse("Store id is required", { status: 400 })
        }

        if(!params.colorId) {
            return new NextResponse("Color id is required", { status: 400 })
        }
        const storeByuserId = await Store.findOne({
            $and: [{ _id: params.storeId }, { userId: userId }],
        });
        if(!storeByuserId) {
            return new NextResponse("Unauthorized", {status: 403 })
        }
        const deletedColor = await Color.findByIdAndDelete(
            {
                _id: params.colorId,
            },
        );
        return NextResponse.json(deletedColor);
    } catch (error) {
        console.log("[COLOR_DELETE]: ", error);
        return new NextResponse("Internal Error", { status: 500 })
    }
}