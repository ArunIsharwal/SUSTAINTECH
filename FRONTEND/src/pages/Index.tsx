// import Header from "@/components/landing/Header";
// import HeroSection from "@/components/landing/HeroSection";
// import FeaturesSection from "@/components/landing/FeaturesSection";
// import FlowsSection from "@/components/landing/FlowsSection";
// import CTASection from "@/components/landing/CTASection";
// import Footer from "@/components/landing/Footer";

// const Index = () => {
//   return (
//     <div className="min-h-screen">
//       <Header />
//       <main>
//         <HeroSection />
//         <FeaturesSection />
//         <FlowsSection />
//         <CTASection />
//       </main>
//       <Footer />
//     </div>
//   );
// };

// export default Index;



import Header from "@/components/landing/Header";
import HeroSection from "@/components/landing/HeroSection";
import FeaturesSection from "@/components/landing/FeaturesSection";
import FlowsSection from "@/components/landing/FlowsSection";
import CTASection from "@/components/landing/CTASection";
import Footer from "@/components/landing/Footer";
import FloatingChatbot from "@/components/chatbot/FloatingChatbot"; // ✅ ADD

const Index = () => {
  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <HeroSection />
        <FeaturesSection />
        <FlowsSection />
        <CTASection />
      </main>
      <Footer />

      {/* ✅ Chatbot ONLY on landing page */}
      <FloatingChatbot />
    </div>
  );
};

export default Index;
