import { useParams, useNavigate } from "react-router-dom";
import { Header } from "@/components/Header";
import { FooterNew } from "@/components/FooterNew";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import { eventsData } from "@/data/eventsData";
import { toast } from "react-hot-toast"; // ✅ Make sure react-hot-toast is installed

export const EventDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    ticketType: "",
    mpesaRef: "",
  });

  const ticket = eventsData.find((event) => event.id === Number(id));

  useEffect(() => {
    if (!ticket) navigate("/");
  }, [ticket, navigate]);

  if (!ticket) return null;

  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => setIsModalOpen(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const { fullName, email, mpesaRef } = formData;
    if (!fullName || !email || !mpesaRef) {
      toast.error("Please fill all required fields!");
      return;
    }

    toast.success(
      "Thank you for ticket booking! You will receive an email with your ticket."
    );
    setIsModalOpen(false);

    // Optional: send booking info to your backend here
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <div className="container mx-auto py-10 px-4">
        <div className="flex flex-col lg:flex-row items-start gap-10">
          {/* Event image */}
          <motion.img
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            src={ticket.image}
            alt={ticket.title}
            className="w-full lg:w-1/2 rounded-2xl shadow-md object-cover"
          />

          {/* Event details */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="flex-1 bg-white p-8 rounded-2xl shadow-md"
          >
            <h2 className="text-2xl font-bold mb-4">{ticket.title}</h2>

            <p className="text-gray-700 mb-4">{ticket.description}</p>

            <div className="mb-4">
              <span className="font-semibold text-gray-800">Date:</span>{" "}
              {ticket.date}
            </div>

            <div className="mb-4">
              <span className="font-semibold text-gray-800">Venue:</span>{" "}
              {ticket.venue}
            </div>

            <div className="mb-4">
              <span className="font-semibold text-gray-800">Includes:</span>
              <ul className="list-disc list-inside text-gray-700">
                {ticket.inclusives?.map((item: string, i: number) => (
                  <li key={i}>{item}</li>
                ))}
              </ul>
            </div>

            <div className="mb-4">
              <span className="font-semibold text-gray-800">Contact:</span>{" "}
              {ticket.contact}
            </div>

            {/* Payment section */}
            <div className="mt-8">
              <p className="text-gray-600 mb-3">
                After completing your M-PESA payment, enter your details below
                to receive your ticket.
              </p>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleOpenModal}
                className="bg-green-500 text-white px-6 py-3 rounded-full font-medium shadow hover:bg-green-600"
              >
                Click to Enter Details
              </motion.button>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <motion.div
            className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="bg-white rounded-xl p-8 w-11/12 sm:w-[450px] shadow-lg relative"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
            >
              <button
                onClick={handleCloseModal}
                className="absolute top-3 right-4 text-gray-500 hover:text-gray-700 text-xl"
              >
                ✕
              </button>

              <h3 className="text-xl font-bold mb-6 text-center text-green-600">
                Complete Your Ticket Booking
              </h3>

              <form onSubmit={handleFormSubmit} className="space-y-4">
                <div>
                  <label className="block text-gray-700 font-medium mb-2">
                    Full Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:outline-none"
                    placeholder="Enter your full name"
                    required
                  />
                </div>
                 <div>
                  <label className="block text-gray-700 font-medium mb-2">
                  Tel  <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:outline-none"
                    placeholder="Enter Phone Number"
                    required
                  />
                </div>

                <div>
                  <label className="block text-gray-700 font-medium mb-2">
                    Email Address <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:outline-none"
                    placeholder="Enter your email"
                    required
                  />
                </div>

                <div>
                  <label className="block text-gray-700 font-medium mb-2">
                    Ticket Type (optional)
                  </label>
                  <select
                    name="ticketType"
                    value={formData.ticketType}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:outline-none"
                  >
                    <option value="">Select ticket type</option>
                    <option value="Standard">Standard</option>
                    <option value="VIP">VIP</option>
                    <option value="VVIP">VVIP</option>
                  </select>
                </div>

                <div>
                  <label className="block text-gray-700 font-medium mb-2">
                    M-PESA Payment Reference <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="mpesaRef"
                    value={formData.mpesaRef}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:outline-none"
                    placeholder="Enter your M-PESA reference number"
                    required
                  />
                </div>

                <motion.button
                  type="submit"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-full bg-green-600 text-white py-3 rounded-lg font-semibold shadow hover:bg-green-700"
                >
                 Submit Details
                </motion.button>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <FooterNew />
    </div>
  );
};
