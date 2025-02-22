import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Search, Home, PlusCircle, Menu } from "lucide-react";
import { useState } from "react";

export function NavBar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <nav className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center justify-between">
        <Link href="/" className="flex items-center space-x-2">
          <span className="font-bold">
            Police Accountability Records
          </span>
        </Link>

        {/* Mobile menu button */}
        <Button
          variant="ghost"
          className="md:hidden"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          <Menu className="h-6 w-6" />
        </Button>

        {/* Desktop navigation */}
        <div className="hidden md:flex md:gap-6">
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
          <Link href="/add">
            <Button variant="ghost" className="flex items-center gap-2">
              <PlusCircle className="h-4 w-4" />
              Add Record
            </Button>
          </Link>
        </div>

        {/* Mobile navigation */}
        {mobileMenuOpen && (
          <div className="absolute top-14 left-0 right-0 bg-background border-b md:hidden">
            <div className="container py-4 space-y-2">
              <Link href="/">
                <Button variant="ghost" className="w-full justify-start gap-2">
                  <Home className="h-4 w-4" />
                  Home
                </Button>
              </Link>
              <Link href="/search">
                <Button variant="ghost" className="w-full justify-start gap-2">
                  <Search className="h-4 w-4" />
                  Search Records
                </Button>
              </Link>
              <Link href="/add">
                <Button variant="ghost" className="w-full justify-start gap-2">
                  <PlusCircle className="h-4 w-4" />
                  Add Record
                </Button>
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}