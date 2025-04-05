"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Menu } from "lucide-react"
import { cn } from "@/lib/utils"
import { useMobile } from "@/hooks/use-mobile"

const navigation = [
  { name: "Home", href: "/" },
  { name: "Announcements", href: "/announcements" },
  { name: "Events", href: "/events" },
  { name: "Schedules", href: "/schedules" },
  { name: "Lost & Found", href: "/lost-found" },
]

export function Header() {
  const [open, setOpen] = useState(false)
  const pathname = usePathname()
  const isMobile = useMobile()

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-2">
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="pr-0">
              <div className="px-7">
                <Link href="/" className="flex items-center" onClick={() => setOpen(false)}>
                  <span className="font-bold text-xl">Campus Portal</span>
                </Link>
              </div>
              <nav className="flex flex-col gap-4 mt-8">
                {navigation.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    onClick={() => setOpen(false)}
                    className={cn(
                      "px-7 py-2 text-base font-medium transition-colors hover:text-foreground/80",
                      pathname === item.href ? "text-foreground" : "text-foreground/60",
                    )}
                  >
                    {item.name}
                  </Link>
                ))}
              </nav>
              <div className="flex flex-col gap-2 mt-8 px-7">
                <Link href="/auth/login" onClick={() => setOpen(false)}>
                  <Button variant="outline" className="w-full">
                    Login
                  </Button>
                </Link>
                <Link href="/auth/register" onClick={() => setOpen(false)}>
                  <Button className="w-full">Register</Button>
                </Link>
              </div>
            </SheetContent>
          </Sheet>

          <Link href="/" className="flex items-center">
            <span className="font-bold text-xl hidden md:inline-block">Campus Portal</span>
            <span className="font-bold text-xl md:hidden">CP</span>
          </Link>
        </div>

        <nav className="hidden md:flex items-center gap-6">
          {navigation.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className={cn(
                "text-sm font-medium transition-colors hover:text-foreground/80",
                pathname === item.href ? "text-foreground" : "text-foreground/60",
              )}
            >
              {item.name}
            </Link>
          ))}
        </nav>

        <div className="hidden md:flex items-center gap-2">
          <Link href="/auth/login">
            <Button variant="ghost">Login</Button>
          </Link>
          <Link href="/auth/register">
            <Button>Register</Button>
          </Link>
        </div>
      </div>
    </header>
  )
}

