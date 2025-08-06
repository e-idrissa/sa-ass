"use client";

import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import React, { useState } from "react";
import { PasswordForm } from "./update-password-form";

const PasswordDrawer = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false)

  return (
    <Drawer open={isOpen} onOpenChange={setIsOpen}>
      <DrawerTrigger asChild>
        <Button size={"sm"} className="w-full">
          Update Password
        </Button>
      </DrawerTrigger>
      <DrawerContent className="flex flex-col items-center">
        <DrawerHeader>
          <DrawerTitle>Update Password</DrawerTitle>
          <DrawerDescription>
            This action cannot be undone.
          </DrawerDescription>
        </DrawerHeader>
        <div className="w-96 py-8">
          <PasswordForm setIsOpen={setIsOpen}/>
        </div>
      </DrawerContent>
    </Drawer>
  );
};

export default PasswordDrawer;
