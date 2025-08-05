import {
  ArchiveIcon,
  Calendar,
  CalendarCogIcon,
  ChartPieIcon,
  ClipboardListIcon,
  FolderIcon,
  HomeIcon,
  InfoIcon,
  UsersRoundIcon,
} from "lucide-react";

export const links = [
  { label: "Home", href: "/", icon: HomeIcon },
  { label: "Appointments", href: "/appointments", icon: Calendar },
  { label: "Prescriptions", href: "/prescriptions", icon: ClipboardListIcon },
  { label: "Records", href: "/records", icon: FolderIcon },
];

export const adminLinks = [
  { label: "Analytics", href: "/admin/analytics", icon: ChartPieIcon },
  { label: "Users", href: "/admin/users", icon: UsersRoundIcon },
  { label: "Manage Appointments", href: "/admin/appointments", icon: CalendarCogIcon },
  { label: "Manage Prescriptions", href: "/admin/prescriptions", icon: ArchiveIcon },
];

export const footerLinks = [
  { label: "About Us", href: "/about-us", icon: InfoIcon },
]
