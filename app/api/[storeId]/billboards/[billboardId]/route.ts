import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs";

import Billboard from "@/models/Billboard";
import Store from "@/models/Store";
import { connectToDatabase } from "@/dbConfig/dbConfig";

connectToDatabase();
export async function GET(
    req: Request, 
    {params}: {params: { billboardId: string;}}
) {
    try {
        if(!params.billboardId) {
            return new NextResponse("Billboard id is required", { status: 400 })
        }
        const billboard = await Billboard.findOne(
            {
                _id: params.billboardId,
            },
        );
        return NextResponse.json(billboard);
    } catch (error) {
        console.log("[BILLBOARD_GET]: ", error);
        return new NextResponse("Internal Error", { status: 500 })
    }
}

export async function PATCH(
    req: Request, 
    {params}: {params: {storeId: string, billboardId: string}}
) {
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
            return new NextResponse("Store id is required", { status: 400 })
        }
        if(!params.billboardId) {
            return new NextResponse("Billboard id is required", { status: 400 })
        }
        const storeByuserId = await Store.findOne({
            $and: [{ _id: params.storeId }, { userId: userId }],
        });
        if(!storeByuserId) {
            return new NextResponse("Unauthorized", {status: 403 })
        }
        const updatedBillboard = await Billboard.findByIdAndUpdate(
            {
                _id: params.billboardId,
            },
            { $set: { label: label, imageUrl: imageUrl, storeId: params.storeId } },
            { new: true }
        );
        return NextResponse.json(updatedBillboard);
    } catch (error) {
        console.log("[BILLBOARD_PATCH]: ", error);
        return new NextResponse("Internal Error", { status: 500 })
    }
}

export async function DELETE(
    req: Request, 
    {params}: {params: {storeId: string; billboardId: string;}}
) {
    try {
        const {userId} = auth();
        if(!userId) {
            return new NextResponse("Unauthenticated", {status: 401 })
        }
        
        if(!params.storeId) {
            return new NextResponse("Store id is required", { status: 400 })
        }

        if(!params.billboardId) {
            return new NextResponse("Billboard id is required", { status: 400 })
        }
        const storeByuserId = await Store.findOne({
            $and: [{ _id: params.storeId }, { userId: userId }],
        });
        if(!storeByuserId) {
            return new NextResponse("Unauthorized", {status: 403 })
        }
        const deletedBillboard = await Billboard.findByIdAndDelete(
            {
                _id: params.billboardId,
            },
        );
        return NextResponse.json(deletedBillboard);
    } catch (error) {
        console.log("[BILLBOARD_DELETE]: ", error);
        return new NextResponse("Internal Error", { status: 500 })
    }
}