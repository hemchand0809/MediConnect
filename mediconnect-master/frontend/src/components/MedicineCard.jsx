import { useState } from "react";
import { ShoppingCart, Star, Check, X } from "lucide-react";

/**
 * @param {{ medicine: any, onAddToCart: Function, animationDelay: number }} props
 */
const MedicineCard = ({ medicine, onAddToCart, animationDelay }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isAdded, setIsAdded] = useState(false);
  const [showNotification, setShowNotification] = useState(false);
  const [imageError, setImageError] = useState(false);

  const handleAddToCart = () => {
    if (!medicine.inStock) return;
    setIsAdded(true);
    onAddToCart(medicine);
    setShowNotification(true);
    window.dispatchEvent(new Event('cart-pop'));
    setTimeout(() => {
      setIsAdded(false);
      setShowNotification(false);
    }, 2000);
  };

  const handleImageError = () => {
    setImageError(true);
  };

  const getImageSrc = () => {
    if (imageError || !medicine.image) {
      // Fallback to a local medicine image to ensure availability
      return "/medicines/71LA74e8vEL._UF1000,1000_QL80_.jpg";
    }
    return medicine.image;
  };

  return (
    <div
      className="group relative bg-white/70 backdrop-blur-sm rounded-2xl border border-purple-100 transition-all duration-500 ease-out hover:shadow-xl hover:shadow-purple-200/50 hover:-translate-y-2 hover:scale-[1.02] animate-fade-in cursor-pointer"
      style={{ animationDelay: `${animationDelay}s` }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Notification Pop-up */}
      {showNotification && (
        <div className="absolute top-4 right-4 z-20 flex items-center bg-white shadow-lg rounded-xl px-4 py-2 text-purple-700 animate-fade-in">
          <ShoppingCart className="w-5 h-5 mr-2 text-purple-600" />
          <span>Added to cart!</span>
        </div>
      )}
      
      {/* Stock Status */}
      <div className="absolute top-3 left-3 z-10">
        <div className={`flex items-center space-x-1 px-2 py-1 rounded-full text-xs font-medium ${
          medicine.inStock 
            ? 'bg-green-100 text-green-700' 
            : 'bg-red-100 text-red-700'
        }`}>
          {medicine.inStock ? <Check className="w-3 h-3" /> : <X className="w-3 h-3" />}
          <span>{medicine.inStock ? 'In Stock' : 'Out'}</span>
        </div>
      </div>
      {/* Medicine Image */}
      <div className="relative overflow-hidden rounded-t-2xl h-32 bg-gradient-to-br from-purple-50 to-blue-50">
        <img
          src={getImageSrc()}
          alt={medicine.name || 'Medicine'}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          onError={handleImageError}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      </div>
      {/* Card Content */}
      <div className="p-4 space-y-3">
        {/* Rating & Reviews */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-1">
            <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
            <span className="text-xs font-medium text-gray-700">{medicine.rating}</span>
            <span className="text-xs text-gray-500">({medicine.reviews})</span>
          </div>
          <div className="text-xs font-medium text-purple-600 bg-purple-50 px-2 py-1 rounded-full">
            {medicine.dosage}
          </div>
        </div>
        {/* Medicine Name */}
        <h3 className="text-sm font-bold text-gray-900 group-hover:text-purple-700 transition-colors duration-300 line-clamp-1">
          {medicine.name}
        </h3>
        {/* Purpose */}
        <p className="text-xs font-medium text-blue-600 bg-blue-50 px-2 py-1 rounded-full inline-block">
          {medicine.purpose}
        </p>
        {/* Description */}
        <p className="text-gray-600 text-xs leading-relaxed line-clamp-2">
          {medicine.description}
        </p>
        {/* Price Section */}
        <div className="flex items-center justify-between pt-1">
          <div className="space-y-1">
            <div className="flex items-center space-x-2">
              <span className="text-lg font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                ₹{medicine.price}
              </span>
              {medicine.originalPrice > medicine.price && (
                <span className="text-xs text-gray-500 line-through">
                  ₹{medicine.originalPrice}
                </span>
              )}
            </div>
          </div>
        </div>
        {/* Add to Cart Button */}
        <button
          onClick={handleAddToCart}
          disabled={!medicine.inStock || isAdded}
          className={`w-full h-8 rounded-lg font-semibold transition-all duration-300 transform text-xs ${
            isAdded
              ? 'bg-green-500 hover:bg-green-600 text-white scale-95'
              : medicine.inStock
              ? 'bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white hover:scale-105 hover:shadow-lg'
              : 'bg-gray-300 text-gray-500 cursor-not-allowed'
          } ${isHovered && medicine.inStock ? 'shadow-xl shadow-purple-200' : ''}`}
        >
          {isAdded ? (
            <div className="flex items-center justify-center space-x-1">
              <Check className="w-3 h-3" />
              <span>Added!</span>
            </div>
          ) : (
            <div className="flex items-center justify-center space-x-1">
              <ShoppingCart className="w-3 h-3" />
              <span>{medicine.inStock ? 'Add to Cart' : 'Out of Stock'}</span>
            </div>
          )}
        </button>
      </div>
      {/* Hover Glow Effect */}
      <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
        <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-purple-400/10 to-blue-400/10 blur-xl" />
      </div>
    </div>
  );
};

export default MedicineCard;