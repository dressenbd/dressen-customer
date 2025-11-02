/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ShoppingCart, Heart, CreditCard, MapPin, Package, TrendingUp } from "lucide-react";
import { useGetDashboardQuery } from "@/redux/featured/dashboard/dashboardApi";


export default function Dashboard() {
  const { data, isLoading, isError, error } = useGetDashboardQuery();

  // Console log the fetched data

  

  if (isLoading) return <p className="p-6 text-sm">Loading dashboard...</p>;
  if (isError) return <p className="p-6 text-sm text-red-600">Error: {JSON.stringify(error)}</p>;

  return (
    <div className="min-h-screen p-4 md:p-6 lg:p-8">
      <div className="w-full">
        {/* Header */}
        <h1 className="text-2xl text-gray-900 mb-8">Dashboard</h1>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {/* Total Orders */}
          <Card className="bg-white">
            <CardContent className="p-6">
              <div className="flex flex-col items-center justify-center space-y-2">
                <div className="w-10 h-10 bg-red-50 rounded-lg flex items-center justify-center">
                  <ShoppingCart className="w-5 h-5 text-red-500" />
                </div>
                <p className="text-2xl text-gray-900">{data[0]?.orders?.length}</p>

                <p className="text-sm text-gray-600">Total Orders</p>
              </div>
            </CardContent>
          </Card>

          {/* Wishlist Items */}
          <Card className="bg-white">
            <CardContent className="p-6">
              <div className="flex flex-col items-center justify-center space-y-2">
                <div className="w-10 h-10 bg-red-50 rounded-lg flex items-center justify-center">
                  <Heart className="w-5 h-5 text-red-500" />
                </div>
                <p className="text-2xl text-gray-900">{data[0]?.popularProducts?.length}</p>
                <p className="text-sm text-gray-600">Wishlist Items</p>
              </div>
            </CardContent>
          </Card>

          {/* Saved Cards */}
          <Card className="bg-white">
            <CardContent className="p-6">
              <div className="flex flex-col items-center justify-center space-y-2">
                <div className="w-10 h-10 bg-orange-50 rounded-lg flex items-center justify-center">
                  <CreditCard className="w-5 h-5 text-orange-500" />
                </div>
                <p className="text-2xl text-gray-900">{data[0]?.savedCards ?? 0}</p>
                <p className="text-sm text-gray-600">Saved Cards</p>
              </div>
            </CardContent>
          </Card>

          {/* Addresses */}
          <Card className="bg-white">
            <CardContent className="p-6">
              <div className="flex flex-col items-center justify-center space-y-2">
                <div className="w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center">
                  <MapPin className="w-5 h-5 text-blue-500" />
                </div>
                <p className="text-2xl text-gray-900">{data[0]?.recentOrders[0]?.orderInfo?.streetAddress?.length}</p>
                <p className="text-sm text-gray-600">Addresses</p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-6">
          <Card className="bg-white">
            <CardHeader className="pb-4">
              <CardTitle className="flex items-center gap-2 text-lg text-gray-900">
                <TrendingUp className="w-5 h-5" />
                Quick Actions
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 sm:grid-cols-2 gap-3">
                <Link
                  href="/dashboard/orders"
                  className="flex bg-[#F9FAFB] items-center p-3 rounded-lg hover:bg-gray-50 cursor-pointer transition-colors"
                >
                  <Package className="w-10 h-10 text-blue-500 mr-3" />
                  <div>
                    <p className="text-gray-900 mb-1">View All Orders</p>
                  </div>
                </Link>

                <Link
                  href="/dashboard/wishlistItems"
                  className="flex bg-[#F9FAFB] items-center p-3 rounded-lg hover:bg-gray-50 cursor-pointer transition-colors"
                >
                  <Heart className="w-10 h-10 text-red-500 mr-3" />
                  <div>
                    <p className="text-gray-900 mb-1">Manage Wishlist</p>
                  </div>
                </Link>

                <Link
                  href="/dashboard/profile"
                  className="flex bg-[#F9FAFB] items-center p-3 rounded-lg hover:bg-gray-50 cursor-pointer transition-colors"
                >
                  <CreditCard className="w-10 h-10 text-orange-500 mr-3" />
                  <div>
                    <p className="text-gray-900 mb-1">Update Profile</p>
                  </div>
                </Link>
              </div>
            </CardContent>
          </Card>

          {/* Recent Orders */}
          <Card className="lg:col-span-2 bg-white shadow order-2 lg:order-1">
            <CardHeader className="pb-4">
              <CardTitle className="flex items-center gap-2 text-lg text-gray-900">
                <Package className="w-5 h-5" />
                Recent Orders
              </CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <div className="space-y-0">
                {data[0]?.recentOrders?.map((order: any) => (
                  <div
                    key={order.id}
                    className="flex items-center justify-between p-6 border-b border-gray-100"
                  >
                    <div>
                      <p className="text-gray-900">{order.id}</p>
                      <p className="text-sm text-gray-500">{order?.createdAt}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-gray-900">${order?.totalAmount}</p>
                      <Badge
                        variant="secondary"
                        className={`${order.status === "Delivered"
                            ? "bg-green-50 text-green-700 hover:bg-green-50"
                            : order.status === "Processing"
                              ? "bg-blue-50 text-blue-700 hover:bg-blue-50"
                              : "bg-orange-50 text-orange-700 hover:bg-orange-50"
                          }`}
                      >
                        {order.recentOrders?.status}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
