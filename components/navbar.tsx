import { UserButton, auth } from "@clerk/nextjs";
import { MainNav } from "@/components/main-nav";
import StoreSwitcher from "@/components/store-switcher";
import { redirect } from "next/navigation";
import Store from "@/models/Store";


const Navbar = async () => {
    const { userId } = auth();

    if(!userId) {
        redirect("/sign-in");
    }

    const stores:StoreType[] | [] = await Store.find({
        userId
    });
    // console.log("stores in navbar: ", stores);
    return (
        <div className="border-b">
            <div className="h-16 flex items-center px-4">
                <StoreSwitcher className="pd-1" items={JSON.parse(JSON.stringify(stores))} />
                <MainNav className="ml-6" />
                <div className="ml-auto flex items-center space-x-4">
                    <UserButton afterSignOutUrl="/" />
                </div>
            </div>
        </div>
    )
}
export default Navbar;