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
    const timer = setTimeout(() => setLoading(false), 1000);
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

    if (!formData.name.trim()) return toast.error("Full Name is required");
    if (!formData.email.trim()) return toast.error("Email is required");

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      return toast.error("Please enter a valid email");
    }

    if (!formData.message.trim()) return toast.error("Message is required");

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

    window.location.href = `mailto:mosesmulumia@gmail.com?subject=${subject}&body=${body}`;

    toast.success("Opening your email to send inquiry ✨");

    setSubmitting(false);
    setFormData({ name: "", email: "", phone: "", message: "" });
  };

  return (
    <PageTransition>
      {loading ? (
        <div className="min-h-screen flex items-center justify-center bg-background">
          <div className="w-14 h-14 rounded-full border-4 border-muted border-t-primary animate-spin" />
        </div>
      ) : (
        <motion.div
          initial="hidden"
          animate="visible"
          variants={avalancheVariant}
          className="min-h-screen bg-background text-foreground"
        >
          <Header />

          {/* HERO */}
          <section className="text-center py-14 px-6">
            <motion.h1
              variants={avalancheVariant}
              className="mt-8 text-5xl font-light tracking-wide text-primary"
            >
              Contact Peppa Beauty
            </motion.h1>

            <motion.p
              variants={avalancheVariant}
              className="max-w-2xl mx-auto mt-5 text-muted-foreground leading-8"
            >
              Need help choosing skincare, tracking an order, or making a
              wholesale inquiry? Our Beauty Concierge is here to help you glow.
            </motion.p>
          </section>

          <main className="container mx-auto px-6 pb-20">
            <div className="grid md:grid-cols-2 gap-10">

              {/* FORM */}
              <motion.div
                variants={scrollVariant}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="bg-card text-card-foreground rounded-3xl shadow-lg p-8 border border-border"
              >
                <h2 className="text-2xl font-semibold text-primary mb-6">
                  Send Us a Message
                </h2>

                <form onSubmit={handleSubmit} className="space-y-6">

                  <div>
                    <Label htmlFor="name">Full Name *</Label>
                    <Input
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Your full name"
                      className="rounded-xl border border-border bg-background focus-visible:ring-2 focus-visible:ring-ring"
                    />
                  </div>

                  <div>
                    <Label htmlFor="email">Email *</Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="you@example.com"
                      className="rounded-xl border border-border bg-background focus-visible:ring-2 focus-visible:ring-ring"
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
                      className="rounded-xl border border-border bg-background focus-visible:ring-2 focus-visible:ring-ring"
                    />
                  </div>

                  <div>
                    <Label htmlFor="message">How Can We Help? *</Label>
                    <Textarea
                      id="message"
                      name="message"
                      rows={5}
                      value={formData.message}
                      onChange={handleChange}
                      placeholder="Ask about products, orders, skincare guidance..."
                      className="rounded-xl border border-border bg-background focus-visible:ring-2 focus-visible:ring-ring"
                    />
                  </div>

                  <Button
                    type="submit"
                    disabled={submitting}
                    className="w-full rounded-full bg-primary text-primary-foreground py-6 text-base hover:opacity-90"
                  >
                    {submitting ? "Sending..." : "Send Inquiry"}
                  </Button>

                </form>
              </motion.div>

              {/* INFO PANEL */}
              <motion.div
                variants={scrollVariant}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="bg-muted rounded-3xl shadow-lg p-8"
              >
                <h2 className="text-2xl font-semibold text-primary mb-8">
                  Beauty Concierge
                </h2>

                <div className="space-y-7">

                  {[ 
                    [Mail, "Email Support", "support@peppabeauty.com"],
                    [Phone, "Customer Care", "+254 112673764"],
                    [MapPin, "Location", "Nairobi, Kenya"],
                    [Package, "Order & Delivery Support", "Shipping updates, returns and product issues."],
                    [Sparkles, "Skincare Consultations", "Product recommendations based on skin concerns."]
                  ].map(([Icon, title, desc], i) => (
                    <div key={i} className="flex gap-4">
                      <Icon className="text-primary mt-1" />
                      <div>
                        <h3 className="font-semibold">{title}</h3>
                        <p className="text-muted-foreground">{desc}</p>
                      </div>
                    </div>
                  ))}

                </div>

                <div className="mt-10 p-6 rounded-2xl bg-card border border-border">
                  <h3 className="font-semibold text-primary mb-3">
                    Support Hours
                  </h3>

                  <div className="space-y-2 text-muted-foreground">
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