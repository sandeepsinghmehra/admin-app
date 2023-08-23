import { NextResponse } from 'next/server';

import { connectToDatabase } from '@/dbConfig/dbConfig';
import User from '@/models/User';

connectToDatabase();
export async function POST(req: Request) {
    try {
        const body = await req.json();
        const { email, name, password } = body;
        if(!name) {
            return new NextResponse("Name is required", { status: 400 })
        }
        if(!email) {
            return new NextResponse("Email is required", { status: 400 })
        }
        if(!password) {
            return new NextResponse("Password is required", { status: 400 })
        }
        const createdStore = await User.create({
            email, 
            name,
            password
        })
        return NextResponse.json(createdStore)
    } catch (error) {
        console.log("[SIGNUP_POST]: ", error);
        return new NextResponse("Internal Error", { status: 500 })
    }
}
