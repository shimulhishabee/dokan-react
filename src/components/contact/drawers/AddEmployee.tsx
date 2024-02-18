import React from 'react'
import Image from 'next/image'
import { Input } from "@/components/ui/input"
import { Button } from '@/components/ui/button'
import { DrawerFooter } from '@/components/common/Drawer'
import { useContactStore } from '@/stores/useContactStore'
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"

const formSchema = z.object({
    name: z.string().min(2, {
        message: "Name must be at least 2 characters.",
    }),
    number: z.string().max(11).min(11, {
        message: "Number must be 11 characters.",
    }),
    address: z.string(),
    email: z.string(),
    salary: z.string()
})

const AddEmployee = () => {
    const closeDrawer = useContactStore((state) => state.setContactDrawerState)

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
            number: '',
            address: '',
            email: '',
            salary: ''
        },
    })

    function onSubmit(data: z.infer<typeof formSchema>) {
        // closeDrawer({ open: false })
        console.log("data------------", data)
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-space12">

                <div className="flex flex-col items-center justify-center gap-space16 py-space8">
                    <label className="space-y-space12 cursor-pointer">
                        <input type="file" className="hidden" />
                        <Image src={`/images/add_user.svg`} alt='' height={100} width={100} />

                        <p className="text-blue-600 font-medium text-center">Add Photo</p>
                    </label>
                </div>

                <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Employee Name <span className="text-error-100">*</span> </FormLabel>
                            <FormControl>
                                <Input placeholder="Employee Name" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="number"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Phone Number <span className="text-error-100">*</span> </FormLabel>
                            <FormControl>
                                <Input type='number' placeholder="Phone Number" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="address"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Address</FormLabel>
                            <FormControl>
                                <Input placeholder="Address" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Email</FormLabel>
                            <FormControl>
                                <Input placeholder="Email" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="salary"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Salary (Monthly) </FormLabel>
                            <FormControl>
                                <Input placeholder="Salary (Monthly)" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <DrawerFooter>
                    <Button type="submit" className='w-full'>Save</Button>
                </DrawerFooter>
            </form>
        </Form>
    )
}

export default AddEmployee