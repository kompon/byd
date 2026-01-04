import { AppNavbar } from "@/components/navbar";
import { HeroSection } from "@/components/hero";
import { CarModels } from "@/components/car-models";
import { NewsPromo } from "@/components/news-promo";
import { ContactSection } from "@/components/contact";
import { Footer } from "@/components/footer";
import { PopupModal } from "@/components/popup-modal";

export default function Home() {
  return (
    <main className="min-h-screen bg-black overflow-x-hidden">
      <PopupModal />
      <AppNavbar />
      <HeroSection />
      <CarModels />
      <NewsPromo />
      <ContactSection />
      <Footer />
    </main>
  );
}
