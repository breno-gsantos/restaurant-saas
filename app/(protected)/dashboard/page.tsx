import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Separator } from "@/components/ui/separator"
import { stats, upcomingReservations } from "@/constants"
import { CalendarDays, MoreHorizontal, Phone, Plus, TrendingUp } from "lucide-react"
import Link from "next/link"

function getStatusBadge(status: string) {
  switch (status) {
    case 'confirmed':
      return (
        <Badge className="bg-success/10 text-success hover:bg-success/20 border-0">
          Confirmada
        </Badge>
      )
    case 'pending':
      return (
        <Badge className="bg-warning/10 text-warning hover:bg-warning/20 border-0">
          Pendente
        </Badge>
      )
    case 'cancelled':
      return (
        <Badge variant="secondary" className="text-muted-foreground">
          Cancelada
        </Badge>
      )
    default:
      return null
  }
}

export default function DashboardPage(){
    const today = new Date().toLocaleDateString('pt-BR', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    })

    return(
        <div className="space-y-6">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                    <h1 className="text-2xl font-semibold tracking-tight">Painel</h1>
                    <p className="text-sm text-muted-foreground capitalize">{today}</p>
                </div>
                <div className="flex gap-2">
                    <Button variant='outline' size='sm'>
                        <Plus className="mr-2 size-4" />
                        <span>Novo Item</span>
                    </Button>
                    <Button size='sm'>
                        <CalendarDays className="mr-2 size-4" />
                        <span>Nova Reserva</span>
                    </Button>
                </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                {stats.map((stat) => (
                    <Card key={stat.title}>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium text-muted-foreground ">{stat.title}</CardTitle>
                            <stat.icon className="size-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{stat.value}</div>
                            <p className="text-xs text-muted-foreground">{stat.description}</p>
                            {stat.trend && (
                                <div className="mt-2 flex items-center gap-1 text-xs text-green-700">
                                    <TrendingUp className="size-3" />
                                    {stat.trend}
                                </div>
                            )}
                        </CardContent>
                    </Card>
                ))}
            </div>

            <Card>
                <CardHeader>
                    <div className="flex items-center justify-between">
                        <div>
                            <CardTitle>Reservas de Hoje</CardTitle>
                            <CardDescription>Gerencie as reservas do dia de forma rápida</CardDescription>
                        </div>
                        <Button variant='outline' size='sm' asChild>
                            <Link href='/dashboard/reservas'>Ver Todas</Link>
                        </Button>
                    </div>
                </CardHeader>
                <CardContent>
                    <div className="space-y-4">
                        {upcomingReservations.map((reservation, index) => (
                            <div key={reservation.id}>
                                {index > 0 && <Separator className="mb-4" />}
                                <div className="flex items-center gap-4 ">
                                    <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-muted text-sm font-medium">
                                        {reservation.time}
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <div className="flex items-center gap-2">
                                            <p className="truncate font-medium">{reservation.name}</p>
                                            {getStatusBadge(reservation.status)}
                                        </div>
                                        <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-muted-foreground">
                                            <span>{reservation.table}</span>
                                            <span>•</span>
                                            <span>{reservation.guests} pessoas</span>
                                            {reservation.note && (
                                                <>
                                                    <span>•</span>
                                                    <span className="text-xs bg-muted px-1.5 py-0.5 rounded">
                                                        {reservation.note}
                                                    </span>
                                                </>
                                            )}
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-2 shrink-0">
                                        <Button variant='ghost' size='icon' className="size-8" asChild>
                                            <Link target="_blank" rel="noopener noreferrer" href={`https://wa.me/${reservation.phone.replace(/\D/g, '')}`}>
                                                <Phone className="size-4" />
                                                <span className="sr-only">Ligar para {reservation.name}</span>
                                            </Link>
                                        </Button>
                                        <DropdownMenu>
                                            <DropdownMenuTrigger asChild>
                                                <Button variant='ghost' size='icon' className="size-8">
                                                    <MoreHorizontal className="size-4" />
                                                    <span className="sr-only">Mais Opções</span>
                                                </Button>
                                            </DropdownMenuTrigger>
                                            <DropdownMenuContent align="end">
                                                <DropdownMenuItem>Confirmar</DropdownMenuItem>
                                                <DropdownMenuItem>Editar</DropdownMenuItem>
                                                <DropdownMenuItem className="text-destructive">Cancelar</DropdownMenuItem>
                                            </DropdownMenuContent>
                                        </DropdownMenu>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}