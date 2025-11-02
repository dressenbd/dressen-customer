/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";
import { selectCartItems } from "@/redux/featured/cart/cartSlice";
import {
  clearCart,
  removeFromCart,
  updateCartItemQuantity,
} from "@/redux/featured/cart/cartSlice";
import { useCreateOrderMutation } from "@/redux/featured/order/orderApi";
import { useGetAllProductsQuery } from "@/redux/featured/product/productApi";
import { useGetAllCouponsQuery } from "@/redux/featured/coupons/couponApi";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { selectCurrentUser } from "@/redux/featured/auth/authSlice";
import { useRouter } from "next/navigation";
import { useMemo, useState, useEffect } from "react";
import toast from "react-hot-toast";

// Components
import CheckoutHeader from "@/components/checkout/CheckoutHeader";
import CartItems from "@/components/checkout/CartItems";
import ShippingForm from "@/components/checkout/ShippingForm";
import PaymentMethod from "@/components/checkout/PaymentMethod";
import OrderReview from "@/components/checkout/OrderReview";
import OrderSummary from "@/components/checkout/OrderSummary";
import CheckoutActions from "@/components/checkout/CheckoutActions";
import ThanksModal from "@/components/checkout/ThanksModal";

// Local types
type OrderStatus = "pending" | "processing" | "completed" | "cancelled";

interface ShippingInfo {
  name: string;
  type: "amount" | "percentage";
}

interface ProductInOrder {
  product: string;
  shop: string;
  name: string;
  sku: string;
  price: number;
  salePrice: number;
  retailPrice: number;
  wholeSalePrice: number;
  quantity: number;
  variant?: string;
  subtotal: number;
}

interface OrderItemTotalAmount {
  subTotal: number;
  tax: number;
  shipping: ShippingInfo;
  discount: number;
  total: number;
}

interface Commission {
  isAddedToBalance: boolean;
  type: "percentage" | "fixed";
  value: number;
  amount: number;
}

interface OrderItem {
  user: string | number;
  productInfo: string;
  isCancelled: boolean;
  quantity: number;
  selectedPrice: number;
  products: ProductInOrder[];
  totalAmount: OrderItemTotalAmount;
  commission: Commission;
}

interface CustomerInfo {
  firstName: string;
  lastName: string;
  email?: string;
  phone: string;
  address: string;
  city?: string;
  postalCode?: string;
  country: string;
}

interface PaymentInfo {
   method?: string;
  cardNumber?: string;
  expireDate?: string;
  cvc?: string;
  nameOnCard?: string;
}

interface CreateOrderInput {
  orderBy: string;
  userRole: "customer";
  status: OrderStatus;
  isCancelled: boolean;
  totalQuantity: number;
  orderInfo: OrderItem[];
  customerInfo: CustomerInfo;
  paymentInfo: PaymentInfo | string;
  totalAmount: number;
  orderNote?: string;
}

import { CartItem } from "@/redux/featured/cart/cartSlice";
import { TCoupon } from "@/redux/featured/coupons/couponSlice";

type Coupon = TCoupon;

// -------------------- small helpers (type-safe) --------------------
const num = (v: unknown, d = 0): number => {
  const n = typeof v === "number" ? v : typeof v === "string" ? Number(v) : NaN;
  return Number.isFinite(n) ? n : d;
};

const makeTracking = (): string => {
  const token =
    typeof crypto !== "undefined" && "randomUUID" in crypto
      ? crypto.randomUUID().slice(0, 8)
      : Math.random().toString(36).slice(2, 10);
  return `TRK-${token.toUpperCase()}`;
};

type ProductLite = {
  _id: string;
  shopId: string;
  featuredImg?: string;
  description?: { name?: string };
  productInfo?: { price?: number; salePrice?: number };
};

