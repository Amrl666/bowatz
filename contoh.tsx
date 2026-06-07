import React, { useState } from 'react';
import { 
  Search, 
  Heart, 
  ShoppingCart, 
  User, 
  ChevronDown, 
  SlidersHorizontal,
  ChevronRight
} from 'lucide-react';

const MOCK_PRODUCTS = [
  {
    id: 1,
    brand: "Brockum",
    size: "L",
    title: "Vintage 1991 Metallica 'Sad But True' Tour Tee",
    price: 350,
    originalPrice: 400,
    timeAgo: "2 hours ago",
    likes: 24,
    image: "https://images.unsplash.com/photo-1576566588028-4147f3842f27?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80"
  },
  {
    id: 2,
    brand: "Brockum",
    size: "XL",
    title: "Vintage 1993 Nirvana In Utero T-Shirt",
    price: 850,
    timeAgo: "5 hours ago",
    likes: 112,
    image: "https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80"
  },
  {
    id: 3,
    brand: "Brockum",
    size: "M",
    title: "Vintage 1994 Pink Floyd The Division Bell",
    price: 275,
    originalPrice: 300,
    timeAgo: "1 day ago",
    likes: 45,
    image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80"
  },
  {
    id: 4,
    brand: "Brockum",
    size: "L",
    title: "Vintage 1989 Rolling Stones Steel Wheels",
    price: 150,
    timeAgo: "2 days ago",
    likes: 18,
    image: "https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80"
  },
  {
    id: 5,
    brand: "Brockum",
    size: "XXL",
    title: "Vintage 1992 Guns N' Roses Use Your Illusion",
    price: 420,
    timeAgo: "3 days ago",
    likes: 89,
    image: "https://images.unsplash.com/photo-1618517351616-38fb9c5210c6?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80"
  },
  {
    id: 6,
    brand: "Brockum",
    size: "L",
    title: "Vintage 1990 Megadeth Rust In Peace",
    price: 290,
    timeAgo: "1 week ago",
    likes: 33,
    image: "https://images.unsplash.com/photo-1562157873-818bc0726f68?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80"
  },
  {
    id: 7,
    brand: "Brockum",
    size: "M",
    title: "Vintage 1991 Red Hot Chili Peppers",
    price: 310,
    originalPrice: 350,
    timeAgo: "1 week ago",
    likes: 56,
    image: "https://images.unsplash.com/photo-1529374255404-311a2a4f1fd9?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80"
  },
  {
    id: 8,
    brand: "Brockum",
    size: "XL",
    title: "Vintage 1994 Soundgarden Superunknown",
    price: 500,
    timeAgo: "2 weeks ago",
    likes: 142,
    image: "https://images.unsplash.com/photo-1583744986348-73595b2ceaf3?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80"
  }
];

const Header = () => (
  <header className="sticky top-0 z-50 bg-white border-b border-gray-200">
    <div className="flex items-center justify-between px-6 py-4 max-w-7xl mx-auto">
      {/* Left Navigation */}
      <div className="flex items-center space-x-8">
        <h1 className="text-2xl font-bold tracking-tighter uppercase cursor-pointer">
          Grailed
        </h1>
        <nav className="hidden md:flex space-x-6 text-sm font-medium">
          <a href="#" className="hover:text-gray-600 transition-colors">Shop</a>
          <a href="#" className="hover:text-gray-600 transition-colors">Designers</a>
          <a href="#" className="hover:text-gray-600 transition-colors">Collections</a>
          <a href="#" className="hover:text-gray-600 transition-colors">Read</a>
        </nav>
      </div>

      {/* Search Bar */}
      <div className="hidden md:flex flex-1 max-w-md mx-8">
        <div className="relative w-full">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-4 w-4 text-gray-400" />
          </div>
          <input 
            type="text" 
            placeholder="Search" 
            className="w-full pl-10 pr-4 py-2 bg-gray-100 border-transparent rounded-sm text-sm focus:bg-white focus:border-gray-300 focus:ring-0 outline-none transition-all"
          />
        </div>
      </div>

      {/* Right Icons */}
      <div className="flex items-center space-x-6 text-sm font-medium">
        <button className="hidden md:block hover:text-gray-600 transition-colors">Sell</button>
        <button className="hover:text-gray-600 transition-colors"><Heart className="h-5 w-5" /></button>
        <button className="hover:text-gray-600 transition-colors"><ShoppingCart className="h-5 w-5" /></button>
        <button className="hover:text-gray-600 transition-colors"><User className="h-5 w-5" /></button>
      </div>
    </div>
  </header>
);

