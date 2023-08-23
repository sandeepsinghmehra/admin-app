import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs";

import Store from "@/models/Store";
import { connectToDatabase } from "@/dbConfig/dbConfig";
import Product from "@/models/Product";
import Image from "@/models/Image";

connectToDatabase();
export async function GET(
    req: Request, 
    {params}: {params: { productId: string;}}
) {
    try {
        if(!params.productId) {
            return new NextResponse("Product id is required", { status: 400 })
        }
        let product = await Product.findOne({
                _id: params.productId,
            })
            .populate('images')
            .populate('categoryId')
            .populate('sizeId')
            .populate('colorId');
        return NextResponse.json(product);
    } catch (error) {
        console.log("[PRODUCT_GET]: ", error);
        return new NextResponse("Internal Error", { status: 500 })
    }
}

export async function PATCH(
    req: Request, 
    {params}: {params: {storeId: string, productId: string}}
) {
    try {
        const {userId} = auth();
        const body = await req.json();
        const { 
            name,
            description,
            price,
            availableQuantity,
            categoryId,
            colorId,
            sizeId,
            images,
            isFeatured,
            isFavourite,
            isArchived
        } = body;
        if(!userId) {
            return new NextResponse("Unauthenticated", {status: 401 })
        }
        if(!name) {
            return new NextResponse("Name is required", { status: 400 })
        }
        if(!description) {
            return new NextResponse("Description is required", { status: 400 })
        }
        if(!price) {
            return new NextResponse("Price is required", { status: 400 })
        }
        if(!availableQuantity) {
            return new NextResponse("Available Quantity is required", { status: 400 })
        }
        if(!categoryId) {
            return new NextResponse("Category id is required", { status: 400 })
        }
        if(!colorId) {
            return new NextResponse("Color id is required", { status: 400 })
        }
        if(!sizeId) {
            return new NextResponse("Size id is required", { status: 400 })
        }
        if(!images || !images.length) {
            return new NextResponse("Images are required", { status: 400 })
        }
        if(!params.storeId) {
            return new NextResponse("Store id is required", { status: 400 })
        }
        if(!params.productId) {
            return new NextResponse("Product id is required", { status: 400 })
        }
        const storeByuserId = await Store.findOne({
            $and: [{ _id: params.storeId }, { userId: userId }],
        });
        if(!storeByuserId) {
            return new NextResponse("Unauthorized", {status: 403 })
        }
          // Update the product's main fields
        await Product.updateOne({ _id: params.productId }, {
            name,
            description,
            price,
            availableQuantity: Number(availableQuantity),
            categoryId,
            colorId,
            sizeId,
            isFeatured,
            isArchived,
            isFavourite,
            storeId: params.storeId
          }, { new: true });

        // Delete existing images (if needed)
        await Product.updateOne({ _id: params.productId }, { $unset: { images: 1 } });

        // Add new images
        const newImages = await Promise.all(images.map((image:any) => Image.create({ url: image.url })));
        const updatedProduct = await Product.updateOne({ _id: params.productId }, { $set: { images: newImages.map(image => image._id), } });

        return NextResponse.json(updatedProduct);
    } catch (error) {
        console.log("[PRODUCT_PATCH]: ", error);
        return new NextResponse("Internal Error", { status: 500 })
    }
}

export async function DELETE(
    req: Request, 
    {params}: {params: {storeId: string; productId: string;}}
) {
    try {
        const {userId} = auth();
        if(!userId) {
            return new NextResponse("Unauthenticated", {status: 401 })
        }
        
        if(!params.storeId) {
            return new NextResponse("Store id is required", { status: 400 })
        }

        if(!params.productId) {
            return new NextResponse("Product id is required", { status: 400 })
        }
        const storeByuserId = await Store.findOne({
            $and: [{ _id: params.storeId }, { userId: userId }],
        });
        if(!storeByuserId) {
            return new NextResponse("Unauthorized", {status: 403 })
        }
        const deletedProduct = await Product.findByIdAndDelete(
            {
                _id: params.productId,
            },
        );
        return NextResponse.json(deletedProduct);
    } catch (error) {
        console.log("[PRODUCT_DELETE]: ", error);
        return new NextResponse("Internal Error", { status: 500 })
    }
}