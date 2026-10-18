import { Helmet } from "react-helmet-async";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import HreflangTags from "@/components/HreflangTags";
import { Link } from "react-router-dom";

const DMCAPage = () => {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Helmet>
        <title>DMCA Policy - Convert | Copyright & Takedown Requests</title>
        <meta name="description" content="Convert DMCA policy. Learn how to file a copyright infringement notice or counter-notification. We respect intellectual property rights." />
        <link rel="canonical" href="https://multitoolsa.com/dmca" />
      </Helmet>
      <HreflangTags path="/dmca" />
      <Header />

      <main className="flex-1 py-12 md:py-16 px-4">
        <div className="container mx-auto max-w-4xl">
          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-8">DMCA Policy</h1>
          <p className="text-muted-foreground mb-6">Last updated: March 11, 2026</p>

          <div className="prose prose-lg max-w-none space-y-8 text-foreground">
            <section>
              <h2 className="text-2xl font-bold mb-4">Digital Millennium Copyright Act (DMCA) Notice</h2>
              <p className="text-muted-foreground leading-relaxed">
                Convert ("we", "us", or "our") respects the intellectual property rights of others and expects our users to do the same. 
                In accordance with the Digital Millennium Copyright Act of 1998 ("DMCA"), we will respond promptly to claims of copyright infringement 
                committed using our website (multitoolsa.com) that are reported to our designated copyright agent.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">Important Notice About Our Service</h2>
              <p className="text-muted-foreground leading-relaxed">
                Convert is a browser-based image processing platform. All image processing occurs entirely within the user's web browser. 
                We do not upload, store, transmit, or have access to any images or files that users process using our tools. 
                Because all processing is client-side, we have no ability to monitor or control the content that users process on their own devices.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">Filing a DMCA Notice</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                If you believe that content available on or through our website infringes your copyright, please submit a notification containing the following information:
              </p>
              <ol className="list-decimal list-inside space-y-3 text-muted-foreground">
                <li><strong className="text-foreground">Physical or electronic signature</strong> of a person authorized to act on behalf of the copyright owner.</li>
                <li><strong className="text-foreground">Identification of the copyrighted work</strong> claimed to have been infringed, or if multiple works, a representative list.</li>
                <li><strong className="text-foreground">Identification of the material</strong> that is claimed to be infringing, with sufficient detail so we can locate it on our website.</li>
                <li><strong className="text-foreground">Your contact information</strong>, including address, telephone number, and email address.</li>
                <li><strong className="text-foreground">A statement</strong> that you have a good faith belief that use of the material is not authorized by the copyright owner, its agent, or the law.</li>
                <li><strong className="text-foreground">A statement</strong> that the information in the notification is accurate, and under penalty of perjury, that you are authorized to act on behalf of the copyright owner.</li>
              </ol>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">Counter-Notification</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                If you believe that your content was removed or disabled by mistake or misidentification, you may file a counter-notification containing:
              </p>
              <ol className="list-decimal list-inside space-y-3 text-muted-foreground">
                <li>Your physical or electronic signature.</li>
                <li>Identification of the material that has been removed and the location where it appeared before removal.</li>
                <li>A statement under penalty of perjury that you have a good faith belief that the material was removed as a result of mistake or misidentification.</li>
                <li>Your name, address, telephone number, and a statement that you consent to the jurisdiction of the federal court in your district.</li>
              </ol>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">Designated Copyright Agent</h2>
              <p className="text-muted-foreground leading-relaxed">
                All DMCA notices and counter-notifications should be sent to our designated copyright agent:
              </p>
              <div className="bg-card border border-border rounded-xl p-6 mt-4">
                <p className="text-foreground font-semibold">Convert Copyright Agent</p>
                <p className="text-muted-foreground">Email: <a href="mailto:info@multitoolsa.com" className="text-primary hover:underline">info@multitoolsa.com</a></p>
                <p className="text-muted-foreground">Subject Line: "DMCA Notice" or "DMCA Counter-Notification"</p>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">Repeat Infringers</h2>
              <p className="text-muted-foreground leading-relaxed">
                In appropriate circumstances, Convert will disable and/or terminate the accounts of users who are repeat infringers, 
                in accordance with the DMCA and other applicable laws.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">Good Faith</h2>
              <p className="text-muted-foreground leading-relaxed">
                Please note that under Section 512(f) of the DMCA, any person who knowingly materially misrepresents that material 
                is infringing may be subject to liability for damages, including costs and attorneys' fees.
              </p>
            </section>

            <div className="border-t border-border pt-6 mt-8">
              <p className="text-muted-foreground">
                For general inquiries or other matters, please visit our <Link to="/contact" className="text-primary hover:underline">Contact page</Link>.
              </p>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default DMCAPage;
