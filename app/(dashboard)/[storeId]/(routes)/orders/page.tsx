
import { format } from "date-fns";

import { OrdersColumn } from "./components/columns";
import { OrdersClient } from "./components/client";
import Order from "@/models/Order";
import { formatter } from "@/lib/utils";

const OrdersPage = async({params}: {params: { storeId: string }}) => {
    const orders = await Order.find({ storeId: params.storeId })
    .populate({
        path: 'orderItems',
        populate: {
            path: 'productId',
        },
    })
    .sort({ createdAt: 'desc' });
    
    const formattedOrders: OrdersColumn[] = orders.map((order)=>{
        console.log("orders", order.orderItems);
        return ({
            id: "#"+order._id.toString(),
            status: order.status,
            phone: order.phone,
            address: order.address,
            products: order?.orderItems?.map((orderItem:any) => orderItem.name).join(", "),
            totalPrice: formatter.format(order.orderItems.reduce((total, orderItem) => {
                return total + Number(orderItem.productId.price)
            }, 0)),
            createdAt: format(order.createdAt as Date, "MMMM do, yyyy")
        })
    });
    return (
        <div className="flex-col">
            <div className="flex-1 space-y-4 p-8 pt-6">
                <OrdersClient data={JSON.parse(JSON.stringify(formattedOrders))} />
            </div>
        </div>
    )
}
export default OrdersPage;