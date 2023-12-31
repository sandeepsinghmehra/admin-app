import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";
import { connectToDatabase } from "@/dbConfig/dbConfig";
import Store from "@/models/Store";

connectToDatabase();
export async function PATCH(req: Request, {params}: {params: {storeId: string}}) {
    try {
        const {userId} = auth();
        const body = await req.json();
        const { name } = body;
        if(!userId) {
            return new NextResponse("Unauthenticated", {status: 401 })
        }
        if(!name) {
            return new NextResponse("Name is required", { status: 400 })
        }
        if(!params.storeId) {
            return new NextResponse("Store id is required", { status: 400 })
        }
        console.log("updatedStore", name)
        const updatedStore = await Store.findByIdAndUpdate(
            {
                _id: params.storeId,
                userId: userId,
            },
            { $set: { name: name } },
            { new: true }
        );
        return NextResponse.json(updatedStore);
    } catch (error) {
        console.log("[STORE_PATCH]: ", error);
        return new NextResponse("Internal Error", { status: 500 })
    }
}

export async function DELETE(req: Request, {params}: {params: {storeId: string}}) {
    try {
        const {userId} = auth();
        if(!userId) {
            return new NextResponse("Unauthenticated", {status: 401 })
        }
        
        if(!params.storeId) {
            return new NextResponse("Store id is required", { status: 400 })
        }
        const deletedStore = await Store.findByIdAndDelete(
            {
                _id: params.storeId,
                userId: userId,
            },
        );
        return NextResponse.json(deletedStore);
    } catch (error) {
        console.log("[STORE_DELETE]: ", error);
        return new NextResponse("Internal Error", { status: 500 })
    }
}