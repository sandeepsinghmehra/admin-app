import { connectToDatabase } from "@/dbConfig/dbConfig";
import Order from "@/models/Order";
import { NextResponse } from "next/server";
const querystring = require('querystring');

connectToDatabase();

export async function POST(
    req: Request, 
) {
    console.log("paytm callback");
    const responseData = await req.text();
    // Parse the URL-encoded data and convert it to an object
    const body = querystring.parse(responseData);
    const stringifyBody = JSON.stringify(body)
    try {
        
        // validate the paytm checksum -- [Pending]

        // Update status into Orders tables after checking the transaction status
        await Order.findOneAndUpdate({_id: body.ORDERID}, {paymentInfo: stringifyBody, status: 'Paid', isPaid: true,});

        // Initiate the shipping
        // Redirect user to the order confirmation page
        return NextResponse.redirect(`${process.env.NEXT_PUBLIC_CLIENT_HOST_URI}/order`, { status: 301 }); // Replace with your actual confirmation page URL
    } catch (error) {
        console.log("[POSTTRANSACTION_POST]: ", error);
        return new NextResponse("Internal Error", { status: 500 });
    }
}