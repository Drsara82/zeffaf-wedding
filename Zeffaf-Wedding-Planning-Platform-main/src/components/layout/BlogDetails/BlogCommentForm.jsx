import { useState } from "react";
import Input from "../../shared/Input";
import Button from "../../shared/Button";

export default function BlogCommentForm({ onAddComment }) {
  const [form, setForm] = useState({
    name: "",
    email: "",
    website: "",
    comment: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.comment) return;

    onAddComment({
      id: Date.now(),
      name: form.name,
      comment: form.comment,
      date: "Just now",
    });

    setForm({
      name: "",
      email: "",
      website: "",
      comment: "",
    });
  };

  return (
    <div className="mt-14 space-y-6 bg-white dark:bg-[#101926] p-6 rounded-md shadow-sm">
      <h3 className="font-bodoni text-[24px] text-[--navy] dark:text-green-200">
        Leave a Comment
      </h3>

      <form className="space-y-6" onSubmit={handleSubmit}>
        <div className="grid md:grid-cols-2 gap-6">
          <Input
            label="Name"
            name="name"
            value={form.name}
            onChange={handleChange}
            labelClass="text-[--navy] dark:text-green-200"
            inputClass="bg-white dark:bg-[#172235] text-black dark:text-white border dark:border-gray-700 placeholder:text-gray-400 dark:placeholder:text-gray-500"
            required
          />

          <Input
            label="Email"
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            labelClass="text-[--navy] dark:text-green-200"
            inputClass="bg-white dark:bg-[#172235] text-black dark:text-white border dark:border-gray-700 placeholder:text-gray-400 dark:placeholder:text-gray-500"
            required
          />
        </div>

        <Input
          label="Website"
          name="website"
          value={form.website}
          onChange={handleChange}
          labelClass="text-[--navy] dark:text-green-200"
          inputClass="bg-white dark:bg-[#172235] text-black dark:text-white border dark:border-gray-700 placeholder:text-gray-400 dark:placeholder:text-gray-500"
        />

        <textarea
          placeholder=" Leave Your Comment"
          name="comment"
          value={form.comment}
          onChange={handleChange}
          rows="6"
          className="w-full border dark:border-gray-700 rounded-md px-4 py-3 outline-none bg-white dark:bg-[#172235] text-black dark:text-white placeholder:text-gray-400 dark:placeholder:text-gray-500"
        />

     <Button type="submit" variant="green" icon>
  Post Comment
</Button>

      </form>
    </div>
  );
}
