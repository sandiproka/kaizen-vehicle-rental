import { useState } from "react";
import emailjs from "@emailjs/browser";
import toast from "react-hot-toast";

const Contact = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!form.name || !form.email || !form.message) {
      toast.error("Please fill all fields");
      return;
    }

    setLoading(true);

    emailjs
      .send(
        "service_7z1eq2m",      // ✅ your service ID
        "template_1efx4gc",     // ✅ your template ID
        {
          name: form.name,
          email: form.email,
          message: form.message,
        },
        "fcR1nqfTYPYGwrwpD"     // ✅ your public key
      )
      .then(() => {
        toast.success("Message sent successfully!");
        setForm({ name: "", email: "", message: "" });
      })
      .catch((error) => {
        console.error(error);
        toast.error("Failed to send message");
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <div className="bg-zinc-950 text-white min-h-screen px-8 py-16 max-w-6xl mx-auto">

      {/* TITLE */}
      <h1 className="text-5xl font-bold mb-10">CONTACT US</h1>

      <div className="grid md:grid-cols-2 gap-10">

        {/* LEFT SIDE */}
        <div className="space-y-6">
          <p className="text-gray-400">
            Have questions or need assistance? Feel free to reach out to us.
          </p>

          <div>
            <p className="text-sm text-gray-400">Email</p>
            <p className="text-lg">sandiproka324@gmail.com</p>
          </div>

          <div>
            <p className="text-sm text-gray-400">Phone</p>
            <p className="text-lg">+977-9806640377</p>
          </div>

          <div>
            <p className="text-sm text-gray-400">Location</p>
            <p className="text-lg">Pokhara, Nepal</p>
          </div>
        </div>

        {/* FORM */}
        <form
          onSubmit={handleSubmit}
          className="bg-zinc-900 p-6 rounded-xl space-y-4"
        >
          <input
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
            placeholder="Your Name"
            className="w-full p-3 bg-zinc-800 rounded outline-none"
          />

          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            placeholder="Your Email"
            className="w-full p-3 bg-zinc-800 rounded outline-none"
          />

          <textarea
            name="message"
            value={form.message}
            onChange={handleChange}
            placeholder="Your Message"
            rows="5"
            className="w-full p-3 bg-zinc-800 rounded outline-none"
          />

          <button
            type="submit"
            className="w-full bg-amber-400 text-black py-3 rounded font-semibold hover:bg-amber-300 transition"
          >
            {loading ? "Sending..." : "Send Message"}
          </button>
        </form>

      </div>
    </div>
  );
};

export default Contact;