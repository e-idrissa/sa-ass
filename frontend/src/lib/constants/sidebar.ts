import {
  Calendar,
  CalendarCogIcon,
  ClipboardListIcon,
  FolderIcon,
  GaugeCircleIcon,
  HomeIcon,
  InfoIcon,
  UsersRoundIcon,
} from "lucide-react";

export const links = [
  { label: "Home", href: "/", icon: HomeIcon },
  { label: "Appointments", href: "/appointments", icon: Calendar },
  { label: "Prescriptions", href: "/prescriptions", icon: ClipboardListIcon },
];

export const adminLinks = [
  { label: "Analytics", href: "/admin/analytics", icon: GaugeCircleIcon },
  { label: "Manage Appointments", href: "/admin/appointments", icon: CalendarCogIcon },
  { label: "Manage Prescriptions", href: "/admin/prescriptions", icon: FolderIcon },
  { label: "Manage Users", href: "/admin/users", icon: UsersRoundIcon },
];

export const footerLinks = [
  { label: "About Us", href: "/about-us", icon: InfoIcon },
]
