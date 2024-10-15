"use client";
import { useState, useTransition } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { AlertCircle, CircleCheck, X } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { CreateTeamSchema } from "@/schemas";
import * as z from "zod";
import { Form } from "../ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { createTeam } from "@/actions/createTeam";
import { FormError } from "../auth/form-error";
import { FormSuccess } from "../auth/form-success";

interface CreateTeamDialogProps {
  projectId: number;
  projectTitle: string;
  onTeamCreated: (teamName: string, members: string[]) => void;
  label: string;
}

export default function CreateTeamDialog({
  projectId,
  projectTitle,
  onTeamCreated,
  label,
}: CreateTeamDialogProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [teamName, setTeamName] = useState("");
  const [members, setMembers] = useState<string[]>([]);
  const [error, setError] = useState<string | undefined>("");
  const [isPending, startTransition] = useTransition();
  const [success, setSuccess] = useState<string | undefined>("");

  const handleAddMember = () => {
    if (members.length < 3) {
      setMembers([...members, ""]);
    }
  };

  const handleMemberChange = (index: number, value: string) => {
    console.log("this function is working");
    const newMembers = [...members];
    newMembers[index] = value;
    setMembers(newMembers);
    console.log(members);
  };

  const handleRemoveMember = (index: number) => {
    const newMembers = members.filter((_, i) => i !== index);
    setMembers(newMembers);
  };

  const onSubmit = (teamName: string, members: string[]) => {
    console.log("inside onSubmit");
    console.log(members);
    startTransition(() => {
      console.log("this function is working");

      createTeam(teamName, members, projectId).then((data) => {
        setError(data.error);
        setSuccess(data.success);
        if (success) {
          setIsOpen(false);
          onTeamCreated(
            teamName,
            members.filter((id) => id.trim() !== "")
          );
        }
      });
    });
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button
          disabled={label === "Project Claimed"}
          className="w-full bg-purple-600 hover:bg-purple-700 text-white transition-all duration-300 rounded-sm"
        >
          {label}
        </Button>
      </DialogTrigger>
      <DialogContent className="bg-gray-800 text-gray-100 border border-gray-700">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-purple-400">
            Create New Team for {projectTitle}
          </DialogTitle>
        </DialogHeader>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            onSubmit(teamName, members);
          }}
          className="space-y-4"
        >
          <div className="space-y-2">
            <Label htmlFor="teamName" className="text-gray-300">
              Team Name
            </Label>
            <Input
              disabled={isPending}
              id="teamName"
              value={teamName}
              onChange={(e) => setTeamName(e.target.value)}
              placeholder="Enter team name"
              required
              className="bg-gray-700 text-gray-100 border-gray-600 focus:border-purple-500 focus:ring-purple-500"
            />
          </div>
          <div className="space-y-2">
            <Label className="text-gray-300">Team Members (Max 3)</Label>
            {members.map((member, index) => (
              <div key={index} className="flex items-center space-x-2">
                <Input
                  disabled={isPending}
                  value={member}
                  onChange={(e) => handleMemberChange(index, e.target.value)}
                  placeholder="Enter membership ID"
                  className="bg-gray-700 text-gray-100 border-gray-600 focus:border-purple-500 focus:ring-purple-500"
                />
                <Button
                  disabled={isPending}
                  type="button"
                  variant="ghost"
                  size="icon"
                  onClick={() => handleRemoveMember(index)}
                  aria-label="Remove member"
                  className="text-gray-300 hover:text-white"
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            ))}
            {members.length < 3 && (
              <Button
                disabled={isPending}
                type="button"
                onClick={handleAddMember}
                className="w-full mt-2 bg-purple-600 hover:bg-purple-700 text-white transition-all duration-300 rounded-sm"
              >
                Add Member
              </Button>
            )}
          </div>

          <DialogFooter>
            <Button
              disabled={isPending}
              type="submit"
              className="w-full bg-purple-600 hover:bg-purple-700 text-white transition-all duration-300 rounded-sm"
            >
              Create Team
            </Button>
          </DialogFooter>
          <DialogFooter>
            {/* {error && (
              <Alert
                variant="destructive"
                className="bg-red-900 text-red-100 border-red-800"
              >
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}
            {success && (
              <div className="justify-center w-full bg-emerald-500/15 p-3 rounded-md flex items-center gap-x-2 text-sm text-emerald-500">
                <CircleCheck />
                <p>{success}</p>
              </div>
            )} */}
            <FormError message={error} />
            <FormSuccess message={success} />
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
