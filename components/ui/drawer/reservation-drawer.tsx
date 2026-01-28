import { reservations } from "@/constants"
import { Drawer, DrawerClose, DrawerContent, DrawerDescription, DrawerFooter, DrawerHeader, DrawerTitle } from "@/components/ui/drawer";
import { getStatusBadge } from "../get-status-badge";
import { Calendar, CheckCircle2, Clock, MapPin, MessageCircle, Phone, Users, XCircle } from "lucide-react";
import { Separator } from "../separator";
import { Button } from "../button";
import Link from "next/link";

interface Props{
    reservation: typeof reservations[0] | null;
    open: boolean;
    onOpenChange: (open: boolean) => void;
}

export function ReservationDrawer({reservation, open, onOpenChange}: Props){
    if(!reservation) return null;

    const formattedDate = new Date(reservation.date + 'T00:00:00').toLocaleDateString('pt-BR', {
        weekday: 'long',
        day: 'numeric',
        month: 'long',
    })

    return(
        <Drawer open={open} onOpenChange={onOpenChange}>
            <DrawerContent>
                <div className="mx-auto w-full max-w-lg">
                    <DrawerHeader>
                        <div className="flex items-start justify-between">
                            <div>
                                <DrawerTitle>{reservation.name}</DrawerTitle>
                                <DrawerDescription>Detalhes da Reserva</DrawerDescription>
                            </div>
                            {getStatusBadge(reservation.status)}
                        </div>
                    </DrawerHeader>

                    <div className="px-4 pb-4">
                        <div className="grid gap-4">
                            <div className="grid grid-cols-2 gap-4">
                                <div className="flex items-center gap-3 rounded-lg border p-3">
                                    <Calendar className="size-5 text-muted-foreground" />
                                    <div>
                                        <p className="text-sm text-muted-foreground">Data</p>
                                        <p className='font-medium capitalize'>{formattedDate}</p>
                                    </div>
                                </div>

                                <div className="flex items-center gap-3 rounded-lg border p-3">
                                    <Clock className="size-5 text-muted-foreground" />
                                    <div>
                                        <p className="text-sm text-muted-foreground">Horário</p>
                                        <p className="font-medium">{reservation.time}</p>
                                    </div>
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div className="flex items-center gap-3 rounded-lg border p-3">
                                    <Users className="size-5 text-muted-foreground" />
                                    <div>
                                        <p className="text-sm text-muted-foreground">Pessoas</p>
                                        <p className="font-medium">{reservation.guests} pessoas</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-3 rounded-lg border p-3">
                                    <MapPin className="size-5 text-muted-foreground" />
                                    <div>
                                        <p className="text-sm text-muted-foreground">Mesa</p>
                                        <p className="font-medium">{reservation.table}</p>
                                    </div>
                                </div>
                            </div>

                            <Separator />

                            <div className="space-y-3">
                                <h4 className="text-sm font-medium text-muted-foreground">Contato</h4>
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-3">
                                        <Phone className='size-4 text-muted-foreground' />
                                        <span>{reservation.phone}</span>
                                    </div>
                                    <Button variant='outline' size='sm' asChild>
                                        <Link href={`https://wa.me/${reservation.phone.replace(/\D/g, '')}`} target="_blank" rel="noopener noreferrer">
                                            <MessageCircle className="mr-2 size-4" />
                                            WhatsApp
                                        </Link>
                                    </Button>
                                </div>
                                {reservation.email && (
                                    <div className="flex items-center gap-3">
                                        <span className="text-muted-foreground">@</span>
                                        <span>{reservation.email}</span>
                                    </div>
                                )}
                            </div>

                            {reservation.note && (
                                <>
                                    <Separator />
                                    <div className="space-y-2">
                                        <h4 className="text-sm font-medium text-muted-foreground">Observações</h4>
                                        <p className="text-sm bg-muted p-3 rounded-lg">{reservation.note}</p>
                                    </div>
                                </>
                            )}
                        </div>
                    </div>

                    <DrawerFooter className="border-t">
                        <div className="flex gap-2">
                            {reservation.status === 'pending' && (
                                <Button className="flex-1 bg-success hover:bg-success/90 text-success-foreground">
                                    <CheckCircle2 className="mr-2 size-4" />
                                    Confirmar
                                </Button>
                            )}
                            {reservation.status !== 'cancelled' && (
                                <Button variant="outline" className="flex-1 text-destructive hover:text-destructive bg-transparent">
                                    <XCircle className="mr-2 size-4" />
                                    Cancelar
                                </Button>
                            )}
                        </div>
                        <DrawerClose asChild>
                            <Button variant="ghost">Fechar</Button>
                        </DrawerClose>
                    </DrawerFooter>
                </div>
            </DrawerContent>
        </Drawer>
    )
}