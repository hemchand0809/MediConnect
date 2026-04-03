import { useState, useEffect } from "react";
import { Search } from "lucide-react";
import MedicineCard from "../components/MedicineCard";
import Footer from "../components/footer";
import AOS from "aos";
import "aos/dist/aos.css";

// Local image pool (served from public/medicines). Spaces are URL-encoded.
const imagePoolRaw = [
  "/medicines/71LA74e8vEL._UF1000,1000_QL80_.jpg",
  "/medicines/images.jpeg",
  "/medicines/images-2.jpeg",
  "/medicines/images-3.jpeg",
  "/medicines/images-4.jpeg",
  "/medicines/images-5.jpeg",
  "/medicines/metronidazole-tablets.jpeg",
  "/medicines/photo-1577401132921-cb39bb0adcff.jpeg",
  "/medicines/tablets-3160226_640.jpg",
  "/medicines/images 2.jpeg",
  "/medicines/images-2 2.jpeg",
  "/medicines/images-3 2.jpeg",
  "/medicines/images-4 2.jpeg",
];
const imagePool = imagePoolRaw.map(p => p.replace(/\s/g, "%20"));

const medicinesData = [
  {
    id: 1,
    name: "Paracetamol",
    price: 12.99,
    originalPrice: 15.99,
    purpose: "Pain Relief & Fever",
    description: "Effective relief from headaches, muscle pain, and fever",
    image: "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=300&h=200&fit=crop",
    inStock: true,
    rating: 4.8,
    reviews: 324,
    dosage: "500mg"
  },
  {
    id: 2,
    name: "Vitamin D3",
    price: 24.99,
    originalPrice: 29.99,
    purpose: "Bone Health",
    description: "Essential vitamin for strong bones and immune support",
    image: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=300&h=200&fit=crop",
    inStock: true,
    rating: 4.9,
    reviews: 156,
    dosage: "1000 IU"
  },
  {
    id: 3,
    name: "Omega-3",
    price: 34.99,
    originalPrice: 39.99,
    purpose: "Heart & Brain",
    description: "Premium fish oil for cardiovascular support",
    image: "https://images.unsplash.com/photo-1587854692152-cbe660dbde88?w=300&h=200&fit=crop",
    inStock: true,
    rating: 4.7,
    reviews: 289,
    dosage: "1200mg"
  },
  {
    id: 4,
    name: "Probiotics",
    price: 28.99,
    originalPrice: 32.99,
    purpose: "Digestive Health",
    description: "Advanced formula for gut health",
    image: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=300&h=200&fit=crop",
    inStock: false,
    rating: 4.6,
    reviews: 203,
    dosage: "50B CFU"
  },
  {
    id: 5,
    name: "Multivitamin",
    price: 19.99,
    originalPrice: 24.99,
    purpose: "Complete Nutrition",
    description: "Essential daily vitamins and minerals",
    image: "https://images.unsplash.com/photo-1587854692152-cbe660dbde88?w=300&h=200&fit=crop",
    inStock: true,
    rating: 4.5,
    reviews: 412,
    dosage: "Daily"
  },
  {
    id: 6,
    name: "Magnesium",
    price: 16.99,
    originalPrice: 19.99,
    purpose: "Muscle & Sleep",
    description: "Natural muscle relaxation support",
    image: "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=300&h=200&fit=crop",
    inStock: true,
    rating: 4.8,
    reviews: 178,
    dosage: "400mg"
  },
  {
    id: 7,
    name: "Vitamin C",
    price: 18.99,
    originalPrice: 22.99,
    purpose: "Immune Support",
    description: "High potency vitamin C for immunity",
    image: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=300&h=200&fit=crop",
    inStock: true,
    rating: 4.7,
    reviews: 245,
    dosage: "1000mg"
  },
  {
    id: 8,
    name: "Iron Supplement",
    price: 22.99,
    originalPrice: 26.99,
    purpose: "Blood Health",
    description: "Essential iron for healthy blood",
    image: "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=300&h=200&fit=crop",
    inStock: true,
    rating: 4.6,
    reviews: 189,
    dosage: "65mg"
  },
  {
    id: 9,
    name: "Calcium",
    price: 15.99,
    originalPrice: 18.99,
    purpose: "Bone Strength",
    description: "Strong bones and teeth support",
    image: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=300&h=200&fit=crop",
    inStock: true,
    rating: 4.5,
    reviews: 312,
    dosage: "600mg"
  },
  {
    id: 10,
    name: "Zinc",
    price: 14.99,
    originalPrice: 17.99,
    purpose: "Immune Boost",
    description: "Essential mineral for immune function",
    image: "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=300&h=200&fit=crop",
    inStock: true,
    rating: 4.8,
    reviews: 156,
    dosage: "15mg"
  },
  {
    id: 11,
    name: "B-Complex",
    price: 21.99,
    originalPrice: 25.99,
    purpose: "Energy & Metabolism",
    description: "Complete B-vitamin complex",
    image: "https://images.unsplash.com/photo-1587854692152-cbe660dbde88?w=300&h=200&fit=crop",
    inStock: true,
    rating: 4.7,
    reviews: 278,
    dosage: "Complex"
  },
  {
    id: 12,
    name: "Turmeric",
    price: 26.99,
    originalPrice: 31.99,
    purpose: "Anti-Inflammatory",
    description: "Natural anti-inflammatory support",
    image: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=300&h=200&fit=crop",
    inStock: true,
    rating: 4.9,
    reviews: 423,
    dosage: "500mg"
  },
  {
    id: 13,
    name: "Ginkgo Biloba",
    price: 32.99,
    originalPrice: 37.99,
    purpose: "Memory & Focus",
    description: "Natural cognitive enhancement",
    image: "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=300&h=200&fit=crop",
    inStock: true,
    rating: 4.6,
    reviews: 167,
    dosage: "120mg"
  },
  {
    id: 14,
    name: "Glucosamine",
    price: 29.99,
    originalPrice: 34.99,
    purpose: "Joint Health",
    description: "Support for healthy joints",
    image: "https://images.unsplash.com/photo-1587854692152-cbe660dbde88?w=300&h=200&fit=crop",
    inStock: true,
    rating: 4.5,
    reviews: 234,
    dosage: "1500mg"
  },
  {
    id: 15,
    name: "Melatonin",
    price: 19.99,
    originalPrice: 23.99,
    purpose: "Sleep Support",
    description: "Natural sleep aid",
    image: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=300&h=200&fit=crop",
    inStock: true,
    rating: 4.8,
    reviews: 345,
    dosage: "3mg"
  },
  {
    id: 16,
    name: "CoQ10",
    price: 39.99,
    originalPrice: 44.99,
    purpose: "Heart Health",
    description: "Antioxidant for heart support",
    image: "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=300&h=200&fit=crop",
    inStock: true,
    rating: 4.7,
    reviews: 198,
    dosage: "100mg"
  },
  {
    id: 17,
    name: "Ashwagandha",
    price: 27.99,
    originalPrice: 32.99,
    purpose: "Stress Relief",
    description: "Adaptogenic stress support",
    image: "https://images.unsplash.com/photo-1587854692152-cbe660dbde88?w=300&h=200&fit=crop",
    inStock: true,
    rating: 4.8,
    reviews: 267,
    dosage: "600mg"
  },
  {
    id: 18,
    name: "Fish Oil",
    price: 24.99,
    originalPrice: 28.99,
    purpose: "Heart & Brain",
    description: "Pure fish oil supplement",
    image: "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=300&h=200&fit=crop",
    inStock: true,
    rating: 4.6,
    reviews: 189,
    dosage: "1000mg"
  },
  {
    id: 19,
    name: "Vitamin E",
    price: 17.99,
    originalPrice: 21.99,
    purpose: "Antioxidant",
    description: "Powerful antioxidant protection",
    image: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=300&h=200&fit=crop",
    inStock: true,
    rating: 4.5,
    reviews: 156,
    dosage: "400 IU"
  },
  {
    id: 20,
    name: "Selenium",
    price: 13.99,
    originalPrice: 16.99,
    purpose: "Antioxidant",
    description: "Essential trace mineral",
    image: "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=300&h=200&fit=crop",
    inStock: true,
    rating: 4.7,
    reviews: 123,
    dosage: "200mcg"
  },
  {
    id: 21,
    name: "Folic Acid",
    price: 11.99,
    originalPrice: 14.99,
    purpose: "Prenatal Health",
    description: "Essential for pregnancy health",
    image: "https://images.unsplash.com/photo-1587854692152-cbe660dbde88?w=300&h=200&fit=crop",
    inStock: true,
    rating: 4.8,
    reviews: 234,
    dosage: "400mcg"
  },
  {
    id: 22,
    name: "Biotin",
    price: 16.99,
    originalPrice: 19.99,
    purpose: "Hair & Nails",
    description: "Beauty and wellness support",
    image: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=300&h=200&fit=crop",
    inStock: true,
    rating: 4.6,
    reviews: 178,
    dosage: "5000mcg"
  },
  {
    id: 23,
    name: "Lutein",
    price: 23.99,
    originalPrice: 27.99,
    purpose: "Eye Health",
    description: "Vision and eye protection",
    image: "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=300&h=200&fit=crop",
    inStock: true,
    rating: 4.7,
    reviews: 145,
    dosage: "20mg"
  },
  {
    id: 24,
    name: "Green Tea Extract",
    price: 20.99,
    originalPrice: 24.99,
    purpose: "Antioxidant",
    description: "Natural antioxidant support",
    image: "https://images.unsplash.com/photo-1587854692152-cbe660dbde88?w=300&h=200&fit=crop",
    inStock: true,
    rating: 4.5,
    reviews: 167,
    dosage: "400mg"
  },
  {
    id: 25,
    name: "Cranberry",
    price: 18.99,
    originalPrice: 22.99,
    purpose: "Urinary Health",
    description: "Natural urinary tract support",
    image: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=300&h=200&fit=crop",
    inStock: true,
    rating: 4.8,
    reviews: 189,
    dosage: "500mg"
  },
  {
    id: 26,
    name: "Echinacea",
    price: 15.99,
    originalPrice: 18.99,
    purpose: "Immune Support",
    description: "Natural immune system booster",
    image: "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=300&h=200&fit=crop",
    inStock: true,
    rating: 4.6,
    reviews: 134,
    dosage: "400mg"
  },
  {
    id: 27,
    name: "Ginseng",
    price: 31.99,
    originalPrice: 36.99,
    purpose: "Energy & Vitality",
    description: "Natural energy and vitality",
    image: "https://images.unsplash.com/photo-1587854692152-cbe660dbde88?w=300&h=200&fit=crop",
    inStock: true,
    rating: 4.7,
    reviews: 156,
    dosage: "200mg"
  },
  {
    id: 28,
    name: "Milk Thistle",
    price: 25.99,
    originalPrice: 29.99,
    purpose: "Liver Health",
    description: "Natural liver support",
    image: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=300&h=200&fit=crop",
    inStock: true,
    rating: 4.5,
    reviews: 123,
    dosage: "175mg"
  },
  {
    id: 29,
    name: "St. John's Wort",
    price: 22.99,
    originalPrice: 26.99,
    purpose: "Mood Support",
    description: "Natural mood enhancement",
    image: "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=300&h=200&fit=crop",
    inStock: true,
    rating: 4.6,
    reviews: 145,
    dosage: "300mg"
  },
  {
    id: 30,
    name: "Valerian Root",
    price: 19.99,
    originalPrice: 23.99,
    purpose: "Sleep & Relaxation",
    description: "Natural sleep and relaxation",
    image: "https://images.unsplash.com/photo-1587854692152-cbe660dbde88?w=300&h=200&fit=crop",
    inStock: true,
    rating: 4.4,
    reviews: 167,
    dosage: "450mg"
  }
];

