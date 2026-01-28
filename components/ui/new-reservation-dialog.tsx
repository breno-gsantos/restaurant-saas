'use client'

import { useState } from "react"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"
import { useForm } from "react-hook-form"
import { AddReservationForm, addReservationSchema } from "@/schemas"
import { zodResolver } from "@hookform/resolvers/zod"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "./input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./select"
import { Textarea } from "./textarea"

export function NewReservationDialog(){
    const [open, setOpen] = useState<boolean>(false);
    
    const form = useForm<AddReservationForm>({
        resolver: zodResolver(addReservationSchema),
        defaultValues: {
            clientName: '',
            phone: '',
            date: '',
            email: '',
            guests: 0,
            note: '' ,
            table: 0,
            time: ''
        }
    })

    const {control, formState, reset, handleSubmit} = form;

    async function onSubmit(values: AddReservationForm){
        console.log(values);
    }

    return(
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button size='sm'>
                    <Plus className="mr-2 size-4" />
                    <span>Nova Reserva</span>
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-125">
                <DialogHeader>
                    <DialogTitle>Nova Reserva</DialogTitle>
                    <DialogDescription>Preencha os dados da reserva. O cliente receberá uma confirmação por WhatsApp.</DialogDescription>
                </DialogHeader>
                <Form {...form}>
                    <form onSubmit={handleSubmit(onSubmit)} className="grid gap-4 py-4">
                        <FormField control={control} name="clientName" render={({field}) => (
                            <FormItem>
                                <FormLabel>Nome do Cliente</FormLabel>
                                <FormControl>
                                    <Input type="text" placeholder="Nome e Sobrenome" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )} />

                        <div className="grid grid-cols-2 gap-4">
                            <FormField control={control} name="phone" render={({field}) => (
                                <FormItem>
                                    <FormLabel>Telefone (Whatsapp)</FormLabel>
                                    <FormControl>
                                        <Input type="text" placeholder="+55 13 99999-0000" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )} />

                            <FormField control={control} name="email" render={({field}) => (
                                <FormItem>
                                    <FormLabel>Email</FormLabel>
                                    <FormControl>
                                        <Input type="email" placeholder="nome@email.com" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )} />
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <FormField control={control} name="date" render={({field}) => (
                                <FormItem>
                                    <FormLabel>Data</FormLabel>
                                    <FormControl>
                                        <Input type="date" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )} />

                            <FormField control={control} name="time" render={({field}) => (
                                <FormItem>
                                    <FormLabel>Horário</FormLabel>
                                    <FormControl>
                                        <Select onValueChange={field.onChange} value={field.value}>
                                            <SelectTrigger>
                                                <SelectValue placeholder='Selecione' />
                                            </SelectTrigger>
                                            <SelectContent>
                                                {["12:00","12:30","13:00","13:30", "19:00","19:30","20:00","20:30","21:00"].map((time) => (
                                                    <SelectItem key={time} value={time}>
                                                        {time}
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )} />
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <FormField control={control} name="guests" render={({field}) => (
                                <FormItem>
                                    <FormLabel>Número de pessoas</FormLabel>
                                    <FormControl>
                                        <Select onValueChange={(v) => field.onChange(Number(v))} value={field.value?.toString()}>
                                            <SelectTrigger>
                                                <SelectValue placeholder='Selecione' />
                                            </SelectTrigger>
                                            <SelectContent>
                                                {[1,2,3,4,5,6,7,8,9,10].map((n) => (
                                                    <SelectItem key={n} value={n.toString()}>
                                                        {n} {n === 1 ? "pessoa" : "pessoas"}
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}/>

                            <FormField control={control} name="table" render={({field}) => (
                                <FormItem>
                                    <FormLabel>Mesa</FormLabel>
                                    <FormControl>
                                        <Select onValueChange={(v) => field.onChange(Number(v))} value={field.value?.toString()}>
                                            <SelectTrigger>
                                                <SelectValue placeholder='Selecione' />
                                            </SelectTrigger>
                                            <SelectContent>
                                                {[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15].map((n) => (
                                                    <SelectItem key={n} value={n.toString()}>
                                                        Mesa {n}
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}/>
                        </div>

                        <FormField control={control} name="note" render={({field}) => (
                            <FormItem>
                                <FormLabel>Observações</FormLabel>
                                <FormControl>
                                    <Textarea rows={2} placeholder="Informações adicionais..." {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )} />

                        <DialogFooter>
                            <Button type="button" variant='outline' onClick={() => setOpen(false)}>Cancel</Button>
                            <Button>Criar Reserva</Button>
                        </DialogFooter>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    )
}