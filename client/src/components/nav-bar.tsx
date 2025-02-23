import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Search, Home, PlusCircle, Database, Menu } from "lucide-react";
import { useState, useEffect } from "react";

export function NavBar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  // Close mobile menu when location changes
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname]);

  return (
    <nav className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center justify-between">
        <Link to="/" className="flex items-center space-x-2 ml-4">
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
          <Link to="/add">
            <Button variant="ghost" className="flex items-center gap-2">
              <PlusCircle className="h-4 w-4" />
              Add Record
            </Button>
          </Link>
          <Link to="/search">
            <Button variant="ghost" className="flex items-center gap-2">
              <Search className="h-4 w-4" />
              Search Records
            </Button>
          </Link>
          <Link to="/data-export">
            <Button variant="ghost" className="flex items-center gap-2">
              <Database className="h-4 w-4" />
              Data Export
            </Button>
          </Link>
        </div>

        {/* Mobile navigation */}
        {mobileMenuOpen && (
          <div className="absolute top-14 left-0 right-0 bg-background border-b md:hidden">
            <div className="container py-4 space-y-2">
              <Link to="/">
                <Button variant="ghost" className="w-full justify-start gap-2">
                  <Home className="h-4 w-4" />
                  Home
                </Button>
              </Link>
              <Link to="/add">
                <Button variant="ghost" className="w-full justify-start gap-2">
                  <PlusCircle className="h-4 w-4" />
                  Add Record
                </Button>
              </Link>
              <Link to="/search">
                <Button variant="ghost" className="w-full justify-start gap-2">
                  <Search className="h-4 w-4" />
                  Search Records
                </Button>
              </Link>
              <Link to="/data-export">
                <Button variant="ghost" className="w-full justify-start gap-2">
                  <Database className="h-4 w-4" />
                  Data Export
                </Button>
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}