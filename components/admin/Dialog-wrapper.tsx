import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { Button } from "../ui/button";
import { PlusCircle } from "lucide-react";

interface DialogWrapperprops {
  children: React.ReactNode;
  headerLabel: string;
  triggerLabel: string;
  title: string;
  description: string;
}

export default function DialogWrapper({
  children,
  triggerLabel,
  title,
  description,
}: DialogWrapperprops) {
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  return (
    <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
      <DialogTrigger asChild>
        <Button className="mb-4">
          <PlusCircle className="mr-2 h-4 w-4" />
          {triggerLabel}
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>
        {children}
      </DialogContent>
    </Dialog>
  );
}
