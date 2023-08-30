
import { format } from "date-fns";

import { OrderItemsColumn} from "./components/columns";
import { OrderClient } from "./components/client";
import Order from "@/models/Order";

const OrderPage = async({params}: {params: { storeId: string, orderId: string }}) => {
    const order:any = await Order.findOne({ storeId: params.storeId, _id:  params.orderId})
    .populate({
        path: 'orderItems',
        populate: [
            { path: 'productId',},
            { path: 'size',},
            { path: 'color',},
        ]
    })
    .sort({ createdAt: 'desc' });
    
    const formattedOrderItems: OrderItemsColumn[] = order.orderItems.map((orderItem:any)=>{
        return ({
            id: "#"+orderItem._id.toString(),
            name: orderItem.name,
            quantity: orderItem.quantity,
            price: orderItem.price,
            size: orderItem.size.name,
            color: orderItem.color.name,
            productId: "#"+orderItem.productId._id,
            createdAt: format(orderItem.createdAt as Date, "MMMM do, yyyy")
        })
    });
    return (
        <div className="flex-col">
            <div className="flex-1 space-y-4 p-8 pt-6">
                <OrderClient data={JSON.parse(JSON.stringify(formattedOrderItems))} />
            </div>
        </div>
    )
}
export default OrderPage;