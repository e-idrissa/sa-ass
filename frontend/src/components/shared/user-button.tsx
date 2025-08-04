import React from "react";
import { DropdownMenu, DropdownMenuItem, DropdownMenuSeparator } from "../ui/dropdown-menu";
import { DropdownMenuContent, DropdownMenuTrigger } from "../ui/dropdown-menu";
import { LogOut, UserRoundIcon, WalletMinimalIcon } from "lucide-react";

type Props = {
  user: IUser;
};

const UserButton = ({ user }: Props) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <UserRoundIcon className="size-5" />
      </DropdownMenuTrigger>
      <DropdownMenuContent
        side="top"
        className="w-[--radix-popper-anchor-width]"
      >
        <DropdownMenuItem>
          <div className="flex items-center gap-2">
            <UserRoundIcon className="size-10 border border-accent bg-accent rounded-full p-2 " />
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