const Medicines = ({ onAddToCart }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [randomizedMedicines, setRandomizedMedicines] = useState(() => {
    const stored = localStorage.getItem("medicineImageMap");
    let imageMap = stored ? JSON.parse(stored) : {};
    let lastIndex = -1;
    const nextImage = () => {
      if (imagePool.length === 0) return "";
      let idx = Math.floor(Math.random() * imagePool.length);
      if (idx === lastIndex) idx = (idx + 1) % imagePool.length;
      lastIndex = idx;
      return imagePool[idx];
    };
    const result = medicinesData.map(item => {
      if (!imageMap[item.id]) {
        imageMap[item.id] = nextImage();
      }
      return { ...item, image: imageMap[item.id] || imagePool[0] };
    });
    localStorage.setItem("medicineImageMap", JSON.stringify(imageMap));
    return result;
  });

  useEffect(() => {
    AOS.init({ duration: 1000, once: true, offset: 80 });
  }, []);

  // Keep mapping fresh if medicines list changes in future
  useEffect(() => {
    setRandomizedMedicines(prev => {
      const stored = localStorage.getItem("medicineImageMap");
      const imageMap = stored ? JSON.parse(stored) : {};
      const updated = medicinesData.map(item => ({
        ...item,
        image: imageMap[item.id] || prev.find(p => p.id === item.id)?.image || imagePool[0],
      }));
      return updated;
    });
  }, []);

  const filteredMedicines = randomizedMedicines.filter(medicine =>
    medicine.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    medicine.purpose.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-blue-50">
      {/* Search Bar Only (centered at the top) */}
      <div className="max-w-2xl mx-auto px-4 py-8 flex items-center justify-center">
        <div className="relative w-full">
          <Search className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-purple-400" />
          <input
            type="text"
            placeholder="Search medicines..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 pr-4 py-2 bg-white/70 border border-purple-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300 w-full"
          />
        </div>
      </div>
      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-4 py-12" data-aos="fade-down">
        <div className="text-center mb-12 animate-fade-in">
          <h1 className="text-5xl font-bold text-gray-900 mb-4 leading-tight">
            Premium <span className="bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">Medicines</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
            Discover our curated collection of high-quality medicines and supplements, 
            carefully selected for your health and wellness needs.
          </p>
        </div>
        {/* Medicines Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4" data-aos="fade-up">
          {filteredMedicines.map((medicine, index) => (
            <MedicineCard
              key={medicine.id}
              medicine={medicine}
              onAddToCart={onAddToCart}
              animationDelay={index * 0.1}
            />
          ))}
        </div>
        {filteredMedicines.length === 0 && (
          <div className="text-center py-20 animate-fade-in">
            <div className="w-24 h-24 bg-gradient-to-br from-purple-100 to-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <Search className="w-12 h-12 text-purple-600" />
            </div>
            <h3 className="text-2xl font-semibold text-gray-900 mb-2">No medicines found</h3>
            <p className="text-gray-600">Try adjusting your search terms to find what you're looking for.</p>
          </div>
        )}
      </section>
      {/* Trust Section */}
      <section className="bg-gradient-to-r from-purple-600 to-blue-600 py-16 mt-20" data-aos="fade-up">
        <div className="max-w-7xl mx-auto px-4 text-center text-white animate-fade-in">
          <h2 className="text-3xl font-bold mb-4">Trusted by Thousands</h2>
          <p className="text-xl text-purple-100 mb-8">
            All our medicines are FDA approved and sourced from certified manufacturers
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 hover:bg-white/20 transition-all duration-300 hover:-translate-y-2">
              <div className="text-3xl font-bold mb-2">99.9%</div>
              <div className="text-purple-100">Customer Satisfaction</div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 hover:bg-white/20 transition-all duration-300 hover:-translate-y-2">
              <div className="text-3xl font-bold mb-2">24/7</div>
              <div className="text-purple-100">Expert Support</div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 hover:bg-white/20 transition-all duration-300 hover:-translate-y-2">
              <div className="text-3xl font-bold mb-2">Free</div>
              <div className="text-purple-100">Fast Delivery</div>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default Medicines;
