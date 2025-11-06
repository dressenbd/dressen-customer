"use client"
import React, { useState } from 'react';
import Image from 'next/image';

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
    const baseUrl = process.env.NEXT_PUBLIC_BASE_API;
    setLoading(true);
    try {
      const response = await fetch(`${baseUrl}/order`);
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
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">🚚 Track Your Order</h1>

        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold mb-4">Track Order Status</h2>
          <div className="space-y-4">
            <div className="flex flex-col sm:flex-row gap-4">
              <input
                type="text"
                placeholder="Enter tracking number..."
                value={trackingInput}
                onChange={(e) => setTrackingInput(e.target.value)}
                className="flex-1 border border-gray-300 rounded px-3 py-2"
              />
              <button
                onClick={handleTracking}
                disabled={!trackingInput.trim() || loading}
                className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed"
              >
                {loading ? 'Tracking...' : 'Track Order'}
              </button>
            </div>
          </div>
          {trackingResult && (
            <div className="mt-6">
              {trackingResult.success ? (
                <div className="bg-green-50 border border-green-200 rounded-lg p-6">
                  <h3 className="text-lg font-semibold text-green-800 mb-4">📦 Order Status</h3>
                  {trackingResult.data && (
                    <div className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <span className="text-sm font-medium text-gray-600">Status:</span>
                          <p className="text-lg font-semibold text-green-700 capitalize">{trackingResult.data.status}</p>
                        </div>
                        <div>
                          <span className="text-sm font-medium text-gray-600">Tracking Number:</span>
                          <p className="font-mono text-sm">{trackingResult.data.trackingNumber}</p>
                        </div>
                        <div>
                          <span className="text-sm font-medium text-gray-600">Customer:</span>
                          <p className="text-sm">
                            {trackingResult.data.customerInfo.fullName || 
                             `${trackingResult.data.customerInfo.firstName || ''} ${trackingResult.data.customerInfo.lastName || ''}`.trim()}
                          </p>
                        </div>
                        <div>
                          <span className="text-sm font-medium text-gray-600">Phone:</span>
                          <p className="text-sm">{trackingResult.data.customerInfo.phone}</p>
                        </div>
                        <div className="md:col-span-2">
                          <span className="text-sm font-medium text-gray-600">Address:</span>
                          <p className="text-sm">{trackingResult.data.customerInfo.address}, {trackingResult.data.customerInfo.country}</p>
                        </div>
                      </div>
                      
                      <div className="border-t pt-4">
                        <h4 className="font-semibold text-gray-800 mb-3">Order Items:</h4>
                        <div className="space-y-3">
                          {trackingResult.data.orderInfo.map((item, index) => (
                            <div key={index} className="flex items-center space-x-4 p-3 bg-white rounded border">
                              <Image 
                                src={item.productInfo.featuredImg} 
                                alt={item.productInfo.description.name}
                                width={64}
                                height={64}
                                className="w-16 h-16 object-cover rounded"
                                unoptimized
                              />
                              <div className="flex-1">
                                <p className="font-medium">{item.productInfo.description.name}</p>
                                <p className="text-sm text-gray-600">Quantity: {item.quantity}</p>
                                {item.products[0]?.variant && (
                                  <p className="text-sm text-gray-600">Variant: {item.products[0].variant}</p>
                                )}
                              </div>
                              <div className="text-right">
                                <p className="font-semibold">৳{item.totalAmount.total}</p>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                      
                      <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded">
                        <div className="flex justify-between items-center">
                          <span className="text-sm font-medium text-blue-600">Total Amount:</span>
                          <span className="text-lg font-bold text-blue-800">৳{trackingResult.data.totalAmount}</span>
                        </div>
                        <div className="flex justify-between items-center mt-1">
                          <span className="text-sm font-medium text-blue-600">Total Quantity:</span>
                          <span className="text-sm font-semibold text-blue-800">{trackingResult.data.totalQuantity} items</span>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <div className="bg-red-50 border border-red-200 rounded-lg p-6">
                  <h3 className="text-lg font-semibold text-red-800 mb-2">❌ Error</h3>
                  <p className="text-red-700">{trackingResult.error}</p>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}