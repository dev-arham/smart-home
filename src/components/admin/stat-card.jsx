import { cn } from "@/lib/utils"
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from "@/components/ui/card"

function StatCard({ title, value, icon: Icon, description, className, ...props }) {
  return (
    <Card className={cn("relative", className)} {...props}>
      <CardHeader>
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        {Icon && (
          <div className="text-muted-foreground absolute top-4 right-6">
            <Icon className="size-5" />
          </div>
        )}
      </CardHeader>
      <CardContent className="-mt-2">
        <div className="text-2xl font-bold">{value}</div>
        {description && (
          <p className="text-muted-foreground text-xs">{description}</p>
        )}
      </CardContent>
    </Card>
  );
}

export { StatCard }
