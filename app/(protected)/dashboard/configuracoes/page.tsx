'use client'

import { useState } from "react"

interface Props{
    text: string;
    type: 'menu' | 'reservation';
}

const defaultHours = [
  { day: 'Segunda-feira', open: '11:30', close: '23:00', enabled: true },
  { day: 'Terça-feira', open: '11:30', close: '23:00', enabled: true },
  { day: 'Quarta-feira', open: '11:30', close: '23:00', enabled: true },
  { day: 'Quinta-feira', open: '11:30', close: '23:00', enabled: true },
  { day: 'Sexta-feira', open: '11:30', close: '00:00', enabled: true },
  { day: 'Sábado', open: '11:30', close: '00:00', enabled: true },
  { day: 'Domingo', open: '11:30', close: '22:00', enabled: true },
]

const timeSlots = [
  '08:00', '08:30', '09:00', '09:30', '10:00', '10:30',
  '11:00', '11:30', '12:00', '12:30', '13:00', '13:30',
  '14:00', '14:30', '15:00', '15:30', '16:00', '16:30',
  '17:00', '17:30', '18:00', '18:30', '19:00', '19:30',
  '20:00', '20:30', '21:00', '21:30', '22:00', '22:30',
  '23:00', '23:30', '00:00',
]

export default function SettingsPage(){
    const [hours, setHours] = useState<typeof defaultHours>(defaultHours);
    const [copiedMenu, setCopiedMenu] = useState<boolean>(false);
    const [copidReservation, setCopiedReservation] = useState<boolean>(false);

    const menuUrl = 'https://mesacerta.com.br/cantina-bella/cardapio';
    const reservationUrl = 'https://menumaster.com.br/cantina-bella/reservas';

    async function copyToClipboard({text, type}: Props){
        await navigator.clipboard.writeText(text)
        if(type === 'menu'){
            setCopiedMenu(true)
            setTimeout(() => setCopiedMenu(false), 2000)
        } else {
            setCopiedReservation(true)
            setTimeout(() => setCopiedReservation(false), 2000)
        }
    }

    return(
        <div className="space-y-6">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                    <h1 className="text-2xl font-semibold tracking-tight">Configurações</h1>
                    <p className="text-sm text-muted-foreground text-pretty">Gerencie as informações do seu Restaurante</p>
                </div>
            </div>
        </div>
    )
}