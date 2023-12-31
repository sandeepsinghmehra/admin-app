
import Billboard from '@/models/Billboard';
import BillboardForm from './components/billboard-form';
import { connectToDatabase } from '@/dbConfig/dbConfig';

connectToDatabase();
const BillboardPage = async({params}: {params: { billboardId: string }}) => {
    let billboard = null;
    if (params.billboardId !== "new") {
        billboard = await Billboard.findOne({_id: params.billboardId});
    }
    
    return (
        <div className="flex-col">
            <div className="flex-1 space-y-4 p-8 pt-6">
                <BillboardForm initialData={JSON.parse(JSON.stringify(billboard))}/>
            </div>
        </div>
    )
}
export default BillboardPage