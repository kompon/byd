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
import { useLanguage } from "@/app/context/LanguageContext";
// Initial check and scroll listener
export const AppNavbar = () => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [siteLogo, setSiteLogo] = useState("");
    const { lang, setLang, t } = useLanguage();

    // Initial check and scroll listener
    useEffect(() => {
        const handleScroll = () => setIsScrolled(window.scrollY > 50);
        window.addEventListener("scroll", handleScroll);

        // Fetch Settings for Logo
        fetch("/api/settings")
            .then(res => res.json())
            .then(data => {
                if (data.site_logo_url) setSiteLogo(data.site_logo_url);
            })
            .catch(err => console.error("Failed to load settings", err));

        // Initial check
        handleScroll();
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    // Hardcoded menu items with translation
    const menuItems = [
        { name: t("รุ่นรถ", "Models"), href: "#models" },
        { name: t("รู้จักกับเรา", "About Us"), href: "#about" },
        { name: t("ข่าวสารและโปรโมชั่น", "News & Promotions"), href: "#news" },
        { name: t("ติดต่อ", "Contact"), href: "#contact" },
    ];

    const handleScroll = (e: React.MouseEvent<HTMLElement> | any, href: string) => {
        e.preventDefault();
        const targetId = href.replace("#", "");
        const elem = document.getElementById(targetId);
        if (elem) {
            window.scrollTo({
                top: elem.offsetTop - 80,
                behavior: "smooth",
            });
            setIsMenuOpen(false);
        } else if (href.startsWith('/')) {
            window.location.href = href;
        }
    };

    return (
        <Navbar
            onMenuOpenChange={setIsMenuOpen}
            isMenuOpen={isMenuOpen}
            className={`fixed top-0 w-full z-50 transition-all duration-500 ${isScrolled || isMenuOpen
                ? "bg-white/80 backdrop-blur-2xl shadow-lg shadow-slate-200/20 py-2"
                : "bg-transparent border-transparent py-6"
                }`}
            maxWidth="2xl"
            isBordered={false}
        >
            <NavbarContent>
                <NavbarMenuToggle
                    aria-label={isMenuOpen ? "Close menu" : "Open menu"}
                    className={`sm:hidden transition-colors ${isScrolled || isMenuOpen ? "text-slate-900" : "text-white"}`}
                />
                <NavbarBrand>
                    <Link href="/" className="flex items-center gap-3 group" onPress={() => window.scrollTo({ top: 0, behavior: "smooth" })}>
                        {siteLogo && (
                            <img src={siteLogo} alt="Logo" className="h-14 w-auto object-contain drop-shadow-sm" />
                        )}
                    </Link>
                </NavbarBrand>
            </NavbarContent>

            <NavbarContent className="hidden sm:flex gap-10" justify="center">
                {menuItems.map((item: any) => (
                    <NavbarItem key={item.name}>
                        <Link
                            href={item.href}
                            onClick={(e) => handleScroll(e, item.href)}
                            className={`transition-all duration-300 text-sm font-medium tracking-[0.15em] uppercase px-2 py-1 relative after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[1px] after:bg-brand-accent after:transition-all after:duration-300 hover:after:w-full ${isScrolled ? "text-text-heading hover:text-brand-accent" : "text-white hover:text-brand-accent drop-shadow-md"}`}
                        >
                            {item.name}
                        </Link>
                    </NavbarItem>
                ))}
            </NavbarContent>
            <NavbarContent justify="end" className="gap-4">
                <NavbarItem>
                    <Button
                        isIconOnly
                        variant="light"
                        className={`font-medium ${isScrolled ? "text-slate-900" : "text-white"}`}
                        onClick={() => setLang(lang === 'th' ? 'en' : 'th')}
                    >
                        {lang.toUpperCase()}
                    </Button>
                </NavbarItem>
                <NavbarItem>
                    <Button
                        as={Link}
                        href="#contact"
                        className={`rounded-full px-8 py-6 text-sm font-medium tracking-widest uppercase transition-all shadow-xl hover:-translate-y-0.5 ${isScrolled ? "bg-brand-primary text-white shadow-brand-primary/20" : "bg-white/10 backdrop-blur-md border border-white/30 text-white hover:bg-white hover:text-brand-primary shadow-black/20"}`}
                        variant="flat"
                        onClick={(e) => handleScroll(e, "#contact")}
                    >
                        {t("นัดหมายทดลองขับ", "Book Test Drive")}
                    </Button>
                </NavbarItem>
            </NavbarContent>

            <NavbarMenu className="bg-gradient-to-b from-white to-slate-50 backdrop-blur-xl pt-8 px-6">
                {menuItems.map((item: any, index: number) => (
                    <NavbarMenuItem key={`${item.name}-${index}`}>
                        <Link
                            className="w-full flex items-center justify-between text-xl font-semibold text-slate-800 tracking-wide py-4 border-b border-slate-200/50 hover:text-brand-primary hover:translate-x-2 transition-all duration-300 group"
                            href={item.href}
                            onClick={(e) => handleScroll(e, item.href)}
                        >
                            <span>{item.name}</span>
                            <span className="text-brand-primary opacity-0 group-hover:opacity-100 transition-opacity">→</span>
                        </Link>
                    </NavbarMenuItem>
                ))}
                <div className="mt-8 space-y-3">
                    <Button
                        as={Link}
                        href="#contact"
                        className="w-full bg-gradient-to-r from-brand-primary to-blue-700 text-white rounded-2xl py-7 text-base font-bold tracking-wider uppercase shadow-xl shadow-brand-primary/30 hover:shadow-2xl hover:scale-[1.02] transition-all"
                        onClick={(e) => handleScroll(e, "#contact")}
                    >
                        {t("นัดหมายทดลองขับ", "Book Test Drive")}
                    </Button>
                    <div className="flex justify-center pt-2">
                        <Button
                            isIconOnly
                            variant="light"
                            className="text-slate-600 font-bold text-sm"
                            onClick={() => setLang(lang === 'th' ? 'en' : 'th')}
                        >
                            {lang === 'th' ? '🇹🇭 TH' : '🇬🇧 EN'}
                        </Button>
                    </div>
                </div>
            </NavbarMenu>
        </Navbar>
    );
};
