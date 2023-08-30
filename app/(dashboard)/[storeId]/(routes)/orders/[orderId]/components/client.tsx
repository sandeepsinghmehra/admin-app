"use client"

import { Heading } from "@/components/ui/heading"
import { Separator } from "@/components/ui/separator"
import { OrderItemsColumn, columns } from "./columns"
import { DataTable } from "@/components/ui/data-table"

interface OrdersClientProps {
    data: OrderItemsColumn[]
}
export const OrderClient: React.FC<OrdersClientProps> = ({data}) => {
    return (
        <>
            <Heading 
                title={`Order Items (${data.length})`}
                description="Manage order Items for your store"
            />
            <Separator />
            <DataTable 
                columns={columns}
                data={data}
                searchKey={"name"}
            />
        </>
    )
}