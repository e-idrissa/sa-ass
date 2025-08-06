import { LucideIcon } from "lucide-react"

interface Props {
  icon: LucideIcon
  label?: string
}

export const AuthHeader = ({ icon: Icon, label }: Props) => {
  return (
    <div className="flex flex-col items-center gap-2">
      <div className="flex items-center justify-center bg-blue-600 text-white rounded-lg size-12">
        <Icon className="size-6"/>
      </div>
      {label && (
        <span className="font-semibold">{label}</span>
      )}
    </div>
  )
}
