"use client";

import { useWishlist } from '@/hooks/useWishlist';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Heart, ShoppingCart, Trash2, Zap } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useGetAllProductsQuery } from '@/redux/featured/product/productApi';
import { useAppDispatch } from '@/redux/hooks';
import { addToCart } from '@/redux/featured/cart/cartSlice';
import { IProduct } from '@/types/product';
import { useMemo } from 'react';
import toast from 'react-hot-toast';

export default function WishlistPage() {
  const { wishlist, isLoading, clearWishlist, removeFromWishlist } = useWishlist();
  const { data: productsData } = useGetAllProductsQuery();
  const dispatch = useAppDispatch();
  const router = useRouter();

  // Get full product details for wishlist items
  const wishlistProducts = useMemo(() => {
    if (!productsData || !Array.isArray(wishlist)) return [];
    
    return wishlist.map((item) => {
      const productId = item._id;
      return productsData.find((product: IProduct) => product._id === productId);
    }).filter((product): product is IProduct => Boolean(product));
  }, [wishlist, productsData]);

  // Handle buy now functionality
  const handleBuyNow = (product: IProduct) => {
    if (!product._id) {
      toast.error('Invalid product');
      return;
    }

    if ((product.productInfo?.quantity ?? 0) === 0) {
      toast.error('Out of stock');
      return;
    }

    const cartItem = {
      productId: String(product._id),
      productName: product.description?.name || 'Untitled Product',
      productImage: product.featuredImg || '/placeholder.png',
      unitPrice: Number((product?.productInfo?.salePrice === 0 ? product?.productInfo?.price : product?.productInfo?.salePrice) ?? product?.productInfo?.price ?? 0),
      quantity: 1,
      color: 'Default',
      size: 'One Size',
    };

    dispatch(addToCart(cartItem));
    toast.success('Added to cart! Redirecting to checkout...');
    
    // Navigate to checkout
    setTimeout(() => {
      router.push('/dashboard/checkout');
    }, 500);
  };

  if (isLoading) {
    return (
      <div className="max-w-6xl mx-auto p-4 md:p-8">
        <div className="text-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading your wishlist...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto p-4 md:p-8">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900">My Wishlist</h1>
          <p className="text-gray-600 mt-1">{wishlistProducts.length} items saved</p>
        </div>
        
        {wishlistProducts.length > 0 && (
          <Button 
            variant="outline" 
            onClick={() => clearWishlist()}
            className="text-red-600 border-red-300 hover:bg-red-50"
          >
            <Trash2 className="w-4 h-4 mr-2" />
            Clear All
          </Button>
        )}
      </div>

      {wishlistProducts.length === 0 ? (
        <div className="text-center py-16">
          <Heart className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <h2 className="text-xl font-semibold text-gray-900 mb-2">Your wishlist is empty</h2>
          <p className="text-gray-600 mb-6">Save items you love to buy them later</p>
          <Link href="/product-listing">
            <Button className="bg-primary hover:bg-primary/90 text-secondary">
              <ShoppingCart className="w-4 h-4 mr-2" />
              Start Shopping
            </Button>
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {wishlistProducts.map((product: IProduct) => (
            <Card key={product._id} className="group hover:shadow-lg transition-shadow duration-300">
              <div className="relative">
                <Link href={`/product-details?id=${product._id}`}>
                  <div className="relative aspect-square overflow-hidden rounded-t-lg">
                    <Image
                      src={product.featuredImg || '/placeholder.png'}
                      alt={product.description?.name || 'Product'}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                    />
                  </div>
                </Link>
                
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => removeFromWishlist(product._id)}
                  className="absolute top-2 right-2 bg-white/80 hover:bg-white text-red-500 hover:text-red-600 rounded-full p-2"
                >
                  <Heart className="w-4 h-4 fill-current" />
                </Button>
              </div>
              
              <div className="p-4">
                <Link href={`/product-details?id=${product._id}`}>
                  <h3 className="font-medium text-gray-900 hover:text-primary transition-colors line-clamp-2 mb-2">
                    {product.description?.name || 'Untitled Product'}
                  </h3>
                </Link>
                
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-lg font-semibold text-secondary">
                    ৳{(product.productInfo?.salePrice || product.productInfo?.price || 0).toFixed(0)}
                  </span>
                  {product.productInfo?.salePrice && product.productInfo?.price && product.productInfo.salePrice < product.productInfo.price && (
                    <span className="text-sm text-gray-500 line-through">
                      ৳{product.productInfo.price.toFixed(0)}
                    </span>
                  )}
                </div>
                
                <div className="flex flex-col gap-2">
                  <Button 
                    onClick={() => handleBuyNow(product)}
                    className="w-full bg-primary hover:bg-gray-300 "
                  >
                    <Zap className="w-4 h-4 mr-2" />
                    Buy Now
                  </Button>
                  <Link href={`/product-details?id=${product._id}`} className="w-full">
                    <Button variant="outline" className="w-full">
                      <ShoppingCart className="w-4 h-4 mr-2" />
                      View Details
                    </Button>
                  </Link>
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}