"use client"

import { Check, ChevronsUpDown, PlusCircle, Store } from "lucide-react"
import { useParams, useRouter } from "next/navigation"
import { useState } from "react"

import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { useStoreModal } from "@/hooks/use-store-modal"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList, CommandSeparator } from "@/components/ui/command"


type PopoverTriggerProps = React.ComponentPropsWithoutRef<typeof PopoverTrigger>
interface StoreSwitcherProps extends PopoverTriggerProps {
    items: StoreType[]
}
export default function StoreSwitcher({
    className,
    items = []
}: StoreSwitcherProps){
    const StoreModal = useStoreModal();
    const params = useParams();
    const router = useRouter();

    const [open, setOpen] = useState(false);

    const formattedItems = items.map((item)=>({
        label: item.name,
        value: item._id
    }));
    const currentStore = formattedItems.find((item:any)=> item.value === params.storeId );

    const onStoreSelect = (store: {label: string, value: string}) => {
        setOpen(false);
        router.push(`/${store.value}`);
    }
    return (
        <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
                <Button
                    variant={'outline'}
                    size={'sm'}
                    role="combobox"
                    aria-expanded={open}
                    aria-label={'Select a store'}
                    className={cn("w-[200px] justify-between", className)}
                >
                    <Store className="mr-2 h-4 w-4" />
                    {currentStore?.label}
                    <ChevronsUpDown className="ml-auto h-4 w-4 opacity-50 shrink-0"/>
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-[200px] p-0">
                <Command>
                    <CommandList>
                        <CommandInput placeholder="Search store..."/>
                        <CommandEmpty>No store found</CommandEmpty>
                        <CommandGroup heading={"Stores"}>
                            {
                                formattedItems.map((store:any)=>(
                                    <CommandItem
                                        key={store.value}
                                        className="text-sm"
                                        onSelect={()=>onStoreSelect(store)}
                                    >
                                        <Store className="w-4 h-4 mr-4" />
                                        {store.label}
                                        <Check 
                                            className={cn(
                                                "ml-auto w-4 h-4",
                                                currentStore?.value === store.value ? "opacity-100" : "opacity-0" 
                                                )}
                                        />
                                    </CommandItem>
                                ))
                            }
                        </CommandGroup>
                    </CommandList>
                    <CommandSeparator />
                    <CommandList>
                        <CommandGroup>
                            <CommandItem
                                onSelect={()=>{
                                    setOpen(false)
                                    StoreModal.onOpen();
                                }}
                            >
                                <PlusCircle className="mr-2 w-4 h-5" />
                                Create store
                            </CommandItem>
                        </CommandGroup>
                    </CommandList>
                </Command>
            </PopoverContent>
        </Popover>
    )
}