const Breadcrumbs = () => (
  <div className="flex items-center space-x-2 text-xs text-gray-500 mb-6">
    <a href="#" className="hover:underline">Home</a>
    <ChevronRight className="h-3 w-3" />
    <a href="#" className="hover:underline">Designers</a>
    <ChevronRight className="h-3 w-3" />
    <span className="text-gray-900 font-medium">Brockum</span>
  </div>
);

const DesignerHeader = () => (
  <div className="mb-10">
    <div className="flex flex-col md:flex-row md:items-end justify-between mb-4">
      <div>
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-2 uppercase">Brockum</h1>
        <div className="text-sm text-gray-500">
          <span>12.4K Followers</span>
          <span className="mx-2">•</span>
          <span>432 Listings</span>
        </div>
      </div>
      <div className="mt-4 md:mt-0 flex space-x-3">
        <button className="px-6 py-2 bg-black text-white text-sm font-bold uppercase rounded-sm hover:bg-gray-800 transition-colors">
          Follow
        </button>
        <button className="px-4 py-2 border border-gray-300 text-sm font-bold uppercase rounded-sm hover:bg-gray-50 transition-colors">
          Share
        </button>
      </div>
    </div>
    <div className="max-w-3xl text-sm text-gray-700 leading-relaxed">
      Brockum was a prominent merchandising company active primarily in the 1980s and 1990s, known for producing high-quality concert t-shirts for iconic rock and metal bands like Metallica, Nirvana, and The Rolling Stones. Vintage Brockum tags are now highly sought after by collectors as a mark of authenticity and era-specific streetwear history.
    </div>
  </div>
);

