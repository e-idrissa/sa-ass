import { Card, CardContent } from "@/components/ui/card";
import { AuthHeader } from "@/components/shared/auth-header";
import { UserRoundIcon } from "lucide-react";
import Link from "next/link";
import { EditUserForm } from "@/components/shared/edit-user-form";
import { sampleUser } from "@/lib/tmp/user";

export default function ResetPasswordPage() {
  const user = sampleUser

  return (
    <div className="flex flex-col items-center gap-4">
      <AuthHeader icon={UserRoundIcon} label="Enter your personal informations" />
      <Card className="w-120">
        <CardContent>
          <EditUserForm user={user} onSheet={false} />
        </CardContent>
      </Card>
      <div className="text-muted-foreground text-sm">
        By clicking, you agree with our{" "}
        <Link href={"#"} className="underline">
          Terms
        </Link>{" "}
        and{" "}
        <Link href={"#"} className="underline">
          Privacy Policy
        </Link>
      </div>
    </div>
  );
}
