import { useState } from "react";
import { Heart, TestTube, Droplet, Zap, Stethoscope, ShoppingCart, Plus, Check, Activity, Brain, Eye, Shield, Scan } from "lucide-react";
import { useCart } from "../components/CartContext";
import Footer from "../components/footer";

const LabTests = () => {
  const { addToCart, cartItems } = useCart();
  const [addedItems, setAddedItems] = useState([]);

  const labTests = [
    {
      id: 101,
      name: "Complete Blood Count (CBC)",
      price: 45,
      category: "Blood",
      purpose: "Blood Analysis",
      description: "Comprehensive blood cell analysis including RBC, WBC, and platelet count",
      icon: Droplet,
      color: "from-red-500 to-red-600",
      bgColor: "from-red-50 to-red-100",
      image: "/placeholder.svg",
      duration: "15 minutes"
    },
    {
      id: 102,
      name: "Urine Analysis",
      price: 35,
      category: "Blood",
      purpose: "Urinalysis",
      description: "Complete urine examination for infections, kidney function, and metabolic disorders",
      icon: TestTube,
      color: "from-yellow-500 to-amber-600",
      bgColor: "from-yellow-50 to-amber-100",
      image: "/placeholder.svg",
      duration: "10 minutes"
    },
    {
      id: 103,
      name: "Chest X-Ray",
      price: 80,
      category: "Imaging",
      purpose: "Imaging",
      description: "Digital chest radiography for lung and heart examination",
      icon: Scan,
      color: "from-blue-500 to-blue-600",
      bgColor: "from-blue-50 to-blue-100",
      image: "/placeholder.svg",
      duration: "5 minutes"
    },
    {
      id: 104,
      name: "ECG Test",
      price: 60,
      category: "Cardiac",
      purpose: "Cardiac Analysis",
      description: "Electrocardiogram to monitor heart rhythm and electrical activity",
      icon: Heart,
      color: "from-pink-500 to-pink-600",
      bgColor: "from-pink-50 to-pink-100",
      image: "/placeholder.svg",
      duration: "20 minutes"
    },
    {
      id: 105,
      name: "Lipid Profile",
      price: 55,
      category: "Blood",
      purpose: "Cholesterol Test",
      description: "Complete lipid panel including cholesterol, triglycerides, and HDL/LDL levels",
      icon: Droplet,
      color: "from-red-500 to-red-600",
      bgColor: "from-red-50 to-red-100",
      image: "/placeholder.svg",
      duration: "12 minutes"
    },
    {
      id: 106,
      name: "MRI Brain",
      price: 120,
      category: "Imaging",
      purpose: "Brain Imaging",
      description: "Magnetic resonance imaging of the brain for detailed neurological assessment",
      icon: Brain,
      color: "from-indigo-500 to-indigo-600",
      bgColor: "from-indigo-50 to-indigo-100",
      image: "/placeholder.svg",
      duration: "45 minutes"
    },
    {
      id: 107,
      name: "Thyroid Function Test",
      price: 65,
      category: "Endocrine",
      purpose: "Thyroid Analysis",
      description: "Comprehensive thyroid hormone levels including T3, T4, and TSH",
      icon: Activity,
      color: "from-green-500 to-green-600",
      bgColor: "from-green-50 to-green-100",
      image: "/placeholder.svg",
      duration: "18 minutes"
    },
    {
      id: 108,
      name: "Echocardiogram",
      price: 95,
      category: "Cardiac",
      purpose: "Heart Ultrasound",
      description: "Ultrasound examination of the heart to assess structure and function",
      icon: Heart,
      color: "from-pink-500 to-pink-600",
      bgColor: "from-pink-50 to-pink-100",
      image: "/placeholder.svg",
      duration: "30 minutes"
    },
    {
      id: 109,
      name: "CT Scan Abdomen",
      price: 110,
      category: "Imaging",
      purpose: "Abdominal Imaging",
      description: "Computed tomography scan of the abdomen for detailed organ examination",
      icon: Scan,
      color: "from-blue-500 to-blue-600",
      bgColor: "from-blue-50 to-blue-100",
      image: "/placeholder.svg",
      duration: "25 minutes"
    },
    {
      id: 110,
      name: "EEG Test",
      price: 75,
      category: "Neurological",
      purpose: "Brain Activity",
      description: "Electroencephalogram to monitor brain electrical activity and detect abnormalities",
      icon: Brain,
      color: "from-indigo-500 to-indigo-600",
      bgColor: "from-indigo-50 to-indigo-100",
      image: "/placeholder.svg",
      duration: "40 minutes"
    },
    {
      id: 111,
      name: "Diabetes Panel",
      price: 50,
      category: "Endocrine",
      purpose: "Blood Sugar Test",
      description: "Complete diabetes screening including fasting glucose, HbA1c, and insulin levels",
      icon: Activity,
      color: "from-green-500 to-green-600",
      bgColor: "from-green-50 to-green-100",
      image: "/placeholder.svg",
      duration: "20 minutes"
    },
    {
      id: 112,
      name: "Stress Test",
      price: 85,
      category: "Cardiac",
      purpose: "Exercise ECG",
      description: "Treadmill stress test to evaluate heart function under physical stress",
      icon: Heart,
      color: "from-pink-500 to-pink-600",
      bgColor: "from-pink-50 to-pink-100",
      image: "/placeholder.svg",
      duration: "60 minutes"
    },
    {
      id: 113,
      name: "Liver Function Test",
      price: 40,
      category: "Blood",
      purpose: "Liver Analysis",
      description: "Comprehensive liver enzyme and function tests including ALT, AST, and bilirubin",
      icon: Droplet,
      color: "from-red-500 to-red-600",
      bgColor: "from-red-50 to-red-100",
      image: "/placeholder.svg",
      duration: "15 minutes"
    },
    {
      id: 114,
      name: "Vitamin D Test",
      price: 35,
      category: "Blood",
      purpose: "Vitamin Analysis",
      description: "25-hydroxyvitamin D test to assess bone health and immune function",
      icon: Shield,
      color: "from-yellow-500 to-yellow-600",
      bgColor: "from-yellow-50 to-yellow-100",
      image: "/placeholder.svg",
      duration: "10 minutes"
    },
    {
      id: 115,
      name: "Eye Examination",
      price: 25,
      category: "Imaging",
      purpose: "Vision Test",
      description: "Comprehensive eye examination including visual acuity and eye pressure measurement",
      icon: Eye,
      color: "from-blue-500 to-blue-600",
      bgColor: "from-blue-50 to-blue-100",
      image: "/placeholder.svg",
      duration: "20 minutes"
    },
    {
      id: 116,
      name: "Allergy Panel",
      price: 70,
      category: "Immunity",
      purpose: "Allergy Test",
      description: "Comprehensive allergy screening for common allergens and food sensitivities",
      icon: Shield,
      color: "from-yellow-500 to-yellow-600",
      bgColor: "from-yellow-50 to-yellow-100",
      image: "/placeholder.svg",
      duration: "30 minutes"
    }
  ];

  const handleAddToCart = (test) => {
    addToCart({
      id: test.id,
      name: test.name,
      price: test.price,
      image: test.image,
      purpose: test.purpose,
      icon: test.icon,
      color: test.color,
      type: 'lab-test'
    });
    setAddedItems(prev => [...prev, test.id]);
    setTimeout(() => {
      setAddedItems(prev => prev.filter(id => id !== test.id));
    }, 2000);
  };

  const isInCart = (id) => cartItems.some(item => item.id === id);
  const isJustAdded = (id) => addedItems.includes(id);

  // Use all tests since category filtering is not implemented
  const filteredTests = labTests;

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-blue-50">
      {/* Hero Section */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="text-center mb-16 animate-fade-in">
          <h1 className="text-5xl font-bold text-gray-900 mb-6 leading-tight">
            Professional <span className="bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">Lab Tests</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed mb-8">
            Get accurate results with our state-of-the-art laboratory testing services. 
            Quick, reliable, and performed by certified professionals.
          </p>
        </div>

        {/* Lab Tests Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-16">
          {filteredTests.length > 0 ? (
            filteredTests.map((test, index) => {
            const IconComponent = test.icon;
            return (
              <div
                key={test.id}
                className="group relative bg-white/70 backdrop-blur-sm rounded-2xl border border-purple-100 p-6 hover:shadow-xl transition-all duration-500 hover:-translate-y-2 animate-fade-in overflow-hidden"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                {/* Background Pattern */}
                <div className={`absolute inset-0 bg-gradient-to-br ${test.bgColor} opacity-0 group-hover:opacity-20 transition-all duration-500 rounded-2xl`} />
                
                {/* Icon */}
                <div className="relative mb-4">
                  <div className={`w-16 h-16 bg-gradient-to-br ${test.color} rounded-xl flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-all duration-300 shadow-lg`}>
                    <IconComponent className="w-8 h-8 text-white" />
                  </div>
                </div>

                {/* Test Info */}
                <div className="text-center mb-4">
                  <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-purple-700 transition-colors duration-300 line-clamp-2">
                    {test.name}
                  </h3>
                  <div className="inline-block bg-purple-100 text-purple-700 px-3 py-1 rounded-full text-xs font-medium mb-3">
                    {test.purpose}
                  </div>
                </div>

                {/* Description */}
                <p className="text-gray-600 text-sm text-center leading-relaxed mb-4 line-clamp-3">
                  {test.description}
                </p>

                {/* Duration */}
                <div className="flex justify-center items-center mb-4 text-xs text-gray-500">
                  <span className="flex items-center">
                    <div className="w-2 h-2 bg-green-500 rounded-full mr-2" />
                    {test.duration}
                  </span>
                </div>

                {/* Price and Add to Cart */}
                <div className="relative">
                  <div className="text-center mb-4">
                    <div className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                      ₹{test.price}
                    </div>
                  </div>
                  
                  <button
                    type="button"
                    onClick={() => handleAddToCart(test)}
                    disabled={isJustAdded(test.id)}
                    className={`w-full h-10 rounded-lg font-semibold text-sm transition-all duration-300 hover:scale-105 ${
                      isJustAdded(test.id)
                        ? "bg-green-500 hover:bg-green-600"
                        : isInCart(test.id)
                        ? "bg-purple-500 hover:bg-purple-600"
                        : "bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
                    } text-white shadow-lg hover:shadow-xl flex items-center justify-center`}
                  >
                    {isJustAdded(test.id) ? (
                      <div className="flex items-center space-x-1">
                        <Check className="w-4 h-4" />
                        <span>Added!</span>
                      </div>
                    ) : (
                      <div className="flex items-center space-x-1">
                        {isInCart(test.id) ? (
                          <>
                            <Plus className="w-4 h-4" />
                            <span>Add More</span>
                          </>
                        ) : (
                          <>
                            <ShoppingCart className="w-4 h-4" />
                            <span>Book Test</span>
                          </>
                        )}
                      </div>
                    )}
                  </button>
                </div>

                {/* Hover Glow Effect */}
                <div className={`absolute inset-0 bg-gradient-to-br ${test.color} opacity-0 group-hover:opacity-5 transition-all duration-500 rounded-2xl pointer-events-none`} />
              </div>
            );
          })
          ) : (
            <div className="col-span-full text-center py-12">
              <div className="w-24 h-24 bg-gradient-to-br from-purple-100 to-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <TestTube className="w-12 h-12 text-purple-600" />
              </div>
              <h3 className="text-2xl font-semibold text-gray-900 mb-2">No tests found</h3>
              <p className="text-gray-600">No tests available in this category. Try selecting a different category.</p>
            </div>
          )}
        </div>

        {/* Why Choose Our Lab Section */}
        <div className="bg-gradient-to-r from-purple-600 to-blue-600 rounded-3xl p-12 text-white animate-fade-in">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">Why Choose Our Laboratory?</h2>
            <p className="text-xl text-purple-100">
              State-of-the-art equipment and certified professionals ensure accurate results
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center group">
              <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-all duration-300">
                <TestTube className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold mb-2">Advanced Equipment</h3>
              <p className="text-purple-100">Latest diagnostic technology for precise results</p>
            </div>
            
            <div className="text-center group">
              <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-all duration-300">
                <Stethoscope className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold mb-2">Expert Technicians</h3>
              <p className="text-purple-100">Certified professionals with years of experience</p>
            </div>
            
            <div className="text-center group">
              <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-all duration-300">
                <Zap className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold mb-2">Quick Results</h3>
              <p className="text-purple-100">Fast turnaround time without compromising accuracy</p>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default LabTests;