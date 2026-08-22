import HeroContent from "@/components/home/hero-section/HeroContent";
import { HeroSection } from "@/components/home/hero-section/HeroSection";
import { Header } from "@/components/home/header/Header";
import HiringMetricsSection from "@/components/home/metrics-section/HiringMetricsSection";
import ReviewsSection from "@/components/home/reviews-section/ReviewsSection";
import BrandsSection from "@/components/home/marquee-section/BrandsSection";
import { FAQSComponent } from "@/components/home/faqs-section/FAQSComponent";
import FormSection from "@/components/home/form-section/FormSection";
import FooterSection from "@/components/home/footer-section/FooterSection";
import BackgroundBeamsWithCollision from "@/components/shared/background-beams-with-collision";
import { FAQS_DATA } from "@/constants/FAQSData";

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <HeroSection>
          <div className="pt-20 sm:pt-18">
            <BackgroundBeamsWithCollision>
              <HeroContent />
            </BackgroundBeamsWithCollision>
          </div>
        </HeroSection>
        <BrandsSection />
        <HiringMetricsSection />
        <ReviewsSection />
        <FAQSComponent data={FAQS_DATA} multipleOpen={false} />
        <FormSection />
      </main>
      <FooterSection />
    </>
  );
}
