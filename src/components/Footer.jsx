import React from "react";

function Footer() {
  return (
    <footer className="bg-[#7e22ce] text-white py-8">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center md:items-start">
          <div className="flex flex-col mb-6 md:mb-0 text-center md:text-left">
            <h4 className="text-lg font-semibold mb-4">Company</h4>
            <ul className="space-y-2">
              <li>
                <a href="#" className="hover:underline text-[#dc2626]">
                  About Us
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline text-[#dc2626]">
                  Careers
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline text-[#dc2626]">
                  Contact Us
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline text-[#dc2626]">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline text-[#dc2626]">
                  Terms of Service
                </a>
              </li>
            </ul>
          </div>

          <div className="flex flex-col mb-6 md:mb-0 text-center md:text-left">
            <h4 className="text-lg font-semibold mb-4">Contact</h4>
            <p className="mb-2">123 Job Street, Suite 456</p>
            <p className="mb-2">City, State, ZIP</p>
            <p className="mb-2">Phone: (123) 456-7890</p>
            <p>
              Email:{" "}
              <a
                href="mailto:info@example.com"
                className="hover:underline text-[#dc2626]"
              >
                abdullah456@gmail.com
              </a>
            </p>
          </div>

          <div className="flex flex-col items-center md:items-end text-center">
            <h4 className="text-lg font-semibold mb-4">Follow Us</h4>
            <div className="flex space-x-4">
              <a
              target="_blank"
                href="https://www.facebook.com/abdullah.rafique.5891?mibextid=ZbWKwL"
                className="text-white hover:text-[#dc2626]"
                aria-label="Facebook"
              >
                <i className="fab fa-facebook-f"></i>
              </a>
              <a
              target="_blank"
                href="https://x.com/M_Abdullah419?t=pPA8rSfnOagO2rf6i6RZyg&s=09"
                className="text-white hover:text-[#dc2626]"
                aria-label="Twitter"
              >
                <i className="fab fa-twitter"></i>
              </a>
              <a
              target="_blank"
                href="https://wa.link/23a6xv"
                className="text-white hover:text-[#dc2626]"
                aria-label="LinkedIn"
              >
                <i class="fa-brands fa-whatsapp"></i>
              </a>
              <a
              target="_blank"
                href="https://www.instagram.com/i._.4bdull4h?igsh=OHpxeHZ1dHQxOTls"
                className="text-white hover:text-[#dc2626]"
                aria-label="Instagram"
              >
                <i className="fab fa-instagram"></i>
              </a>
            </div>
          </div>
        </div>

        <div className="mt-8 border-t border-gray-700 pt-4 text-center">
          <p className="text-sm">&copy; 2024 JobPortal. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
