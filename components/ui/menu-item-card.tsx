import { menuItems } from "@/constants";
import { cn } from "@/lib/utils";
import { Button } from "./button";
import { Eye, EyeOff, GripVertical, MoreHorizontal, Pencil, Trash2 } from "lucide-react";
import { Badge } from "./badge";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "./dropdown-menu";

export function MenuItemCard({item}: {item: typeof menuItems[0]}){
    return(
        <div className={cn('group flex items-start gap-4 rounded-lg border p-4 transition-colors hover:bg-muted/50', !item.available && 'opacity-60')}>
            <Button className="mt-1 cursor-grab opacity-0 group-hover:opacity-100 transition-opacity">
                <GripVertical className="size-4 text-muted-foreground" />
            </Button>
            <div className="flex size-16 shrink-0 items-center justify-center rounded-lg bg-muted">

            </div>
            <div className="flex-1 min-w-0">
        <div className="flex items-start justify-between gap-2">
          <div>
            <h3 className="font-medium leading-tight">{item.name}</h3>
            <p className="mt-1 text-sm text-muted-foreground line-clamp-2">
              {item.description}
            </p>
          </div>
          <div className="flex items-center gap-2 shrink-0">
            <span className="font-semibold tabular-nums">
              R$ {item.price.toFixed(2).replace('.', ',')}
            </span>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="size-8">
                  <MoreHorizontal className="size-4" />
                  <span className="sr-only">Mais opções</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem>
                  <Pencil className="mr-2 size-4" />
                  Editar
                </DropdownMenuItem>
                <DropdownMenuItem>
                  {item.available ? (
                    <>
                      <EyeOff className="mr-2 size-4" />
                      Marcar indisponível
                    </>
                  ) : (
                    <>
                      <Eye className="mr-2 size-4" />
                      Marcar disponível
                    </>
                  )}
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="text-destructive">
                  <Trash2 className="mr-2 size-4" />
                  Excluir
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
        <div className="mt-2 flex items-center gap-2">
          <Badge variant="secondary" className="text-xs">
            {item.category}
          </Badge>
          {!item.available && (
            <Badge variant="outline" className="text-xs text-muted-foreground">
              Indisponível
            </Badge>
          )}
        </div>
      </div>
        </div>
    )
}