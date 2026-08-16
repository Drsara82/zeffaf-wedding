import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import PageHeader from "../components/shared/PageHeader";
import Sidebar from "../components/layout/BlogDetails/Sidebar";
import BlogCommentsList from "../components/layout/BlogDetails/BlogCommentList";
import BlogCommentForm from "../components/layout/BlogDetails/BlogCommentForm";
import AnimatedPage from "../components/shared/AnimatedPage";

import { blogs as blogsData } from "../data/blogs";

import { CgProfile } from "react-icons/cg";
import { MdDateRange } from "react-icons/md";
import { FaRegComment } from "react-icons/fa";
import {
  FaFacebookF,
  FaLinkedinIn,
  FaPinterestP,
} from "react-icons/fa";
import { BsTwitterX } from "react-icons/bs";

const NAV_LABEL_CLASS =
  "inline-block text-[12px] font-opensans font-semibold uppercase px-4 py-1 bg-white transition hover:bg-[--primary] hover:text-white mb-4";

const SHARE_ICONS = [
  { Icon: FaFacebookF, bg: "#1877F2" },
  { Icon: FaLinkedinIn, bg: "#0A66C2" },
  { Icon: BsTwitterX, bg: "#000000" },
  { Icon: FaPinterestP, bg: "#E60023" },
];

export default function BlogDetails() {
  const { id } = useParams();

  const blog = blogsData.find(
    (b) => String(b.id) === String(id)
  );

  if (!blog) {
    return (
      <div className="py-40 text-center bg-white dark:bg-[#101926]">
        Post not found
      </div>
    );
  }

  const currentIndex = blogsData.findIndex(
    (b) => String(b.id) === String(id)
  );

  const prevBlog =
    currentIndex > 0 ? blogsData[currentIndex - 1] : null;

  const nextBlog =
    currentIndex < blogsData.length - 1
      ? blogsData[currentIndex + 1]
      : null;

  return (
    <AnimatedPage>
      <PageHeader
        title={blog.title}
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Blog", href: "/blog" },
          { label: blog.breadcrumbTitle || "Blog Details" },
        ]}
      />

      <section className="max-w-7xl mx-auto px-4 py-20 bg-white dark:bg-[#101926]">
        <div className="grid lg:grid-cols-12 gap-12">
          <div className="lg:col-span-8 space-y-10">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6 }}
              className="overflow-hidden shadow-lg"
            >
              <img
                src={blog.image}
                alt={blog.title}
                className="w-full h-[450px] object-cover"
              />
            </motion.div>

            <div className="flex flex-wrap gap-6 text-sm border-b pb-6">
              <span className="flex items-center gap-1">
                <CgProfile /> Admin
              </span>
              <span className="flex items-center gap-1">
                <MdDateRange /> {blog.date}
              </span>
              <span className="flex items-center gap-1">
                <FaRegComment /> {blog.comments?.length || 0} Comments
              </span>
            </div>

            <div className="space-y-6">
              <h2 className="font-bodoni text-3xl">
                {blog.title}
              </h2>
              <p className="leading-8 whitespace-pre-line">
                {blog.content}
              </p>
            </div>

            {blog.quote && (
              <div className="border-l-4 border-[--primary] p-6 bg-gray-50:">
                <p className="italic text-lg">
                  "{blog.quote.text}"
                </p>
                <p className="mt-2 font-semibold">
                  — {blog.quote.author}
                </p>
              </div>
            )}

            <div className="flex items-center gap-4 pt-6 border-t">
              <span className="font-bold uppercase text-sm">
                Share
              </span>
              <div className="flex gap-2">
                {SHARE_ICONS.map(({ Icon, bg }, i) => (
                  <span
                    key={i}
                    style={{ backgroundColor: bg }}
                    className="w-9 h-9 flex items-center justify-center text-white rounded-full"
                  >
                    <Icon size={14} />
                  </span>
                ))}
              </div>
            </div>

            <div className="grid md:grid-cols-2 border mt-10">
              {prevBlog ? (
                <Link
                  to={`/blog/${prevBlog.id}`}
                  className="p-6 border-r"
                >
                  <span className={NAV_LABEL_CLASS}>
                    Previous Post
                  </span>
                  <p>{prevBlog.title}</p>
                </Link>
              ) : (
                <div className="p-6 opacity-40">
                  First Post
                </div>
              )}

              {nextBlog ? (
                <Link
                  to={`/blog/${nextBlog.id}`}
                  className="p-6 text-right"
                >
                  <span className={NAV_LABEL_CLASS}>
                    Next Post
                  </span>
                  <p>{nextBlog.title}</p>
                </Link>
              ) : (
                <div className="p-6 opacity-40 text-right">
                  Latest Post
                </div>
              )}
            </div>

            <div className="pt-10">
              <BlogCommentsList comments={blog.comments || []} />
              <div className="mt-10">
                <BlogCommentForm />
              </div>
            </div>
          </div>

          <div className="lg:col-span-4">
            <Sidebar />
          </div>
        </div>
      </section>
    </AnimatedPage>
  );
}
