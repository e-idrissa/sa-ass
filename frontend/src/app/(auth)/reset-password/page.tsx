import {
  Card,
  CardContent,
} from "@/components/ui/card";
import { AuthHeader } from "@/components/shared/auth-header";
import { KeyRoundIcon } from "lucide-react";
import Link from "next/link";
import { PasswordForm } from "./_components/password-form";

export default function ResetPasswordPage() {
  return (
    <div className="flex flex-col items-center gap-4">
      <AuthHeader icon={KeyRoundIcon} label="Enter your new password" />
      <Card className="w-96">
        <CardContent>
          <PasswordForm />
        </CardContent>
      </Card>
      <div className="text-muted-foreground text-sm">
        By clicking, you agree with our <Link href={"#"} className="underline">Terms</Link> and <Link href={"#"} className="underline">Privacy Policy</Link>
      </div>
    </div>
  );
}
