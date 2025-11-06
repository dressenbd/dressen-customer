"use client";
import React, { useState } from 'react';
import Image from 'next/image';
import {  Search, Package, Truck, CheckCircle, Clock, MapPin, Phone, User } from 'lucide-react';

interface OrderData {
  _id: string;
  trackingNumber: string;
  status: string;
  userRole: string;
  orderInfo: Array<{
    productInfo: {
      _id: string;
      featuredImg: string;
      description: { name: string };
      productInfo: { price: number; salePrice: number };
    };
    products: Array<{
      product: {
        _id: string;
        featuredImg: string;
        description: { name: string };
        productInfo: { price: number; salePrice: number };
      };
      name: string;
      variant?: string;
      quantity: number;
      price: number;
      salePrice: number;
      subtotal: number;
    }>;
    quantity: number;
    selectedPrice: number;
    totalAmount: {
      subTotal: number;
      tax: number;
      shipping: { name: string; type: string };
      discount: number;
      total: number;
    };
  }>;
  customerInfo: {
    firstName?: string;
    lastName?: string;
    fullName?: string;
    email?: string;
    phone: string;
    address: string;
    city?: string;
    postalCode?: string;
    country: string;
  };
  totalAmount: number;
  totalQuantity: number;
}

interface TrackingResult {
  success: boolean;
  data?: OrderData;
  error?: string;
}

interface APIError {
  data?: { message?: string };
  message?: string;
}

