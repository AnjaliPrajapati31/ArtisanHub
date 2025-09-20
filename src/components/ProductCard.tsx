import { useState } from 'react';

interface ProductCardProps {
  id: string;
  title: string;
  artist: string;
  category: string;
  price: number;
  image: string;
  description: string;
  likes: number;
  isFavorite?: boolean;
}

function ProductCard({ 
  id, 
  title, 
  artist, 
  category, 
  price, 
  image, 
  description, 
  likes,
  isFavorite = false 
}: ProductCardProps) {
  const [isLiked, setIsLiked] = useState(isFavorite);
  const [likeCount, setLikeCount] = useState(likes);
  const [isHovered, setIsHovered] = useState(false);

  const handleLike = () => {
    setIsLiked(!isLiked);
    setLikeCount(isLiked ? likeCount - 1 : likeCount + 1);
  };

  return (
    <div 
      className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:scale-105 hover:-translate-y-2 overflow-hidden group"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Image Container */}
      <div className="relative overflow-hidden">
        <img 
          src={image} 
          alt={title}
          className="w-full h-64 object-cover transition-transform duration-700 group-hover:scale-110"
        />
        
        {/* Overlay on hover */}
        <div className={`absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent transition-opacity duration-300 ${isHovered ? 'opacity-100' : 'opacity-0'}`}>
          <div className="absolute bottom-4 left-4 right-4">
            <p className="text-white text-sm line-clamp-2 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
              {description}
            </p>
          </div>
        </div>

        {/* Category Badge */}
        <div className="absolute top-4 left-4">
          <span className="bg-gradient-to-r from-amber-500 to-orange-500 text-white px-3 py-1 rounded-full text-xs font-semibold shadow-lg transform -translate-x-2 group-hover:translate-x-0 transition-transform duration-300">
            {category}
          </span>
        </div>

        {/* Favorite Button */}
        <button
          onClick={handleLike}
          className={`absolute top-4 right-4 w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 transform hover:scale-110 ${
            isLiked 
              ? 'bg-red-500 text-white shadow-lg' 
              : 'bg-white/80 text-gray-600 hover:bg-white hover:text-red-500'
          }`}
        >
          <svg className="w-5 h-5" fill={isLiked ? 'currentColor' : 'none'} stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
          </svg>
        </button>
      </div>

      {/* Content */}
      <div className="p-6">
        <div className="flex items-start justify-between mb-3">
          <div className="flex-1">
            <h3 className="text-xl font-bold text-gray-800 mb-1 group-hover:text-amber-700 transition-colors duration-300">
              {title}
            </h3>
            <p className="text-gray-600 text-sm">by {artist}</p>
          </div>
          <div className="text-right">
            <p className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-amber-600 to-orange-600">
              ${price}
            </p>
          </div>
        </div>

        {/* Stats */}
        <div className="flex items-center justify-between pt-4 border-t border-gray-100">
          <div className="flex items-center space-x-4 text-sm text-gray-500">
            <div className="flex items-center space-x-1 hover:text-red-500 transition-colors cursor-pointer">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z"/>
              </svg>
              <span>{likeCount}</span>
            </div>
            <div className="flex items-center space-x-1">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path d="M10 12a2 2 0 100-4 2 2 0 000 4z"/>
                <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd"/>
              </svg>
              <span>{Math.floor(Math.random() * 100) + 20}</span>
            </div>
          </div>
          
          <button className="bg-gradient-to-r from-amber-600 to-orange-600 text-white px-4 py-2 rounded-lg text-sm font-semibold hover:from-amber-700 hover:to-orange-700 transition-all transform hover:scale-105 shadow-md hover:shadow-lg duration-300">
            View Details
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProductCard;