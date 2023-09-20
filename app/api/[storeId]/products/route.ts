import { NextResponse } from 'next/server';

import { connectToDatabase } from '@/dbConfig/dbConfig';
import { auth } from '@clerk/nextjs';
import Store from '@/models/Store';
import Product from '@/models/Product';
import Image from '@/models/Image';

connectToDatabase();
export async function POST(req: Request, {params}: {params: { storeId: string}}) {
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
            return new NextResponse("Store ID is required", { status: 400 })
        }
        const storeByuserId = await Store.findOne({
            $and: [{ _id: params.storeId }, { userId: userId }],
        });
        if(!storeByuserId) {
            return new NextResponse("Unauthorized", {status: 403 })
        }

        // Assuming `images` is an array of objects with `url` properties
        const newImages = await Promise.all(images.map((image:any) => Image.create({ url: image.url })));
        console.log("Number body", body);
        const createdProduct = await Product.create({
            name,
            description,
            price,
            availableQuantity: Number(availableQuantity),
            categoryId,
            colorId,
            sizeId,
            images: newImages.map(image => image._id),
            isFeatured,
            isArchived,
            isFavourite,
            storeId: params.storeId
        })
        return NextResponse.json(createdProduct)
    } catch (error) {
        console.log("[PRODUCTS_POST]: ", error);
        return new NextResponse("Internal Error", { status: 500 })
    }
}

export async function GET(
    req: Request, 
    {params}: {params: { storeId: string}}
) {
    try {
        const { searchParams } = new URL(req.url);
        const categoryId = searchParams.get("categoryId") || undefined;
        const sizeId = searchParams.get("sizeId") || undefined;
        const colorId = searchParams.get("colorId") || undefined;
        const name = searchParams.get("name") || undefined;
        const isFeatured = searchParams.get("isFeatured");

        if(!params.storeId) {
            return new NextResponse("Store ID is required", { status: 400 })
        }
        const filter:any = {
            storeId: params.storeId,
            isArchived: false,
        };
        
        if (name) {
            //replace all the '%20' value to ''
            name.replaceAll('%20', ' ');
            // Create a case-insensitive regular expression for the name
            const nameRegex = new RegExp(name.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&'), 'i');
            filter.name = nameRegex;
        }
        if (categoryId) {
            filter.categoryId = categoryId;
        }
          
        if (sizeId) {
            filter.sizeId = sizeId;
        }
          
        if (colorId) {
            filter.colorId = colorId;
        }
          
        if (isFeatured) {
            filter.isFeatured = true;
        }

        // console.log("filter: ", filter);
        let products = await Product.find(filter)
        .populate('images')
        .populate('categoryId')
        .populate('sizeId')
        .populate('colorId')
        .sort({ createdAt: 'desc' });

        // console.log("products results: ",products);
        return NextResponse.json(products);
    } catch (error) {
        console.log("[PRODUCTS_GET]: ", error);
        return new NextResponse("Internal Error", { status: 500 })
    }
}
