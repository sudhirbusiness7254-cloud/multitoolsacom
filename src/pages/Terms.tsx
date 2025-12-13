import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Helmet } from "react-helmet-async";

const Terms = () => {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Helmet>
        <title>Terms and Conditions - MultiToolsA | Service Agreement</title>
        <meta name="description" content="Read MultiToolsA's terms and conditions. Understand your rights, responsibilities, and our service agreement for using our free online image tools." />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href="https://multitoolsa.com/terms" />
      </Helmet>
      
      <Header />
      
      <main className="flex-1 container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6">Terms and Conditions</h1>
          
          <div className="bg-card rounded-xl p-8 shadow-lg border border-border space-y-8">
            <div className="border-b border-border pb-4">
              <p className="text-sm text-muted-foreground">Last updated: December 13, 2025</p>
              <p className="text-sm text-muted-foreground mt-2">Effective Date: December 1, 2025</p>
            </div>

            <section>
              <h2 className="text-2xl font-bold text-foreground mb-4">1. Agreement to Terms</h2>
              <p className="text-muted-foreground mb-4">
                Welcome to MultiToolsA. These Terms and Conditions ("Terms") govern your access to and use of our website located at multitoolsa.com ("Website") and all related services, features, content, and applications offered by MultiToolsA ("Services").
              </p>
              <p className="text-muted-foreground mb-4">
                By accessing or using our Website and Services, you acknowledge that you have read, understood, and agree to be bound by these Terms. If you do not agree to these Terms, you must not access or use our Website or Services.
              </p>
              <p className="text-muted-foreground">
                These Terms constitute a legally binding agreement between you ("User," "you," or "your") and MultiToolsA ("Company," "we," "us," or "our"). We reserve the right to modify these Terms at any time, and such modifications will be effective immediately upon posting on the Website.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-foreground mb-4">2. Description of Services</h2>
              <p className="text-muted-foreground mb-4">
                MultiToolsA provides a comprehensive suite of free online image processing tools and utilities, including but not limited to:
              </p>
              <ul className="list-disc list-inside space-y-2 text-muted-foreground mb-4">
                <li><strong>Image Compression:</strong> JPEG, PNG, WebP, GIF, and TIFF compression tools to reduce file sizes</li>
                <li><strong>Format Conversion:</strong> Convert images between various formats including JPEG, PNG, WebP, GIF, BMP, and more</li>
                <li><strong>Image Resizing:</strong> Resize images by exact dimensions, percentage, or fit-to-box options</li>
                <li><strong>Image Cropping:</strong> Crop images with various aspect ratios and custom selections</li>
                <li><strong>Watermarking:</strong> Add text or image watermarks to protect your images</li>
                <li><strong>Image Rotation and Flipping:</strong> Rotate and flip images in various orientations</li>
                <li><strong>Metadata Tools:</strong> View, edit, and remove image metadata and EXIF data</li>
                <li><strong>QR Code Tools:</strong> Generate and decode QR codes</li>
                <li><strong>Photo Filters:</strong> Apply various filters and effects to images</li>
                <li><strong>Image Combining:</strong> Merge multiple images into collages or combined layouts</li>
                <li><strong>Drawing Tools:</strong> Add annotations, shapes, and drawings to images</li>
                <li><strong>Base64 Conversion:</strong> Convert images to and from Base64 encoding</li>
              </ul>
              <p className="text-muted-foreground">
                All image processing is performed locally in your web browser using client-side technology. Your images are not uploaded to our servers for processing, ensuring maximum privacy and security.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-foreground mb-4">3. User Eligibility</h2>
              <p className="text-muted-foreground mb-4">
                By using our Services, you represent and warrant that:
              </p>
              <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                <li>You are at least 13 years of age</li>
                <li>If you are under 18, you have obtained parental or guardian consent to use the Services</li>
                <li>You have the legal capacity to enter into these Terms</li>
                <li>You are not prohibited by any applicable law from using the Services</li>
                <li>You will provide accurate and complete information when required</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-foreground mb-4">4. Acceptable Use Policy</h2>
              <p className="text-muted-foreground mb-4">
                You agree to use our Services only for lawful purposes and in accordance with these Terms. You agree NOT to:
              </p>
              <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                <li>Use the Services for any illegal, fraudulent, or harmful purpose</li>
                <li>Upload, process, or distribute content that is obscene, defamatory, threatening, or violates any law</li>
                <li>Infringe upon or violate the intellectual property rights of others</li>
                <li>Upload malware, viruses, or any harmful code to our Website</li>
                <li>Attempt to gain unauthorized access to our systems or other users' data</li>
                <li>Use automated systems, bots, or scripts to access the Services excessively</li>
                <li>Interfere with or disrupt the integrity or performance of the Services</li>
                <li>Attempt to reverse engineer, decompile, or disassemble any part of our Services</li>
                <li>Remove or alter any proprietary notices or labels on the Services</li>
                <li>Use the Services to harvest or collect user information without consent</li>
                <li>Impersonate any person or entity or misrepresent your affiliation</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-foreground mb-4">5. Intellectual Property Rights</h2>
              
              <h3 className="text-xl font-semibold text-foreground mb-3">5.1 Our Intellectual Property</h3>
              <p className="text-muted-foreground mb-4">
                The Website, including its entire contents, features, functionality, design, graphics, logos, button icons, images, audio clips, digital downloads, data compilations, software, and the compilation thereof, are owned by MultiToolsA or its licensors and are protected by international copyright, trademark, patent, trade secret, and other intellectual property laws.
              </p>

              <h3 className="text-xl font-semibold text-foreground mb-3">5.2 Your Content</h3>
              <p className="text-muted-foreground mb-4">
                You retain all ownership rights to the images and content you process using our Services. We do not claim any ownership rights over your content. By using our Services, you represent and warrant that you own or have the necessary rights to use the content you process.
              </p>

              <h3 className="text-xl font-semibold text-foreground mb-3">5.3 Limited License</h3>
              <p className="text-muted-foreground">
                We grant you a limited, non-exclusive, non-transferable, revocable license to access and use our Website and Services for personal or commercial purposes, subject to these Terms. This license does not include the right to modify, copy, distribute, sell, or commercially exploit any content from our Website.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-foreground mb-4">6. User Responsibilities</h2>
              <p className="text-muted-foreground mb-4">
                When using our Services, you are responsible for:
              </p>
              <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                <li>Ensuring you have the legal right to use and process any images you upload</li>
                <li>Maintaining the confidentiality of any sensitive images you process</li>
                <li>Complying with all applicable laws and regulations</li>
                <li>Backing up your original images before processing (we recommend keeping original copies)</li>
                <li>Verifying the output meets your requirements before using processed images</li>
                <li>Using appropriate image formats and settings for your intended purpose</li>
                <li>Respecting copyright and intellectual property rights of others</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-foreground mb-4">7. Disclaimer of Warranties</h2>
              <p className="text-muted-foreground mb-4">
                OUR SERVICES ARE PROVIDED ON AN "AS IS" AND "AS AVAILABLE" BASIS WITHOUT WARRANTIES OF ANY KIND, EITHER EXPRESS OR IMPLIED. TO THE FULLEST EXTENT PERMITTED BY LAW, WE DISCLAIM ALL WARRANTIES, INCLUDING BUT NOT LIMITED TO:
              </p>
              <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                <li>WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE</li>
                <li>WARRANTIES OF NON-INFRINGEMENT</li>
                <li>WARRANTIES REGARDING ACCURACY, RELIABILITY, OR COMPLETENESS OF RESULTS</li>
                <li>WARRANTIES THAT THE SERVICES WILL BE UNINTERRUPTED, TIMELY, SECURE, OR ERROR-FREE</li>
                <li>WARRANTIES REGARDING THE QUALITY OF ANY PRODUCTS, SERVICES, OR INFORMATION OBTAINED</li>
              </ul>
              <p className="text-muted-foreground mt-4">
                We do not warrant that the results obtained from the use of our Services will be accurate, reliable, or meet your specific requirements. Any reliance on our Services is at your own risk.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-foreground mb-4">8. Limitation of Liability</h2>
              <p className="text-muted-foreground mb-4">
                TO THE MAXIMUM EXTENT PERMITTED BY APPLICABLE LAW, MULTITOOLSA AND ITS OFFICERS, DIRECTORS, EMPLOYEES, AGENTS, AFFILIATES, SUCCESSORS, AND ASSIGNS SHALL NOT BE LIABLE FOR:
              </p>
              <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                <li>Any indirect, incidental, special, consequential, or punitive damages</li>
                <li>Loss of profits, revenue, data, goodwill, or other intangible losses</li>
                <li>Damages resulting from unauthorized access to or alteration of your transmissions or data</li>
                <li>Damages resulting from any third-party content or conduct on the Website</li>
                <li>Damages resulting from interruption or cessation of our Services</li>
                <li>Any bugs, viruses, or other harmful code transmitted through our Services</li>
              </ul>
              <p className="text-muted-foreground mt-4">
                IN NO EVENT SHALL OUR TOTAL LIABILITY TO YOU EXCEED THE AMOUNT OF ONE HUNDRED US DOLLARS ($100.00). SOME JURISDICTIONS DO NOT ALLOW THE EXCLUSION OR LIMITATION OF CERTAIN DAMAGES, SO SOME OF THE ABOVE LIMITATIONS MAY NOT APPLY TO YOU.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-foreground mb-4">9. Indemnification</h2>
              <p className="text-muted-foreground">
                You agree to indemnify, defend, and hold harmless MultiToolsA and its officers, directors, employees, agents, affiliates, successors, and assigns from and against any and all claims, damages, obligations, losses, liabilities, costs, debts, and expenses (including attorney's fees) arising from: (a) your use of the Services; (b) your violation of these Terms; (c) your violation of any third-party rights, including intellectual property rights; (d) any content you process using our Services; or (e) your violation of any applicable law or regulation.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-foreground mb-4">10. Third-Party Links and Advertisements</h2>
              <p className="text-muted-foreground mb-4">
                Our Website may contain links to third-party websites, advertisements, or services that are not owned or controlled by MultiToolsA. We display advertisements through Google AdSense and other advertising partners.
              </p>
              <p className="text-muted-foreground mb-4">
                We have no control over and assume no responsibility for the content, privacy policies, or practices of any third-party websites or services. Your interactions with third-party advertisements or websites are solely between you and that third party.
              </p>
              <p className="text-muted-foreground">
                We encourage you to review the terms and privacy policies of any third-party websites or services you visit or use.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-foreground mb-4">11. Service Availability and Modifications</h2>
              <p className="text-muted-foreground mb-4">
                We reserve the right to:
              </p>
              <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                <li>Modify, suspend, or discontinue any aspect of the Services at any time without notice</li>
                <li>Impose limits on certain features or restrict access to parts of the Services</li>
                <li>Update, improve, or change the functionality of our tools</li>
                <li>Remove content or features that we determine violate these Terms</li>
              </ul>
              <p className="text-muted-foreground mt-4">
                We will not be liable to you or any third party for any modification, suspension, or discontinuation of the Services.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-foreground mb-4">12. Termination</h2>
              <p className="text-muted-foreground mb-4">
                We may terminate or suspend your access to the Services immediately, without prior notice or liability, for any reason, including if you breach these Terms. Upon termination, your right to use the Services will cease immediately.
              </p>
              <p className="text-muted-foreground">
                All provisions of these Terms that by their nature should survive termination shall survive, including ownership provisions, warranty disclaimers, indemnity provisions, and limitations of liability.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-foreground mb-4">13. Governing Law and Dispute Resolution</h2>
              <p className="text-muted-foreground mb-4">
                These Terms shall be governed by and construed in accordance with the laws of the jurisdiction in which MultiToolsA operates, without regard to its conflict of law provisions.
              </p>
              <p className="text-muted-foreground">
                Any dispute arising from or relating to these Terms or the Services shall be resolved through good faith negotiations. If the dispute cannot be resolved through negotiations, it shall be submitted to binding arbitration in accordance with applicable arbitration rules, or resolved in the courts of competent jurisdiction.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-foreground mb-4">14. Severability</h2>
              <p className="text-muted-foreground">
                If any provision of these Terms is found to be unenforceable or invalid by a court of competent jurisdiction, such provision shall be modified to the minimum extent necessary to make it enforceable, or if modification is not possible, shall be severed from these Terms. The remaining provisions shall remain in full force and effect.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-foreground mb-4">15. Waiver</h2>
              <p className="text-muted-foreground">
                The failure of MultiToolsA to exercise or enforce any right or provision of these Terms shall not constitute a waiver of such right or provision. Any waiver of any provision of these Terms will be effective only if in writing and signed by an authorized representative of MultiToolsA.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-foreground mb-4">16. Entire Agreement</h2>
              <p className="text-muted-foreground">
                These Terms, together with our Privacy Policy and any other legal notices published on our Website, constitute the entire agreement between you and MultiToolsA regarding your use of the Services and supersede all prior and contemporaneous agreements, proposals, or representations, written or oral, concerning the subject matter of these Terms.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-foreground mb-4">17. Changes to Terms</h2>
              <p className="text-muted-foreground">
                We reserve the right to modify these Terms at any time. When we make material changes, we will update the "Last Updated" date at the top of these Terms. Your continued use of the Services after the posting of revised Terms constitutes your acceptance of the changes. We encourage you to review these Terms periodically.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-foreground mb-4">18. Contact Information</h2>
              <p className="text-muted-foreground mb-4">
                If you have any questions, concerns, or feedback regarding these Terms and Conditions, please contact us:
              </p>
              <div className="bg-muted/30 rounded-lg p-4 space-y-2 text-muted-foreground">
                <p><strong>MultiToolsA</strong></p>
                <p>Email: <a href="mailto:info@multitoolsa.com" className="text-accent hover:underline">info@multitoolsa.com</a></p>
                <p>Phone: <a href="tel:+9779763567489" className="text-accent hover:underline">+977 9763567489</a></p>
                <p>Website: <a href="https://multitoolsa.com" className="text-accent hover:underline">https://multitoolsa.com</a></p>
              </div>
              <p className="text-muted-foreground mt-4">
                We will respond to your inquiry within 30 business days.
              </p>
            </section>

            <section className="border-t border-border pt-6">
              <p className="text-muted-foreground text-sm">
                By using MultiToolsA's website and services, you acknowledge that you have read, understood, and agree to be bound by these Terms and Conditions. Thank you for choosing MultiToolsA for your image processing needs.
              </p>
            </section>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Terms;
