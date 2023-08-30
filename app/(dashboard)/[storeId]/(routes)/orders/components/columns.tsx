"use client"

import { ColumnDef } from "@tanstack/react-table"
import { CellAction } from "./cell-action";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type OrdersColumn = {
    id: string;
    phone: string;
    address: string;
    status: string;
    products: string;
    totalPrice: string; 
    createdAt: string;    
}

export const columns: ColumnDef<OrdersColumn>[] = [
  {
    accessorKey: "id",
    header: "OrderId",
  },
  {
    accessorKey: "products",
    header: "Products",
  },
  {
    accessorKey: "phone",
    header: "Phone",
  },
  {
    accessorKey: "address",
    header: "Address",
  },
  {
    accessorKey: "totalPrice",
    header: "Total Price",
  },
  {
    accessorKey: "status",
    header: "Payment Status",
  },
  {
    accessorKey: "createdAt",
    header: "Date",
  },
  {
    id: "actions",
    cell: ({row}) => <CellAction data={row.original} />
  }
]
