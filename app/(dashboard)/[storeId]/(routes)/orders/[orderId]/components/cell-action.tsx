"use client"

import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import {  Eye } from "lucide-react";

import { Button } from "@/components/ui/button";
import { OrderItemsColumn } from "./columns";



interface CellActionProps {
    data: OrderItemsColumn;
}
export const CellAction: React.FC<CellActionProps> = ({data}) => {
    const router = useRouter();
    const params = useParams();

    return (
        <>
            <Button size={'icon'} variant={'outline'} onClick={() => router.push(`/${params.storeId}/orders/${data.id}`)}>
                <Eye className="w-4 h-4" />
            </Button>
        </>
    );
}