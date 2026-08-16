import React, { useEffect, useState } from "react";
import Loader from "../components/shared/Loader";
import { useSearchParams, Link } from "react-router-dom";
import PageHeader from "../components/shared/PageHeader";
import BrandingPartners from "../components/layout/Services/BrandingPartners";
import BlogList from "../components/layout/Blog/BlogList";
import { blogs as blogsData } from "../data/blogs";
import AnimatedPage from "../components/shared/AnimatedPage";

export default function Blog() {
  const [params] = useSearchParams();
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  const search = params.get("search") || "";
  const category = params.get("category") || "";

  useEffect(() => {
    setBlogs(blogsData);
    setLoading(false);
  }, []);

  const filteredBlogs = blogs.filter((blog) => {
    const matchSearch = search
      ? blog.title.toLowerCase().includes(search.toLowerCase())
      : true;

    const matchCategory = category
      ? blog.category === category
      : true;

    return matchSearch && matchCategory;
  });

  if (loading) {
    return (
      <div className="flex justify-center items-center py-32 bg-white dark:bg-[#101926]">
        <Loader size={60} />
      </div>
    );
  }

  return (
    <AnimatedPage>
      <PageHeader
        title="Blog"
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Blog", href: "/blog" },
        ]}
      />

      <div className="bg-white dark:bg-[#101926] min-h-[50vh] overflow-x-hidden">
        {filteredBlogs.length === 0 ? (
          <section className="py-20 text-center">
            <h2 className="dark:text-white text-2xl mb-4">
              No results found
            </h2>

            <Link
              to="/blog"
              className="px-6 py-2 border border-[--primary]
                         text-[--primary] hover:bg-[--primary]
                         hover:text-white transition"
            >
              Back to Blog
            </Link>
          </section>
        ) : (
          <BlogList mode="grid" blogs={filteredBlogs} />
        )}
      </div>

      <BrandingPartners />
    </AnimatedPage>
  );
}
