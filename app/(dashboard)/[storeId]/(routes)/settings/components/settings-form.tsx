"use client"

import * as z from "zod";
import { Trash } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { toast } from "react-hot-toast";
import axios from "axios";
import { useParams, useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import { Heading } from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";
import { 
    Form, 
    FormControl, 
    FormField, 
    FormItem, 
    FormLabel, 
    FormMessage 
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { AlertModal } from "@/components/modals/alert-modal";


interface SettingsFormProps {
    initialData: StoreType;
}

const formSchema = z.object({
    name: z.string().min(3),
});

type SettingsFormValues = z.infer<typeof formSchema>;

const SettingsForm: React.FC<SettingsFormProps> = ({initialData}) => {
    const router = useRouter();
    const params = useParams();
    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(false);

    const form = useForm<SettingsFormValues>({
        resolver: zodResolver(formSchema),
        defaultValues: initialData
    });

    const onSubmit = async (data: SettingsFormValues) => {
        console.log("setting components", data);
        try {
            setLoading(true);
            const response = await axios.patch(`/api/stores/${params.storeId}`, data);
            // console.log("data", response.data); 
            router.refresh();
            toast.success("Store updated.")
        } catch (error) {
            console.log("error", error);
            toast.error("Something went wrong.")
        } finally {
            setLoading(false)
        }
    }
    const onDelete = async () => {
        try {
            setLoading(true);
            await axios.delete(`/api/stores/${params.storeId}`);
            router.refresh();
            router.push("/");
            toast.success("Store deleted.")
        } catch (error) {
            console.log("error", error);
            toast.error("Make sure you removed all products and categories first.")
        } finally {
            setLoading(false);
            setOpen(false);
        }
    }
    return (
        <>
            <AlertModal 
                isOpen={open}
                loading={loading}
                onClose={() => setOpen(false) }
                onConfirm={onDelete}
            />
            <div className="flex items-center justify-between">
                <Heading 
                    title={"Settings"}
                    description={"Manage store preferences"}
                />
                <Button
                    disabled={loading}
                    variant={'destructive'}
                    size={'sm'}
                    onClick={()=> setOpen(true)}
                >
                    <Trash className="w-4 h-4" />
                </Button>
            </div>
            <Separator />
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 w-full">
                    <div className="grid grid-cols-3 gap-8">
                        <FormField 
                            control={form.control}
                            name="name"
                            render={({field})=>(
                                <FormItem>
                                    <FormLabel>Name</FormLabel>
                                    <FormControl>
                                        <Input disabled={loading} placeholder="Store name" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>
                    <Button disabled={loading} className="ml-auto" type="submit">
                        Save Changes
                    </Button>
                </form>
            </Form>
        </>
    )
}
export default SettingsForm;