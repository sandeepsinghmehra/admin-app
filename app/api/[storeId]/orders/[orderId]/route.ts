import { NextResponse } from "next/server";
import { connectToDatabase } from "@/dbConfig/dbConfig";
import Order from "@/models/Order";

connectToDatabase();
export async function GET(
    req: Request, 
    {params}: {params: { orderId: string;}}
) {
    console.log("order Id : ", params.orderId);
    try {
        if(!params.orderId) {
            return new NextResponse("Order id is required", { status: 400 })
        }
        let order = await Order.findOne({
                _id: params.orderId,
            }).populate({
                path: 'orderItems',
                populate: {
                    path: 'color size', // Specify the fields you want to populate
                },
            });
        console.log("order", order);
        return NextResponse.json(order);
    } catch (error) {
        console.log("[ORDER_GET]: ", error);
        return new NextResponse("Internal Error", { status: 500 });
    }
}