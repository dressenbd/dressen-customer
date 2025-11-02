/* eslint-disable @typescript-eslint/no-explicit-any */
import { IProduct } from "@/types/product";
import { Button } from "../ui/button";
import { LoaderCircle, Minus, Plus, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useGetSingleCustomerQuery, useUpdateCustomerMutation } from "@/redux/featured/customer/customerApi";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { selectCurrentUser } from "@/redux/featured/auth/authSlice";
import toast from "react-hot-toast";
import { useEffect, useState } from "react";
import { selectCustomer, setCustomer, updateCartItemQuantity } from "@/redux/featured/customer/customerSlice";

interface CartItems {
  productId: [IProduct];
  quantity: number;
  totalAmount: number;
}

export default function CartSidebar({
  isCartOpen,
  setIsCartOpen,
  cartItems,
}: {
  isCartOpen: boolean;
  setIsCartOpen: any;
  cartItems: CartItems[];
}) {
  const dispatch = useAppDispatch();

  const [updateCustomer] = useUpdateCustomerMutation();
  const [loadingId, setLoadingId] = useState<string | null>(null);


  const currentUser = useAppSelector(selectCurrentUser);
  const singleCustomer = useAppSelector(selectCustomer);

  const { data: customerData, refetch: refetchCustomer } =
    useGetSingleCustomerQuery(currentUser?.id as string, {
      skip: !currentUser?.id,
    });

  useEffect(() => {
    if (customerData) {
      dispatch(setCustomer(customerData));
    }
  }, [customerData, dispatch]);

  const removeFromCart = async (id: string) => {
    if (!singleCustomer) return;

    const updatedProductInfo =
      singleCustomer?.cartItem?.[0]?.productInfo?.filter((item: any) => {
        const productIds = item.productId.map((p: any) =>
          typeof p === 'string' ? p : String(p._id)
        );

        return !productIds.includes(id);
      }) || [];

    try {
      setLoadingId(id);

      await updateCustomer({
        id: singleCustomer._id,
        body: {
          cartItem: [
            {
              userId: singleCustomer._id,
              productInfo: updatedProductInfo.map((item: any) => ({
                productId: item.productId.map((p: any) =>
                  typeof p === 'string' ? p : String(p._id)
                ),
                quantity: item.quantity,
                totalAmount: item.totalAmount,
              })),
            },
          ],
        },
      });

      refetchCustomer();
      toast.success('Removed from cart successfully!');
      setLoadingId(null);
    } catch {
      toast.error('Failed to remove from cart.');
    }
  };

  const cartInfo = cartItems.map(item => {
    const product = item.productId[0];
    const subTotal = (product.productInfo?.price || 0) * item.quantity;
    const total = subTotal;

    return {
      subTotal,
      totalAmount: { total },
    };
  });

  const overallTotal = cartInfo.reduce(
    (acc, item) => acc + item.totalAmount.total,
    0
  );

  // update quantity functions 
 const handleQuantityChange = (productId: string, type: 'inc' | 'dec') => {
   dispatch(updateCartItemQuantity({ productId, type }));
 };

  return (
    <>
      {isCartOpen && (
        <div className="fixed inset-0 z-50 backdrop-blur-sm bg-black/40">
          <div className="fixed right-0 top-0 h-full w-full max-w-md bg-white shadow-xl">
            <div className="flex h-full flex-col">
              <div className="flex items-center justify-between border-b p-4">
                <h2 className="text-lg font-medium">
                  Shopping Cart ({cartItems.reduce((total, item) => total + item.quantity, 0)} Items)
                </h2>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setIsCartOpen(false)}
                  className="h-8 w-8 p-0"
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>

              <div className="flex-1 overflow-y-auto p-4">
                <div className="space-y-4">
                  {cartItems?.map((item: CartItems) => (
                    <div
                      key={item.productId[0]._id}
                      className="flex items-center gap-3 pb-4 border-b border-gray-100 last:border-b-0"
                    >
                      <div className="h-12 w-12 rounded-md overflow-hidden flex items-center justify-center bg-gray-100">
                        <Image
                          src={
                            item.productId[0].featuredImg || '/placeholder.png'
                          }
                          alt={item.productId[0].description?.name}
                          width={48}
                          height={48}
                          className="object-cover"
                        />
                      </div>

                      <div className="flex-1">
                        <h3 className="font-medium text-sm">
                          {item.productId[0].description?.name}
                        </h3>
                        <p className="text-sm font-semibold">
                          ${item.productId[0].productInfo?.price.toFixed(2)}
                        </p>
                        <div className="flex items-center justify-between mt-2">
                          <div className="flex items-center gap-2">
                            <Button
                              variant="outline"
                              size="icon"
                              className="h-6 w-6 p-0"
                              onClick={() =>
                                handleQuantityChange(
                                  item.productId[0]._id,
                                  'dec'
                                )
                              }
                              disabled={
                                item.quantity <= 1 
                              }
                            >
                              <Minus className="h-3 w-3" />
                            </Button>

                            <span className="text-sm font-medium w-8 text-center">  
                                {item.quantity}
                            </span>

                            <Button
                              variant="outline"
                              size="icon"
                              className="h-6 w-6 p-0"
                              onClick={() =>
                                handleQuantityChange(
                                  item.productId[0]._id,
                                  'inc'
                                )
                              }
                             
                            >
                              <Plus className="h-3 w-3" />
                            </Button>
                          </div>
                          <Button
                            variant="ghost"
                            size="sm"
                            disabled={loadingId === item.productId[0]._id}
                            onClick={() =>
                              removeFromCart(item.productId[0]._id)
                            }
                            className="text-xs flex items-center gap-2 text-rose-500 hover:text-rose-600"
                          >
                            {loadingId === item.productId[0]._id ? (
                              <>
                                <LoaderCircle className="w-4 h-4 animate-spin" />
                                <span>Removing...</span>
                              </>
                            ) : (
                              'Remove'
                            )}
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="border-t p-4 space-y-4">
                <div className="flex justify-between items-center">
                  <span className="font-medium">Subtotal</span>
                  <span className="font-bold text-lg">{overallTotal}</span>
                </div>
                <Link href={`/dashboard/checkout`}>
                  <Button className="w-full bg-orange-500 hover:bg-orange-600 text-[#2e2e2e]">
                    Checkout
                  </Button>
                </Link>
                <Button
                  variant="ghost"
                  className="w-full text-sm"
                  onClick={() => setIsCartOpen(false)}
                >
                  Continue Shopping
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
