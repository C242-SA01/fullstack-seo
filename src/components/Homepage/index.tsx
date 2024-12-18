// src/components/Homepage.tsx
import Image from "next/image";
import React, { useState } from "react";
import { useRouter } from 'next/router';
import { useSession } from "next-auth/react";
import FeaturesSection from "./features";
import BackToTopButton from "../BackToTopButton";
import PricingCards from "./PricingCards";

const Homepage: React.FC = () => {
  const router = useRouter();
  const { data: session, status } = useSession();
  const [inputURL, setInputURL] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleStartNow = async () => {
    if (status !== "authenticated") {
      router.push("/auth/login");
      return;
    }

    console.log("Start Now button clicked");
    if (inputURL) {
      setIsLoading(true);
      try {
        // Kirimkan request ke API audit
        const response = await fetch('/api/audit', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          credentials: 'include', // Agar cookie autentikasi dikirim
          body: JSON.stringify({ url: inputURL }),
        });

        if (response.ok) {
          const auditResult = await response.json();

          // Simpan hasil audit ke subkoleksi history berdasarkan email pengguna
          const userEmail = session?.user?.email; // Ambil email dari sesi pengguna

          await fetch('/api/history', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ userEmail, auditResult }),
          });

          router.push({
            pathname: '/results',
            query: { auditResult: JSON.stringify(auditResult) },
          });
        } else {
          console.error('Failed to audit URL');
        }
      } catch (error) {
        console.error('Error occurred during fetch:', error);
      } finally {
        setIsLoading(false);
      }
    } else {
      console.error('No URL provided');
    }
  };  

  return (
    <div>
      {/* Main Page Section */}
      <section className="flex flex-col items-center justify-center min-h-screen py-20">
        <h1 className="mb-4 text-4xl font-extrabold text-center text-black">Powerful SEO Solutions With Bizzagi</h1>
        <p className="max-w-2xl mb-6 text-lg text-center text-black">
          We are a team of talented SEO optimization digital marketers, dedicated to helping your business grow, rank higher, and achieve outstanding results in the digital landscape.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center w-full max-w-3xl">
          <input 
            type="text" 
            placeholder="Enter the link, domain, or URL here" 
            value={inputURL}
            onChange={(e) => setInputURL(e.target.value)}
            className="p-4 border border-gray-300 rounded-md w-full sm:w-3/4 mb-4 sm:mb-0 sm:mr-4" 
          />
          <button
            onClick={handleStartNow}
            disabled={isLoading}
            className={`w-full sm:w-auto px-8 py-4 font-semibold rounded-md transition duration-300 ${
              isLoading ? 'bg-gray-400 cursor-not-allowed' : 'bg-yellow-500 hover:bg-yellow-600 text-black'
            }`}>
            {isLoading ? 'Loading...' : 'Start Now'}
          </button>
        </div>
        {isLoading && (
          <div className="mt-4">
            <p className="text-black">Loading... Please wait</p>
          </div>
        )}
      </section>

      {/* Features Section */}
      <FeaturesSection />

      {/* Pricing Section */}
      <PricingCards />

      {/* Impact Metrics Section */}
      <section className="py-20">
        <div className="w-full max-w-7xl mx-auto flex gap-10">
          {/* Bagian Heading */}
          <div className="w-1/2 flex flex-col justify-start">
            <h2 className="text-left text-8xl font-bold text-black mb-20">Our Impact in Numbers</h2>
            
            {/* Customer Satisfaction & Completed Projects */}
            <div className="flex gap-8">
              {/* Customer Satisfaction */}
              <div className="flex flex-col items-center p-10 bg-yellow-100 shadow-lg rounded-lg w-full max-w-sm">
                <Image src="/icons/Customer.png" alt="Customer Satisfaction" width={60} height={60} />
                <h3 className="mt-6 text-4xl font-bold text-black">20%</h3>
                <p className="mt-2 text-black text-center">Customer Satisfaction</p>
              </div>

              {/* Completed Projects */}
              <div className="flex flex-col items-center p-10 bg-yellow-100 shadow-lg rounded-lg w-full max-w-sm">
                <Image src="/icons/Projects.png" alt="Completed Projects" width={60} height={60} />
                <h3 className="mt-6 text-4xl font-bold text-black">0</h3>
                <p className="mt-2 text-black text-center">Completed Projects</p>
              </div>
            </div>
          </div>

          {/* Bagian Gambar Placeholder */}
          <div className="w-1/2">
            <Image src="/images/Our Impact.png" alt="Impact Placeholder" width={500} height={500} className="object-contain w-full h-auto rounded-lg shadow-lg" />
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20">
        <h2 className="mb-10 text-4xl font-bold text-center text-black">The Dream Team That Makes It All Possible!</h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 px-10 min-h-[500px]">
          {/* Card untuk setiap anggota tim */}
          {[
            { name: 'Denny Irawan',
              role: 'Student',
              tech: 'Cloud Computing', 
              image: '/images/dennyirawan.png', 
              social: [
                { platform: 'whatsapp', link: '' },
                { platform: 'linkedin', link: 'https://www.linkedin.com/in/denny-irawan22/' },
                { platform: 'instagram', link: '' },
              ],
            },
            { name: 'Liem, Ivan Budiono',
              role: 'Student',
              tech: 'Cloud Computing',
              image: '/images/ivanbudiono.png',
              social: [
                { platform: 'whatsapp', link: ''},
                { platform: 'linkedin', link: 'https://www.linkedin.com/in/ivanbudiono/'},
                { platform: 'instagram', link: ''},
              ],
            },
            { name: 'Lintang Iqhtiar Dwi Mawarni',
              role: 'Student',
              tech: 'Machine Learning',
              image: '/images/lintangmawarni.png',
              social: [
                { platform: 'whatsapp', link: ''},
                { platform: 'linkedin', link: 'https://www.linkedin.com/in/lintang-iqhtiar-13b7t1995/'},
                { platform: 'instagram', link: ''},
              ],
            },
            { name: 'Egbert Tjandra',
              role: 'Student',
              tech: 'Machine Learning', 
              image: '/images/egberttjandra.png', 
              social: [
                { platform: 'whatsapp', link: ''},
                { platform: 'linkedin', link: 'https://www.linkedin.com/in/egbert-tjandra-ba192432a/'},
                { platform: 'instagram', link: 'https://www.instagram.com/egbertjandra35?igsh=MW9jb2dvaTVjOWkzcg%3D%3D&utm_source=qr'},
              ],
            },
          ].map((member, index) => (
            <div key={index} className="bg-yellow-100 p-6 rounded-lg shadow-md flex flex-col items-start relative">
              <Image
                src={member.image}
                alt={`${member.name} photo`}
                width={500}
                height={500}
                className="rounded-md mb-4 object-cover aspect-square" 
              />
              <h3 className="text-2xl font-bold text-black mb-2">{member.name}</h3>
              <p className="font-semibold text-black mb-1">{member.role}</p>
              <p className="text-black mb-4">{member.tech}</p>
              <div className="absolute bottom-4 right-4 flex space-x-4">
                {member.social.map((socialItem, index) => (
                  <a key={index} href={socialItem.link} aria-label={socialItem.platform} target="_blank" rel="noopener noreferrer">
                    <img src={`/icons/${socialItem.platform}.png`} alt={socialItem.platform} width={24} height={24} />
                  </a>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Contact Us Section */}
      <section id="contact" className="py-20">
        <h2 className="mb-10 text-4xl font-bold text-center text-black">Contact Us</h2>
        <div className="flex flex-col md:flex-row items-start justify-between gap-10 max-w-7xl mx-auto">
          <form className="flex flex-col w-full md:w-1/2 gap-4 bg-yellow-100 p-6 rounded-lg shadow-md">
            <label className="text-black mb-1">Name</label>
            <input type="text" placeholder="Your Name" className="p-3 border border-gray-300 rounded-md" />
            <label className="text-black mb-1">Email</label>
            <input type="email" placeholder="Your Email" className="p-3 border border-gray-300 rounded-md" />
            <label className="text-black mb-1">Message</label>
            <textarea placeholder="Your Message" className="p-3 border border-gray-300 rounded-md"></textarea>
            <button className="px-6 py-3 font-semibold text-black transition duration-300 bg-yellow-500 rounded-md hover:bg-yellow-600">Submit</button>
          </form>
          <div className="flex flex-col items-start md:w-1/2 gap-4">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1980.107281179108!2d110.41087679999998!3d-6.983986499999999!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e708b4f19af0393%3A0x11304de4230ded0d!2sLawang%20Sewu!5e0!3m2!1sen!2sid!4v1732538432515!5m2!1sen!2sid"
              width="600"
              height="315"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
            ></iframe>
            <div className="flex flex-col items-start space-y-2">
              <p className="text-black flex items-center">
                <i className="ri-map-pin-line mr-2"></i>
                Jl. Pemuda No.160, Sekayu, Kec. Semarang Tengah, Kota Semarang, Jawa Tengah 50132
              </p>
              <p className="text-black flex items-center">
                <i className="ri-phone-line mr-2"></i>
                0821-3461-1660
              </p>
              <p className="text-black flex items-center">
                <i className="ri-mail-line mr-2"></i>
                lawangsewu@bangkit.academy
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-10 bg-primary">
        <p className="text-center text-black font-semibold">&copy; 2024 SEOBizzagi</p>
      </footer>

      {/* Back to Top Button */}
      <BackToTopButton />
    </div>
  );
};

export default Homepage;
