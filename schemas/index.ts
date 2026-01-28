import {z} from 'zod';

export const addItemSchema = z.object({
    name: z.string().min(1, 'O nome do item é obrigatório'),
    description: z.string().min(1, 'A descrição do item é obrigatória').max(500, 'A descrição do item deve ter no máximo 500 caracteres'),
    price: z.number({error: 'O preço é obrigatório'}).positive('O preço deve ser maior que zero'),
    category: z.string().min(1, 'Selecione uma categoria'),
    image: z.instanceof(File).optional(),
    available: z.boolean()
});

export type AddItemForm = z.infer<typeof addItemSchema>;

export const addReservationSchema = z.object({
    clientName: z.string().min(1, 'Nome do cliente é obrigatório'),
    phone: z.string().min(1, 'Telefone é obrigatório'),
    email: z.email('Email Inválido').optional().or(z.literal('')),
    date: z.string().min(1, 'Selecione uma data'),
    time: z.string().min(1, "Selecione um horário"),
    guests: z.number({ error: "Selecione o número de pessoas" }).min(1),
    table: z.number({ error: "Selecione uma mesa" }).min(1),
    note: z.string().optional(),
})

export type AddReservationForm = z.infer<typeof addReservationSchema>;