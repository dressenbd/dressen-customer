"use client";

import { useEffect, useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Eye } from "lucide-react";
import { useGetAllOrdersQuery } from "@/redux/featured/order/orderApi";
import { useAppSelector } from "@/redux/hooks";
import { selectCurrentUser } from "@/redux/featured/auth/authSlice";
import type { IOrder } from "@/types/order";
import {
  displayCustomer,
  statusLabel,
  itemsCount,
  orderTotal,
  ymd,
  statusBadgeClass,
} from "@/utils/order";
import { OrderDetailsContent } from "@/components/modules/OrderDetailsContent/OrderDetailsContent";

export default function MyOrdersTable() {
  const currentUser = useAppSelector(selectCurrentUser);
  const {
    data: allOrders,
    isLoading,
    isError,
    error,
  } = useGetAllOrdersQuery(undefined, {
    refetchOnFocus: true,
    refetchOnReconnect: true,
  });

  // Filter orders by current user's email
  const orders = useMemo(() => {
    if (!allOrders || !currentUser?.email) return [];
    
    return allOrders.filter((order: IOrder) => {
      // Check if customerInfo has email that matches current user
      if (typeof order.customerInfo === 'object' && order.customerInfo?.email) {
        return order.customerInfo.email.toLowerCase() === currentUser.email.toLowerCase();
      }
      return false;
    });
  }, [allOrders, currentUser?.email]);

  const [selectedOrder, setSelectedOrder] = useState<IOrder | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // pagination (client-side)
  const PAGE_SIZE = 10;
  const [page, setPage] = useState(1);
  const totalPages = Math.max(1, Math.ceil((orders?.length ?? 0) / PAGE_SIZE));
  const paged = useMemo(
    () => (orders ?? []).slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE),
    [orders, page]
  );

  const handleViewOrder = (order: IOrder) => {
    setSelectedOrder(order);
    setIsModalOpen(true);
  };

  useEffect(() => {
    if (isError) console.error("❌ Orders API Error:", error);
  }, [orders, isError, error]);

  // Show login message if user is not logged in
  if (!currentUser) {
    return (
      <div className="w-full px-4 py-6 md:px-6">
        <div className="bg-white w-full max-w-6xl mx-auto rounded-lg shadow-sm overflow-hidden">
          <div className="p-6 text-center">
            <h1 className="text-xl font-semibold text-gray-900 mb-4">My Orders</h1>
            <p className="text-gray-600">Please log in to view your orders.</p>
          </div>
        </div>
      </div>
    );
  }

  if (isLoading) return (
    <div className="w-full px-4 py-6 md:px-6">
      <div className="bg-white w-full max-w-6xl mx-auto rounded-lg shadow-sm overflow-hidden">
        <div className="p-6 text-center">
          <p className="text-sm">Loading your orders...</p>
        </div>
      </div>
    </div>
  );
  
  if (isError)
    return (
      <div className="w-full px-4 py-6 md:px-6">
        <div className="bg-white w-full max-w-6xl mx-auto rounded-lg shadow-sm overflow-hidden">
          <div className="p-6 text-center">
            <p className="text-sm text-red-600">Error loading orders: {JSON.stringify(error)}</p>
          </div>
        </div>
      </div>
    );

  return (
    <>
      {/* --- Table/Lite list wrapper --- */}
      <div className="w-full px-4 py-6 md:px-6">
        <div className="bg-white w-full max-w-6xl mx-auto rounded-lg shadow-sm overflow-hidden">
          <div className="p-6 border-b border-gray-200">
            <h1 className="text-xl font-semibold text-gray-900">My Orders</h1>
            {currentUser?.email && (
              <p className="text-sm text-gray-600 mt-1">Orders for: {currentUser.email}</p>
            )}
          </div>

          {/* Mobile: Card list */}
          <div className="block md:hidden p-4 space-y-3">
            {orders.length === 0 ? (
              <div className="text-center py-8">
                <p className="text-gray-500">No orders found for your account.</p>
                <p className="text-sm text-gray-400 mt-2">Start shopping to see your orders here!</p>
              </div>
            ) : (
              paged.map((order) => {
                const name = displayCustomer(order);
                const status = statusLabel(order);
                const total = orderTotal(order);
                const count = itemsCount(order);
                return (
                  <div
                    key={order._id}
                    className="rounded-lg border border-gray-200 p-3 bg-white"
                  >
                    <div className="flex items-center justify-between">
                      <div className="font-semibold text-gray-900">{name}</div>
                      <span
                        className={`text-xs rounded px-2 py-0.5 ${statusBadgeClass(
                          status
                        )}`}
                      >
                        {status}
                      </span>
                    </div>
                    <div className="mt-1 text-xs text-gray-500">
                      {ymd(order.createdAt)} • {count} item{count > 1 ? "s" : ""}
                    </div>
                    <div className="mt-2 flex items-center justify-between">
                      <div className="text-sm font-medium">Total: {total}</div>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleViewOrder(order)}
                      >
                       Details <Eye className="h-4 w-4" /> 
                      </Button>
                    </div>
                  </div>
                );
              })
            )}
          </div>

          {/* Desktop: Table */}
          <div className="hidden md:block overflow-x-auto w-full">
            <div className="px-6 py-4">
              {orders.length === 0 ? (
                <div className="text-center py-8">
                  <p className="text-gray-500">No orders found for your account.</p>
                  <p className="text-sm text-gray-400 mt-2">Start shopping to see your orders here!</p>
                </div>
              ) : (
                <table className="w-full min-w-[860px]">
                  <thead className="sticky top-0 bg-white">
                    <tr className="border-b border-gray-200">
                      <th className="text-left py-3 px-6 text-sm font-medium text-gray-500 uppercase tracking-wider">
                        Customer
                      </th>
                      <th className="text-left py-3 px-6 text-sm font-medium text-gray-500 uppercase tracking-wider">
                        Date
                      </th>
                      <th className="text-left py-3 px-6 text-sm font-medium text-gray-500 uppercase tracking-wider">
                        Status
                      </th>
                      <th className="text-left py-3 px-6 text-sm font-medium text-gray-500 uppercase tracking-wider">
                        Total
                      </th>
                      <th className="text-left py-3 px-6 text-sm font-medium text-gray-500 uppercase tracking-wider">
                        Items
                      </th>
                      <th className="text-left py-3 px-6 text-sm font-medium text-gray-500 uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {paged.map((order) => {
                      const name = displayCustomer(order);
                      const status = statusLabel(order);
                      const total = orderTotal(order);
                      const count = itemsCount(order);
                      return (
                        <tr key={order._id} className="hover:bg-gray-50">
                          <td className="py-4 px-6 text-sm font-medium text-gray-900">
                            {name}
                          </td>
                          <td className="py-4 px-6 text-sm text-gray-600">
                            {ymd(order.createdAt)}
                          </td>
                          <td className="py-4 px-6">
                            <span
                              className={`text-xs rounded px-2 py-0.5 ${statusBadgeClass(
                                status
                              )}`}
                            >
                              {status}
                            </span>
                          </td>
                          <td className="py-4 px-6 text-sm font-medium text-gray-900">
                            {total}
                          </td>
                          <td className="py-4 px-6 text-sm text-gray-600">
                            {count}
                          </td>
                          <td className="py-4 px-6">
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => handleViewOrder(order)}
                            >
                              <Eye className="h-4 w-4" />View Details
                            </Button>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              )}
            </div>
          </div>

          {/* Pagination */}
          <div className="flex items-center justify-between px-4 py-3 border-t">
            <div className="text-xs text-gray-600">
              Page {page} of {totalPages} • {orders?.length ?? 0} orders
            </div>
            <div className="flex gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                disabled={page === 1}
              >
                Prev
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                disabled={page === totalPages}
              >
                Next
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* --- Modal (responsive) --- */}
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent
          className="
            w-[calc(100vw-1rem)] 
            sm:w-full sm:max-w-lg 
            md:max-w-2xl 
            lg:max-w-4xl 
            p-0 sm:p-2 md:p-4
          "
        >
          {selectedOrder && (
            <OrderDetailsContent
              order={selectedOrder}
              onClose={() => setIsModalOpen(false)}
            />
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}
