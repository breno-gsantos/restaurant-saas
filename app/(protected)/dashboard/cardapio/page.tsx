'use client'

import { AddItemDialog } from "@/components/ui/add-item-dialog";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { MenuItemCard } from "@/components/ui/menu-item-card";
import { Separator } from "@/components/ui/separator";
import { categories, menuItems } from "@/constants";
import { ChevronDown, Filter, Plus, Search } from "lucide-react";
import { useState } from "react";

export default function MenuPage(){
    const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
    const [searchQuery, setSearchQuery] = useState<string>('');

    const filteredItems = menuItems.filter((item) => {
    const matchesCategory = !selectedCategory || item.category === selectedCategory
    const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesCategory && matchesSearch
  })

    return(
        <div className="space-y-6">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                    <h1 className="text-2xl font-semibold tracking-tight">Cardápio Digital</h1>
                    <p className='text-sm text-muted-foreground'>Gerencie os itens e categorias do seu Cardápio</p>
                </div>
                <AddItemDialog />
            </div>

            <div className="grid gap-6 lg:grid-cols-[280px_1fr]">
                <Card className="h-fit">
                    <CardHeader>
                        <CardTitle className="text-base">Categorias</CardTitle>
                        <CardDescription>Filtrar por Categoria</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-1">
                        <Button variant={selectedCategory === null ? 'secondary' : 'ghost'} className="w-full justify-between" onClick={() => setSelectedCategory(null)}>
                            <span>Todos os itens</span>
                            <span className="text-muted-foreground">{menuItems.length}</span>
                        </Button>
                        <Separator className="my-2" />
                        {categories.map((category) =>(
                            <Button key={category.id} variant={selectedCategory === category.name ? 'secondary' : 'ghost'} className="w-full justify-between" onClick={() => setSelectedCategory(category.name)}>
                                <span>{category.name}</span>
                                <span className="text-muted-foreground">{category.count}</span>
                            </Button>
                        ))}
                        <Separator className="my-2" />
                        <Button variant='ghost' className="w-full justify-start text-muted-foreground">
                            <Plus className="mr-2 size-4" />
                            <span>Nova Categoria</span>
                        </Button>
                    </CardContent>
                </Card>

                <div className="space-y-4">
                    <div className="flex flex-col gap-4  sm:flex-row sm:items-center">
                        <div className='relative flex-1'>
                            <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
                            <Input placeholder="Buscar itens..." className="pl-9" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} />
                        </div>
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button variant='outline' size='sm'>
                                    <Filter className="mr-2 size-4" />
                                    <span>Filtros</span>
                                    <ChevronDown className="ml-2 size-4" />
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end" className="w-48">
                                <DropdownMenuItem>Todos</DropdownMenuItem>
                                <DropdownMenuItem>Disponíveis</DropdownMenuItem>
                                <DropdownMenuItem>Indisponíveis</DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </div>

                    <Card>
                        <CardContent className="p-4">
                            {filteredItems.length === 0 ? (
                                <div className="py-12 text-center">
                                    <p className="text-muted-foreground">Nenhum item encontrado</p>
                                </div>
                            ) : (
                                <div className="space-y-3">
                                    {filteredItems.map((item) => (
                                        <MenuItemCard key={item.id} item={item} />
                                    ))}
                                </div>
                            )}
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    )
}