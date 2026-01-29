'use client'

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ReservationDrawer } from "@/components/ui/drawer/reservation-drawer";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { getStatusBadge } from "@/components/ui/get-status-badge";
import { Input } from "@/components/ui/input";
import { NewReservationDialog } from "@/components/ui/new-reservation-dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { reservations } from "@/constants";
import { cn } from "@/lib/utils";
import { Calendar, CheckCircle, CheckCircle2, ChevronLeft, ChevronRight, MessageCircle, MoreHorizontal, Search, XCircle } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

export default function ReservationPage(){
    const [selectedDate, setSelectedDate] = useState<string>('2026-01-28');
    const [statusFilter, setStatusFilter] = useState<string>('all');
    const [searchQuery, setSearchQuery] = useState<string>('');
    const [selectedReservation, setSelectedReservation] = useState<typeof reservations[0] | null>(null);
    const [drawerOpen, setDrawerOpen] = useState<boolean>(false);

    const filteredReservations = reservations.filter((r) => {
        const matchesDate = r.date === selectedDate
        const matchesStatus = statusFilter === 'all' || r.status === statusFilter
        const matchesSearch = r.name.toLowerCase().includes(searchQuery.toLowerCase()) || r.phone.includes(searchQuery)

        return matchesDate && matchesStatus && matchesSearch
    })

    const stats = {
        total: filteredReservations.length,
        confirmed: filteredReservations.filter((r) => r.status === 'confirmed').length,
        pending: filteredReservations.filter((r) => r.status === 'pending').length,
        cancelled: filteredReservations.filter((r) => r.status === 'cancelled').length,
        guests: filteredReservations.filter((r) => r.status !== 'cancelled').reduce((acc, r) => acc + r.guests, 0),
    };

    const cards = [
        {label: "Total", value: stats.total},
        {label: "Confirmadas", value: stats.confirmed, className: "text-success"},
        {label: "Pendentes", value: stats.pending, className: "text-warning"},
        {label: "Pessoas esperadas", value: stats.guests},
    ]

    const formattedSelectedDate = new Date(selectedDate + 'T00:00:00').toLocaleDateString('pt-BR', {
        weekday: 'long',
        day: 'numeric',
        month: 'long',
    });

    return(
        <div className="space-y-6">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                    <h1 className="text-2xl font-semibold tracking-tight">Reservas</h1>
                    <p className="text-sm text-muted-foreground">Gerencie as Reservas do seu Restaurante</p>
                </div>
                <NewReservationDialog />
            </div>

            <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
                <div className="flex items-center gap-2">
                    <Button variant='outline' size='icon' className="size-8 bg-transparent">
                        <ChevronLeft className="size-4" />
                    </Button>
                    <div className='flex items-center gap-2 px-3 py-1.5 rounded-md border bg-background'>
                        <Calendar className="size-4 text-muted-foreground" />
                        <span className="text-sm font-medium capitalize">{formattedSelectedDate}</span>
                    </div>
                    <Button variant='outline' size='icon' className="size-8 bg-transparente">
                        <ChevronRight className="size-4" />
                    </Button>
                </div>
                <div className="flex flex-1 items-center gap-2">
                    <div className="relative flex-1 max-w-sm">
                        <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
                        <Input placeholder="Buscar por nome ou telefone..." className="pl-9" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} />
                    </div>
                    <Select value={statusFilter} onValueChange={setStatusFilter}>
                        <SelectTrigger className="w-40">
                            <SelectValue placeholder="Status" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="all">Todos</SelectItem>
                            <SelectItem value="confirmed">Confirmadas</SelectItem>
                            <SelectItem value="pending">Pendentes</SelectItem>
                            <SelectItem value="cancelled">Canceladas</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
            </div>
            
            <div className="grid sm:grid-cols-4 gap-4">
                {cards.map((card) => (
                    <Card key={card.label}>
                        <CardHeader className="pb-2">
                            <CardDescription>{card.label}</CardDescription>
                            <CardTitle className={cn('text-3xl', card.className ?? '')}>{card.value}</CardTitle>
                        </CardHeader>
                    </Card>
                ))}
            </div>

            <Card>
                <CardContent className="pb-0">
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Horário</TableHead>
                                <TableHead>Cliente</TableHead>
                                <TableHead className="hidden sm:table-cell">Telefone</TableHead>
                                <TableHead className="hidden md:table-cell">Mesa</TableHead>
                                <TableHead className="hidden md:table-cell">Pessoas</TableHead>
                                <TableHead>Status</TableHead>
                                <TableHead className="w-[50px]"></TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {filteredReservations.length === 0 ? (
                                <TableRow>
                                    <TableCell colSpan={7} className="h-24 text-center text-muted-foreground">Nenhuma Reserva Encontrada</TableCell>
                                </TableRow>
                            ) : (
                                filteredReservations.map((reservation) => (
                                    <TableRow key={reservation.id} className="cursor-pointer"
                                        onClick={() => {
                                            setSelectedReservation(reservation)
                                            setDrawerOpen(true)
                                    }}>
                                        <TableCell>
                                            <span className="font-medium">{reservation.time}</span>
                                        </TableCell>
                                        <TableCell>
                                            <div>
                                                <span className="font-medium">{reservation.name}</span>
                                                {reservation.note && (
                                                    <p className="text-xs text-muted-foreground truncate max-w-50">{reservation.note}</p>
                                                )}
                                            </div>
                                        </TableCell>
                                        <TableCell className="hidden sm:table-cell">
                                            <Link href={`https://wa.me/${reservation.phone.replace(/\D/g, '')}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 text-muted-foreground hover:text-foreground" onClick={(e) => e.stopPropagation()}>
                                                <MessageCircle className="size-3" />
                                                <span>{reservation.phone}</span>
                                            </Link>
                                        </TableCell>
                                        <TableCell className="hidden md:table-cell">{reservation.table}</TableCell>
                                        <TableCell className="hidden md:table-cell">{reservation.guests}</TableCell>
                                        <TableCell>{getStatusBadge(reservation.status)}</TableCell>
                                        <TableCell>
                                            <DropdownMenu>
                                                <DropdownMenuTrigger asChild onClick={(e) => e.stopPropagation()}>
                                                    <Button variant='ghost' size='icon' className="size-8">
                                                        <MoreHorizontal className="size-4" />
                                                    </Button>
                                                </DropdownMenuTrigger>
                                                <DropdownMenuContent align="end">
                                                    <DropdownMenuItem>
                                                        <CheckCircle2 className="mr-2 size-4" />
                                                        <span>Confirmar</span>
                                                    </DropdownMenuItem>
                                                    <DropdownMenuItem>
                                                        <MessageCircle className="mr-2 size-4" />
                                                        <span>Enviar Whatsapp</span>
                                                    </DropdownMenuItem>
                                                    <DropdownMenuSeparator />
                                                    <DropdownMenuItem className="text-destructive">
                                                        <XCircle className="mr-2 size-4" />
                                                        <span>Cancelar</span>
                                                    </DropdownMenuItem>
                                                </DropdownMenuContent>
                                            </DropdownMenu>
                                        </TableCell>
                                    </TableRow>
                                ))
                            )}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>

            <ReservationDrawer reservation={selectedReservation} open={drawerOpen} onOpenChange={setDrawerOpen} />
        </div>
    )
}