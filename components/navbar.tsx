"use client";

import {
    Navbar,
    NavbarBrand,
    NavbarContent,
    NavbarItem,
    NavbarMenuToggle,
    NavbarMenu,
    NavbarMenuItem,
    Link,
    Button,
} from "@heroui/react";
import { useState, useEffect } from "react";
import { Car } from "lucide-react";
// Initial check and scroll listener
export const AppNavbar = () => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [menuItems, setMenuItems] = useState<{ name: string, href: string }[]>([]);

    // Initial check and scroll listener
    useEffect(() => {
        const handleScroll = () => setIsScrolled(window.scrollY > 50);
        window.addEventListener("scroll", handleScroll);

        // Fetch Menu Items
        fetch("/api/navbar-items")
            .then(res => res.json())
            .then(data => {
                if (Array.isArray(data)) {
                    setMenuItems(data.filter((item: any) => item.is_visible).map((item: any) => ({
                        name: item.label, href: item.href
                    })));
                }
            })
            .catch(err => console.error("Failed to load menu", err));

        // Initial check
        handleScroll();
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const handleScroll = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
        e.preventDefault();
        const element = document.querySelector(href);
        if (element) {
            element.scrollIntoView({ behavior: "smooth" });
            setIsMenuOpen(false);
        } else if (href.startsWith('/')) {
            window.location.href = href;
        }
    };

    return (
        <Navbar
            onMenuOpenChange={setIsMenuOpen}
            isMenuOpen={isMenuOpen}
            className={`fixed top-0 w-full z-50 transition-all duration-300 ${isScrolled || isMenuOpen ? "bg-black/80 backdrop-blur-md border-b border-white/5 py-2" : "bg-transparent border-transparent py-4"
                }`}
            maxWidth="xl"
            isBordered={isScrolled}
        >
            <NavbarContent>
                <NavbarMenuToggle
                    aria-label={isMenuOpen ? "Close menu" : "Open menu"}
                    className="sm:hidden text-white hover:text-gold-400 transition-colors"
                />
                <NavbarBrand>
                    <Link href="/" className="flex items-center gap-3 text-white group" onPress={() => window.scrollTo({ top: 0, behavior: "smooth" })}>
                        <div className="w-10 h-10 bg-gold-500/10 rounded-full flex items-center justify-center group-hover:bg-gold-500/20 transition-colors border border-gold-500/20">
                            <Car className="w-6 h-6 text-gold-400" />
                        </div>
                        <div className="flex flex-col">
                            <p className="font-bold text-xl tracking-widest text-white leading-none">PRIDE<span className="text-gold-400">AUTO</span></p>
                            <span className="text-[10px] text-gray-400 uppercase tracking-[0.2em]">Premium Showroom</span>
                        </div>
                    </Link>
                </NavbarBrand>
            </NavbarContent>

            <NavbarContent className="hidden sm:flex gap-8" justify="center">
                {menuItems.map((item: any) => (
                    <NavbarItem key={item.name}>
                        <Link
                            color="foreground"
                            href={item.href}
                            onClick={(e) => handleScroll(e, item.href)}
                            className="text-white/70 hover:text-gold-400 transition-colors text-sm font-medium tracking-wide"
                        >
                            {item.name}
                        </Link>
                    </NavbarItem>
                ))}
            </NavbarContent>

            <NavbarContent justify="end">
                <NavbarItem>
                    <Button
                        as={Link}
                        href="#contact"
                        onClick={(e) => handleScroll(e as any, "#contact")}
                        className="bg-gradient-to-r from-gold-400 to-gold-600 text-black font-bold shadow-lg shadow-gold-500/20 hover:shadow-gold-500/40 hover:scale-105 transition-all"
                        radius="full"
                        variant="solid"
                    >
                        จองทดลองขับ
                    </Button>
                </NavbarItem>
            </NavbarContent>

            <NavbarMenu className="bg-black/95 pt-12 gap-6">
                {menuItems.map((item: any, index: number) => (
                    <NavbarMenuItem key={`${item.name}-${index}`}>
                        <Link
                            className="w-full text-4xl font-thin text-white hover:text-gold-400 hover:pl-4 transition-all"
                            href={item.href}
                            size="lg"
                            onClick={(e) => handleScroll(e, item.href)}
                        >
                            {item.name}
                        </Link>
                    </NavbarMenuItem>
                ))}
            </NavbarMenu>
        </Navbar>
    );
};
