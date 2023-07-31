
import { format } from "date-fns";

import Billboard from "@/models/Billboard";
import { BillboardColumn } from "./components/columns";
import { BillboardClient } from "./components/client";

const BillboardsPage = async({params}: {params: { storeId: string }}) => {
    const billboards = await Billboard.find({
        storeId: params.storeId
    }).sort({ createdAt: 'desc' });

    const formattedBillboards: BillboardColumn[] = billboards.map((billboard)=>({
        id: billboard._id.toString(),
        label: billboard.label,
        createdAt: format(billboard?.createdAt as Date, "MMMM do, yyyy")
    }))
    return (
        <div className="flex-col">
            <div className="flex-1 space-y-4 p-8 pt-6">
                <BillboardClient data={JSON.parse(JSON.stringify(formattedBillboards))} />
            </div>
        </div>
    )
}
export default BillboardsPage;