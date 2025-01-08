import { createServerComponentClient } from "@/lib/supabase-server";
import { redirect } from "next/navigation";
import {
  Bot,
  Users,
  Settings,
  CreditCard,
  MessageSquare,
  BarChart3,
  Command,
} from "lucide-react";
import { Logo } from "@/components/ui/logo";
import Link from "next/link";
import { UserMenu } from "@/components/ui/user-menu";

interface NavItem {
  name: string;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
}

const navigation: NavItem[] = [
  { name: "Visão Geral", href: "/dashboard", icon: BarChart3 },
  { name: "Conversas", href: "/dashboard/conversations", icon: MessageSquare },
  { name: "Clientes", href: "/dashboard/customers", icon: Users },
  { name: "Configurações do Bot", href: "/dashboard/bot-settings", icon: Bot },
  { name: "Integrações", href: "/dashboard/integrations", icon: Command },
  { name: "Cobrança", href: "/dashboard/billing", icon: CreditCard },
  { name: "Configurações", href: "/dashboard/settings", icon: Settings },
];

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = createServerComponentClient();

  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session) {
    redirect("/login");
  }

  return (
    <div className="min-h-screen bg-background">
      <main className="container py-6">
        <div className="min-h-screen bg-gray-50">
          <div className="flex h-screen bg-white">
            {/* Sidebar */}
            <div className="hidden lg:flex lg:flex-col lg:w-64 lg:fixed lg:inset-y-0 border-r border-gray-100">
              <div className="flex flex-col flex-grow pt-5 pb-4 overflow-y-auto">
                <div className="flex items-center flex-shrink-0 px-4">
                  <Logo href="/dashboard" />
                </div>
                <nav className="mt-8 flex-1 px-2 space-y-1">
                  {navigation.map((item) => (
                    <Link
                      key={item.name}
                      href={item.href}
                      className="group flex items-center px-2 py-2 text-sm font-medium rounded-md text-gray-700 hover:text-emerald-600 hover:bg-gray-50"
                    >
                      <item.icon className="mr-3 h-5 w-5 text-gray-400 group-hover:text-emerald-500" />
                      {item.name}
                    </Link>
                  ))}
                </nav>
              </div>
            </div>

            {/* Main content */}
            <div className="lg:pl-64 flex flex-col flex-1">
              <header className="sticky top-0 z-10 flex h-16 flex-shrink-0 border-b border-gray-100 bg-white">
                <div className="flex flex-1 justify-between px-4 sm:px-6 lg:px-8">
                  <div className="flex flex-1">{/* Header content */}</div>
                  <div className="ml-4 flex items-center gap-3">
                    <button
                      type="button"
                      className="rounded-full bg-white p-2 text-gray-400 hover:text-gray-500 focus:outline-none"
                    >
                      <Command className="h-5 w-5" />
                    </button>
                    <UserMenu user={session.user} />
                  </div>
                </div>
              </header>

              <main className="flex-1 pb-8">{children}</main>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
