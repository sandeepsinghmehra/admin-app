
import { format } from "date-fns";

import { ColorColumn } from "./components/columns";
import { ColorsClient} from "./components/client";
import Color from "@/models/Color";

const ColorsPage = async({params}: {params: { storeId: string }}) => {
    const colors = await Color.find({
        storeId: params.storeId
    }).sort({ createdAt: 'desc' });

    const formattedColors: ColorColumn[] = colors.map((color)=>({
        id: color._id.toString(),
        name: color.name,
        value: color.value,
        createdAt: format(color.createdAt as Date, "MMMM do, yyyy")
    }))
    return (
        <div className="flex-col">
            <div className="flex-1 space-y-4 p-8 pt-6">
                <ColorsClient data={JSON.parse(JSON.stringify(formattedColors))} />
            </div>
        </div>
    )
}
export default ColorsPage;