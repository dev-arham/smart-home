import { cn } from "@/lib/utils"
import { Badge } from "@/components/ui/badge"

const statusConfig = {
  active: {
    variant: "default",
    className: "bg-green-600 hover:bg-green-600/90",
    label: "Active",
  },
  inactive: {
    variant: "secondary",
    className: "",
    label: "Inactive",
  },
  "low-stock": {
    variant: "outline",
    className: "border-yellow-500 text-yellow-600 dark:text-yellow-400",
    label: "Low Stock",
  },
  "out-of-stock": {
    variant: "destructive",
    className: "",
    label: "Out of Stock",
  },
  "in-stock": {
    variant: "default",
    className: "",
    label: "In Stock",
  },
}

function StatusBadge({ status, className, ...props }) {
  const config = statusConfig[status] || {
    variant: "outline",
    className: "",
    label: status,
  }

  return (
    <Badge
      variant={config.variant}
      className={cn(config.className, className)}
      {...props}>
      {config.label}
    </Badge>
  );
}

export { StatusBadge, statusConfig }
