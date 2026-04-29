import { useState, useEffect } from "react";
import { Header } from "@/components/Header";
import { FooterNew } from "@/components/FooterNew";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Mail, Phone, MapPin, Sparkles, Package } from "lucide-react";
import { PageTransition } from "@/components/PageTransition";
import toast from "react-hot-toast";
import { motion } from "framer-motion";

const avalancheVariant = {
  hidden: { opacity: 0, y: -100 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring" as const,
      damping: 18,
      stiffness: 110,
    },
  },
};

const scrollVariant = {
  hidden: { opacity: 0, y: 70 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring" as const,
      stiffness: 100,
      damping: 15,
    },
  },
};

const Contact = () => {
  const [loading, setLoading] = useState(true);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.name.trim()) {
      toast.error("Full Name is required");
      return;
    }

    if (!formData.email.trim()) {
      toast.error("Email is required");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(formData.email)) {
      toast.error("Please enter a valid email");
      return;
    }

    if (!formData.message.trim()) {
      toast.error("Message is required");
      return;
    }

    setSubmitting(true);

    const subject = encodeURIComponent(
      `Peppa Beauty Inquiry from ${formData.name}`
    );

    const body = encodeURIComponent(`
Name: ${formData.name}

Email: ${formData.email}

Phone: ${formData.phone}

Message:
${formData.message}
`);

    window.location.href =
      `mailto:mosesmulumia@gmail.com?subject=${subject}&body=${body}`;

    toast.success("Opening your email to send inquiry ✨");

    setSubmitting(false);

    setFormData({
      name: "",
      email: "",
      phone: "",
      message: "",
    });
  };

  return (
    <PageTransition>
      {loading ? (
        <div className="min-h-screen flex items-center justify-center bg-white">
          <div className="w-14 h-14 rounded-full border-4 border-rose-200 border-t-rose-500 animate-spin" />
        </div>
      ) : (
        <motion.div
          initial="hidden"
          animate="visible"
          variants={avalancheVariant}
          className="min-h-screen bg-gradient-to-br from-rose-50 via-white to-pink-50"
        >
          <Header />

          {/* Hero */}
          <section className="text-center py-14 px-6">
            <motion.h1
              variants={avalancheVariant}
              className="mt-8 text-5xl font-light tracking-wide text-rose-700"
            >
              Contact Peppa Beauty
            </motion.h1>

            <motion.p
              variants={avalancheVariant}
              className="max-w-2xl mx-auto mt-5 text-gray-600 leading-8"
            >
              Need help choosing skincare, tracking an order, or making a
              wholesale inquiry? Our Beauty Concierge is here to help you glow.
            </motion.p>
          </section>

          <main className="container mx-auto px-6 pb-20">
            <div className="grid md:grid-cols-2 gap-10">

              {/* CONTACT FORM */}
              <motion.div
                variants={scrollVariant}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="bg-white rounded-3xl shadow-xl p-8 border border-rose-100"
              >
                <h2 className="text-2xl font-semibold text-rose-700 mb-6">
                  Send Us a Message
                </h2>

                <form onSubmit={handleSubmit} className="space-y-6">

                  <div>
                    <Label htmlFor="name">Full Name *</Label>
                    <Input
                      id="name"
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Your full name"
                      className="rounded-xl border-rose-200 focus:border-rose-400"
                    />
                  </div>

                  <div>
                    <Label htmlFor="email">Email *</Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="you@example.com"
                      className="rounded-xl border-rose-200 focus:border-rose-400"
                    />
                  </div>

                  <div>
                    <Label htmlFor="phone">Phone</Label>
                    <Input
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="+254..."
                      className="rounded-xl border-rose-200 focus:border-rose-400"
                    />
                  </div>

                  <div>
                    <Label htmlFor="message">
                      How Can We Help? *
                    </Label>

                    <Textarea
                      id="message"
                      name="message"
                      required
                      rows={5}
                      value={formData.message}
                      onChange={handleChange}
                      placeholder="Ask about products, orders, skincare guidance..."
                      className="rounded-xl border-rose-200 focus:border-rose-400"
                    />
                  </div>

                  <Button
                    type="submit"
                    disabled={submitting}
                    className="w-full rounded-full bg-rose-600 hover:bg-rose-700 text-white py-6 text-base"
                  >
                    {submitting ? "Sending..." : "Send Inquiry"}
                  </Button>

                </form>
              </motion.div>

              {/* BEAUTY CONCIERGE */}
              <motion.div
                variants={scrollVariant}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="bg-gradient-to-br from-rose-100 to-pink-50 rounded-3xl shadow-xl p-8"
              >
                <h2 className="text-2xl font-semibold text-rose-700 mb-8">
                  Beauty Concierge
                </h2>

                <div className="space-y-7">

                  <div className="flex gap-4">
                    <Mail className="text-rose-500 mt-1" />
                    <div>
                      <h3 className="font-semibold">
                        Email Support
                      </h3>
                      <p className="text-gray-600">
                        support@peppabeauty.com
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <Phone className="text-rose-500 mt-1" />
                    <div>
                      <h3 className="font-semibold">
                        Customer Care
                      </h3>
                      <p className="text-gray-600">
                        +254 704 904 678
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <MapPin className="text-rose-500 mt-1" />
                    <div>
                      <h3 className="font-semibold">
                        Location
                      </h3>
                      <p className="text-gray-600">
                        Nairobi, Kenya
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <Package className="text-rose-500 mt-1" />
                    <div>
                      <h3 className="font-semibold">
                        Order & Delivery Support
                      </h3>
                      <p className="text-gray-600">
                        Shipping updates, returns and product issues.
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <Sparkles className="text-rose-500 mt-1" />
                    <div>
                      <h3 className="font-semibold">
                        Skincare Consultations
                      </h3>
                      <p className="text-gray-600">
                        Product recommendations based on skin concerns.
                      </p>
                    </div>
                  </div>

                </div>

                <div className="mt-10 p-6 rounded-2xl bg-white/80">
                  <h3 className="font-semibold text-rose-700 mb-3">
                    Support Hours
                  </h3>

                  <div className="space-y-2 text-gray-600">
                    <p>Monday – Friday: 8:30 AM – 6:00 PM</p>
                    <p>Saturday: 9:00 AM – 4:00 PM</p>
                    <p>Sunday: Online Orders Only</p>
                  </div>
                </div>

              </motion.div>

            </div>
          </main>

          <FooterNew />
        </motion.div>
      )}
    </PageTransition>
  );
};

export default Contact;