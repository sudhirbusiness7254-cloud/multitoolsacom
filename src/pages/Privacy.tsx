import Header from "@/components/Header";
import Footer from "@/components/Footer";

const Privacy = () => {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />
      
      <main className="flex-1 container mx-auto px-4 py-12">
        {/* <!-- AD PLACEMENT ZONE: Page Top Banner --> */}
        <div className="w-full max-w-4xl mx-auto bg-muted/20 border-2 border-dashed border-muted rounded-lg p-4 text-center text-muted-foreground mb-8">
          [Top Banner Ad Space - 728x90]
        </div>

        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6">Privacy Policy</h1>
          
          <div className="bg-card rounded-xl p-8 shadow-lg border border-border space-y-6">
            <p className="text-sm text-muted-foreground">Last updated: {new Date().toLocaleDateString()}</p>

            <section>
              <h2 className="text-2xl font-bold text-foreground mb-3">Introduction</h2>
              <p className="text-muted-foreground">
                At MultiToolsA, we respect your privacy and are committed to protecting your personal data. This privacy policy explains how we handle information when you use our YouTube tag and hashtag generator tool.
              </p>
            </section>

            {/* <!-- AD PLACEMENT ZONE: Mid-content --> */}
            <div className="w-full bg-muted/20 border-2 border-dashed border-muted rounded-lg p-4 text-center text-muted-foreground my-8">
              [Mid-content Ad Space - 336x280]
            </div>

            <section>
              <h2 className="text-2xl font-bold text-foreground mb-3">Information We Collect</h2>
              <p className="text-muted-foreground mb-3">
                When you use our service, we may collect:
              </p>
              <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                <li>YouTube video URLs you submit for tag generation</li>
                <li>Usage data and analytics to improve our service</li>
                <li>Browser type and device information</li>
                <li>IP address for security purposes</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-foreground mb-3">How We Use Your Information</h2>
              <p className="text-muted-foreground mb-3">
                We use the collected information to:
              </p>
              <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                <li>Generate tags and hashtags for your YouTube videos</li>
                <li>Improve and optimize our service</li>
                <li>Analyze usage patterns and trends</li>
                <li>Prevent abuse and maintain security</li>
                <li>Display relevant advertisements</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-foreground mb-3">Data Storage and Security</h2>
              <p className="text-muted-foreground">
                We implement appropriate security measures to protect your data. YouTube URLs and generated tags are not permanently stored on our servers. We use industry-standard encryption and security protocols to safeguard any temporarily processed data.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-foreground mb-3">Third-Party Services</h2>
              <p className="text-muted-foreground">
                Our website may contain advertisements and links to third-party services. These third parties have their own privacy policies, and we are not responsible for their practices. We recommend reviewing their privacy policies before interacting with their content.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-foreground mb-3">Cookies</h2>
              <p className="text-muted-foreground">
                We use cookies and similar technologies to enhance user experience, analyze site traffic, and serve personalized advertisements. You can control cookie preferences through your browser settings.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-foreground mb-3">Your Rights</h2>
              <p className="text-muted-foreground mb-3">
                You have the right to:
              </p>
              <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                <li>Access the information we have about you</li>
                <li>Request correction of inaccurate data</li>
                <li>Request deletion of your data</li>
                <li>Opt-out of marketing communications</li>
                <li>Disable cookies in your browser</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-foreground mb-3">Children's Privacy</h2>
              <p className="text-muted-foreground">
                Our service is not intended for children under 13 years of age. We do not knowingly collect personal information from children. If you believe we have collected information from a child, please contact us immediately.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-foreground mb-3">Changes to This Policy</h2>
              <p className="text-muted-foreground">
                We may update this privacy policy from time to time. Changes will be posted on this page with an updated revision date. We encourage you to review this policy periodically.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-foreground mb-3">Contact Us</h2>
              <p className="text-muted-foreground mb-3">
                If you have questions about this privacy policy, please contact us:
              </p>
              <div className="space-y-2 text-muted-foreground">
                <p>Email: <a href="mailto:info@multitoolsa.com" className="text-accent hover:underline">info@multitoolsa.com</a></p>
                <p>Phone: <a href="tel:+9779763567489" className="text-accent hover:underline">+977 9763567489</a></p>
              </div>
            </section>
          </div>

          {/* <!-- AD PLACEMENT ZONE: Bottom --> */}
          <div className="w-full bg-muted/20 border-2 border-dashed border-muted rounded-lg p-4 text-center text-muted-foreground mt-8">
            [Bottom Ad Space - 728x90]
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Privacy;
