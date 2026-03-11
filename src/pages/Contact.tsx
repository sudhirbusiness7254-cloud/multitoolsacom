import { Helmet } from "react-helmet-async";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Mail, Phone, MessageSquare, Clock, MapPin, CheckCircle, HelpCircle, FileText, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import HreflangTags from "@/components/HreflangTags";
import { Link } from "react-router-dom";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { supabase } from "@/integrations/supabase/client";
import { useState } from "react";

const Contact = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    const formData = new FormData(e.currentTarget);
    const data = {
      name: formData.get('name') as string,
      email: formData.get('email') as string,
      inquiry_type: formData.get('inquiry-type') as string,
      subject: formData.get('subject') as string,
      tool_used: (formData.get('tool-used') as string) || null,
      message: formData.get('message') as string,
    };

    const { error } = await supabase.from('contact_messages').insert(data);
    
    if (error) {
      toast.error("Something went wrong. Please try again or email us directly.");
    } else {
      toast.success("Thank you for your message! We'll get back to you within 24-48 hours.");
      e.currentTarget.reset();
    }
    setIsSubmitting(false);
  };

  const supportTopics = [
    {
      question: "How do I use the image compression tools?",
      answer: "Simply upload your image using the drag-and-drop interface or click to select a file. Choose your compression quality level (we recommend 70-85% for web images), then click 'Compress'. Your optimized image will be ready to download instantly. All processing happens in your browser for complete privacy."
    },
    {
      question: "Why can't I upload my file?",
      answer: "Make sure your file is in a supported format (JPG, PNG, WebP, GIF, BMP, TIFF, or HEIC). Very large files (over 50MB) may be slow to process depending on your device's memory. Try closing other browser tabs or using a smaller test file first. If problems persist, try a different browser."
    },
    {
      question: "Is my data safe with MultiToolsA?",
      answer: "Absolutely. All image processing happens locally in your browser using JavaScript. Your files are never uploaded to any server. When you close the browser tab, all temporary data is automatically cleared. We have no access to your images at any point. Read our Privacy Policy for complete details."
    },
    {
      question: "Do you offer technical support?",
      answer: "Yes! Our support team responds to all inquiries within 24-48 business hours. For urgent issues, please include 'URGENT' in your subject line. We provide support in English, and we're happy to help with any questions about using our tools effectively."
    },
    {
      question: "Can I request a new feature?",
      answer: "We love hearing feature requests! Use the contact form below and select 'Feature Request' as your inquiry type. Include as much detail as possible about what you'd like to see. We review all suggestions and prioritize features based on user demand."
    }
  ];

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Helmet>
        <title>Contact Us - MultiToolsA | Customer Support & Help Center</title>
        <meta name="description" content="Contact MultiToolsA for support, questions, or feedback about our free online image tools. Get help within 24-48 hours. We're here to assist with image conversion, compression, and editing needs." />
        <link rel="canonical" href="https://multitoolsa.com/contact" />
        <meta property="og:title" content="Contact Us - MultiToolsA Support" />
        <meta property="og:description" content="Get in touch with the MultiToolsA team for questions, feedback, or support. Response within 24-48 hours." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://multitoolsa.com/contact" />
        
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "ContactPage",
            "name": "Contact MultiToolsA",
            "description": "Contact page for MultiToolsA customer support and inquiries",
            "url": "https://multitoolsa.com/contact",
            "mainEntity": {
              "@type": "Organization",
              "name": "MultiToolsA",
              "email": "info@multitoolsa.com",
              "telephone": "+977-9763567489",
              "contactPoint": {
                "@type": "ContactPoint",
                "contactType": "customer support",
                "email": "info@multitoolsa.com",
                "availableLanguage": "English",
                "hoursAvailable": {
                  "@type": "OpeningHoursSpecification",
                  "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
                  "opens": "09:00",
                  "closes": "18:00"
                }
              }
            }
          })}
        </script>
      </Helmet>
      <HreflangTags path="/contact" />
      
      <Header />
      
      <main className="flex-1">
        {/* Hero Section */}
        <section className="py-12 md:py-16 bg-gradient-hero relative overflow-hidden">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-primary/10 rounded-full blur-3xl pointer-events-none" />
          
          <div className="container mx-auto px-4 relative z-10 text-center">
            <h1 className="text-3xl md:text-5xl font-bold text-foreground mb-4">Contact Us</h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Have questions about our free image tools? Need help with a specific feature? 
              Our support team is here to help you get the most out of MultiToolsA.
            </p>
          </div>
        </section>

        {/* Quick Help Links */}
        <section className="py-8 bg-secondary/30">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <Link to="/faq" className="flex items-center gap-3 p-4 bg-card rounded-xl border border-border hover:border-primary/50 transition-colors">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
                  <HelpCircle className="w-5 h-5" />
                </div>
                <div>
                  <div className="font-semibold text-sm">FAQ</div>
                  <div className="text-xs text-muted-foreground">Quick answers</div>
                </div>
              </Link>
              <Link to="/about" className="flex items-center gap-3 p-4 bg-card rounded-xl border border-border hover:border-primary/50 transition-colors">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
                  <FileText className="w-5 h-5" />
                </div>
                <div>
                  <div className="font-semibold text-sm">About Us</div>
                  <div className="text-xs text-muted-foreground">Our story</div>
                </div>
              </Link>
              <Link to="/privacy" className="flex items-center gap-3 p-4 bg-card rounded-xl border border-border hover:border-primary/50 transition-colors">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
                  <Shield className="w-5 h-5" />
                </div>
                <div>
                  <div className="font-semibold text-sm">Privacy</div>
                  <div className="text-xs text-muted-foreground">Data protection</div>
                </div>
              </Link>
              <Link to="/all-tools" className="flex items-center gap-3 p-4 bg-card rounded-xl border border-border hover:border-primary/50 transition-colors">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
                  <CheckCircle className="w-5 h-5" />
                </div>
                <div>
                  <div className="font-semibold text-sm">All Tools</div>
                  <div className="text-xs text-muted-foreground">100+ tools</div>
                </div>
              </Link>
            </div>
          </div>
        </section>

        
        {/* Main Contact Section */}
        <section className="py-12 md:py-16 px-4">
          <div className="container mx-auto max-w-5xl">
            <div className="grid md:grid-cols-2 gap-8">
              {/* Contact Info */}
              <div className="space-y-6">
                <div className="bg-card rounded-2xl p-6 md:p-8 shadow-lg border border-border">
                  <h2 className="text-2xl font-bold text-foreground mb-6">Get in Touch</h2>
                  <p className="text-muted-foreground mb-6">
                    We value every message from our users. Whether you have a question about our image tools, 
                    need technical assistance, want to report a bug, or have a suggestion for improvement, 
                    we're here to listen and help.
                  </p>

                  <div className="space-y-5">
                    <div className="flex items-start gap-4">
                      <div className="bg-primary/10 p-3 rounded-lg">
                        <Mail className="w-5 h-5 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-foreground mb-1">Email</h3>
                        <a 
                          href="mailto:info@multitoolsa.com" 
                          className="text-primary hover:underline"
                        >
                          info@multitoolsa.com
                        </a>
                        <p className="text-sm text-muted-foreground mt-1">
                          Best for detailed inquiries and feature requests
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start gap-4">
                      <div className="bg-primary/10 p-3 rounded-lg">
                        <Phone className="w-5 h-5 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-foreground mb-1">Phone</h3>
                        <a 
                          href="tel:+9779763567489" 
                          className="text-primary hover:underline"
                        >
                          +977 9763567489
                        </a>
                        <p className="text-sm text-muted-foreground mt-1">
                          Available during business hours (UTC+5:45)
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start gap-4">
                      <div className="bg-primary/10 p-3 rounded-lg">
                        <Clock className="w-5 h-5 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-foreground mb-1">Response Time</h3>
                        <p className="text-foreground">Within 24-48 hours</p>
                        <p className="text-sm text-muted-foreground mt-1">
                          Monday - Friday, 9:00 AM - 6:00 PM (NPT)
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start gap-4">
                      <div className="bg-primary/10 p-3 rounded-lg">
                        <MapPin className="w-5 h-5 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-foreground mb-1">Location</h3>
                        <p className="text-foreground">Nepal</p>
                        <p className="text-sm text-muted-foreground mt-1">
                          Serving users worldwide with free image tools
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* What to Expect */}
                <div className="bg-card rounded-2xl p-6 border border-border">
                  <h3 className="font-bold text-foreground mb-4">What to Expect</h3>
                  <ul className="space-y-3">
                    <li className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                      <span className="text-muted-foreground text-sm">Confirmation email within 24 hours</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                      <span className="text-muted-foreground text-sm">Detailed response addressing your specific question</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                      <span className="text-muted-foreground text-sm">Follow-up support if needed</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                      <span className="text-muted-foreground text-sm">Feature requests logged and reviewed</span>
                    </li>
                  </ul>
                </div>
              </div>

              {/* Contact Form */}
              <div className="bg-card rounded-2xl p-6 md:p-8 shadow-lg border border-border">
                <h2 className="text-2xl font-bold text-foreground mb-6">Send us a Message</h2>
                
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-foreground mb-2">
                        Your Name *
                      </label>
                      <Input
                        id="name"
                        type="text"
                        placeholder="John Doe"
                        required
                      />
                    </div>
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-foreground mb-2">
                        Email Address *
                      </label>
                      <Input
                        id="email"
                        type="email"
                        placeholder="john@example.com"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="inquiry-type" className="block text-sm font-medium text-foreground mb-2">
                      Inquiry Type *
                    </label>
                    <select 
                      id="inquiry-type" 
                      className="w-full h-10 px-3 rounded-md border border-input bg-background text-foreground"
                      required
                    >
                      <option value="">Select an option</option>
                      <option value="general">General Question</option>
                      <option value="support">Technical Support</option>
                      <option value="feature">Feature Request</option>
                      <option value="bug">Bug Report</option>
                      <option value="feedback">Feedback</option>
                      <option value="business">Business Inquiry</option>
                    </select>
                  </div>

                  <div>
                    <label htmlFor="subject" className="block text-sm font-medium text-foreground mb-2">
                      Subject *
                    </label>
                    <Input
                      id="subject"
                      type="text"
                      placeholder="Brief description of your inquiry"
                      required
                    />
                  </div>

                  <div>
                    <label htmlFor="tool-used" className="block text-sm font-medium text-foreground mb-2">
                      Which tool were you using? (Optional)
                    </label>
                    <Input
                      id="tool-used"
                      type="text"
                      placeholder="e.g., JPEG Compressor, PNG to JPG Converter"
                    />
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-foreground mb-2">
                      Message *
                    </label>
                    <Textarea
                      id="message"
                      placeholder="Please provide as much detail as possible. For bug reports, include the steps to reproduce the issue and your browser/device information."
                      className="min-h-[150px]"
                      required
                    />
                  </div>

                  <Button 
                    type="submit" 
                    className="w-full bg-primary hover:bg-primary/90 text-primary-foreground"
                  >
                    Send Message
                  </Button>
                  
                  <p className="text-xs text-muted-foreground text-center">
                    By submitting this form, you agree to our{" "}
                    <Link to="/privacy" className="text-primary hover:underline">Privacy Policy</Link>.
                  </p>
                </form>
              </div>
            </div>
          </div>
        </section>

        {/* Common Questions */}
        <section className="py-12 md:py-16 px-4 bg-gradient-dark">
          <div className="container mx-auto max-w-4xl">
            <h2 className="text-2xl md:text-3xl font-bold mb-4 text-center">Common Support Questions</h2>
            <p className="text-muted-foreground text-center mb-8 max-w-2xl mx-auto">
              Before reaching out, check if your question is answered below. 
              For more detailed answers, visit our <Link to="/faq" className="text-primary hover:underline">complete FAQ page</Link>.
            </p>
            
            <Accordion type="single" collapsible className="space-y-2">
              {supportTopics.map((topic, i) => (
                <AccordionItem key={i} value={`topic-${i}`} className="bg-card border border-border rounded-xl px-4">
                  <AccordionTrigger className="text-left hover:no-underline">
                    {topic.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground">
                    {topic.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </section>


        {/* Additional Resources */}
        <section className="py-12 md:py-16 px-4">
          <div className="container mx-auto max-w-4xl text-center">
            <h2 className="text-2xl md:text-3xl font-bold mb-4">Need More Help?</h2>
            <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
              Explore our resources to learn more about image editing, optimization, and how to use our tools effectively.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link 
                to="/blog"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-primary text-primary-foreground font-medium hover:bg-primary/90 transition-colors"
              >
                Read Our Blog
              </Link>
              <Link 
                to="/faq"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-secondary text-secondary-foreground font-medium hover:bg-secondary/80 transition-colors"
              >
                Browse FAQ
              </Link>
              <Link 
                to="/all-tools"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-secondary text-secondary-foreground font-medium hover:bg-secondary/80 transition-colors"
              >
                Explore Tools
              </Link>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default Contact;