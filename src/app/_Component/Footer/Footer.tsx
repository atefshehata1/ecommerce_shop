// components/Footer.tsx
import Link from "next/link";
import { Phone, MapPin } from "lucide-react";

export default function Footer() {
  return (
    <footer className="border-t bg-white text-gray-700 mt-5">
      <div className="max-w-7xl mx-auto px-6 py-12 grid grid-cols-1 md:grid-cols-5 gap-8">
        
        {/* Company Info */}
        <div>
          <div className="flex items-center gap-2 mb-4">
            <div className="bg-black text-white font-bold px-2 py-1">T</div>
            <span className="font-bold text-2xl">ShopMart</span>
          </div>
          <p className="text-base mb-4">
            Your one-stop destination for the latest technology, fashion, and
            lifestyle products. Quality guaranteed with fast shipping and
            excellent customer service.
          </p>
          <p className="flex items-center gap-2 text-base">
            <MapPin className="w-5 h-5" />
            123 Shop Street, Octoper City, DC 12345
          </p>
          <p className="flex items-center gap-2 text-base mt-2">
            <Phone className="w-5 h-5" />
            (+20) 01044345807
          </p>
        </div>

        {/* Shop */}
        <div>
          <h3 className="font-semibold text-lg mb-4">SHOP</h3>
          <ul className="space-y-2 text-base">
            <li><Link href="#">Electronics</Link></li>
            <li><Link href="#">Fashion</Link></li>
            <li><Link href="#">Home & Garden</Link></li>
            <li><Link href="#">Sports</Link></li>
            <li><Link href="#">Deals</Link></li>
          </ul>
        </div>

        {/* Customer Service */}
        <div>
          <h3 className="font-semibold text-lg mb-4">CUSTOMER SERVICE</h3>
          <ul className="space-y-2 text-base">
            <li><Link href="#">Contact Us</Link></li>
            <li><Link href="#">Help Center</Link></li>
            <li><Link href="#">Track Your Order</Link></li>
            <li><Link href="#">Returns & Exchanges</Link></li>
            <li><Link href="#">Size Guide</Link></li>
          </ul>
        </div>

        {/* About */}
        <div>
          <h3 className="font-semibold text-lg mb-4">ABOUT</h3>
          <ul className="space-y-2 text-base">
            <li><Link href="#">About ShopMart</Link></li>
            <li><Link href="#">Careers</Link></li>
            <li><Link href="#">Press</Link></li>
            <li><Link href="#">Investor Relations</Link></li>
            <li><Link href="#">Sustainability</Link></li>
          </ul>
        </div>

        {/* Policies */}
        <div>
          <h3 className="font-semibold text-lg mb-4">POLICIES</h3>
          <ul className="space-y-2 text-base">
            <li><Link href="#">Privacy Policy</Link></li>
            <li><Link href="#">Terms of Service</Link></li>
            <li><Link href="#">Cookie Policy</Link></li>
            <li><Link href="#">Shipping Policy</Link></li>
            <li><Link href="#">Refund Policy</Link></li>
          </ul>
        </div>
      </div>
    </footer>
  );
}
