import { HeroSection } from "../components/layout/Home/HeroSection.jsx";
import { ServicesSection } from "../components/layout/Home/ServicesSection.jsx";
import { VideoSection } from "../components/layout/Home/VideoSection.jsx";
import AboutStats from "../components/layout/about/AboutStats";
import AboutIntroSection from "../components/layout/about/AboutIntroSection";
import OurWorkSection from "../components/layout/Home/OurWorkSection.jsx";
import SpecialProducts from "../components/layout/Home/SpecialProducts.jsx";
import BlogList from "../components/layout/Blog/BlogList";
import { blogs } from "../data/blogs";
import { useSearchParams } from "react-router-dom";
import AnimatedPage from "../components/shared/AnimatedPage";

function Home() {
  const [params] = useSearchParams();

  const search = params.get("search") || "";
  const category = params.get("category") || "";

  const filteredBlogs = blogs.filter((blog) => {
    const matchSearch = search
      ? blog.title.toLowerCase().includes(search.toLowerCase())
      : true;

    const matchCategory = category ? blog.category === category : true;

    return matchSearch && matchCategory;
  });

  return (
    <AnimatedPage>
      <main className="w-full overflow-hidden bg-white dark:bg-[#101926]">
        <HeroSection />
        <ServicesSection />
        <VideoSection />

        <div className="mt-8 max-w-[1200px] mx-auto px-4 md:px-6 lg:px-8 space-y-16 bg-white dark:bg-[#101926]">
          <AboutStats />
          <AboutIntroSection />
          <OurWorkSection />
        </div>

        {/* <div
        className="w-full"
        style={{
          backgroundImage: `url(${bannerBackGround})`,
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="container max-w-[1200px] mx-auto px-4 md:px-6 lg:px-8 h-12 flex items-center justify-between h-36 bg-black/40 text-white dark:bg-black/70 dark:text-white rounded-b-xl">
          <p className="text-sm font-medium">
            Extraordinary Events, Flawless Execution
          </p>
          <Button className="!bg-white !text-[#1E6B5C] !text-xs !font-semibold !px-3 !py-1 !rounded hover:!bg-gray-100 transition dark:!bg-green-600 dark:!text-white dark:hover:!bg-green-700">
            Contact Now
          </Button>
        </div>
      </div> */}

        <div className="mt-8 max-w-[1200px] mx-auto px-4 md:px-6 lg:px-8 space-y-16 bg-white dark:bg-[#101926]">
          <SpecialProducts />
          <BlogList mode="slider" blogs={filteredBlogs} />
        </div>
      </main>
    </AnimatedPage>
  );
}

export default Home;
