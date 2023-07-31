import { redirect } from "next/navigation";

import { auth } from "@clerk/nextjs";
import Store from "@/models/Store";

export default async function SetupLayout({
    children,
}: {
    children: React.ReactNode
}) {
    const { userId } = auth();
    if(!userId) {
        redirect('/sign-in');
    }
    // console.log("userId", userId);
    const store:any = await Store.findOne({
        userId: userId
    });
    // console.log("stroe", store);
    if(store){
        redirect(`/${store?._id}`)
    }
    return (
        <>
            {children}
        </>
    )
  }
  