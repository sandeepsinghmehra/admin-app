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
import ImageUpload from "@/components/ui/image-upload";


interface BillboardFormProps {
    initialData: string;
}

const formSchema = z.object({
    label: z.string().min(3),
    imageUrl: z.string().min(3),
});

type BillboardFormValues = z.infer<typeof formSchema>;

const BillboardForm: React.FC<BillboardFormProps> = ({initialData}) => {
    const parsedInitialData: BillboardType | null = JSON.parse(initialData);
    const router = useRouter();
    const params = useParams();

    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(false);

    const title = parsedInitialData ? "Edit billboard": "Create billboard";
    const description = parsedInitialData ? "Edit a billboard": "Add a new billboard";
    const toastMessage = parsedInitialData ? "Billboard updated.": "Billboard created.";
    const action = parsedInitialData ? "Save changes": "Create";
    const form = useForm<BillboardFormValues>({
        resolver: zodResolver(formSchema),
        defaultValues: parsedInitialData || {
            label: '',
            imageUrl: ''
        }
    });

    const onSubmit = async (data: BillboardFormValues) => {
        console.log("setting components", data);
        try {
            setLoading(true);
            if(parsedInitialData) {
                await axios.patch(`/api/${params.storeId}/billboards/${params.billboardId}`, data);
            } else {
                await axios.post(`/api/${params.storeId}/billboards`, data);
            }
            
            // console.log("data", response.data); 
            router.refresh();
            router.push(`/${params.storeId}/billboards`)
            toast.success(toastMessage);
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
            await axios.delete(`/api/${params.storeId}/billboards/${params.billboardId}`);
            router.refresh();
            router.push(`${params.storeId}/billboards`);
            toast.success("Billboard deleted.")
        } catch (error) {
            console.log("error", error);
            toast.error("Make sure you removed all categories using this billboard first.")
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
                    title={title}
                    description={description}
                />
                {parsedInitialData && (
                    <Button
                        disabled={loading}
                        variant={'destructive'}
                        size={'sm'}
                        onClick={()=> setOpen(true)}
                    >
                        <Trash className="w-4 h-4" />
                    </Button>
                )}
                
            </div>
            <Separator />
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 w-full">
                    <FormField 
                        control={form.control}
                        name="imageUrl"
                        render={({field})=>(
                            <FormItem>
                                <FormLabel>Background Image</FormLabel>
                                <FormControl>
                                    <ImageUpload 
                                        disabled={loading}
                                        value={field.value ? [field.value] : []}
                                        onChange={(url)=>field.onChange(url)}
                                        onRemove={()=>field.onChange("")}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <div className="grid grid-cols-3 gap-8">
                        <FormField 
                            control={form.control}
                            name="label"
                            render={({field})=>(
                                <FormItem>
                                    <FormLabel>Label</FormLabel>
                                    <FormControl>
                                        <Input disabled={loading} placeholder="Billboard label" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>
                    <Button disabled={loading} className="ml-auto" type="submit">
                        {action}
                    </Button>
                </form>
            </Form>
        </>
    )
}
export default BillboardForm;