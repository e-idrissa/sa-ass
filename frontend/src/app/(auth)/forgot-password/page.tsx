import {
  Card,
  CardContent,
} from "@/components/ui/card";
import { AuthHeader } from "@/components/shared/auth-header";
import { KeyRoundIcon } from "lucide-react";
import { EmailForm } from "./_components/email-form";

export default function ForgotPasswordPage() {
  return (
    <div className="flex flex-col items-center gap-4">
      <AuthHeader icon={KeyRoundIcon} label="Recover Password" />
      <Card className="w-96">
        <CardContent>
          <EmailForm />
        </CardContent>
      </Card>
    </div>
  );
}
