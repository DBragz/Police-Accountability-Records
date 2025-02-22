import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Search, Home } from "lucide-react";

export function NavBar() {
  return (
    <nav className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center">
        <div className="mr-4 hidden md:flex">
          <Link href="/" className="mr-6 flex items-center space-x-2">
            <span className="hidden font-bold sm:inline-block">
              Police Accountability Records
            </span>
          </Link>
          <div className="flex gap-6 md:gap-10">
            <Link href="/">
              <Button variant="ghost" className="flex items-center gap-2">
                <Home className="h-4 w-4" />
                Home
              </Button>
            </Link>
            <Link href="/search">
              <Button variant="ghost" className="flex items-center gap-2">
                <Search className="h-4 w-4" />
                Search Records
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
