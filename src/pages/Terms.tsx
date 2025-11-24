import Header from "@/components/Header";
import Footer from "@/components/Footer";

const Terms = () => {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />
      
      <main className="flex-1 container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6">Terms and Conditions</h1>
          
          <div className="bg-card rounded-xl p-8 shadow-lg border border-border space-y-6">
            <p className="text-sm text-muted-foreground">Last updated: {new Date().toLocaleDateString()}</p>

            <section>
              <h2 className="text-2xl font-bold text-foreground mb-3">Agreement to Terms</h2>
              <p className="text-muted-foreground">
                By accessing and using MultiToolsA's YouTube tag and hashtag generator, you agree to be bound by these Terms and Conditions. If you disagree with any part of these terms, you may not use our service.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-foreground mb-3">Use of Service</h2>
              <p className="text-muted-foreground mb-3">
                Our tag generator tool is provided free of charge for personal and commercial use. You agree to:
              </p>
              <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                <li>Use the service only for lawful purposes</li>
                <li>Not attempt to interfere with or disrupt the service</li>
                <li>Not use automated systems to access the service excessively</li>
                <li>Not misrepresent your affiliation with any person or entity</li>
                <li>Comply with YouTube's Terms of Service when using generated tags</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-foreground mb-3">Intellectual Property</h2>
              <p className="text-muted-foreground">
                The MultiToolsA website, including its original content, features, and functionality, is owned by MultiToolsA and is protected by international copyright, trademark, and other intellectual property laws. The generated tags and hashtags are provided for your use without restriction.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-foreground mb-3">Disclaimer of Warranties</h2>
              <p className="text-muted-foreground mb-3">
                Our service is provided "as is" and "as available" without warranties of any kind. We do not guarantee that:
              </p>
              <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                <li>The service will be uninterrupted or error-free</li>
                <li>Generated tags will improve your video performance</li>
                <li>Results will be accurate or reliable at all times</li>
                <li>The service will meet your specific requirements</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-foreground mb-3">Limitation of Liability</h2>
              <p className="text-muted-foreground">
                MultiToolsA and its affiliates will not be liable for any indirect, incidental, special, consequential, or punitive damages resulting from your use or inability to use the service. This includes, but is not limited to, loss of profits, data, or other intangible losses.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-foreground mb-3">User Responsibilities</h2>
              <p className="text-muted-foreground mb-3">
                When using our generated tags and hashtags, you are responsible for:
              </p>
              <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                <li>Ensuring they are appropriate for your content</li>
                <li>Complying with YouTube's community guidelines</li>
                <li>Not using misleading or inappropriate tags</li>
                <li>Verifying relevance to your video content</li>
                <li>Following all applicable laws and regulations</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-foreground mb-3">Third-Party Links and Advertisements</h2>
              <p className="text-muted-foreground">
                Our service may contain links to third-party websites and display advertisements. We are not responsible for the content, accuracy, or practices of these external sites. Your interactions with advertisers are solely between you and the advertiser.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-foreground mb-3">Modifications to Service</h2>
              <p className="text-muted-foreground">
                We reserve the right to modify, suspend, or discontinue any aspect of the service at any time without notice. We may also update these terms periodically. Continued use of the service after changes constitutes acceptance of the new terms.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-foreground mb-3">Termination</h2>
              <p className="text-muted-foreground">
                We may terminate or suspend your access to the service immediately, without prior notice, for any reason, including violation of these Terms and Conditions.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-foreground mb-3">Governing Law</h2>
              <p className="text-muted-foreground">
                These terms shall be governed by and construed in accordance with applicable laws, without regard to conflict of law provisions. Any disputes shall be resolved in the appropriate courts.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-foreground mb-3">Contact Information</h2>
              <p className="text-muted-foreground mb-3">
                For questions about these Terms and Conditions, please contact:
              </p>
              <div className="space-y-2 text-muted-foreground">
                <p>Email: <a href="mailto:info@multitoolsa.com" className="text-accent hover:underline">info@multitoolsa.com</a></p>
                <p>Phone: <a href="tel:+9779763567489" className="text-accent hover:underline">+977 9763567489</a></p>
              </div>
            </section>
          </div>

        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Terms;
