import { statusConfig } from "@/constants"
import { Badge } from "./badge"

export function getStatusBadge(status: string) {
  const config = statusConfig[status as keyof typeof statusConfig]
  if (!config) return null

  const Icon = config.icon

  if (config.variant === 'success') {
    return (
      <Badge className="bg-success/10 text-success hover:bg-success/20 border-0 gap-1">
        <Icon className="size-3" />
        {config.label}
      </Badge>
    )
  }
  if (config.variant === 'warning') {
    return (
      <Badge className="bg-warning/10 text-warning hover:bg-warning/20 border-0 gap-1">
        <Icon className="size-3" />
        {config.label}
      </Badge>
    )
  }
  return (
    <Badge variant="secondary" className="text-muted-foreground gap-1">
      <Icon className="size-3" />
      {config.label}
    </Badge>
  )
}