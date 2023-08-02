"use client"

import { Plus } from "lucide-react"
import { useParams, useRouter } from "next/navigation"

import { Button } from "@/components/ui/button"
import { Heading } from "@/components/ui/heading"
import { Separator } from "@/components/ui/separator"
import { ProductsColumn, columns } from "./columns"
import { DataTable } from "@/components/ui/data-table"
import { ApiList } from "@/components/ui/api-list"

interface ProductsClientProps {
    data: ProductsColumn[]
}
export const ProductsClient: React.FC<ProductsClientProps> = ({data}) => {
    const params = useParams();
    const router = useRouter();

    return (
        <>
            <div className="flex items-center justify-between">
                <Heading 
                    title={`Products (${data.length})`}
                    description="Manage products for your store"
                />
                <Button onClick={() => router.push(`/${params.storeId}/products/new`)}>
                    <Plus className="mr-2 h-4 w-4" />
                    Add New
                </Button>
            </div>
            <Separator />
            <DataTable 
                columns={columns}
                data={data}
                searchKey={"name"}
            />
            <Heading 
                title="API"
                description="API calls for Products"
            />
            <Separator />
            <ApiList entityIdName="productId" entityName="products"/>
        </>
    )
}