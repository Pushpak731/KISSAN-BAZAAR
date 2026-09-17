import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { X, Package, Heart, LogOut, User, ShoppingBag, Clock, MapPin, Truck } from 'lucide-react';
import { Order, Product } from '../types';
import { useAuth } from '../contexts/AuthContext';

interface DashboardProps {
  orders: Order[];
  favorites: string[];
  products: Product[];
  onClose: () => void;
  toggleFavorite: (productId: string) => void;
  addToCart: (product: Product) => void;
}

const Dashboard: React.FC<DashboardProps> = ({
  orders,
  favorites,
  products,
  onClose,
  toggleFavorite,
  addToCart
}) => {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const [activeTab, setActiveTab] = useState<'profile' | 'orders' | 'favorites'>('profile');
  const [showTrackingModal, setShowTrackingModal] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);

  const favoriteProducts = products.filter(product => favorites.includes(product.id));

  const getStatusColor = (status: Order['status']) => {
    switch (status) {
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'processing': return 'bg-blue-100 text-blue-800';
      case 'shipped': return 'bg-purple-100 text-purple-800';
      case 'delivered': return 'bg-green-100 text-green-800';
      case 'cancelled': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const handleSignOut = () => {
    logout();
    navigate('/login');
  };

  const handleTrackOrder = (order: Order) => {
    setSelectedOrder(order);
    setShowTrackingModal(true);
  };

  const closeTrackingModal = () => {
    setShowTrackingModal(false);
    setSelectedOrder(null);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      <div className="absolute inset-0 bg-gray-500 bg-opacity-75 transition-opacity" onClick={onClose}></div>

      <div className="fixed inset-y-0 right-0 max-w-full flex">
        <div className="w-screen max-w-md">
          <div className="h-full flex flex-col bg-white shadow-xl">
            {/* Header */}
            <div className="flex items-start justify-between p-4 border-b border-gray-200">
              <h2 className="text-lg font-medium text-gray-900">My Account</h2>
              <button type="button" onClick={onClose} className="-m-2 p-2 text-gray-400 hover:text-gray-500">
                <span className="sr-only">Close panel</span>
                <X className="h-6 w-6" />
              </button>
            </div>

            {/* Tabs */}
            <div className="flex border-b border-gray-200">
              {['profile', 'orders', 'favorites'].map(tab => (
                <button
                  key={tab}
                  className={`flex-1 py-4 text-center text-sm font-medium ${
                    activeTab === tab
                      ? 'text-green-600 border-b-2 border-green-600'
                      : 'text-gray-500 hover:text-gray-700'
                  }`}
                  onClick={() => setActiveTab(tab as 'profile' | 'orders' | 'favorites')}
                >
                  {tab === 'profile' && <User className="h-5 w-5 mx-auto mb-1" />}
                  {tab === 'orders' && <Package className="h-5 w-5 mx-auto mb-1" />}
                  {tab === 'favorites' && <Heart className="h-5 w-5 mx-auto mb-1" />}
                  {tab.charAt(0).toUpperCase() + tab.slice(1)}
                </button>
              ))}
            </div>

            {/* Content */}
            <div className="flex-1 overflow-y-auto p-4">
              {/* Profile Tab */}
              {activeTab === 'profile' && user && (
                <div className="space-y-6">
                  {/* User Info */}
                  <div className="flex items-center">
                    <div className="h-16 w-16 rounded-full bg-green-100 flex items-center justify-center text-green-600">
                      <User className="h-8 w-8" />
                    </div>
                    <div className="ml-4">
                      <h3 className="text-lg font-medium text-gray-900">{user.name}</h3>
                      <p className="text-sm text-gray-500">{user.email}</p>
                    </div>
                  </div>

                  {/* Personal Info */}
                  <div>
                    <h4 className="text-sm font-medium text-gray-900 mb-2">Personal Information</h4>
                    <div className="bg-gray-50 p-4 rounded-md grid grid-cols-2 gap-4">
                      <div><p className="text-xs text-gray-500">Full Name</p><p className="text-sm">{user.name}</p></div>
                      <div><p className="text-xs text-gray-500">Email</p><p className="text-sm">{user.email}</p></div>
                      <div><p className="text-xs text-gray-500">Phone</p><p className="text-sm">{user.phone}</p></div>
                      <div><p className="text-xs text-gray-500">Member Since</p><p className="text-sm">{user.memberSince}</p></div>
                      <div><p className="text-xs text-gray-500">Account Type</p><p className="text-sm capitalize">{user.type}</p></div>
                    </div>
                  </div>

                  {/* Address */}
                  <div>
                    <h4 className="text-sm font-medium text-gray-900 mb-2">Address</h4>
                    <div className="bg-gray-50 p-4 rounded-md text-sm">{user.address}</div>
                  </div>

                  {/* Payment */}
                  <div>
                    <h4 className="text-sm font-medium text-gray-900 mb-2">Payment Method</h4>
                    <div className="bg-gray-50 p-4 rounded-md flex items-center justify-between">
                      <div className="flex items-center">
                        <div className="h-8 w-12 bg-blue-100 flex items-center justify-center rounded font-bold text-xs text-blue-800">VISA</div>
                        <span className="ml-3 text-sm">•••• 4242</span>
                      </div>
                      <span className="text-xs text-gray-500">Expires 12/28</span>
                    </div>
                  </div>

                  {/* Sign Out */}
                  <div className="pt-4">
                    <button onClick={handleSignOut} className="flex items-center text-red-600 font-medium text-sm">
                      <LogOut className="h-4 w-4 mr-2" />
                      Sign Out
                    </button>
                  </div>
                </div>
              )}

              {/* Orders Tab */}
              {activeTab === 'orders' && (
                <div>
                  <h3 className="text-lg font-medium mb-4">Your Orders</h3>
                  {orders.length === 0 ? (
                    <div className="text-center py-8">
                      <Package className="h-12 w-12 text-gray-400 mx-auto" />
                      <h3 className="mt-2 text-sm font-medium text-gray-900">No orders yet</h3>
                      <p className="mt-1 text-sm text-gray-500">Start shopping to place your first order.</p>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {orders.map(order => (
                        <div key={order.id} className="border border-gray-200 rounded-lg overflow-hidden">
                          <div className="p-4 flex justify-between">
                            <div>
                              <p className="text-sm font-medium">Order #{order.id}</p>
                              <p className="text-xs text-gray-500">{order.date}</p>
                            </div>
                            <span className={`inline-flex px-2 py-0.5 rounded-full text-xs ${getStatusColor(order.status)}`}>
                              {order.status}
                            </span>
                          </div>

                          <div className="p-4">
                            {order.items.map(item => (
                              <div key={item.product.id} className="flex items-center mb-2">
                                <img src={item.product.image} alt={item.product.name} className="h-10 w-10 object-cover rounded" />
                                <div className="ml-3 flex-1">
                                  <p className="text-sm">{item.product.name}</p>
                                  <p className="text-xs text-gray-500">Qty: {item.quantity}</p>
                                </div>
                                <p className="text-sm">${(item.product.price * item.quantity).toFixed(2)}</p>
                              </div>
                            ))}

                            <div className="flex justify-between items-center mt-4 pt-2 border-t text-sm">
                              <div className="flex items-center text-gray-500">
                                <Clock className="h-4 w-4 mr-1" />
                                {order.status === 'delivered' ? 'Delivered on' : 'Estimated by'} {order.date}
                              </div>
                              <button
                                onClick={() => handleTrackOrder(order)}
                                className="text-green-600 font-medium text-xs"
                              >
                                Track Order
                              </button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {/* Favorites Tab */}
              {activeTab === 'favorites' && (
                <div>
                  <h3 className="text-lg font-medium mb-4">Your Favorites</h3>
                  {favoriteProducts.length === 0 ? (
                    <div className="text-center py-8">
                      <Heart className="h-12 w-12 text-gray-400 mx-auto" />
                      <h3 className="mt-2 text-sm font-medium text-gray-900">No favorites yet</h3>
                      <p className="mt-1 text-sm text-gray-500">Start adding products to your favorites.</p>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {favoriteProducts.map(product => (
                        <div key={product.id} className="flex border p-4 rounded-lg">
                          <img src={product.image} alt={product.name} className="h-20 w-20 object-cover rounded" />
                          <div className="ml-4 flex-1 flex flex-col">
                            <h4 className="text-sm font-medium">{product.name}</h4>
                            <p className="text-xs text-gray-500 line-clamp-2">{product.description}</p>
                            <p className="mt-1 text-sm font-medium">${product.price.toFixed(2)} / {product.unit}</p>
                            <div className="flex justify-between items-center mt-2">
                              <button onClick={() => toggleFavorite(product.id)} className="text-xs text-red-600 flex items-center">
                                <Heart className="h-4 w-4 mr-1 fill-red-500" />
                                Remove
                              </button>
                              <button
                                onClick={() => addToCart(product)}
                                disabled={product.stock <= 0}
                                className={`text-xs px-3 py-1 rounded ${
                                  product.stock > 0 ? 'bg-green-600 text-white' : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                                }`}
                              >
                                {product.stock > 0 ? 'Add to Cart' : 'Out of Stock'}
                              </button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>

          </div>
        </div>
      </div>

      {/* Order Tracking Modal */}
      {showTrackingModal && selectedOrder && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md relative">
            <button onClick={closeTrackingModal} className="absolute top-2 right-2 text-gray-500 hover:text-gray-700">
              <X className="h-6 w-6" />
            </button>
            <h3 className="text-lg font-medium mb-4">Tracking Order #{selectedOrder.id}</h3>
            <div className="space-y-2">
              <p><Truck className="inline-block mr-2 h-5 w-5" /> Status: <b>{selectedOrder.status}</b></p>
              <p><MapPin className="inline-block mr-2 h-5 w-5" /> Shipping Address: {user?.address}</p>
              <p><Clock className="inline-block mr-2 h-5 w-5" /> Estimated Delivery: {selectedOrder.date}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
