"use client"

import * as z from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { useState } from 'react'
import axios from 'axios'

import { useStoreModal } from "@/hooks/use-store-modal"
import { Modal } from "@/components/ui/modal"
import { 
    Form, 
    FormControl, 
    FormField, 
    FormItem, 
    FormLabel,
    FormMessage, 
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { toast } from 'react-hot-toast'



const formSchema = z.object({
    name: z.string().min(2),
})

export const StoreModal = () => {
    const storeModal = useStoreModal();
    const [ loading, setLoading ] = useState(false);
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
        }
    });

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        console.log("form submit values: ", values);
        //TODO create store
        try {
            setLoading(true);
            const response = await axios.post('/api/stores', values);
            console.log("data", response.data);
            // toast.success("Store created.")
            window.location.assign(`/${response?.data?._id}`);
        } catch (error) {
            console.log("error", error);
            toast.error("Something went wrong.")
        } finally{
            setLoading(false)
        }
    }

    return (
        <Modal 
            title="Create Store"
            description="Add a new store to manage products and categories"
            isOpen={storeModal.isOpen}
            onClose={storeModal.onClose}
        >
            <div>
                <div className='space-y-4 py-4 pb-4'>
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)}>
                            <FormField 
                                control={form.control}
                                name="name"
                                render={({field})=>(
                                    <FormItem>
                                        <FormLabel>Name</FormLabel>
                                        <FormControl>
                                            <Input 
                                                placeholder='E-commerce'
                                                {...field}
                                                disabled={loading}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <div className='pt-4 space-x-2 flex items-center justify-end w-full'>
                                <Button 
                                    disabled={loading}
                                    variant={'outline'}
                                    onClick={storeModal.onClose} 
                                >Cancel</Button>
                                <Button
                                    type='submit'
                                    disabled={loading}
                                >Continue</Button>
                            </div>
                        </form>
                    </Form>
                </div>
            </div>
        </Modal>
    )
}