const SidebarFilter = () => {
  const categories = ['Tops & T-Shirts', 'Outerwear', 'Sweaters', 'Bottoms'];
  const sizes = ['S', 'M', 'L', 'XL', 'XXL'];

  return (
    <div className="hidden lg:block w-64 flex-shrink-0 pr-8">
      <div className="sticky top-24">
        <div className="flex items-center space-x-2 mb-6">
          <SlidersHorizontal className="h-5 w-5" />
          <span className="font-bold uppercase text-sm">Filters</span>
        </div>

        {/* Category Filter */}
        <div className="mb-6 border-b border-gray-200 pb-6">
          <button className="flex items-center justify-between w-full mb-4 font-bold text-sm uppercase">
            Department
            <ChevronDown className="h-4 w-4" />
          </button>
          <div className="space-y-3">
            {categories.map((cat, idx) => (
              <label key={idx} className="flex items-center space-x-3 cursor-pointer group">
                <input type="checkbox" className="form-checkbox h-4 w-4 text-black border-gray-300 rounded-sm focus:ring-black" />
                <span className="text-sm text-gray-600 group-hover:text-black">{cat}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Size Filter */}
        <div className="mb-6 border-b border-gray-200 pb-6">
          <button className="flex items-center justify-between w-full mb-4 font-bold text-sm uppercase">
            Size
            <ChevronDown className="h-4 w-4" />
          </button>
          <div className="grid grid-cols-3 gap-2">
            {sizes.map((size, idx) => (
              <button key={idx} className="border border-gray-300 py-2 text-xs font-medium hover:border-black transition-colors rounded-sm">
                {size}
              </button>
            ))}
          </div>
        </div>

        {/* Price Filter */}
        <div className="mb-6">
          <button className="flex items-center justify-between w-full mb-4 font-bold text-sm uppercase">
            Price
            <ChevronDown className="h-4 w-4" />
          </button>
          <div className="flex items-center space-x-2">
            <input type="text" placeholder="Min" className="w-full px-2 py-1 border border-gray-300 text-sm rounded-sm" />
            <span className="text-gray-400">-</span>
            <input type="text" placeholder="Max" className="w-full px-2 py-1 border border-gray-300 text-sm rounded-sm" />
          </div>
        </div>
      </div>
    </div>
  );
};

const ProductCard = ({ product }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div 
      className="group cursor-pointer flex flex-col"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Image Container */}
      <div className="relative aspect-[4/5] bg-gray-100 mb-3 overflow-hidden rounded-sm">
        <img 
          src={product.image} 
          alt={product.title}
          className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500 ease-in-out"
        />
        {/* Hover overlay with heart */}
        <div className={`absolute top-2 right-2 p-2 bg-white rounded-full shadow-md transition-opacity duration-200 ${isHovered ? 'opacity-100' : 'opacity-0'}`}>
          <Heart className="h-4 w-4 text-gray-900" />
        </div>
      </div>

      {/* Product Details */}
      <div className="flex flex-col flex-grow">
        <div className="flex justify-between items-start mb-1">
          <span className="font-bold text-sm truncate pr-2">{product.brand}</span>
          <span className="text-xs text-gray-500 font-medium whitespace-nowrap">{product.size}</span>
        </div>
        
        <p className="text-sm text-gray-600 line-clamp-2 mb-2 leading-tight">
          {product.title}
        </p>

        <div className="mt-auto">
          <div className="flex items-baseline space-x-2 mb-2">
            <span className="font-bold text-base">${product.price}</span>
            {product.originalPrice && (
              <span className="text-xs text-gray-400 line-through">${product.originalPrice}</span>
            )}
          </div>
          
          <div className="flex justify-between items-center text-xs text-gray-400">
            <span>{product.timeAgo}</span>
            <div className="flex items-center space-x-1">
              <Heart className="h-3 w-3" />
              <span>{product.likes}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default function GrailedBrockumClone() {
  return (
    <div className="min-h-screen bg-white text-gray-900 font-sans">
      <Header />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Breadcrumbs />
        <DesignerHeader />

        {/* Top Controls (Sort & Quick Filters) */}
        <div className="flex items-center justify-between border-y border-gray-200 py-4 mb-8">
          <div className="flex items-center space-x-4">
            <span className="text-sm font-bold uppercase">432 Listings</span>
          </div>
          <div className="flex items-center space-x-6 text-sm">
            <button className="flex items-center space-x-1 font-bold uppercase">
              <span>Sort By: Trending</span>
              <ChevronDown className="h-4 w-4" />
            </button>
          </div>
        </div>

        <div className="flex">
          <SidebarFilter />
          
          {/* Product Grid */}
          <div className="flex-1">
            <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-x-4 gap-y-10">
              {MOCK_PRODUCTS.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
            
            {/* Load More Button */}
            <div className="mt-16 flex justify-center">
              <button className="px-8 py-3 border-2 border-black font-bold uppercase text-sm hover:bg-black hover:text-white transition-colors duration-200">
                Load More
              </button>
            </div>
          </div>
        </div>
      </main>

      {/* Simple Footer */}
      <footer className="mt-24 border-t border-gray-200 py-12">
        <div className="max-w-7xl mx-auto px-6 text-center text-xs text-gray-500 uppercase tracking-widest">
          © {new Date().getFullYear()} Grailed Clone - For Educational Purposes Only
        </div>
      </footer>
    </div>
  );
}