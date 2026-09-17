import React, { useState, useEffect } from 'react';
import { 
  ShoppingCart, 
  Menu, 
  X, 
  Search, 
  Home, 
  ShoppingBag, 
  Leaf, 
  Apple, 
  Carrot, 
  Package, 
  User, 
  LogOut, 
  Heart,
  ChevronDown,
  Filter,
  ArrowUpRight,
  Truck
} from 'lucide-react';
import ProductCard from './ProductCard';
import Cart from './Cart';
import Dashboard from './Dashboard';
import { Product, CartItem, Order } from '../types';
import { useAuth } from '../contexts/AuthContext';

const HomePage: React.FC = () => {
  const { user } = useAuth();
  const [products, setProducts] = useState<Product[]>([]);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('all');
  const [showCart, setShowCart] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const [showDashboard, setShowDashboard] = useState(false);
  const [favorites, setFavorites] = useState<string[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);
  const [sortBy, setSortBy] = useState<'price-asc' | 'price-desc' | 'name' | 'popularity'>('popularity');
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 100]);
  const [showFilters, setShowFilters] = useState(false);
  const [organicOnly, setOrganicOnly] = useState(false);
  const [inStockOnly, setInStockOnly] = useState(false);

  useEffect(() => {
    const initialProducts: Product[] = [
      {
        id: '1',
        name: 'Tomato',
        category: 'vegetables',
        price: 2.00,
        unit: 'kg',
        stock: 50,
        image: 'https://images.unsplash.com/photo-1546094096-0df4bcaaa337?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
        organic: true,
        description: 'Fresh, juicy tomatoes grown locally without pesticides.',
        rating: 4.8,
        featured: true
      },
      {
        id: '2',
        name: 'Carrot',
        category: 'vegetables',
        price: 3.00,
        unit: 'kg',
        stock: 40,
        image: 'https://images.unsplash.com/photo-1598170845058-32b9d6a5da37?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
        organic: true,
        description: 'Crunchy, sweet carrots perfect for salads and cooking.',
        rating: 4.5
      },
      {
        id: '3',
        name: 'Spinach',
        category: 'vegetables',
        price: 2.50,
        unit: 'bunch',
        stock: 30,
        image: 'https://images.unsplash.com/photo-1576045057995-568f588f82fb?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
        organic: true,
        description: 'Nutrient-rich spinach leaves, locally grown.',
        rating: 4.3
      },
      {
        id: '4',
        name: 'Potato',
        category: 'vegetables',
        price: 1.80,
        unit: 'kg',
        stock: 100,
        image: 'https://images.unsplash.com/photo-1518977676601-b53f82aba655?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
        organic: true,
        description: 'Versatile potatoes perfect for various dishes.',
        rating: 4.2
      },
      {
        id: '5',
        name: 'Apple',
        category: 'fruits',
        price: 4.00,
        unit: 'kg',
        stock: 60,
        image: 'https://images.unsplash.com/photo-1568702846914-96b305d2aaeb?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
        organic: true,
        description: 'Sweet and crunchy apples from local orchards.',
        rating: 4.7,
        featured: true
      },
      {
        id: '6',
        name: 'Banana',
        category: 'fruits',
        price: 1.50,
        unit: 'kg',
        stock: 75,
        image: 'https://images.unsplash.com/photo-1571771894821-ce9b6c11b08e?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
        organic: true,
        description: 'Perfectly ripened bananas, rich in potassium.',
        rating: 4.4
      },
      {
        id: '7',
        name: 'Orange',
        category: 'fruits',
        price: 3.50,
        unit: 'kg',
        stock: 45,
        image: 'https://images.unsplash.com/photo-1582979512210-99b6a53386f9?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
        organic: true,
        description: 'Juicy oranges packed with vitamin C.',
        rating: 4.6
      },
      {
        id: '8',
        name: 'Strawberry',
        category: 'fruits',
        price: 5.00,
        unit: 'box',
        stock: 25,
        image: 'https://images.unsplash.com/photo-1464965911861-746a04b4bca6?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
        organic: true,
        description: 'Sweet and fragrant strawberries, perfect for desserts.',
        rating: 4.9,
        featured: true
      },
      {
        id: '9',
        name: 'Organic Honey',
        category: 'organic',
        price: 10.00,
        unit: 'jar',
        stock: 20,
        image: 'https://images.unsplash.com/photo-1587049352851-8d4e89133924?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
        organic: true,
        description: 'Pure, raw honey from local beekeepers.',
        rating: 4.7,
        featured: true
      },
      {
        id: '10',
        name: 'Organic Rice',
        category: 'organic',
        price: 5.00,
        unit: 'kg',
        stock: 35,
        image: 'https://images.unsplash.com/photo-1536304993881-ff6e9eefa2a6?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
        organic: true,
        description: 'Premium quality organic rice, perfect for any meal.',
        rating: 4.4
      },
      {
        id: '11',
        name: 'Organic Flour',
        category: 'organic',
        price: 4.50,
        unit: 'kg',
        stock: 40,
        image: 'https://images.unsplash.com/photo-1627485937980-221c88ac04f9?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
        organic: true,
        description: 'Finely milled organic flour for baking.',
        rating: 4.3
      },
      {
        id: '12',
        name: 'Cucumber',
        category: 'vegetables',
        price: 1.20,
        unit: 'kg',
        stock: 60,
        image: 'https://images.unsplash.com/photo-1604977042946-1eecc30f269e?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
        organic: true,
        description: 'Fresh, crisp cucumbers perfect for salads.',
        rating: 4.1
      },
      {
        id: '13',
        name: 'Avocado',
        category: 'fruits',
        price: 2.50,
        unit: 'piece',
        stock: 30,
        image: 'https://images.unsplash.com/photo-1523049673857-eb18f1d7b578?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
        organic: true,
        description: 'Creamy, ripe avocados rich in healthy fats.',
        rating: 4.8,
        featured: true
      },
      {
        id: '14',
        name: 'Broccoli',
        category: 'vegetables',
        price: 2.80,
        unit: 'kg',
        stock: 25,
        image: 'https://images.unsplash.com/photo-1459411621453-7b03977f4bfc?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
        organic: true,
        description: 'Fresh broccoli florets, packed with nutrients.',
        rating: 4.2
      },
      {
        id: '15',
        name: 'Organic Quinoa',
        category: 'organic',
        price: 8.00,
        unit: 'kg',
        stock: 15,
        image: 'https://images.unsplash.com/photo-1612257999756-61d09b606a7f?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
        organic: true,
        description: 'Protein-rich organic quinoa for healthy meals.',
        rating: 4.6
      },
      {
        id: '16',
        name: 'Grapes',
        category: 'fruits',
        price: 4.50,
        unit: 'kg',
        stock: 40,
        image: 'https://images.unsplash.com/photo-1537640538966-79f369143f8f?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
        organic: true,
        description: 'Sweet, juicy grapes from local vineyards.',
        rating: 4.5
      }
    ];
    
    setProducts(initialProducts);
    
    const sampleOrders: Order[] = [
      {
        id: '1001',
        items: [
          { product: initialProducts[0], quantity: 2 },
          { product: initialProducts[4], quantity: 1 }
        ],
        total: 10.00,
        status: 'delivered',
        date: '2025-03-15',
        address: '123 Main St, New York, NY 10001',
        paymentMethod: 'card'
      },
      {
        id: '1002',
        items: [
          { product: initialProducts[8], quantity: 1 },
          { product: initialProducts[5], quantity: 3 }
        ],
        total: 14.50,
        status: 'shipped',
        date: '2025-04-02',
        address: '123 Main St, New York, NY 10001',
        paymentMethod: 'cod'
      }
    ];
    
    setOrders(sampleOrders);
  }, []);

  const addToCart = (product: Product) => {
    setCart(prevCart => {
      const existingItem = prevCart.find(item => item.product.id === product.id);
      
      if (existingItem) {
        return prevCart.map(item => 
          item.product.id === product.id 
            ? { ...item, quantity: Math.min(item.quantity + 1, product.stock) } 
            : item
        );
      } else {
        return [...prevCart, { product, quantity: 1 }];
      }
    });
  };

  const updateCartQuantity = (productId: string, quantity: number) => {
    setCart(prevCart => 
      prevCart.map(item => 
        item.product.id === productId 
          ? { ...item, quantity } 
          : item
      )
    );
  };

  const removeFromCart = (productId: string) => {
    setCart(prevCart => prevCart.filter(item => item.product.id !== productId));
  };

  const handleCheckout = () => {
    if (cart.length === 0) return;

    const newOrder: Order = {
      id: Math.random().toString(36).substr(2, 9),
      items: [...cart],
      total: calculateCartTotal(),
      status: 'processing',
      date: new Date().toISOString().split('T')[0],
      address: user?.address || '',
      paymentMethod: 'card'
    };

    setOrders(prevOrders => [...prevOrders, newOrder]);
    setCart([]);
  };

  const toggleFavorite = (productId: string) => {
    setFavorites(prevFavorites => {
      if (prevFavorites.includes(productId)) {
        return prevFavorites.filter(id => id !== productId);
      } else {
        return [...prevFavorites, productId];
      }
    });
  };

  const filteredProducts = products.filter(product => {
    if (activeCategory !== 'all' && product.category !== activeCategory) {
      return false;
    }
    
    if (searchQuery && !product.name.toLowerCase().includes(searchQuery.toLowerCase()) && 
        !product.description.toLowerCase().includes(searchQuery.toLowerCase())) {
      return false;
    }
    
    if (organicOnly && !product.organic) {
      return false;
    }
    
    if (inStockOnly && product.stock <= 0) {
      return false;
    }
    
    if (product.price < priceRange[0] || product.price > priceRange[1]) {
      return false;
    }
    
    return true;
  });

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (sortBy) {
      case 'price-asc':
        return a.price - b.price;
      case 'price-desc':
        return b.price - a.price;
      case 'name':
        return a.name.localeCompare(b.name);
      case 'popularity':
      default:
        return (b.rating || 0) - (a.rating || 0);
    }
  });

  const featuredProducts = products.filter(product => product.featured);

  const calculateCartTotal = () => {
    return cart.reduce((total, item) => total + (item.product.price * item.quantity), 0);
  };

  const calculateCartItems = () => {
    return cart.reduce((total, item) => total + item.quantity, 0);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Header */}
      <header className="bg-white shadow-sm sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <div className="flex items-center">
              <Leaf className="h-8 w-8 text-green-600" />
              <h1 className="ml-2 text-xl font-bold text-gray-900">Kisaan Bazaar</h1>
            </div>
            
            {/* Search Bar - Desktop */}
            <div className="hidden md:flex flex-1 max-w-md mx-8">
              <div className="relative w-full">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Search className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="text"
                  placeholder="Search for fruits, vegetables..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-green-500 focus:border-green-500 sm:text-sm"
                />
              </div>
            </div>
            
            {/* Navigation - Desktop */}
            <nav className="hidden md:flex items-center space-x-8">
              <a href="#" className="text-gray-600 hover:text-green-600 font-medium">Home</a>
              <div className="relative">
                <button 
                  className="flex items-center text-gray-600 hover:text-green-600 font-medium"
                  onClick={() => setShowMenu(!showMenu)}
                >
                  Categories
                  <ChevronDown className="ml-1 h-4 w-4" />
                </button>
                {showMenu && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-10">
                    <button 
                      onClick={() => { setActiveCategory('all'); setShowMenu(false); }}
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
                    >
                      All Products
                    </button>
                    <button 
                      onClick={() => { setActiveCategory('vegetables'); setShowMenu(false); }}
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
                    >
                      Vegetables
                    </button>
                    <button 
                      onClick={() => { setActiveCategory('fruits'); setShowMenu(false); }}
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
                    >
                      Fruits
                    </button>
                    <button 
                      onClick={() => { setActiveCategory('organic'); setShowMenu(false); }}
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
                    >
                      Organic Products
                    </button>
                  </div>
                )}
              </div>
              <button 
                onClick={() => setShowDashboard(true)}
                className="text-gray-600 hover:text-green-600 font-medium"
              >
                Dashboard
              </button>
            </nav>
            
            {/* User Actions */}
            <div className="flex items-center space-x-4">
              <button 
                onClick={() => setShowCart(true)}
                className="relative p-2 text-gray-600 hover:text-green-600"
              >
                <ShoppingCart className="h-6 w-6" />
                {cart.length > 0 && (
                  <span className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-white transform translate-x-1/2 -translate-y-1/2 bg-green-600 rounded-full">
                    {calculateCartItems()}
                  </span>
                )}
              </button>
              
              <button 
                onClick={() => setShowDashboard(true)}
                className="p-2 text-gray-600 hover:text-green-600 md:hidden"
              >
                <User className="h-6 w-6" />
              </button>
              
              {/* Mobile Menu Button */}
              <button 
                className="p-2 text-gray-600 hover:text-green-600 md:hidden"
                onClick={() => setShowMenu(!showMenu)}
              >
                <Menu className="h-6 w-6" />
              </button>
            </div>
          </div>
          
          {/* Search Bar - Mobile */}
          <div className="mt-4 md:hidden">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Search for fruits, vegetables..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-green-500 focus:border-green-500 sm:text-sm"
              />
            </div>
          </div>
          
          {/* Mobile Menu */}
          {showMenu && (
            <div className="mt-4 py-2 border-t border-gray-200 md:hidden">
              <nav className="grid gap-y-4">
                <a href="#" className="text-base font-medium text-gray-600 hover:text-green-600">
                  Home
                </a>
                <button 
                  onClick={() => { setActiveCategory('all'); setShowMenu(false); }}
                  className="text-base font-medium text-gray-600 hover:text-green-600 text-left"
                >
                  All Products
                </button>
                <button 
                  onClick={() => { setActiveCategory('vegetables'); setShowMenu(false); }}
                  className="text-base font-medium text-gray-600 hover:text-green-600 text-left"
                >
                  Vegetables
                </button>
                <button 
                  onClick={() => { setActiveCategory('fruits'); setShowMenu(false); }}
                  className="text-base font-medium text-gray-600 hover:text-green-600 text-left"
                >
                  Fruits
                </button>
                <button 
                  onClick={() => { setActiveCategory('organic'); setShowMenu(false); }}
                  className="text-base font-medium text-gray-600 hover:text-green-600 text-left"
                >
                  Organic Products
                </button>
                <button 
                  onClick={() => { setShowDashboard(true); setShowMenu(false); }}
                  className="text-base font-medium text-gray-600 hover:text-green-600 text-left"
                >
                  Dashboard
                </button>
              </nav>
            </div>
          )}
        </div>
      </header>
      
      {/* Hero Banner */}
      <div className="relative bg-green-700 overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <div className="relative z-10 pb-8 bg-green-700 sm:pb-16 md:pb-20 lg:max-w-2xl lg:w-full lg:pb-28 xl:pb-32">
            <svg
              className="hidden lg:block absolute right-0 inset-y-0 h-full w-48 text-green-700 transform translate-x-1/2"
              fill="currentColor"
              viewBox="0 0 100 100"
              preserveAspectRatio="none"
              aria-hidden="true"
            >
              <polygon points="50,0 100,0 50,100 0,100" />
            </svg>
            
            <div className="pt-10 sm:pt-16 lg:pt-8 xl:pt-16">
              <div className="sm:text-center lg:text-left px-4 sm:px-8">
                <h1 className="text-4xl tracking-tight font-extrabold text-white sm:text-5xl md:text-6xl">
                  <span className="block">Fresh, Organic</span>
                  <span className="block text-green-200">& Healthy</span>
                </h1>
                <p className="mt-3 text-base text-green-100 sm:mt-5 sm:text-lg sm:max-w-xl sm:mx-auto md:mt-5 md:text-xl lg:mx-0">
                  Order the best farm-fresh products delivered to your doorstep! Support local farmers and enjoy the freshest produce.
                </p>
                <div className="mt-5 sm:mt-8 sm:flex sm:justify-center lg:justify-start">
                  <div className="rounded-md shadow">
                    <a
                      href="#products"
                      className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-green-700 bg-white hover:bg-gray-50 md:py-4 md:text-lg md:px-10"
                    >
                      Shop Now
                    </a>
                  </div>
                  <div className="mt-3 sm:mt-0 sm:ml-3">
                    <a
                      href="#featured"
                      className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-green-600 hover:bg-green-500 md:py-4 md:text-lg md:px-10"
                    >
                      Featured Products
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="lg:absolute lg:inset-y-0 lg:right-0 lg:w-1/2">
          <img
            className="h-56 w-full object-cover sm:h-72 md:h-96 lg:w-full lg:h-full"
            src="https://images.unsplash.com/photo-1542838132-92c53300491e?ixlib=rb-1.2.1&auto=format&fit=crop&w=1567&q=80"
            alt="Fresh vegetables and fruits"
          />
        </div>
      </div>
      
      {/* Featured Products */}
      <section id="featured" className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-bold text-gray-900">Featured Products</h2>
            <a href="#products" className="text-green-600 hover:text-green-700 flex items-center">
              View All <ArrowUpRight className="ml-1 h-4 w-4" />
            </a>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredProducts.slice(0, 4).map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                addToCart={addToCart}
                toggleFavorite={toggleFavorite}
                isFavorite={favorites.includes(product.id)}
              />
            ))}
          </div>
        </div>
      </section>
      
      {/* Main Products Section */}
      <section id="products" className="py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4 md:mb-0">
              {activeCategory === 'all' ? 'All Products' : 
               activeCategory === 'vegetables' ? 'Fresh Vegetables' :
               activeCategory === 'fruits' ? 'Fresh Fruits' : 'Organic Products'}
            </h2>
            
            <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
              >
                <Filter className="mr-2 h-4 w-4" />
                Filters
              </button>
              
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm rounded-md"
              >
                <option value="popularity">Sort by: Popularity</option>
                <option value="price-asc">Sort by: Price (Low to High)</option>
                <option value="price-desc">Sort by: Price (High to Low)</option>
                <option value="name">Sort by: Name</option>
              </select>
            </div>
          </div>
          
          {/* Filters */}
          {showFilters && (
            <div className="mb-8 p-4 bg-white rounded-lg shadow-sm">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <h3 className="text-sm font-medium text-gray-700 mb-2">Price Range</h3>
                  <div className="flex items-center space-x-4">
                    <input
                      type="range"
                      min="0"
                      max="20"
                      step="0.5"
                      value={priceRange[1]}
                      onChange={(e) => setPriceRange([priceRange[0], parseFloat(e.target.value)])}
                      className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                    />
                    <span className="text-sm text-gray-600">
                      ${priceRange[0]} - ${priceRange[1]}
                    </span>
                  </div>
                </div>
                
                <div>
                  <h3 className="text-sm font-medium text-gray-700 mb-2">Product Type</h3>
                  <div className="space-y-2">
                    <label className="inline-flex items-center">
                      <input
                        type="checkbox"
                        checked={organicOnly}
                        onChange={() => setOrganicOnly(!organicOnly)}
                        className="rounded border-gray-300 text-green-600 focus:ring-green-500"
                      />
                      <span className="ml-2 text-sm text-gray-600">Organic Only</span>
                    </label>
                  
                  </div>
                </div>
                
                <div>
                  <h3 className="text-sm font-medium text-gray-700 mb-2">Availability</h3>
                  <div className="space-y-2">
                    <label className="inline-flex items-center">
                      <input
                        type="checkbox"
                        checked={inStockOnly}
                        onChange={() => setInStockOnly(!inStockOnly)}
                        className="rounded border-gray-300 text-green-600 focus:ring-green-500"
                      />
                      <span className="ml-2 text-sm text-gray-600">In Stock Only</span>
                    </label>
                  </div>
                </div>
              </div>
              
              <div className="mt-4 flex justify-end">
                <button
                  onClick={() => {
                    setPriceRange([0, 20]);
                    setOrganicOnly(false);
                    setInStockOnly(false);
                  }}
                  className="text-sm text-gray-600 hover:text-gray-900"
                >
                  Reset Filters
                </button>
              </div>
            </div>
          )}
          
          {/* Products Grid */}
          {sortedProducts.length === 0 ? (
            <div className="text-center py-12">
              <ShoppingBag className="mx-auto h-12 w-12 text-gray-400" />
              <h3 className="mt-2 text-sm font-medium text-gray-900">No products found</h3>
              <p className="mt-1 text-sm text-gray-500">Try adjusting your search or filter to find what you're looking for.</p>
              <div className="mt-6">
                <button
                  onClick={() => {
                    setSearchQuery('');
                    setActiveCategory('all');
                    setPriceRange([0, 20]);
                    setOrganicOnly(false);
                    setInStockOnly(false);
                  }}
                  className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                >
                  Clear all filters
                </button>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {sortedProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  addToCart={addToCart}
                  toggleFavorite={toggleFavorite}
                  isFavorite={favorites.includes(product.id)}
                />
              ))}
            </div>
          )}
        </div>
      </section>
      
      {/* Why Choose Us */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">Why Choose Kisaan Bazaar</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-md bg-green-100 text-green-600">
                <Leaf className="h-6 w-6" />
              </div>
              <h3 className="mt-4 text-lg font-medium text-gray-900">100% Organic</h3>
              <p className="mt-2 text-base text-gray-500">
                All our products are certified organic, grown without harmful pesticides or chemicals.
              </p>
            </div>
            
            <div className="text-center">
              <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-md bg-green-100 text-green-600">
                <Truck className="h-6 w-6" />
              </div>
              <h3 className="mt-4 text-lg font-medium text-gray-900">Fast Delivery</h3>
              <p className="mt-2 text-base text-gray-500">
                We deliver your orders within 24 hours to ensure maximum freshness.
              </p>
            </div>
            
            <div className="text-center">
              <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-md bg-green-100 text-green-600">
                <Package className="h-6 w-6" />
              </div>
              <h3 className="mt-4 text-lg font-medium text-gray-900">Quality Guaranteed</h3>
              <p className="mt-2 text-base text-gray-500">
                Not satisfied with the quality? We offer a 100% money-back guarantee.
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Footer */}
      <footer className="bg-gray-800 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center">
                <Leaf className="h-6 w-6 text-green-400" />
                <h3 className="ml-2 text-lg font-bold">Kisaan Bazaar</h3>
              </div>
              <p className="mt-2 text-gray-400">
                Your one-stop shop for fresh, organic produce delivered right to your doorstep.
              </p>
              <div className="mt-4 flex space-x-4">
                <a href="#" className="text-gray-400 hover:text-white">
                  <span className="sr-only">Facebook</span>
                  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
                  </svg>
                </a>
                <a href="#" className="text-gray-400 hover:text-white">
                  <span className="sr-only">Instagram</span>
                  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clipRule="evenodd" />
                  </svg>
                </a>
                <a href="#" className="text-gray-400 hover:text-white">
                  <span className="sr-only">Twitter</span>
                  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                  </svg>
                </a>
              </div>
            </div>
            
            <div>
              <h3 className="text-sm font-semibold uppercase tracking-wider">Categories</h3>
              <ul className="mt-4 space-y-2">
                <li>
                  <a href="#" className="text-gray-400 hover:text-white">Vegetables</a>
                </li>
                <li>
                  <a href="#" className="text-gray-400 hover:text-white">Fruits</a>
                </li>
                <li>
                  <a href="#" className="text-gray-400 hover:text-white">Organic Products</a>
                </li>
                <li>
                  <a href="#" className="text-gray-400 hover:text-white">Seasonal Items</a>
                </li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-sm font-semibold uppercase tracking-wider">Customer Service</h3>
              <ul className="mt-4 space-y-2">
                <li>
                  <a href="#" className="text-gray-400 hover:text-white">Contact Us</a>
                </li>
                <li>
                  <a href="#" className="text-gray-400 hover:text-white">FAQs</a>
                </li>
                <li>
                  <a href="#" className="text-gray-400 hover:text-white">Shipping Policy</a>
                </li>
                <li>
                  <a href="#" className="text-gray-400 hover:text-white">Returns & Refunds</a>
                </li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-sm font-semibold uppercase tracking-wider">Newsletter</h3>
              <p className="mt-4 text-gray-400">
                Subscribe to our newsletter for weekly updates on new products and special offers.
              </p>
              <form className="mt-4">
                <div className="flex">
                  <input
                    type="email"
                    placeholder="Your email"
                    className="min-w-0 flex-1 bg-gray-700 border border-transparent rounded-md py-2 px-4 text-base text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white"
                  />
                  <div className="ml-3">
                    <button
                      type="submit"
                      className="bg-green-600 border border-transparent rounded-md py-2 px-4 flex items-center justify-center text-base font-medium text-white hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-green-500"
                    >
                      Subscribe
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
          
          <div className="mt-8 border-t border-gray-700 pt-8 flex flex-col md:flex-row justify-between">
            <p className="text-base text-gray-400">
              &copy; 2025 Kisaan Bazaar. All rights reserved.
            </p>
            <div className="mt-4 md:mt-0 flex space-x-6">
              <a href="#" className="text-gray-400 hover:text-white">Privacy Policy</a>
              <a href="#" className="text-gray-400 hover:text-white">Terms of Service</a>
            </div>
          </div>
        </div>
      </footer>

      {/* Cart Sidebar */}
      {showCart && (
        <Cart
          cart={cart}
          updateCartQuantity={updateCartQuantity}
          removeFromCart={removeFromCart}
          calculateCartTotal={calculateCartTotal}
          onClose={() => setShowCart(false)}
          proceedToCheckout={handleCheckout}
        />
      )}

      {/* Dashboard Sidebar */}
      {showDashboard && (
        <Dashboard
          orders={orders}
          favorites={favorites}
          products={products}
          onClose={() => setShowDashboard(false)}
          toggleFavorite={toggleFavorite}
          addToCart={addToCart}
        />
      )}
    </div>
  );
};

export default HomePage;