import dynamic from "next/dynamic";
import AboutOasis from "../components/AboutOasis";
import Hero from "../components/Hero";
import GSAPBentoGrid from "../components/enhancedBentoGrid";
import NewAppBar from "../components/newAppBar";
import WhyComponent from "@/components/whyJoinOasis";

const ScrollWrapper = dynamic(() => import("../components/ScrollWrapper"), {
  ssr: false,
});

export default async function Home() {
  return (
    <div className="bg-black">
      <NewAppBar />
      <ScrollWrapper>
        <section data-scroll-section>
          <Hero />
        </section>
        <section id="bentoGrid" data-scroll-section>
          <GSAPBentoGrid />
        </section>
        <section data-scroll-section>
          {/* <AboutOasis /> */}
          <WhyComponent />
        </section>
      </ScrollWrapper>
    </div>
  );
}
