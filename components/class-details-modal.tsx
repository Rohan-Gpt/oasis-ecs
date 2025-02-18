import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface ClassDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  classInfo: {
    time: string;
    topic: string;
    host: string;
    type: string;
  } | null;
}

export function ClassDetailsModal({
  isOpen,
  onClose,
  classInfo,
}: ClassDetailsModalProps) {
  if (!classInfo) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{classInfo.topic}</DialogTitle>
          <DialogDescription>
            Time: {classInfo.time}
            <br />
            Host: {classInfo.host}
            <br />
            Type: {classInfo.type}
          </DialogDescription>
        </DialogHeader>
        <div className="mt-4">
          <p>Additional class details and description could go here.</p>
          <p>You might include things like:</p>
          <ul className="list-disc list-inside mt-2">
            <li>Prerequisites</li>
            <li>Materials needed</li>
            <li>Learning objectives</li>
            <li>Link to join the class</li>
          </ul>
        </div>
      </DialogContent>
    </Dialog>
  );
}
