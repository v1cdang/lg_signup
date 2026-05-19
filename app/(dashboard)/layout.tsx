import Link from "next/link";
import { BarChart3, CalendarCheck, ClipboardList, Home, LogOut, Users, Workflow } from "lucide-react";
import { Button } from "@/components/ui/button";

const navItems = [
  { href: "/dashboard", label: "Dashboard", icon: Home },
  { href: "/participants", label: "Participants", icon: Users },
  { href: "/assignments", label: "Assignments", icon: Workflow },
  { href: "/light-groups", label: "Light Groups", icon: ClipboardList },
  { href: "/attendance", label: "Attendance", icon: CalendarCheck },
  { href: "/reports", label: "Reports", icon: BarChart3 },
  { href: "/users", label: "Users", icon: Users },
];

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-muted/40">
      <aside className="fixed inset-y-0 left-0 hidden w-64 border-r bg-card p-4 lg:block">
        <Link href="/dashboard" className="mb-8 block text-lg font-semibold">
          LG Manager
        </Link>
        <nav className="flex flex-col gap-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <Button key={item.href} asChild variant="ghost" className="justify-start">
                <Link href={item.href}>
                  <Icon data-icon="inline-start" />
                  {item.label}
                </Link>
              </Button>
            );
          })}
        </nav>
        <Button variant="outline" className="absolute bottom-4 left-4 right-4 justify-start">
          <LogOut data-icon="inline-start" />
          Sign out
        </Button>
      </aside>
      <div className="lg:pl-64">
        <header className="sticky top-0 z-10 flex items-center justify-between border-b bg-background/95 px-4 py-3 backdrop-blur lg:px-8">
          <div>
            <p className="text-sm text-muted-foreground">Light Group Operations</p>
            <h1 className="text-xl font-semibold">Admin workspace</h1>
          </div>
          <Button asChild>
            <Link href="/signup">Public form</Link>
          </Button>
        </header>
        <main className="p-4 lg:p-8">{children}</main>
      </div>
    </div>
  );
}
