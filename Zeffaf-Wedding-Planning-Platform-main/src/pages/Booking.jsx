import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import PageHeader from "../components/shared/PageHeader";
import BrandingPartners from "../components/layout/Services/BrandingPartners";
import SharedButton from "../components/shared/Button";
import AnimatedPage from "../components/shared/AnimatedPage";
import ServicesTestimonials from "../components/layout/Services/ServicesTestimonials";
import SharedInput from "../components/shared/Input";
import booking from "../assets/images/book-appointment.jpg";





const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const phoneRegex = /^[0-9]{8,15}$/;

const Booking = () => {
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [bookedDates, setBookedDates] = useState([]);

  // Fetch booked dates on component mount
  useEffect(() => {
    fetch("http://localhost:3000/Apointments")
      .then((res) => res.json())
      .then((data) => {
        // Extract dates from the fetched appointments
        setBookedDates(data.map((item) => item.date).filter(Boolean));
      });
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;
    const newErrors = {};

    const name = form.name.value.trim();
    const email = form.email.value.trim();
    const phone = form.phone.value.trim();
    const date = form[3].value;
    const address = form[4].value.trim();
    const message = form[5].value.trim();

    if (!name) {
      newErrors.name = "Name is required";
    }

    if (!email) {
      newErrors.email = "Email is required";
    } else if (!emailRegex.test(email)) {
      newErrors.email = "Please enter a valid email address";
    }

    if (!phone) {
      newErrors.phone = "Phone number is required";
    } else if (!phoneRegex.test(phone)) {
      newErrors.phone = "Please enter a valid phone number";
    }

    if (!date) {
      newErrors.date = "Date is required";
    } else if (bookedDates.includes(date)) {
      newErrors.date = "This date is already booked";
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      setLoading(true);
      try {
        const response = await fetch("http://localhost:3000/Apointments", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name,
            email,
            phone,
            date,
            address,
            message,
            createdAt: new Date().toISOString(),
          }),
        });

        if (!response.ok) throw new Error("Failed to book appointment");
        toast.success("Your appointment has been booked successfully!");
        form.reset();
        setErrors({});
        setBookedDates((prev) => [...prev, date]);
      } catch (error) {
        toast.error(
          "There was an error submitting your booking. Please try again."
        );
      } finally {
        setLoading(false);
      }
    }
  };

  // check if a date is booked
  const isDateBooked = (dateStr) => bookedDates.includes(dateStr);

  return (
    <>
      <AnimatedPage>
        <PageHeader
          title="Book Appointment"
          breadcrumbs={[
            { label: "Home", href: "/" },
            { label: "Book Appointment" },
          ]}
        />

     <section className="w-full bg-white dark:bg-gray-900 py-16 px-4">
          <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
            <div>
              <img
                src={booking}
                alt="Booking"
                className="w-full h-[380px] md:h-[460px] object-cover rounded-2xl"
              />
            </div>

            <div>
              <h2 className="font-sail text-footer-green mb-2 text-xl ">
                Appointment
              </h2>

              <h1 className="text-3xl md:text-4xl font-semibold text-slate-800 mb-6">
                Say Hi To Our Wedding Planners.
              </h1>
              <p className="text-footer-light text-base mb-6 py-3 leading-relaxed">
                This appointment allows you to visit our location and meet with
                one of our wedding planners in person. During the meeting, you
                can discuss your wedding vision, explore available services,
                review options that fit your style and budget, and get
                professional guidance tailored to your needs. Booking in advance
                helps us prepare for your visit and dedicate the right time to
                understand your requirements and expectations.
              </p>

              <form
                onSubmit={handleSubmit}
                className="grid grid-cols-1 md:grid-cols-2 gap-4"
              >
                <div>
                  <SharedInput
                    type="email"
                    name="email"
                    placeholder="Your Email"
                    error={errors.email}
                  />

                  {errors.name && (
                    <p className="text-red-500 text-xs mt-1">{errors.name}</p>
                  )}
                </div>

                <div>
                  <SharedInput
                    type="email"
                    name="email"
                    placeholder="Your Email"
                    error={errors.email}
                  />

                  {errors.email && (
                    <p className="text-red-500 text-xs mt-1">{errors.email}</p>
                  )}
                </div>

                <div>
                  <SharedInput
                    name="phone"
                    type="tel"
                    placeholder="Phone Number"
                  />

                  {errors.phone && (
                    <p className="text-red-500 text-xs mt-1">{errors.phone}</p>
                  )}
                </div>

                <SharedInput
                  type="date"
                  name="date"
                  error={errors.date}
                  min={new Date().toISOString().split("T")[0]}
                  onChange={(e) => {
                    if (isDateBooked(e.target.value)) {
                      e.target.setCustomValidity("This date is already booked");
                      toast.error("This date is already booked");
                    } else {
                      e.target.setCustomValidity("");
                    }
                  }}
                />

                {errors.date && (
                  <p className="text-red-500 text-xs mt-1 md:col-span-2">
                    {errors.date}
                  </p>
                )}

                <SharedInput
                  name="address"
                  placeholder="Address"
                  className="md:col-span-2"
                />

                <textarea
                  name="message"
                  placeholder="Your Message"
                  className="
    w-full md:col-span-2 h-28 resize-none rounded-md px-4 py-3
    border border-[#E4E7EC] dark:border-gray-700
    bg-white dark:bg-[#172235]
    text-black dark:text-white
    placeholder:text-[#98A2B3] dark:placeholder:text-gray-500
    outline-none focus:border-primary/50 transition
  "
                />

                <SharedButton
                  variant="primary"
                  size="md"
                  icon={true}
                  type="submit"
                  className="md:col-span-2 mt-4 w-fit"
                  disabled={loading}
                >
                  {loading ? "Booking..." : "Book Now"}
                </SharedButton>
              </form>
            </div>
          </div>
        </section>

        <ServicesTestimonials />
        <BrandingPartners />
      </AnimatedPage>
    </>
  );
};

export default Booking;
