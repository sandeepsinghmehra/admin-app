import { NextResponse } from 'next/server';

import { connectToDatabase } from '@/dbConfig/dbConfig';
import { auth } from '@clerk/nextjs';
import Store from '@/models/Store';

connectToDatabase();
export async function POST(req: Request) {
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

        const createdStore = await Store.create({
            name,
            userId
        })
        return NextResponse.json(createdStore)
    } catch (error) {
        console.log("[STORES_POST]: ", error);
        return new NextResponse("Internal Error", { status: 500 })
    }
}
