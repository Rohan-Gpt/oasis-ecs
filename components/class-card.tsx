import { Card, CardContent } from "@/components/ui/card";
import { Clock, User } from "lucide-react";

interface ClassCardProps {
  id: number;
  time: string;
  topic: string;
  host: string;
  type: string;
  onClick: () => void;
  className?: string;
}

export function ClassCard({
  time,
  topic,
  host,
  onClick,
  className,
}: ClassCardProps) {
  return (
    <Card
      className={`hover:shadow-md transition-shadow cursor-pointer ${className}`}
      onClick={onClick}
    >
      <CardContent className="p-3">
        <div className="flex items-center space-x-2 text-sm text-muted-foreground mb-1">
          <Clock className="w-4 h-4" />
          <span>{time}</span>
        </div>
        <h3 className="font-semibold mb-1">{topic}</h3>
        <div className="flex items-center space-x-2 text-sm text-muted-foreground">
          <User className="w-4 h-4" />
          <span>{host}</span>
        </div>
      </CardContent>
    </Card>
  );
}
