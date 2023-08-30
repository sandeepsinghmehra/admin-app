"use client"

import { ColumnDef } from "@tanstack/react-table"
import { CellAction } from "./cell-action";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type OrderItemsColumn = {
    id: string;
    name: string;
    quantity: string;
    price: string;
    size: string;
    color: string;
    productId: string;
    createdAt: string;    
}

export const columns: ColumnDef<OrderItemsColumn>[] = [
  {
    accessorKey: "id",
    header: "OrderItem Id",
  },
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "quantity",
    header: "Quantity",
  },
  {
    accessorKey: "size",
    header: "Size",
  },
  {
    accessorKey: "color",
    header: "Color",
  },
  {
    accessorKey: "price",
    header: "Price",
  },
  {
    accessorKey: "productId",
    header: "Product Id",
  },
  {
    accessorKey: "createdAt",
    header: "Date",
  },
]
