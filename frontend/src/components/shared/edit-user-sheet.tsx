import { AppLogo } from "@/components/shared/app-logo";
import { EditUserForm } from "@/components/shared/edit-user-form";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { cn } from "@/lib/utils";
import { PenIcon } from "lucide-react";

interface Props {
  user: IUserInfos;
  className?: string
  onProfile?: boolean
}

export function EditUser({ user, className, onProfile }: Props) {
  return (
    <Sheet>
      <SheetTrigger asChild className={className}>
        <Button variant={onProfile ? "default" : "ghost"} className={cn(onProfile ? "size-8 rounded-full" : "")}>
          <PenIcon className="text-white size-4" />
        </Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <AppLogo />
          <SheetTitle>Edit profile</SheetTitle>
          <SheetDescription>
            Make changes to your profile here. Click save when you&apos;re done.
          </SheetDescription>
        </SheetHeader>
        <EditUserForm user={user} onSheet={true} />
      </SheetContent>
    </Sheet>
  );
}
