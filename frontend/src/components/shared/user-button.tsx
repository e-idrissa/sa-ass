"use client";

import { useRouter } from "next/navigation";
import { DropdownMenu, DropdownMenuItem, DropdownMenuSeparator } from "../ui/dropdown-menu";
import { DropdownMenuContent, DropdownMenuTrigger } from "../ui/dropdown-menu";
import { LogOut, UserRoundIcon, WalletMinimalIcon } from "lucide-react";

type Props = {
  user: IUser;
};

const UserButton = ({ user }: Props) => {
  const router = useRouter()

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <UserRoundIcon className="size-5" />
      </DropdownMenuTrigger>
      <DropdownMenuContent
        side="top"
        className="w-[--radix-popper-anchor-width]"
      >
        <DropdownMenuItem onClick={() => router.push("/profile")}>
          <div className="flex items-center gap-2">
            <UserRoundIcon className="size-10 bg-blue-600/20  text-blue-600 rounded-full p-2 " />
            <div>
              <h4 className="font-semibold line-clamp-1">
                {user.firstName} {user.lastName}
              </h4>
              <p className="text-sm text-muted-foreground line-clamp-1">
                {user.email}
              </p>
            </div>
          </div>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <WalletMinimalIcon className="size-5" /> Billing
        </DropdownMenuItem>
        <DropdownMenuItem>
          <LogOut className="size-5" /> Logout
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default UserButton;
