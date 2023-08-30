"use client"

import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import {  Eye } from "lucide-react";

import { Button } from "@/components/ui/button";
import { OrdersColumn } from "./columns";



interface CellActionProps {
    data: OrdersColumn;
}
export const CellAction: React.FC<CellActionProps> = ({data}) => {
    const router = useRouter();
    const params = useParams();

    return (
        <>
            <Button size={'icon'} variant={'outline'} onClick={() => router.push(`/${params.storeId}/orders/${data.id.slice(1)}`)}>
                <Eye className="w-4 h-4" />
            </Button>
        </>
    );
}