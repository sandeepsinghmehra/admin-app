
import { format } from "date-fns";

import { SizeColumn } from "./components/columns";
import { SizesClient } from "./components/client";
import Size from "@/models/Size";

const SizesPage = async({params}: {params: { storeId: string }}) => {
    const sizes = await Size.find({
        storeId: params.storeId
    }).sort({ createdAt: 'desc' });

    const formattedSizes: SizeColumn[] = sizes.map((size)=>({
        id: size._id.toString(),
        name: size.name,
        value: size.value,
        createdAt: format(size.createdAt as Date, "MMMM do, yyyy")
    }))
    return (
        <div className="flex-col">
            <div className="flex-1 space-y-4 p-8 pt-6">
                <SizesClient data={JSON.parse(JSON.stringify(formattedSizes))} />
            </div>
        </div>
    )
}
export default SizesPage;