import { auth } from "@clerk/nextjs"
import { redirect } from "next/navigation";

import Store from "@/models/Store";
import SettingsForm from "./components/settings-form";

interface SettingsPageProps {
    params: { storeId: string }
}

const SettingsPage: React.FC<SettingsPageProps> = async({params}) => {
    const { userId } = auth();

    if(!userId) {
        redirect("/sign-in");
    }

    const store = await Store.findOne({
        $and: [{ _id: params.storeId }, { userId: userId }],
    });
    
    if(!store) {
        redirect("/");
    }
    console.log("store", store);
    
    return (
        <div className="flex-col">
            <div className="flex-1 space-y-4 pt-6 p-8">
                <SettingsForm initialData={store} />
            </div>
        </div>
    )
}
export default SettingsPage