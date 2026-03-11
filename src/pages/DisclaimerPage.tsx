import { Helmet } from "react-helmet-async";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import HreflangTags from "@/components/HreflangTags";
import { Link } from "react-router-dom";

const DisclaimerPage = () => {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Helmet>
        <title>Disclaimer - MultiToolsA | Legal Information</title>
        <meta name="description" content="Read the MultiToolsA disclaimer. Understand the terms of use for our free online image tools, limitations of liability, and third-party content policies." />
        <link rel="canonical" href="https://multitoolsa.com/disclaimer" />
      </Helmet>
      <HreflangTags path="/disclaimer" />
      <Header />

      <main className="flex-1 py-12 md:py-16 px-4">
        <div className="container mx-auto max-w-4xl">
          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-8">Disclaimer</h1>
          <p className="text-muted-foreground mb-6">Last updated: March 11, 2026</p>

          <div className="prose prose-lg max-w-none space-y-8 text-foreground">
            <section>
              <h2 className="text-2xl font-bold mb-4">General Disclaimer</h2>
              <p className="text-muted-foreground leading-relaxed">
                The information and tools provided on MultiToolsA (multitoolsa.com) are offered on an "as is" and "as available" basis 
                for general informational and utility purposes only. While we strive to ensure our image processing tools function correctly 
                and deliver high-quality results, we make no warranties or representations of any kind, express or implied, about the completeness, 
                accuracy, reliability, suitability, or availability of the website or the tools provided.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">No Professional Advice</h2>
              <p className="text-muted-foreground leading-relaxed">
                The content on this website, including blog posts, tutorials, and guides about image editing, compression, and format conversion, 
                is provided for educational purposes only. It should not be considered professional graphic design, photography, or technical advice. 
                For critical or professional projects, we recommend consulting with qualified professionals.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">Tool Usage and Results</h2>
              <p className="text-muted-foreground leading-relaxed">
                Our image processing tools perform operations locally in your web browser. Results may vary depending on your input file quality, 
                browser capabilities, device performance, and selected settings. We do not guarantee specific output quality, file sizes, or processing speeds. 
                Always keep backup copies of your original files before processing.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">Limitation of Liability</h2>
              <p className="text-muted-foreground leading-relaxed">
                In no event shall MultiToolsA, its owners, operators, or contributors be liable for any direct, indirect, incidental, 
                consequential, special, or exemplary damages arising out of or in connection with your use of this website or its tools. 
                This includes, but is not limited to, loss of data, loss of profits, or damage to your device or files.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">Third-Party Content and Links</h2>
              <p className="text-muted-foreground leading-relaxed">
                Our website may contain links to third-party websites or services that are not owned or controlled by MultiToolsA. 
                We have no control over, and assume no responsibility for, the content, privacy policies, or practices of any third-party websites. 
                We strongly advise you to read the terms and privacy policies of any third-party websites you visit.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">Advertisements</h2>
              <p className="text-muted-foreground leading-relaxed">
                This website displays advertisements provided by third-party advertising networks, including Google AdSense. 
                These advertisements help us maintain and improve our free tools. We are not responsible for the content of third-party advertisements 
                or the products and services they promote. Ad presence does not imply endorsement by MultiToolsA.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">Intellectual Property</h2>
              <p className="text-muted-foreground leading-relaxed">
                Users are solely responsible for ensuring they have the right to process any images or files using our tools. 
                MultiToolsA does not claim ownership of any content you process. You should not use our tools to process copyrighted material 
                without proper authorization from the copyright holder.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">Accuracy of Information</h2>
              <p className="text-muted-foreground leading-relaxed">
                We make reasonable efforts to ensure the accuracy of information provided on this website, including file format specifications, 
                compression ratios, and tool capabilities. However, technology evolves rapidly, and some information may become outdated. 
                We encourage users to verify critical technical information from official sources.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">Changes to This Disclaimer</h2>
              <p className="text-muted-foreground leading-relaxed">
                We reserve the right to modify this disclaimer at any time. Changes will be effective immediately upon posting on this page. 
                Your continued use of the website after any changes constitutes acceptance of the updated disclaimer.
              </p>
            </section>

            <div className="border-t border-border pt-6 mt-8">
              <p className="text-muted-foreground">
                If you have any questions about this disclaimer, please <Link to="/contact" className="text-primary hover:underline">contact us</Link>. 
                Also see our <Link to="/terms" className="text-primary hover:underline">Terms of Service</Link> and{" "}
                <Link to="/privacy" className="text-primary hover:underline">Privacy Policy</Link>.
              </p>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default DisclaimerPage;
