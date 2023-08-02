"use client"

import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { toast } from "react-hot-toast";
import axios from "axios";
import { Copy, Edit, MoreHorizontal, Trash } from "lucide-react";

import { 
    DropdownMenu, 
    DropdownMenuContent, 
    DropdownMenuTrigger,
    DropdownMenuItem,
    DropdownMenuLabel
} from "@/components/ui/dropdown-menu";
import { ProductsColumn } from "./columns";
import { Button } from "@/components/ui/button";
import { AlertModal } from "@/components/modals/alert-modal";



interface CellActionProps {
    data: ProductsColumn;
}
export const CellAction: React.FC<CellActionProps> = ({data}) => {
    const router = useRouter();
    const params = useParams();
    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(false);

    const onCopy = (id: string) => {
        navigator.clipboard.writeText(id);
        toast.success("Product Id copied to the clipboard.");
    }
    const onDelete = async (productId: string) => {
        try {
            setLoading(true);
            await axios.delete(`/api/${params.storeId}/products/${productId}`);
            router.refresh();
            toast.success("Product deleted.");
        } catch (error) {
            console.log("error", error);
            toast.error("Something went wrong.");
        } finally {
            setLoading(false);
            setOpen(false);
        }
    }
    return (
        <>
            <AlertModal
                isOpen={open}
                loading={loading}
                onClose={() => setOpen(false) }
                onConfirm={() => onDelete(data.id)}
            />
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button variant={'ghost'} className="h-8 w-8 p-0">
                        <span className="sr-only">Open menu</span>
                        <MoreHorizontal className="w-4 h-4" />
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                    <DropdownMenuLabel>
                        Actions
                    </DropdownMenuLabel>
                    <DropdownMenuItem onClick={() => onCopy(data.id)}>
                        <Copy className="w-4 h-4 mr-2" />
                        Copy Id
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => router.push(`/${params.storeId}/products/${data.id}`)}>
                        <Edit className="w-4 h-4 mr-2" />
                        Update
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => setOpen(true)}>
                        <Trash className="w-4 h-4 mr-2" />
                        Delete
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        </>
    );
}