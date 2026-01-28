'use client'

import { useState } from "react"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { useForm } from "react-hook-form";
import { AddItemForm, addItemSchema } from "@/schemas";
import {zodResolver} from '@hookform/resolvers/zod';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { categories } from "@/constants";
import { Switch } from "./switch";

export function AddItemDialog(){
    const form = useForm<AddItemForm>({
        resolver: zodResolver(addItemSchema),
        defaultValues: {
            name: '',
            description: '',
            price: 0,
            category: '',
            image: undefined,
            available: true 
        }
    })

    const {formState, handleSubmit, reset, control} = form

    const [open, setOpen] = useState<boolean>(false);

    async function onSubmit(values: AddItemForm){
        console.log(values);
    }

    return(
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button size='sm'>
                    <Plus className="mr-2 size-4" />
                    <span>Novo Item</span>
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-125">
                <DialogHeader>
                    <DialogTitle>Adicionar item ao cardápio</DialogTitle>
                    <DialogDescription>Preencha as informações do novo item ao cardápio</DialogDescription>
                </DialogHeader>
                <Form {...form}>
                    <form onSubmit={handleSubmit(onSubmit)} className="grid gap-4 py-4">
                        <FormField control={control} name="name" render={({field}) => (
                            <FormItem>
                                <FormLabel>Nome do Item</FormLabel>
                                <FormControl>
                                    <Input type="text" placeholder="Ex: Filé à Parmegiana" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )} />

                        <FormField control={control} name="description" render={({field}) => (
                            <FormItem>
                                <FormLabel>Descrição</FormLabel>
                                <FormControl>
                                    <Textarea rows={3} placeholder="Descreva o prato, ingredientes principais..." {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )} />

                        <div className="grid grid-cols-2 gap-4">
                            <FormField control={control} name="price" render={({field}) => (
                            <FormItem>
                                <FormLabel>Preço (R$)</FormLabel>
                                <FormControl>
                                    <Input type="number" step='0.01' onChange={(e) => field.onChange(e.target.valueAsNumber)} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                            )} />

                            <FormField control={control} name="category" render={({field}) => (
                            <FormItem>
                                <FormLabel>Categoria</FormLabel>
                                <Select onValueChange={field.onChange} value={field.value}>
                                    <FormControl>
                                        <SelectTrigger>
                                            <SelectValue placeholder='Selecione...' />
                                        </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                        {categories.map((category) => (
                                            <SelectItem key={category.id} value={category.id}>{category.name}</SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                                <FormMessage />
                            </FormItem>
                            )} />
                        </div>
                        <FormField control={control} name="image" render={({field}) => (
                            <FormItem>
                                <FormLabel>Imagem</FormLabel>
                                <FormControl>
                                    <Input type="file" accept="image/*" onChange={(e) => field.onChange(e.target.files?.[0])} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )} />

                        <FormField control={control} name="available" render={({field}) => (
                            <FormItem className="flex items-center justify-between">
                                <FormLabel>Disponível para venda</FormLabel>
                                <FormControl>
                                    <Switch checked={field.value} onCheckedChange={field.onChange} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )} />

                        <DialogFooter>
                            <Button variant='outline' onClick={() => setOpen(false)}>Cancelar</Button>
                            <Button>Salvar Item</Button>
                        </DialogFooter>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    )
}