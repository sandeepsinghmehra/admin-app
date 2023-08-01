

import { connectToDatabase } from '@/dbConfig/dbConfig';
import Size from '@/models/Size';
import SizeForm from './components/size-form';

connectToDatabase();
const SizePage = async({params}: {params: { sizeId: string }}) => {
    let size = null;
    if (params.sizeId !== "new") {
        size = await Size.findOne({_id: params.sizeId});
    }
    
    return (
        <div className="flex-col">
            <div className="flex-1 space-y-4 p-8 pt-6">
                <SizeForm initialData={JSON.parse(JSON.stringify(size))}/>
            </div>
        </div>
    )
}
export default SizePage