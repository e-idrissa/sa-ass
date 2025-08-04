import React from "react";
import { Badge } from "../ui/badge";

interface Props {
  title: string;
  role: string;
  caption?: string;
}

export const PageHeader = ({ title, role, caption }: Props) => {
  return (
    <div>
      <div className="flex items-center gap-2">
        <h2 className="text-4xl font-semibold">{title}</h2>
        <Badge className="lowercase">{role}</Badge>
      </div>
      <p className="text-muted-foreground text-sm">
        {caption
          ? caption
          : "Lorem ipsum dolor sit amet, consectetur adipisicing"}
      </p>
    </div>
  );
};
