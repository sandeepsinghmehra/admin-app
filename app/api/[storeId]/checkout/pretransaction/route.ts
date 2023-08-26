import { NextResponse } from 'next/server';
const https = require('https');
import { connectToDatabase } from '@/dbConfig/dbConfig';
import Order from '@/models/Order';
import OrderItem from '@/models/OrderItem';
const PaytmChecksum = require("./PaytmChecksum");

connectToDatabase();

const corsHeaders = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type, Authorization",
};
  
export async function OPTIONS() {
    return NextResponse.json({}, { headers: corsHeaders });
}
export async function POST(req: Request, {params}: {params: { storeId: string}}) {
    console.log("post called");
    const body = await req.json();
    // console.log("body", body.cart);
    if(!params.storeId) {
        return new NextResponse("Store ID is required", { status: 400 })
    }
    try {

        //Check if the cart is tempered or [Pending]

        // Check if the product item out of stocks [Pending]

        // Check if the details are valid
         
        // Initiates the order
        // Assuming `orderItems` is an array of objects with `product-name, quantity` properties
        // console.log("cart orderItems", body.cart);
        const orderItems = await Promise.all(body.cart.map((productItem:any) => {
            return OrderItem.create({ 
                productId: productItem._id,
                storeId: params.storeId,
                quantity: productItem.quantity,
                price: productItem.price.$numberDecimal,
                name: productItem.name,
                size: productItem.sizeId._id,
                color: productItem.colorId._id,
                images: productItem.images
            });
        }));
        const createOrder = await  Order.create({
            phone: body.phone,
            address: body.address,
            storeId: params.storeId,
            orderItems: orderItems.map(item => item._id),
        });
        if(!createOrder._id) {
            return new NextResponse("Order ID is required", { status: 400 })
        }
        
        let mid:string = process.env.NEXT_PUBLIC_PAYTM_MID!; // PAYTM Merchant ID
        let mkey:string = process.env.NEXT_PUBLIC_PAYTM_MKEY!; // PAYTM Merchant Key
        let hostUrl: string = process.env.NEXT_PUBLIC_WEBSITE_URI!; // Admin Url
        let paytmParams:any = {};
        paytmParams.body = {
            "requestType": "Payment",
            "mid" : mid,
            "websiteName": "WEBSTAGING",
            "orderId": createOrder._id,
            "callbackUrl": `${hostUrl}api/${params.storeId}/checkout/posttransaction`,
            "txnAmount": {
                "value": body.totalPrice,
                "currency": "INR",
            },
            "userInfo": {
                "custId": body.email,
            },
        };

        // console.log("paytmParams.body", paytmParams.body);
        const checksum = await PaytmChecksum.generateSignature(JSON.stringify(paytmParams.body), mkey);

        paytmParams.head = {
            "signature": checksum
        };

        var post_data = JSON.stringify(paytmParams);
        // console.log("post_data", post_data);
        const requestAsync = () => {
                return new Promise((resolve, rejects) => {
                    var options = {
                        /* for Staging */
                        hostname: 'securegw-stage.paytm.in',
                        /* for Production */
                        // hostname: 'securegw.paytm.in',
                        port: 443,
                        path: `/theia/api/v1/initiateTransaction?mid=${mid}&orderId=${createOrder._id}`,
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                            'Content-Length': post_data.length
                        }
                    };
                    var response = "";
                    var post_req = https.request(options, function(post_res:any) {
                        post_res.on('data', function (chunk:any) {
                            response += chunk;
                        });
        
                        post_res.on('end', function(){
                            resolve(JSON.parse(response).body);
                        });
                    });
                    post_req.write(post_data);
                    post_req.end();
                })
        }
        let paytmRes:any = await requestAsync();
        return NextResponse.json({...paytmRes, orderId: createOrder._id}, { status: 200,  headers: corsHeaders });
    } catch (error) {
        console.log("[CHECKOUT_PRETRANSACTION_POST]: ", error);
        return new NextResponse("Internal Error", { status: 500 });
    }
}