export default function TrackingOrder() {
  const [trackingInput, setTrackingInput] = useState('');
  const [trackingResult, setTrackingResult] = useState<TrackingResult | null>(null);
  const [loading, setLoading] = useState(false);

  const handleTracking = async () => {
    if (!trackingInput.trim()) return;
    
    setLoading(true);
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/order`);
      const result = await response.json();
      
      if (result.success && result.data) {
        const foundOrder = result.data.find((order: OrderData) => 
          order.trackingNumber === trackingInput.trim()
        );
        
        if (foundOrder) {
          setTrackingResult({ success: true, data: foundOrder });
        } else {
          setTrackingResult({ success: false, error: 'Order not found with this tracking number' });
        }
      } else {
        setTrackingResult({ success: false, error: 'Failed to retrieve orders' });
      }
    } catch (error: unknown) {
      const apiError = error as APIError;
      setTrackingResult({
        success: false,
        error: apiError.message || 'Failed to track order'
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-primary text-secondary py-12">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center">
            <div className="inline-flex items-center gap-3 mb-4">
              <div className="p-3 bg-white/20 rounded-full">
                <Truck size={32} className="text-secondary" />
              </div>
              <h1 className="text-3xl md:text-5xl font-bold">Track Your Order</h1>
            </div>
            <p className="text-lg text-secondary/90 max-w-2xl mx-auto">Enter your tracking information below to get real-time updates on your order status</p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-4 -mt-8 relative z-10">
        {/* Tracking Form */}
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 bg-gray-200 rounded-lg">
              <Search size={24} className="text-primary" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900">Enter Tracking Details</h2>
          </div>
          
          <div className="space-y-6">
            <div className="space-y-2">
              <label className="text-sm font-semibold text-gray-700">Enter Tracking Number</label>
              <div className="relative">
                <input
                  type="text"
                  placeholder="Enter your tracking number..."
                  value={trackingInput}
                  onChange={(e) => setTrackingInput(e.target.value)}
                  className="w-full border-2 border-gray-300 rounded-xl px-4 py-3 pr-32 text-gray-900 focus:border-primary/50 focus:outline-none transition-colors bg-white"
                />
                <button
                  onClick={handleTracking}
                  disabled={!trackingInput.trim() || loading}
                  className="absolute right-2 top-1/2 -translate-y-1/2 bg-primary text-black px-6 py-2 rounded-lg hover:bg-gray-300 disabled:bg-gray-400 disabled:cursor-not-allowed transition-all duration-300 font-medium flex items-center gap-2"
                >
                  <Search size={16} />
                  {loading ? 'Tracking...' : 'Track'}
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Results */}
        {trackingResult && (
          <div className="space-y-6">
            {trackingResult.success ? (
              <div className="bg-white rounded-2xl shadow-lg border border-green-200 overflow-hidden">
                {/* Status Header */}
                <div className="bg-primary text-secondary px-6 py-3">
                  <div className="flex items-center gap-4">
                    <div className="p-3 bg-white/20 rounded-full">
                      <CheckCircle size={32} />
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold">Order Found!</h3>
                      <p className="text-secondary/90">Here&apos;s your order tracking information</p>
                    </div>
                  </div>
                </div>
                
                {trackingResult.data && (
                  <div className="p-8">
                    {/* Status Badge */}
                    <div className="flex items-center justify-center mb-8">
                      <div className="inline-flex items-center gap-3 bg-green-100 text-green-700 px-6 py-3 rounded-full border border-green-200">
                        <Package size={20} />
                        <span className="text-xl font-bold capitalize">{trackingResult.data.status}</span>
                      </div>
                    </div>
                    
                    {/* Order Details Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                      <div className="space-y-4">
                        <div className="flex items-start gap-3 p-4 bg-gray-50 rounded-xl">
                          <Package size={20} className="text-primary mt-1" />
                          <div>
                            <span className="text-sm font-semibold text-gray-600 block">Tracking Number</span>
                            <p className="font-mono text-lg font-bold text-gray-900">{trackingResult.data.trackingNumber}</p>
                          </div>
                        </div>
                        
                        <div className="flex items-start gap-3 p-4 bg-gray-50 rounded-xl">
                          <Clock size={20} className="text-secondary mt-1" />
                          <div>
                            <span className="text-sm font-semibold text-gray-600 block">Total Amount</span>
                            <p className="text-lg font-bold text-gray-900">৳{trackingResult.data.totalAmount}</p>
                          </div>
                        </div>
                      </div>
                      
                      <div className="space-y-4">
                        <div className="flex items-start gap-3 p-4 bg-gray-50 rounded-xl">
                          <User size={20} className="text-secondary mt-1" />
                          <div>
                            <span className="text-sm font-semibold text-gray-600 block">Customer</span>
                            <p className="text-lg font-bold text-gray-900">
                              {trackingResult.data.customerInfo.fullName || 
                               `${trackingResult.data.customerInfo.firstName || ''} ${trackingResult.data.customerInfo.lastName || ''}`.trim()}
                            </p>
                          </div>
                        </div>
                        
                        <div className="flex items-start gap-3 p-4 bg-gray-50 rounded-xl">
                          <Phone size={20} className="text-secondary mt-1" />
                          <div>
                            <span className="text-sm font-semibold text-gray-600 block">Phone</span>
                            <p className="text-lg font-bold text-gray-900">{trackingResult.data.customerInfo.phone}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    {/* Order Items */}
                    <div className="border-t pt-6">
                      <h4 className="text-xl font-bold text-gray-900 mb-4">Order Items</h4>
                      <div className="space-y-4">
                        {trackingResult.data.orderInfo.map((item, index) => (
                          <div key={index} className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl">
                            <Image 
                              src={item.productInfo.featuredImg} 
                              alt={item.productInfo.description.name}
                              width={64}
                              height={64}
                              className="w-16 h-16 object-cover rounded-lg"
                              unoptimized
                            />
                            <div className="flex-1">
                              <p className="font-semibold text-gray-900">{item.productInfo.description.name}</p>
                              <p className="text-sm text-gray-600">Quantity: {item.quantity}</p>
                              {item.products[0]?.variant && (
                                <p className="text-sm text-gray-600">Variant: {item.products[0].variant}</p>
                              )}
                            </div>
                            <div className="text-right">
                              <p className="font-bold text-secondary">৳{item.totalAmount.total}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                    
                    {/* Address */}
                    <div className="mt-6 p-4 bg-gray-50 rounded-xl">
                      <div className="flex items-start gap-3">
                        <MapPin size={20} className="text-blue-600 mt-1" />
                        <div>
                          <span className="text-sm font-semibold text-gray-600 block">Delivery Address</span>
                          <p className="text-gray-900">{trackingResult.data.customerInfo.address}, {trackingResult.data.customerInfo.country}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div className="bg-white rounded-2xl shadow-lg border border-red-200 overflow-hidden">
                <div className="bg-orange-400 text-white p-6">
                  <div className="flex items-center gap-4">
                    <div className="p-3 bg-white/20 rounded-full">
                      <Search size={32} />
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold">Order Not Found</h3>
                     
                    </div>
                  </div>
                </div>
                <div className="p-6 text-center">
                  <p className="text-gray-600 text-lg">{trackingResult.error}</p>
                  
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}