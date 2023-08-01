

import { connectToDatabase } from '@/dbConfig/dbConfig';
import Color from '@/models/Color';
import ColorForm from './components/color-form';

connectToDatabase();
const ColorPage = async({params}: {params: { colorId: string }}) => {
    let color = null;
    if (params.colorId !== "new") {
        color = await Color.findOne({_id: params.colorId});
    }
    
    return (
        <div className="flex-col">
            <div className="flex-1 space-y-4 p-8 pt-6">
                <ColorForm initialData={JSON.parse(JSON.stringify(color))}/>
            </div>
        </div>
    )
}
export default ColorPage