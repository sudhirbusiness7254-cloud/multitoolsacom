import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Helmet } from "react-helmet-async";
import { AdBottom, AdVideo, AdInline, AdExoticFat } from "@/components/ads/AdContainer";
import HreflangTags from "@/components/HreflangTags";

const Privacy = () => {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Helmet>
        <title>Privacy Policy - MultiToolsA | Your Data Protection Rights</title>
        <meta name="description" content="Learn how MultiToolsA protects your privacy. Our comprehensive privacy policy explains data collection, usage, security measures, and your rights." />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href="https://multitoolsa.com/privacy" />
      </Helmet>
      <HreflangTags path="/privacy" />
      
      <Header />
      
      <main className="flex-1 container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6">Privacy Policy</h1>
          
          <div className="bg-card rounded-xl p-8 shadow-lg border border-border space-y-8">
            <div className="border-b border-border pb-4">
              <p className="text-sm text-muted-foreground">Last updated: December 13, 2025</p>
              <p className="text-sm text-muted-foreground mt-2">Effective Date: December 1, 2025</p>
            </div>

            <section>
              <h2 className="text-2xl font-bold text-foreground mb-4">1. Introduction and Overview</h2>
              <p className="text-muted-foreground mb-4">
                Welcome to MultiToolsA ("we," "our," or "us"). We are committed to protecting your personal information and your right to privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website multitoolsa.com and use our image processing and conversion tools.
              </p>
              <p className="text-muted-foreground mb-4">
                MultiToolsA provides a comprehensive suite of free online image tools including image compression, format conversion, resizing, cropping, watermarking, metadata extraction, QR code generation, and various other image manipulation utilities. Our tools are designed to process your images directly in your browser, ensuring maximum privacy and security.
              </p>
              <p className="text-muted-foreground">
                By using our website and services, you consent to the data practices described in this policy. If you do not agree with the terms of this privacy policy, please do not access the site or use our services.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-foreground mb-4">2. Information We Collect</h2>
              
              <h3 className="text-xl font-semibold text-foreground mb-3">2.1 Information You Provide Directly</h3>
              <p className="text-muted-foreground mb-3">When you use our services, you may provide us with:</p>
              <ul className="list-disc list-inside space-y-2 text-muted-foreground mb-4">
                <li><strong>Contact Information:</strong> Email address, name, and phone number when you contact us through our contact form or email</li>
                <li><strong>Feedback and Communications:</strong> Any messages, feedback, suggestions, or other content you submit to us</li>
                <li><strong>Image Files:</strong> Images you upload for processing (these are processed locally in your browser and not stored on our servers)</li>
              </ul>

              <h3 className="text-xl font-semibold text-foreground mb-3">2.2 Information Collected Automatically</h3>
              <p className="text-muted-foreground mb-3">When you visit our website, we automatically collect certain information:</p>
              <ul className="list-disc list-inside space-y-2 text-muted-foreground mb-4">
                <li><strong>Device Information:</strong> Browser type and version, operating system, device type, screen resolution</li>
                <li><strong>Usage Data:</strong> Pages visited, time spent on pages, click patterns, features used</li>
                <li><strong>Network Information:</strong> IP address, internet service provider, approximate geographic location (country/region level)</li>
                <li><strong>Referral Information:</strong> How you arrived at our website (search engine, direct link, referral)</li>
              </ul>

              <h3 className="text-xl font-semibold text-foreground mb-3">2.3 Cookies and Tracking Technologies</h3>
              <p className="text-muted-foreground mb-3">We use cookies and similar tracking technologies to collect and store information:</p>
              <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                <li><strong>Essential Cookies:</strong> Required for the website to function properly</li>
                <li><strong>Analytics Cookies:</strong> Help us understand how visitors interact with our website</li>
                <li><strong>Advertising Cookies:</strong> Used by our advertising partners to deliver relevant advertisements</li>
                <li><strong>Preference Cookies:</strong> Remember your settings and preferences</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-foreground mb-4">3. How We Use Your Information</h2>
              <p className="text-muted-foreground mb-3">We use the collected information for various purposes:</p>
              <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                <li><strong>Service Delivery:</strong> To provide, maintain, and improve our image processing tools and services</li>
                <li><strong>Communication:</strong> To respond to your inquiries, provide customer support, and send service-related notifications</li>
                <li><strong>Analytics and Improvement:</strong> To analyze usage patterns, identify trends, and enhance user experience</li>
                <li><strong>Security:</strong> To detect, prevent, and address technical issues, fraud, and abuse</li>
                <li><strong>Advertising:</strong> To display relevant advertisements through Google AdSense and other advertising partners</li>
                <li><strong>Legal Compliance:</strong> To comply with applicable laws, regulations, and legal processes</li>
                <li><strong>Business Operations:</strong> To operate and manage our website and business activities</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-foreground mb-4">4. Image Processing and Data Security</h2>
              <p className="text-muted-foreground mb-4">
                <strong>Client-Side Processing:</strong> All image processing on MultiToolsA occurs directly in your web browser using JavaScript and HTML5 Canvas technology. This means your images are never uploaded to our servers for processing. The images remain on your device throughout the entire processing workflow.
              </p>
              <p className="text-muted-foreground mb-4">
                <strong>No Image Storage:</strong> We do not store, save, or retain any images that you process using our tools. Once you close your browser tab or navigate away from our website, all processed images are automatically cleared from browser memory.
              </p>
              <p className="text-muted-foreground">
                <strong>Security Measures:</strong> We implement industry-standard security measures including HTTPS encryption, secure hosting infrastructure, regular security audits, and access controls to protect any data transmitted through our website.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-foreground mb-4">5. Third-Party Services and Advertising</h2>
              
              <h3 className="text-xl font-semibold text-foreground mb-3">5.1 Google AdSense</h3>
              <p className="text-muted-foreground mb-4">
                We use Google AdSense to display advertisements on our website. Google AdSense uses cookies and web beacons to serve ads based on your prior visits to our website and other websites. Google's use of advertising cookies enables it and its partners to serve ads based on your visit to our site and/or other sites on the Internet. You may opt out of personalized advertising by visiting Google's Ads Settings at <a href="https://www.google.com/settings/ads" className="text-accent hover:underline" target="_blank" rel="noopener noreferrer">https://www.google.com/settings/ads</a>.
              </p>

              <h3 className="text-xl font-semibold text-foreground mb-3">5.2 Google Analytics</h3>
              <p className="text-muted-foreground mb-4">
                We use Google Analytics to analyze website traffic and usage patterns. Google Analytics collects information such as how often users visit our site, what pages they visit, and what other sites they used prior to coming to our site. We use this information solely to improve our website and services. You can opt out of Google Analytics by installing the Google Analytics Opt-out Browser Add-on.
              </p>

              <h3 className="text-xl font-semibold text-foreground mb-3">5.3 Other Third-Party Services</h3>
              <p className="text-muted-foreground">
                Our website may contain links to third-party websites, services, or social media platforms. These third parties have their own privacy policies, and we are not responsible for their practices. We encourage you to review the privacy policies of any third-party sites you visit.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-foreground mb-4">6. Data Sharing and Disclosure</h2>
              <p className="text-muted-foreground mb-3">We may share your information in the following circumstances:</p>
              <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                <li><strong>Service Providers:</strong> With trusted third-party service providers who assist us in operating our website, conducting our business, or serving our users</li>
                <li><strong>Advertising Partners:</strong> With advertising networks like Google AdSense for the purpose of serving relevant advertisements</li>
                <li><strong>Legal Requirements:</strong> When required by law, court order, or governmental authority</li>
                <li><strong>Protection of Rights:</strong> To protect our rights, privacy, safety, or property, or that of our users or others</li>
                <li><strong>Business Transfers:</strong> In connection with a merger, acquisition, or sale of all or a portion of our assets</li>
              </ul>
              <p className="text-muted-foreground mt-4">
                <strong>Important:</strong> We do not sell, trade, or rent your personal identification information to others for marketing purposes.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-foreground mb-4">7. Your Rights and Choices</h2>
              <p className="text-muted-foreground mb-3">Depending on your location, you may have the following rights:</p>
              <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                <li><strong>Access:</strong> Request access to the personal information we hold about you</li>
                <li><strong>Correction:</strong> Request correction of inaccurate or incomplete personal information</li>
                <li><strong>Deletion:</strong> Request deletion of your personal information</li>
                <li><strong>Portability:</strong> Request a copy of your data in a machine-readable format</li>
                <li><strong>Opt-Out:</strong> Opt out of marketing communications and personalized advertising</li>
                <li><strong>Cookie Control:</strong> Manage cookie preferences through your browser settings</li>
                <li><strong>Withdraw Consent:</strong> Withdraw consent for data processing where consent was the legal basis</li>
              </ul>
              <p className="text-muted-foreground mt-4">
                To exercise any of these rights, please contact us using the information provided in the Contact section below.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-foreground mb-4">8. Cookies Management</h2>
              <p className="text-muted-foreground mb-4">
                You can control and manage cookies in various ways. Most web browsers allow you to manage cookie preferences through browser settings. You can set your browser to refuse cookies, delete cookies, or alert you when cookies are being sent.
              </p>
              <p className="text-muted-foreground mb-4">
                Please note that if you disable cookies, some features of our website may not function properly. Essential cookies are required for the basic functionality of our website and cannot be disabled while using our services.
              </p>
              <p className="text-muted-foreground">
                For more information about cookies and how to manage them, visit <a href="https://www.allaboutcookies.org" className="text-accent hover:underline" target="_blank" rel="noopener noreferrer">www.allaboutcookies.org</a>.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-foreground mb-4">9. Children's Privacy</h2>
              <p className="text-muted-foreground mb-4">
                Our website and services are not intended for children under the age of 13. We do not knowingly collect personal information from children under 13. If we discover that a child under 13 has provided us with personal information, we will promptly delete such information from our systems.
              </p>
              <p className="text-muted-foreground">
                If you are a parent or guardian and believe that your child has provided us with personal information, please contact us immediately so that we can take appropriate action.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-foreground mb-4">10. International Data Transfers</h2>
              <p className="text-muted-foreground">
                Our website is operated globally, and your information may be transferred to, stored, and processed in countries other than your country of residence. These countries may have different data protection laws. By using our services, you consent to the transfer of your information to countries outside your country of residence, including countries that may have different data protection rules.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-foreground mb-4">11. Data Retention</h2>
              <p className="text-muted-foreground">
                We retain personal information only for as long as necessary to fulfill the purposes for which it was collected, including to satisfy any legal, accounting, or reporting requirements. The retention period may vary depending on the context and our legal obligations. When personal information is no longer needed, we will securely delete or anonymize it.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-foreground mb-4">12. Changes to This Privacy Policy</h2>
              <p className="text-muted-foreground">
                We may update this Privacy Policy from time to time to reflect changes in our practices, technology, legal requirements, or other factors. When we make material changes, we will notify you by updating the "Last Updated" date at the top of this policy. We encourage you to review this Privacy Policy periodically to stay informed about how we are protecting your information.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-foreground mb-4">13. Contact Us</h2>
              <p className="text-muted-foreground mb-4">
                If you have any questions, concerns, or requests regarding this Privacy Policy or our data practices, please contact us:
              </p>
              <div className="bg-muted/30 rounded-lg p-4 space-y-2 text-muted-foreground">
                <p><strong>MultiToolsA</strong></p>
                <p>Email: <a href="mailto:info@multitoolsa.com" className="text-accent hover:underline">info@multitoolsa.com</a></p>
                <p>Phone: <a href="tel:+9779763567489" className="text-accent hover:underline">+977 9763567489</a></p>
                <p>Website: <a href="https://multitoolsa.com" className="text-accent hover:underline">https://multitoolsa.com</a></p>
              </div>
              <p className="text-muted-foreground mt-4">
                We will respond to your inquiry within 30 days of receipt.
              </p>
            </section>

            <section className="border-t border-border pt-6">
              <h2 className="text-2xl font-bold text-foreground mb-4">14. Additional Information for Specific Regions</h2>
              
              <h3 className="text-xl font-semibold text-foreground mb-3">For European Union Residents (GDPR)</h3>
              <p className="text-muted-foreground mb-4">
                If you are a resident of the European Economic Area (EEA), you have certain data protection rights under the General Data Protection Regulation (GDPR). These include the right to access, rectify, or erase your personal data, the right to restrict or object to processing, and the right to data portability. You also have the right to lodge a complaint with a supervisory authority.
              </p>

              <h3 className="text-xl font-semibold text-foreground mb-3">For California Residents (CCPA)</h3>
              <p className="text-muted-foreground">
                If you are a California resident, you have specific rights under the California Consumer Privacy Act (CCPA). These include the right to know what personal information we collect, the right to delete your personal information, and the right to opt-out of the sale of your personal information. We do not sell personal information.
              </p>
            </section>
          </div>
          
          {/* Ads Section */}
          <div className="mt-10 space-y-4">
            <AdExoticFat />
            <AdVideo />
            <AdInline />
            <AdBottom />
            <AdExoticFat />
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Privacy;
