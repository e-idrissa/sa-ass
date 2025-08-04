import {
  Card,
  CardContent,
} from "@/components/ui/card";
import { LoginForm } from "./_components/login-form";
import { AuthHeader } from "@/components/shared/auth-header";
import { GalleryVerticalEndIcon } from "lucide-react";
import Link from "next/link";

export default function LoginPage() {
  return (
    <div className="flex flex-col items-center gap-4">
      <AuthHeader icon={GalleryVerticalEndIcon} label="Consult.co" />
      <Card className="w-96">
        <CardContent>
          <LoginForm />
        </CardContent>
      </Card>
      <div className="text-muted-foreground text-sm">
        By clicking, you agree with our <Link href={"#"} className="underline">Terms</Link> and <Link href={"#"} className="underline">Privacy Policy</Link>
      </div>
    </div>
  );
}