export default function CheckoutPage() {
  const cartItems = useAppSelector(selectCartItems);
  const currentUser = useAppSelector(selectCurrentUser);

  const dispatch = useAppDispatch();
  const router = useRouter();
  const [createOrder] = useCreateOrderMutation();
  const { data: productsData } = useGetAllProductsQuery();
  const { data: couponsData } = useGetAllCouponsQuery();
  const [currentStep, setCurrentStep] = useState<1 | 2 | 3 | 4>(1);
  const [promoCode, setPromoCode] = useState("");
  const [appliedCoupon, setAppliedCoupon] = useState<Coupon | null>(null);
  const [createOrderLoading, setCreateOrderLoading] = useState(false);
  const [showThanksModal, setShowThanksModal] = useState(false);
  const [trackingNumber, setTrackingNumber] = useState<string>("");
  const [paymentMethod, setPaymentMethod] = useState<"cod" | "bkash" | "nagad">(
    "cod"
  );
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    postalCode: "",
    country: "Bangladesh",
  });

  // Auto-populate email if user is logged in
  useEffect(() => {
    if (currentUser?.email && !formData.email) {
      setFormData(prev => ({ ...prev, email: currentUser.email }));
    }
  }, [currentUser?.email, formData.email]);

  const subTotal = useMemo(() => {
    return cartItems.reduce((acc, item) => acc + item.totalAmount, 0);
  }, [cartItems]);

  const calculateDiscount = () => {
    if (!appliedCoupon) return { discount: 0, shipping: 0 };
    
    if (appliedCoupon.type === "free-shipping") {
      return { discount: 0, shipping: 0 }; // Free shipping
    } else if (appliedCoupon.type === "percentage") {
      return { discount: (subTotal * appliedCoupon.discountAmount) / 100, shipping: 0 };
    } else if (appliedCoupon.type === "fixed") {
      return { discount: appliedCoupon.discountAmount, shipping: 0 };
    }
    return { discount: 0, shipping: 0 };
  };

  const { discount } = calculateDiscount();
  const finalTotal = subTotal - discount;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
    if (formErrors[id]) {
      setFormErrors((prev) => {
        const copy = { ...prev };
        delete copy[id];
        return copy;
      });
    }
  };

  const handleQtyChange = (productId: string, dir: "inc" | "dec") => {
    const item = cartItems.find((i) => i.productId === productId);
    if (!item) return;

    if (dir === "inc" || item.quantity > 1) {
      const newQty = item.quantity + (dir === "inc" ? 1 : -1);
      dispatch(updateCartItemQuantity({ productId, quantity: newQty }));
    }
  };

  const handleRemoveItem = (productId: string) => {
    dispatch(removeFromCart(productId));
    toast.success("Item removed from cart");
  };

  const validateShippingForm = () => {
    const errors: Record<string, string> = {};
    if (!formData.firstName.trim()) errors.firstName = "First name is required";
    if (!formData.lastName.trim()) errors.lastName = "Last name is required";
    if (!formData.address.trim()) errors.address = "Address is required";
    if (!formData.phone.trim()) errors.phone = "Phone is required";
    if (formData.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errors.email = "Please enter a valid email address";
    }
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const validatePaymentForm = () => {
    return true; // No form validation needed for these methods
  };

  const applyPromoCode = () => {
    if (!promoCode.trim()) {
      toast.error("Please enter a promo code.");
      return;
    }

    const coupon = couponsData?.find(
      (c: Coupon) => c.code.toLowerCase() === promoCode.toLowerCase() && c.isApproved
    );

    if (!coupon) {
      toast.error("Invalid or expired promo code.");
      return;
    }

    if (subTotal < coupon.minimumPurchaseAmount) {
      toast.error(`Minimum purchase amount is ৳${coupon.minimumPurchaseAmount}`);
      return;
    }

    setAppliedCoupon(coupon);
    toast.success(`Coupon "${coupon.code}" applied successfully!`);
  };

  const removeCoupon = () => {
    setAppliedCoupon(null);
    setPromoCode("");
    toast.success("Coupon removed");
  };

  const copyCouponCode = (code: string) => {
    navigator.clipboard.writeText(code);
    setPromoCode(code);
    toast.success("Coupon code copied!");
  };

  const clearCarts = () => {
    dispatch(clearCart());
  };

  const buildOrderPayload = (): CreateOrderInput | null => {
    const orderItems = cartItems
      .map((it) => {
        const pidStr = it.productId;
        const p = productsData?.find((pr) => pr._id === pidStr);
        if (!p || !pidStr) {
          return null;
        }
        
        const itemSubTotal = it.totalAmount;
        const tax = 0;
        const discount = 0;
        const itemTotal = itemSubTotal + tax - discount;
        
        const orderItem = {
          user: currentUser?._id || "guest",
          productInfo: pidStr,
          isCancelled: false,
          quantity: num(it.quantity, 1),
          selectedPrice: it.unitPrice || 0,
          totalAmount: {
            subTotal: itemSubTotal,
            tax,
            shipping: { name: "Standard Shipping", type: "amount" as const },
            discount,
            total: itemTotal
          },
          commission: {
            isAddedToBalance: false,
            type: "percentage" as const,
            value: 5,
            amount: itemTotal * 0.05
          },
          products: [{
            product: pidStr,
            shop: p.shopId || "507f1f77bcf86cd799439011",
            name: it.productName || p.description?.name || "Product",
            sku: p._id,
            price: p.productInfo?.price || it.unitPrice || 0,
            salePrice: p.productInfo?.salePrice || it.unitPrice || 0,
            retailPrice: it.unitPrice || 0,
            wholeSalePrice: it.unitPrice || 0,
            quantity: num(it.quantity, 1),
            variant: it.size || it.color || undefined,
            subtotal: itemSubTotal
          }]
        };
        return orderItem;
      })
      .filter((item) => !!item);

    if (orderItems.length === 0) {
      toast.error("No valid items in cart.");
      return null;
    }

    const totalQuantity = orderItems.reduce((sum, item) => sum + item.quantity, 0);
    let grandTotal = orderItems.reduce((sum, item) => sum + item.totalAmount.total, 0);
    
    if (appliedCoupon) {
      if (appliedCoupon.type === "percentage") {
        grandTotal -= (grandTotal * appliedCoupon.discountAmount) / 100;
      } else if (appliedCoupon.type === "fixed") {
        grandTotal -= appliedCoupon.discountAmount;
      }
    }

    const payload: CreateOrderInput = {
      orderBy: currentUser?._id || "507f1f77bcf86cd799439011",
      userRole: "customer" as const,
      status: "pending" as const,
      isCancelled: false,
      totalQuantity,
      orderInfo: orderItems,
      customerInfo: {
        firstName: formData.firstName,
        lastName: formData.lastName,
        ...(currentUser && currentUser.email ? { email: currentUser.email } : {}),
        phone: formData.phone,
        address: formData.address,
        city: formData.city,
        postalCode: formData.postalCode,
        country: formData.country,
      },
      paymentInfo: paymentMethod === "cod" ? "cash-on" : { method: paymentMethod },
      totalAmount: grandTotal
    };
    return payload;
  };

  const handlePlaceOrder = async () => {
    if (!validateShippingForm() || !validatePaymentForm()) {
      setCurrentStep(1);
      return;
    }
    if (cartItems.length === 0) {
      toast.error("Your cart is empty. Please add items to proceed.");
      return;
    }
    const finalOrder = buildOrderPayload();
    if (!finalOrder) return;
    
    console.log("Order payload:", JSON.stringify(finalOrder, null, 2));
    
    try {
      setCreateOrderLoading(true);
      const response = await createOrder(finalOrder as any).unwrap();
      console.log("Order response:", response);
      clearCarts();
      setCurrentStep(1);
      setAppliedCoupon(null);
      setPromoCode("");
      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        address: "",
        city: "",
        postalCode: "",
        country: "Bangladesh",
      });
      // Generate tracking number from response or create one
      const generatedTrackingNumber = response?.trackingNumber || makeTracking();
      setTrackingNumber(generatedTrackingNumber);
      setShowThanksModal(true);
      
    } catch (error) {
      console.error("Order creation error:", error);
      toast.error(
        (error as any)?.data?.message || "Failed to place order. Please try again."
      );
    } finally {
      setCreateOrderLoading(false);
    }
  };

  const handleBackClick = () => {
    if (currentStep > 1) setCurrentStep((prev) => (prev - 1) as 1 | 2 | 3 | 4);
  };

  const handleNextStepOrSubmit = () => {
    if (currentStep === 1) {
      // Cart review step - just proceed
      setCurrentStep(2);
    } else if (currentStep === 2) {
      // Shipping form validation
      if (validateShippingForm()) setCurrentStep(3);
    } else if (currentStep === 3) {
      // Payment method validation
      if (validatePaymentForm()) setCurrentStep(4);
    } else if (currentStep === 4) {
      // Final review and place order
      handlePlaceOrder();
    }
  };



  // ---------- UI (unchanged structure) ----------
  return (
    <>
      <ThanksModal 
        isOpen={showThanksModal}
        trackingNumber={trackingNumber}
        onClose={() => setShowThanksModal(false)}
      />
      
    <div className="min-h-screen bg-[#FFFFFF] py-4 md:py-8 pb-24 md:pb-8">
      <div className="w-full px-4 max-w-6xl mx-auto">
        <CheckoutHeader currentStep={currentStep} />
        {/* Main Grid Wrapped in Form */}
        <form onSubmit={(e) => e.preventDefault()}>
          {/* Mobile: Full screen steps */}
          <div className="md:hidden">
            {currentStep === 4 ? (
              <div className="flex flex-col">
                {/* Order Summary First */}
                <div className="mb-4">
                  <OrderSummary 
                    subTotal={subTotal}
                    discount={discount}
                    finalTotal={finalTotal}
                    appliedCoupon={appliedCoupon}
                    promoCode={promoCode}
                    couponsData={couponsData}
                    onPromoCodeChange={setPromoCode}
                    onApplyPromoCode={applyPromoCode}
                    onRemoveCoupon={removeCoupon}
                    onCopyCouponCode={copyCouponCode}
                  />
                </div>
                {/* Order Review Second */}
                <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100 min-h-[60vh]">
                  <OrderReview 
                    formData={formData}
                    paymentMethod={paymentMethod}
                    cartItems={cartItems}
                    onEditShipping={() => setCurrentStep(2)}
                    onEditPayment={() => setCurrentStep(3)}
                  />
                </div>
              </div>
            ) : (
              <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100 min-h-[60vh]">
                {currentStep === 1 && (
                  <CartItems 
                    cartItems={cartItems}
                    onQuantityChange={handleQtyChange}
                    onRemoveItem={handleRemoveItem}
                  />
                )}
                {currentStep === 2 && (
                  <ShippingForm 
                    formData={formData}
                    formErrors={formErrors}
                    onInputChange={handleInputChange}
                  />
                )}
                {currentStep === 3 && (
                  <PaymentMethod 
                    paymentMethod={paymentMethod}
                    onPaymentMethodChange={setPaymentMethod}
                  />
                )}
              </div>
            )}
            
            {/* Mobile Actions - Fixed at bottom */}
            <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4 z-50 shadow-lg">
              <div className="flex gap-3 max-w-md mx-auto">
                {currentStep > 1 && (
                  <button
                    type="button"
                    onClick={handleBackClick}
                    className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 border border-gray-300 h-12 rounded-lg font-medium transition-colors"
                  >
                    Back
                  </button>
                )}
                <button
                  type="button"
                  onClick={handleNextStepOrSubmit}
                  disabled={createOrderLoading || cartItems.length === 0}
                  className={`${currentStep === 1 ? 'w-full' : 'flex-2'} bg-[#facf35] hover:bg-[#e6b82f] text-black h-12 rounded-lg font-medium disabled:opacity-50 disabled:cursor-not-allowed px-6 transition-colors`}
                >
                  {createOrderLoading ? 'Creating Order...' : 
                    currentStep === 1 ? 'Continue to Shipping' :
                    currentStep === 2 ? 'Continue to Payment' :
                    currentStep === 3 ? 'Review Order' : 'Place Order'
                  }
                </button>
              </div>
            </div>
          </div>

          {/* Desktop: Original layout */}
          <div className="hidden md:flex flex-col lg:grid lg:grid-cols-3 gap-6 md:gap-8">
            <div className="lg:col-span-2 bg-white rounded-xl p-4 md:p-6 shadow-sm border border-gray-100">
              {currentStep === 1 && (
                <CartItems 
                  cartItems={cartItems}
                  onQuantityChange={handleQtyChange}
                  onRemoveItem={handleRemoveItem}
                />
              )}
              {currentStep === 2 && (
                <ShippingForm 
                  formData={formData}
                  formErrors={formErrors}
                  onInputChange={handleInputChange}
                />
              )}
              {currentStep === 3 && (
                <PaymentMethod 
                  paymentMethod={paymentMethod}
                  onPaymentMethodChange={setPaymentMethod}
                />
              )}
              {currentStep === 4 && (
                <OrderReview 
                  formData={formData}
                  paymentMethod={paymentMethod}
                  cartItems={cartItems}
                  onEditShipping={() => setCurrentStep(2)}
                  onEditPayment={() => setCurrentStep(3)}
                />
              )}

              <CheckoutActions 
                currentStep={currentStep}
                createOrderLoading={createOrderLoading}
                cartItemsLength={cartItems.length}
                onBackClick={handleBackClick}
                onNextStepOrSubmit={handleNextStepOrSubmit}
              />
            </div>
            <OrderSummary 
              subTotal={subTotal}
              discount={discount}
              finalTotal={finalTotal}
              appliedCoupon={appliedCoupon}
              promoCode={promoCode}
              couponsData={couponsData}
              onPromoCodeChange={setPromoCode}
              onApplyPromoCode={applyPromoCode}
              onRemoveCoupon={removeCoupon}
              onCopyCouponCode={copyCouponCode}
            />
          </div>
        </form>
      </div>
    </div>
    </>
  );
}