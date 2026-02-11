import Link from "next/link"
import { Plus } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"

function PageHeader({ title, description, action, className, ...props }) {
  return (
    <div
      data-slot="page-header"
      className={cn(
        "flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between",
        className
      )}
      {...props}>
      <div className="space-y-1">
        <h1 className="text-2xl font-bold tracking-tight">{title}</h1>
        {description && (
          <p className="text-muted-foreground text-sm">{description}</p>
        )}
      </div>
      {action && (
        <Button asChild>
          <Link href={action.href}>
            <Plus />
            {action.label}
          </Link>
        </Button>
      )}
    </div>
  );
}

export { PageHeader }
