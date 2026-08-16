import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { blogs } from "../../../data/blogs";
import { BiAlarm } from "react-icons/bi";
import {
  FaFacebookF,
  FaTwitter,
  FaPinterestP,
  FaInstagram,
  FaVimeoV,
} from "react-icons/fa";

export default function Sidebar() {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  const categories = [...new Set(blogs.map((b) => b.category))];

  const getCount = (cat) => blogs.filter((b) => b.category === cat).length;

  const handleSearch = (e) => {
    e.preventDefault();
    if (!search.trim()) return;
    navigate(`/blog?search=${encodeURIComponent(search)}`);
    setOpen(false);
  };

  const goToCategory = (cat) => {
    navigate(`/blog?category=${cat}`);
    setOpen(false);
  };

  return (
    <aside className="space-y-6">
      <button
        onClick={() => setOpen(!open)}
        className="lg:hidden w-full border px-4 py-3 font-bodoni flex justify-between items-center border-gray-200 dark:border-gray-700 bg-white dark:bg-[#172235] text-[--navy] dark:text-white"
      >
        Filter & Search
        <span className="text-xl">{open ? "−" : "+"}</span>
      </button>

      <div className={`${open ? "block" : "hidden"} lg:block space-y-8`}>
        {/* SEARCH */}
        <form
          onSubmit={handleSearch}
          className="border p-4 md:p-6 border-gray-200 dark:border-gray-700 bg-white dark:bg-[#172235]"
        >
          <h3 className="font-bodoni mb-4 text-lg md:text-xl text-[--navy] dark:text-white">
            Search Here
          </h3>
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by title"
            className="w-full border px-4 py-2 text-sm focus:outline-none border-gray-200 dark:border-gray-700 bg-white dark:bg-[#101926] text-[--navy] dark:text-white placeholder:text-gray-400 dark:placeholder:text-gray-500"
          />
        </form>

        {/* CATEGORY */}
        <div className="border p-4 md:p-6 border-gray-200 dark:border-gray-700 bg-white dark:bg-[#172235]">
          <h3 className="font-bodoni mb-4 text-lg md:text-xl text-[--navy] dark:text-white">
            Category
          </h3>
          <ul className="space-y-2 text-sm">
            {categories.map((cat) => (
              <li
                key={cat}
                onClick={() => goToCategory(cat)}
                className="flex justify-between px-4 py-2 cursor-pointer hover:bg-gray-100 dark:hover:bg-green-900 text-[--navy] dark:text-white"
              >
                <span>{cat}</span>
                <span>({getCount(cat)})</span>
              </li>
            ))}
          </ul>
        </div>

        {/* LATEST POST */}
        <div className="border p-4 md:p-6 border-gray-200 dark:border-gray-700 bg-white dark:bg-[#172235]">
          <h3 className="font-bodoni mb-4 text-lg md:text-xl text-[--navy] dark:text-white">
            Latest Post
          </h3>
          <div className="space-y-4">
            {blogs.slice(0, 3).map((post) => (
              <Link
                key={post.id}
                to={`/blog/${post.id}`}
                onClick={() => setOpen(false)}
                className="flex gap-4 group"
              >
                <img
                  src={post.image}
                  alt={post.title}
                  className="w-24 h-16 object-cover rounded-md"
                />
                <div>
                  <p className="text-xs text-[--primary] flex items-center gap-1 mb-1 dark:text-white">
                    <BiAlarm />
                    {post.date}
                  </p>
                  <p className="text-sm group-hover:text-[--primary] dark:group-hover:text-green-300 transition text-[--navy] dark:text-white">
                    {post.title}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* FOLLOW US */}
        <div className="border p-4 md:p-6 border-gray-200 dark:border-gray-700 bg-white dark:bg-[#172235]">
          <h3 className="font-bodoni mb-4 text-lg md:text-xl text-[--navy] dark:text-white">
            Follow Us
          </h3>
          <div className="flex gap-3">
            {[FaFacebookF, FaTwitter, FaPinterestP, FaInstagram, FaVimeoV].map(
              (Icon, i) => (
                <span
                  key={i}
                  className="w-9 h-9 border flex items-center justify-center cursor-pointer hover:bg-[--primary] hover:text-white transition border-gray-200 dark:border-gray-700 text-[--navy] dark:text-white dark:hover:bg-green-700"
                >
                  <Icon size={14} />
                </span>
              )
            )}
          </div>
        </div>

        {/* TAGS */}
        <div className="border p-4 md:p-6 border-gray-200 dark:border-gray-700 bg-white dark:bg-[#172235]">
          <h3 className="font-bodoni mb-4 text-lg md:text-xl text-[--navy] dark:text-white">
            Tags
          </h3>
          <div className="flex flex-wrap gap-2 text-sm">
            {categories.map((cat) => (
              <span
                key={cat}
                onClick={() => goToCategory(cat)}
                className="border px-3 py-1 cursor-pointer hover:bg-[--primary] hover:text-white transition border-gray-200 dark:border-gray-700 text-[--navy] dark:text-white dark:hover:bg-green-900"
              >
                {cat}
              </span>
            ))}
          </div>
        </div>
      </div>
    </aside>
  );
}
