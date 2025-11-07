/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useMemo, useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import {
  Heart, Minus, Plus, Shield, Truck, Undo2, Star, ShoppingCart, Copy, ChevronRight,
} from 'lucide-react';
import { useGetAllProductsQuery } from '@/redux/featured/product/productApi';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { addToCart, selectCartItems } from '@/redux/featured/cart/cartSlice';
import { useWishlist } from '@/hooks/useWishlist';
import toast from 'react-hot-toast';
import clsx from 'clsx';
import { IProduct } from '@/types/product';

// ---------- helpers ----------
const normalizeText = (v: unknown): string =>
  typeof v === 'string'
    ? v
    : v && typeof (v as any).name === 'string'
    ? (v as any).name
    : '';

const normalizeStringList = (arr: unknown): string[] =>
  Array.isArray(arr)
    ? arr
        .map((x) =>
          typeof x === 'string'
            ? x
            : x && typeof (x as any).name === 'string'
            ? (x as any).name
            : ''
        )
        .filter(Boolean)
    : [];

function cn(...c: (string | false | null | undefined)[]) {
  return c.filter(Boolean).join(' ');
}

type ProductImage = { src: string; alt: string };
type ColorOption = { name: string; hex: string };
type SizeOption = 'XS' | 'S' | 'M' | 'L' | 'XL' | 'XXL';

type Badge = 'SALE' | 'In Stock' | 'Out of Stock' | 'Limited Edition';

type ProductView = {
  title: string;
  description: string;
  price: number;
  compareAt: number;
  rating: number;
  reviews: number;
  sold: number;
  badges: Badge[];
  brand: string;
  categories: string[];
  tags: string[];
  specifications: {
    sku: string;
    weight?: string;
    dimensions: { length?: string; width?: string; height?: string };
    status: string;
    quantity: number;
  };
};

interface ProductDetailsProps {
  product?: IProduct | null;
}

export default function ProductDetails({ product }: ProductDetailsProps) {
  const dispatch = useAppDispatch();
  const router = useRouter();

  const { data: productsData } = useGetAllProductsQuery();
  const cartItems = useAppSelector(selectCartItems);

  const staticColors = useMemo<ColorOption[]>(() => [
    // Basic Colors
    { name: 'Black', hex: '#000000' },
    { name: 'White', hex: '#FFFFFF' },
    { name: 'Gray', hex: '#808080' },
    { name: 'Grey', hex: '#808080' },
    
    // Reds
    { name: 'Red', hex: '#FF0000' },
    { name: 'Crimson', hex: '#DC143C' },
    { name: 'Maroon', hex: '#800000' },
    { name: 'Dark Red', hex: '#8B0000' },
    { name: 'Fire Red', hex: '#FF4500' },
    
    // Blues
    { name: 'Blue', hex: '#0000FF' },
    { name: 'Navy', hex: '#000080' },
    { name: 'Navy Blue', hex: '#0b2545' },
    { name: 'Royal Blue', hex: '#4169E1' },
    { name: 'Sky Blue', hex: '#87CEEB' },
    { name: 'Light Blue', hex: '#ADD8E6' },
    { name: 'Dark Blue', hex: '#00008B' },
    
    // Greens
    { name: 'Green', hex: '#008000' },
    { name: 'Dark Green', hex: '#006400' },
    { name: 'Forest Green', hex: '#228B22' },
    { name: 'Lime Green', hex: '#32CD32' },
    { name: 'Olive', hex: '#808000' },
    
    // Yellows
    { name: 'Yellow', hex: '#FFFF00' },
    { name: 'Gold', hex: '#FFD700' },
    { name: 'Orange', hex: '#FFA500' },
    { name: 'Dark Orange', hex: '#FF8C00' },
    
    // Purples
    { name: 'Purple', hex: '#800080' },
    { name: 'Violet', hex: '#8A2BE2' },
    { name: 'Magenta', hex: '#FF00FF' },
    { name: 'Pink', hex: '#FFC0CB' },
    { name: 'Hot Pink', hex: '#FF69B4' },
    
    // Browns
    { name: 'Brown', hex: '#A52A2A' },
    { name: 'Chocolate', hex: '#D2691E' },
    { name: 'Tan', hex: '#D2B48C' },
    { name: 'Beige', hex: '#F5F5DC' },
    
    // Metallics
    { name: 'Silver', hex: '#C0C0C0' },
    { name: 'Gold', hex: '#FFD700' },
    { name: 'Bronze', hex: '#CD7F32' },
    { name: 'Copper', hex: '#B87333' },
    
    // Grays
    { name: 'Light Gray', hex: '#D3D3D3' },
    { name: 'Dark Gray', hex: '#A9A9A9' },
    { name: 'Charcoal', hex: '#36454F' },
    { name: 'Titanium Gray', hex: '#808080' },
    
    // Other Common Colors
    { name: 'Turquoise', hex: '#40E0D0' },
    { name: 'Teal', hex: '#008080' },
    { name: 'Cyan', hex: '#00FFFF' },
    { name: 'Indigo', hex: '#4B0082' },
    { name: 'Coral', hex: '#FF7F50' },
    { name: 'Salmon', hex: '#FA8072' },
    { name: 'Khaki', hex: '#F0E68C' },
    { name: 'Ivory', hex: '#FFFFF0' },
    { name: 'Cream', hex: '#FFFDD0' },
    
    // Additional Fashion Colors
    { name: 'Rose', hex: '#FF007F' },
    { name: 'Fuchsia', hex: '#FF00FF' },
    { name: 'Lavender', hex: '#E6E6FA' },
    { name: 'Mint', hex: '#98FB98' },
    { name: 'Peach', hex: '#FFCBA4' },
    { name: 'Burgundy', hex: '#800020' },
    { name: 'Wine', hex: '#722F37' },
    { name: 'Mustard', hex: '#FFDB58' },
    { name: 'Rust', hex: '#B7410E' },
    { name: 'Sage', hex: '#9CAF88' },
    { name: 'Mauve', hex: '#E0B0FF' },
    { name: 'Plum', hex: '#DDA0DD' },
    { name: 'Emerald', hex: '#50C878' },
    { name: 'Ruby', hex: '#E0115F' },
    { name: 'Sapphire', hex: '#0F52BA' },
    { name: 'Amber', hex: '#FFBF00' },
    { name: 'Jade', hex: '#00A86B' },
    { name: 'Pearl', hex: '#F8F6F0' },
    { name: 'Onyx', hex: '#353839' },
    { name: 'Slate', hex: '#708090' },
    { name: 'Ash', hex: '#B2BEB5' },
    { name: 'Stone', hex: '#928E85' },
    { name: 'Sand', hex: '#C2B280' },
    { name: 'Camel', hex: '#C19A6B' },
    { name: 'Taupe', hex: '#483C32' },
    { name: 'Mocha', hex: '#967117' },
    { name: 'Espresso', hex: '#6F4E37' },
    { name: 'Vanilla', hex: '#F3E5AB' },
    { name: 'Champagne', hex: '#F7E7CE' },
    { name: 'Rose Gold', hex: '#E8B4B8' },
    { name: 'Platinum', hex: '#E5E4E2' },
    { name: 'Steel', hex: '#71797E' },
    { name: 'Gunmetal', hex: '#2C3539' },
    { name: 'Pewter', hex: '#96A8A1' },
    { name: 'Mint Green', hex: '#98FB98' },
    { name: 'Sea Green', hex: '#2E8B57' },
    { name: 'Lime', hex: '#00FF00' },
    { name: 'Neon Green', hex: '#39FF14' },
    { name: 'Electric Blue', hex: '#7DF9FF' },
    { name: 'Cobalt', hex: '#0047AB' },
    { name: 'Cerulean', hex: '#007BA7' },
    { name: 'Azure', hex: '#007FFF' },
    { name: 'Powder Blue', hex: '#B0E0E6' },
    { name: 'Baby Blue', hex: '#89CFF0' },
    { name: 'Periwinkle', hex: '#CCCCFF' },
    { name: 'Lilac', hex: '#C8A2C8' },
    { name: 'Orchid', hex: '#DA70D6' },
    { name: 'Thistle', hex: '#D8BFD8' },
    { name: 'Blush', hex: '#DE5D83' },
    { name: 'Dusty Rose', hex: '#DCAE96' },
    { name: 'Terracotta', hex: '#E2725B' },
    { name: 'Brick', hex: '#CB4154' },
    { name: 'Scarlet', hex: '#FF2400' },
    { name: 'Cherry', hex: '#DE3163' },
    { name: 'Raspberry', hex: '#E30B5C' },
    { name: 'Strawberry', hex: '#FC5A8D' },
    { name: 'Watermelon', hex: '#FF7F7F' },
    { name: 'Apricot', hex: '#FBCEB1' },
    { name: 'Tangerine', hex: '#F28500' },
    { name: 'Papaya', hex: '#FFEFD5' },
    { name: 'Mango', hex: '#FDBE02' },
    { name: 'Lemon', hex: '#FFF700' },
    { name: 'Canary', hex: '#FFFF99' },
    { name: 'Butter', hex: '#FFFF8B' },
    { name: 'Honey', hex: '#FFB347' },
    { name: 'Caramel', hex: '#AF6F09' },
    { name: 'Cinnamon', hex: '#D2691E' },
    { name: 'Coffee', hex: '#6F4E37' },
    { name: 'Cocoa', hex: '#D2691E' },
    { name: 'Mahogany', hex: '#C04000' },
    { name: 'Chestnut', hex: '#954535' },
    { name: 'Auburn', hex: '#A52A2A' },
    { name: 'Sienna', hex: '#A0522D' },
    { name: 'Umber', hex: '#635147' },
    { name: 'Sepia', hex: '#704214' },
  ], []);
  //const staticSizes: SizeOption[] = ['XS', 'S', 'M', 'L', 'XL', 'XXL'];

  // Extract colors from specifications
  const availableColors = useMemo(() => {
    const specs = (product as any)?.specifications;
    if (!specs || !Array.isArray(specs)) {
      return [];
    }
    const colorSpecs = specs.filter((spec: any) => 
      spec.key && spec.key.toLowerCase() === 'color' && spec.value
    );
    if (colorSpecs.length === 0) {
      return [];
    }
    
    const colors = colorSpecs.map((spec: any) => {
      const colorName = spec.value;
      const staticColor = staticColors.find(c => 
        c.name.toLowerCase() === colorName.toLowerCase()
      );
      return staticColor || { name: colorName, hex: '#6B7280' };
    });
    return colors;
  }, [product, staticColors]);

  // Extract dynamic sizes from API specifications
  const dynamicSizes = useMemo(() => {
    const specs = (product as any)?.specifications;
    if (!specs || !Array.isArray(specs)) return [];
    return specs
      .filter((spec: any) => spec.key?.toLowerCase() === 'size' && spec.value)
      .map((spec: any) => spec.value);
  }, [product]);

  const hasDynamicSizes = dynamicSizes.length > 0;

  const [mainIdx, setMainIdx] = useState(0);
  const [color, setColor] = useState<ColorOption | null>(null);
  const [size, setSize] = useState<SizeOption | string>('M');

  // Set initial color only once when availableColors first loads
  useEffect(() => {
    if (availableColors.length > 0 && !color) {
      setColor(availableColors[0]);
    }
  }, [availableColors, color]);

  // Set initial size when dynamic sizes are available
  useEffect(() => {
    if (hasDynamicSizes && dynamicSizes.length > 0) {
      setSize(dynamicSizes[0]);
    }
  }, [hasDynamicSizes, dynamicSizes]);
  const [qty, setQty] = useState(1);
  const [message, setMessage] = useState<null | { type: 'cart' | 'wish'; text: string }>(null);
  
  // Wishlist functionality
  const { toggleWishlist, isInWishlist, isLoading: wishlistLoading } = useWishlist();
  const wishlisted = product?._id ? isInWishlist(product._id) : false;

  const images: ProductImage[] = useMemo(() => {
    if (!product) {
      return [{ src: '/placeholder.png', alt: 'Product placeholder' }];
    }
    const list: ProductImage[] = [];
    if (product.featuredImg) {
      list.push({
        src: product.featuredImg,
        alt: product.description?.name || 'Product image',
      });
    }
    if (product.gallery && product.gallery.length > 0) {
      product.gallery.forEach((img: string, index: number) => {
        list.push({
          src: img,
          alt: `${product.description?.name || 'Product'} - Image ${index + 2}`,
        });
      });
    }
    if (list.length === 0) {
      list.push({ src: '/placeholder.png', alt: 'Product placeholder' });
    }
    return list;
  }, [product]);

  const productView = useMemo<ProductView>(() => {
    if (!product) {
      return {
        title: 'Loading...',
        description: 'Loading product details...',
        price: 0,
        compareAt: 0,
        rating: 4.8,
        reviews: 0,
        sold: 0,
        badges: [] as Badge[],
        brand: '',
        categories: [],
        tags: [],
        specifications: {
          sku: '',
          weight: '',
          dimensions: { length: '', width: '', height: '' },
          status: '',
          quantity: 0,
        },
      };
    }

    const salePrice = product.productInfo?.salePrice || 0;
    const regularPrice = product.productInfo?.price || 0;
    const displayPrice = salePrice > 0 && salePrice < regularPrice ? salePrice : regularPrice;
    const compareAtPrice = salePrice > 0 && salePrice < regularPrice ? regularPrice : 0;

    const badges: Badge[] = [];
    if (salePrice > 0 && salePrice < regularPrice) badges.push('SALE');
    if ((product.productInfo?.quantity ?? 0) > 0) badges.push('In Stock');
    else badges.push('Out of Stock');
    if ((product.productInfo?.quantity ?? 0) < 10) badges.push('Limited Edition');

    return {
      title: product.description?.name || 'Untitled Product',
      description: product.description?.description || 'No description available',
      price: displayPrice,
      compareAt: compareAtPrice,
      rating: 4.8,
      reviews: Math.floor((product.productInfo?.quantity || 0) * 0.1) + 5,
      sold: Math.floor((product.productInfo?.quantity || 0) * 2) + 10,
      badges,
      brand: normalizeText(product.brandAndCategories?.brand),
      categories: normalizeStringList(product.brandAndCategories?.categories),
      tags: normalizeStringList(product.brandAndCategories?.tags),
      specifications: {
        sku: product.productInfo?.sku || '',
        // weight: product.productInfo?.weight || '', // Property doesn't exist in type
        dimensions: {
          length: product.productInfo?.length || '',
          width: product.productInfo?.width || '',
          height: product.productInfo?.height || '',
        },
        status: product.description?.status || '',
        quantity: product.productInfo?.quantity || 0,
      },
    };
  }, [product]);

  const discountPct = useMemo(() => {
    if (productView.compareAt <= productView.price) return 0;
    const diff = productView.compareAt - productView.price;
    return Math.round((diff / productView.compareAt) * 100);
  }, [productView.compareAt, productView.price]);

  const relatedProducts = useMemo(() => {
    if (!productsData || productsData.length <= 1 || !product) return [];
    return productsData
      .filter((p: any) => p._id !== product._id)
      .slice(0, 4)
      .map((p: any) => ({
        id: p._id,
        name: p.description?.name || 'Untitled Product',
        image: p.featuredImg || '/placeholder.png',
        price: `${p.productInfo?.salePrice === 0 ? p.productInfo?.price || 0 : p.productInfo?.salePrice || 0}`,
        oldPrice:
          p.productInfo?.price && p.productInfo.price > p.productInfo.salePrice
            ? `${p.productInfo.price}`
            : undefined,
        sold: Math.floor((p.productInfo?.quantity || 0) * 1.5) + 20,
      }));
  }, [productsData, product]);

  const handleQty = (dir: 'dec' | 'inc') =>
    setQty((q) => {
      const next = dir === 'inc' ? q + 1 : q - 1;
      const maxQty = Math.min(10, productView.specifications.quantity || 1);
      return Math.min(maxQty, Math.max(1, next));
    });

  const handleAddToCart = () => {
    if (!product?._id) {
      toast.error("Invalid product");
      return;
    }

    if (productView.specifications.quantity === 0) {
      toast.error("Out of stock");
      return;
    }

    const cartItem = {
      productId: String(product._id),
      productName: product.description?.name || 'Untitled Product',
      productImage: product.featuredImg || '/placeholder.png',
      unitPrice: Number((product?.productInfo?.salePrice === 0 ? product?.productInfo?.price : product?.productInfo?.salePrice) ?? product?.productInfo?.price ?? 0),
      quantity: qty,
      color: availableColors.length > 0 && color ? color.name : 'Default',
      size: hasDynamicSizes ? size : 'One Size',
    };

    dispatch(addToCart(cartItem));
    toast.success("Added to cart successfully!");
    setMessage({ type: "cart", text: "Added to cart successfully!" });
    
    // Clear message after 3 seconds
    setTimeout(() => setMessage(null), 3000);
  };

  const handleBuyNow = () => {
    if (!product?._id) {
      toast.error("Invalid product");
      return;
    }

    if (productView.specifications.quantity === 0) {
      toast.error("Out of stock");
      return;
    }

    // Add to cart first
    handleAddToCart();
    
    // Navigate to checkout
    setTimeout(() => {
      toast.success("Redirecting to checkout...");
      router.push('/dashboard/checkout');
    }, 500);
  };

  const handleToggleWishlist = () => {
    if (!product?._id) {
      toast.error('Invalid product');
      return;
    }
    toggleWishlist(product._id);
  };

  const isAddedToCart = useMemo(() => {
    if (!product?._id) return false;
    const productIdStr = String(product._id);
    return cartItems.some((item: any) => item.productId === productIdStr);
  }, [cartItems, product]);





  return (
    <div className="max-w-7xl mx-auto px-4 py-2">
      {/* Breadcrumb */}
      <nav className="flex items-center text-sm mb-4 bg-gray-50 px-4 py-2 rounded-lg">
        <Link href="/" className="text-primary hover:text-primary/80 font-medium transition-colors">Home</Link>
        <ChevronRight className="w-4 h-4 mx-2 text-gray-400" />
        {product?.brandAndCategories?.categories?.[0] && (
          <>
            <Link 
              href={`/category?slug=${encodeURIComponent((product.brandAndCategories.categories[0] as any).slug || product.brandAndCategories.categories[0].name.toLowerCase().replace(/\s+/g, '-'))}`} 
              className="text-primary hover:text-primary/80 font-medium transition-colors"
            >
              {product.brandAndCategories.categories[0].name}
            </Link>
            <ChevronRight className="w-4 h-4 mx-2 text-gray-400" />
          </>
        )}
        {product?.brandAndCategories?.subcategory && product?.brandAndCategories?.categories?.[0] && (
          <>
            <Link 
              href={`/category?slug=${encodeURIComponent((product.brandAndCategories.categories[0] as any).slug || product.brandAndCategories.categories[0].name.toLowerCase().replace(/\s+/g, '-'))}&sub=${encodeURIComponent(product.brandAndCategories.subcategory)}`}
              className="text-primary hover:text-primary/80 font-medium transition-colors"
            >
              {product.brandAndCategories.subcategory}
            </Link>
            <ChevronRight className="w-4 h-4 mx-2 text-gray-400" />
          </>
        )}
        <span className="text-gray-700 font-medium truncate max-w-[200px]">{productView.title}</span>
      </nav>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* LEFT: media */}
        <div>
          <div className="relative aspect-square rounded-xl overflow-hidden bg-white shadow-sm ring-1 ring-gray-200">
            <Image
              src={images[mainIdx]?.src || '/placeholder.png'}
              alt={images[mainIdx]?.alt || 'Product image'}
              fill
              className="object-cover"
              sizes="(max-width:768px) 100vw, 600px"
              priority
            />
          </div>

          {images.length > 1 && (
            <div className="mt-4 grid grid-cols-4 gap-3">
              {images.map((img, i) => (
                <button
                  key={img.src + i}
                  onClick={() => setMainIdx(i)}
                  aria-label={`Show image ${i + 1}`}
                  className={cn(
                    'relative aspect-square rounded-lg overflow-hidden ring-1 transition',
                    mainIdx === i ? 'ring-orange-500' : 'ring-gray-200 hover:ring-gray-300'
                  )}
                >
                  <Image src={img.src} alt={img.alt} fill className="object-cover" />
                </button>
              ))}
            </div>
          )}

          {/* Product Description */}
          <div className="mt-6 p-4 bg-gray-50 rounded-lg">
            <h3 className="font-semibold text-gray-900 text-2xl mb-2">Product Description</h3>
            <p className="text-gray-600 text-sm leading-relaxed">{productView.description}</p>
          </div>
        </div>

        {/* RIGHT: details */}
        <div>
          {/* Badges */}
          <div className="flex flex-wrap gap-2 mb-2">
            {productView.badges.includes('SALE') && (
              <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-red-500 text-white">SALE</span>
            )}
            {productView.badges.includes('In Stock') && (
              <span className="text-xs font-semibold px-2 py-0.5 rounded-full border border-green-600 text-green-700">In Stock</span>
            )}
            {productView.badges.includes('Out of Stock') && (
              <span className="text-xs font-semibold px-2 py-0.5 rounded-full border border-red-600 text-red-700">Out of Stock</span>
            )}
            {productView.badges.includes('Limited Edition') && (
              <span className="text-xs font-semibold px-2 py-0.5 rounded-full border border-amber-400 text-amber-400">Limited Edition</span>
            )}
          </div>

          <h1 className="text-3xl md:text-3xl font-bold">{productView.title}</h1>

          {(productView.brand || productView.categories.length > 0) && (
            <div className="mt-3 flex flex-wrap items-center gap-2 text-sm text-gray-600">
              {productView.brand && <span className="bg-gray-100 px-2 py-1 rounded">Brand: {productView.brand}</span>}
              {productView.categories.map((cat, i) => (
                <span key={`${cat}-${i}`} className="bg-blue-50 px-2 py-1 rounded text-blue-700">
                  {cat}
                </span>
              ))}
            </div>
          )}

          {/* rating row */}
          <div className="flex items-center gap-2 mt-3">
            <Stars value={productView.rating} />
            <span className="text-sm text-gray-600">({productView.reviews} reviews)</span>
            <span className="text-sm text-green-600">• {productView.sold.toLocaleString()} sold</span>
          </div>

          {/* Enhanced Price Display */}
          <div className="bg-gray-50 p-4 rounded-lg mt-4">
            <div className="flex items-center gap-3 mb-2">
              <span className="text-3xl font-bold text-secondary">৳{productView.price.toFixed(0)}</span>
              {discountPct > 0 && (
                <>
                  <span className="text-lg text-gray-500 line-through">৳{productView.compareAt.toFixed(0)}</span>
                  <span className="bg-red-500 text-white px-2 py-1 rounded text-sm font-medium">-{discountPct}%</span>
                </>
              )}
            </div>
            {discountPct > 0 && (
              <p className="text-green-600 text-sm font-medium">You save ৳{Math.round(productView.compareAt - productView.price)}</p>
            )}
          </div>

          {/* Stock Status */}
          {/* <div className="flex items-center gap-2 mt-4">
            {productView.specifications.quantity > 0 ? (
              <>
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                <span className="text-green-600 font-medium">In Stock ({productView.specifications.quantity} left)</span>
              </>
            ) : (
              <>
                <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                <span className="text-red-600 font-medium">Out of Stock</span>
              </>
            )}
          </div> */}

          {/* Delivery & Payment Info */}
          <div className="grid grid-cols-2 gap-3 mt-4">
            <div className="flex items-center gap-2 p-3 bg-blue-50 rounded-lg">
              <Truck className="w-5 h-5 text-blue-600" />
              <div>
                <p className="text-sm font-medium text-blue-800">Fast Delivery</p>
                <p className="text-xs text-blue-600">Across whole country</p>
              </div>
            </div>
            <div className="flex items-center gap-2 p-3 bg-green-50 rounded-lg">
              <Shield className="w-5 h-5 text-green-600" />
              <div>
                <p className="text-sm font-medium text-green-800">Cash on Delivery</p>
                <p className="text-xs text-green-600">Available</p>
              </div>
            </div>
          </div>

          {/* color picker - only show if colors available */}
          {availableColors.length > 0 && (
            <div className="mt-6">
              <p className="text-sm font-medium">Color: {color?.name || 'Select Color'}</p>
              <div className="flex gap-2 mt-2">
                {availableColors.map((c) => (
                  <button
                    key={c.name}
                    aria-label={c.name}
                    aria-pressed={c.name === color?.name}
                    onClick={() => setColor(c)}
                    className={cn(
                      'size-7 rounded-full ring-1 transition-all duration-200 relative opacity-70 hover:opacity-90',
                      c.name === color?.name 
                        ? 'ring-2 ring-black ring-offset-2 scale-110 shadow-lg opacity-100 brightness-110' 
                        : 'ring-gray-300 hover:ring-gray-400 hover:scale-105 shadow-sm'
                    )}
                    style={{ backgroundColor: c.hex }}
                  />
                ))}
              </div>
            </div>
          )}

          {/* Size Picker - only show if sizes are available */}
          {hasDynamicSizes && (
            <div className="mt-6">
              <p className="text-sm font-medium mb-2">Size: {String(size).toUpperCase()}</p>
              <div className="flex gap-2 flex-wrap">
                {dynamicSizes.map((s) => (
                  <button
                    key={s}
                    onClick={() => setSize(s)}
                    className={cn(
                      'px-4 py-2 border rounded-lg text-sm font-medium transition-all',
                      s === size
                        ? 'border-primary bg-primary text-secondary'
                        : 'border-gray-300 hover:border-gray-400'
                    )}
                  >
                    {String(s).toUpperCase()}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* quantity */}
          <div className="mt-6">
            <p className="text-sm font-medium mb-2">Quantity</p>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="icon" onClick={() => handleQty('dec')} disabled={qty <= 1} aria-label="Decrease quantity">
                <Minus className="w-4 h-4" />
              </Button>
              <span className="w-8 text-center">{qty}</span>
              <Button
                variant="outline"
                size="icon"
                onClick={() => handleQty('inc')}
                disabled={qty >= Math.min(10, productView.specifications.quantity)}
                aria-label="Increase quantity"
              >
                <Plus className="w-4 h-4" />
              </Button>
            </div>
          </div>

          {/* actions */}
          <div className="mt-6 space-y-2">
            <Button
              onClick={handleAddToCart}
              disabled={productView.specifications.quantity === 0 || isAddedToCart}
              className={clsx('w-full py-6 text-lg font-semibold transition-all', {
                'bg-gray-500 hover:bg-gray-600': productView.specifications.quantity === 0,
                'bg-green-600 hover:bg-green-600 cursor-default': isAddedToCart,
                'bg-primary hover:bg-primary/90 text-secondary': productView.specifications.quantity > 0 && !isAddedToCart,
              })}
            >
              <ShoppingCart className="w-5 h-5 mr-2" />
              {productView.specifications.quantity === 0 ? 'Out of Stock' : isAddedToCart ? 'Added to Cart' : 'Add to Cart'}
            </Button>

            <Button
              onClick={handleBuyNow}
              disabled={productView.specifications.quantity === 0}
              className="w-full py-6 text-lg font-semibold bg-green-600 hover:bg-green-600 cursor-default hover:text-white text-white"
            >
              Buy Now - ৳{productView.price.toFixed(0)}
            </Button>

            {/* Quick Actions */}
            <div className="grid grid-cols-2 gap-2">
              <Button 
                variant="outline" 
                className="py-3" 
                onClick={handleToggleWishlist}
                disabled={wishlistLoading}
              >
                <Heart className={cn('mr-2 h-4 w-4', wishlisted && 'fill-current text-red-500')} />
                {wishlistLoading ? 'Loading...' : wishlisted ? 'In Wishlist' : 'Add to Wishlist'}
              </Button>
              <Button variant="outline" className="py-3" onClick={() => {
                navigator.clipboard.writeText(window.location.href);
                toast.success('Link copied!');
              }}>
                <Copy className="mr-2 h-4 w-4" />
                Share
              </Button>
            </div>

            {message && (
              <p role="status" className={cn('text-sm pt-1', message.type === 'cart' ? 'text-green-600' : 'text-pink-700')}>
                {message.text}
              </p>
            )}
          </div>

          {/* Trust Badges */}
          <div className="grid grid-cols-3 gap-2 mt-6">
            <div className="flex items-center gap-1 p-2 bg-gray-50 rounded text-center">
              <Shield className="w-4 h-4 text-green-600" />
              <span className="text-xs text-gray-700">Authentic</span>
            </div>
            <div className="flex items-center gap-1 p-2 bg-gray-50 rounded text-center">
              <Undo2 className="w-4 h-4 text-blue-600" />
              <span className="text-xs text-gray-700">7 Days Return</span>
            </div>
            <div className="flex items-center gap-1 p-2 bg-gray-50 rounded text-center">
              <Shield className="w-4 h-4 text-purple-600" />
              <span className="text-xs text-gray-700">Secure Pay</span>
            </div>
          </div>
        </div>
      </div>

      {/* WHY CHOOSE */}
      <div className="mt-10">
        <h2 className="text-lg md:text-xl font-bold mb-4">Why Choose {productView.title}?</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <WhyCard
            icon={<Shield className="w-6 h-6" />}
            title="Premium Quality"
            desc="Made with high-quality materials and crafted with attention to detail for long-lasting durability."
          />
          <WhyCard
            icon={<Star className="w-6 h-6" />}
            title="Verified Reviews"
            desc={`Rated ${productView.rating}/5 stars by ${productView.reviews} verified customers who love this product.`}
          />
          <WhyCard
            icon={<Heart className="w-6 h-6" />}
            title="Customer Favorite"
            desc={`Over ${productView.sold.toLocaleString()} satisfied customers. Join the community who trust our products!`}
          />
        </div>
      </div>

      {/* Enhanced Specifications */}
      <div className="space-y-4 mt-10">
        <h2 className="text-xl font-semibold">Product Specifications</h2>
        <Card className="p-4">
          <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-6 p-0">
            {/* Product Details */}
            <div>
              <h3 className="font-semibold mb-3">Product Details</h3>
              <div className="space-y-2">
                {productView.brand && (
                  <div className="flex justify-between py-2 border-b border-gray-100">
                    <span className="text-sm text-gray-600">Brand:</span>
                    <span className="text-sm font-medium">{productView.brand}</span>
                  </div>
                )}
                {productView.specifications.sku && (
                  <div className="flex justify-between py-2 border-b border-gray-100">
                    <span className="text-sm text-gray-600">SKU:</span>
                    <span className="text-sm font-medium">{productView.specifications.sku}</span>
                  </div>
                )}
                {(product as any)?.specifications?.map((spec: any, index: number) => (
                  <div key={index} className="flex justify-between py-2 border-b border-gray-100">
                    <span className="text-sm text-gray-600">{spec.key}:</span>
                    <span className="text-sm font-medium">{spec.value}</span>
                  </div>
                ))}
                {(productView.specifications.dimensions.length ||
                  productView.specifications.dimensions.width ||
                  productView.specifications.dimensions.height) && (
                  <div className="flex justify-between py-2 border-b border-gray-100">
                    <span className="text-sm text-gray-600">Dimensions:</span>
                    <span className="text-sm font-medium">
                      {[
                        productView.specifications.dimensions.length && `${productView.specifications.dimensions.length}cm`,
                        productView.specifications.dimensions.width && `${productView.specifications.dimensions.width}cm`,
                        productView.specifications.dimensions.height && `${productView.specifications.dimensions.height}cm`,
                      ]
                        .filter(Boolean)
                        .join(' × ')}
                    </span>
                  </div>
                )}
                <div className="flex justify-between py-2 border-b border-gray-100">
                  <span className="text-sm text-gray-600">Stock:</span>
                  <span className="text-sm font-medium">{productView.specifications.quantity} units</span>
                </div>
              </div>
            </div>

            {/* Features & Benefits + Care Instructions */}
            <div className="space-y-5">
              <div>
                <h3 className="font-semibold mb-3">Features & Benefits</h3>
                <ul className="space-y-3 text-sm">
                  <li>
                    <span className="text-black">●</span> <b>High Quality</b>
                    <div className="text-gray-500">Made with premium materials for lasting durability</div>
                  </li>
                  <li>
                    <span className="text-black">●</span> <b>Authentic Product</b>
                    <div className="text-gray-500">Genuine product with quality assurance</div>
                  </li>
                  <li>
                    <span className="text-black">●</span> <b>Fast Delivery</b>
                    <div className="text-gray-500">Quick and reliable shipping to your doorstep</div>
                  </li>
                  <li>
                    <span className="text-black">●</span> <b>Customer Approved</b>
                    <div className="text-gray-500">Rated {productView.rating}/5 stars by verified customers</div>
                  </li>
                </ul>
              </div>

              <div>
                <h3 className="font-semibold mb-3">Care Instructions</h3>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li>Handle with care to maintain quality</li>
                  <li>Store in a clean, dry place</li>
                  <li>Follow any specific care labels</li>
                  <li>Keep away from extreme temperatures</li>
                  <li>Regular maintenance recommended</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Available Vouchers */}
      {/* <div className="w-full mx-auto mt-10">
        <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
          <span className="text-xl">🔷</span> Available Vouchers
        </h2>

        <div className="space-y-3">
          {vouchers.map((voucher, idx) => (
            <Card key={idx} className="rounded-lg border border-gray-200">
              <div className="flex flex-col sm:flex-row justify-between">
                <div className="flex items-center flex-1 p-4">
                  <span className={`px-3 py-1 rounded-full text-sm font-semibold ${voucher.labelColor}`}>
                    {voucher.label}
                  </span>
                  <div className="ml-4">
                    <h3 className="font-semibold">{voucher.title}</h3>
                    <p className="text-gray-600 text-sm">{voucher.description}</p>
                    <div className="flex flex-wrap items-center gap-4 text-xs text-gray-500 mt-1">
                      <span>Min. purchase: {voucher.minPurchase}</span>
                      <span>⏳ Expires: {voucher.expires}</span>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col items-center justify-center p-4 w-full sm:w-32 border-t sm:border-t-0 sm:border-l border-gray-200 sm:border-dashed">
                  <span className="font-bold text-lg">{voucher.code}</span>
                  <Button
                    variant="outline"
                    size="sm"
                    className="mt-1 flex items-center gap-1"
                    onClick={() => {
                      navigator.clipboard.writeText(voucher.code);
                      toast.success('Code copied!');
                    }}
                  >
                    <Copy className="w-4 h-4" /> Copy
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div> */}

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <div className="w-full mx-auto mt-8">
          <h2 className="text-lg font-semibold mb-4">Related Products</h2>

          <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {relatedProducts.map((p: any) => (
              <Link key={p.id} href={`/product-details?id=${encodeURIComponent(p.id)}`} aria-label={`View details for ${p.name}`}>
                <Card
                  className="p-3 h-[250px] md:h-[320px] rounded-xl border border-gray-200 hover:shadow-sm transition cursor-pointer"
                >
                  <div className="relative w-full h-40 mb-3">
                    <Image src={p.image} alt={p.name} fill className="object-contain" sizes="(max-width:768px) 100vw, 240px" />
                  </div>
                  <div className="flex flex-col">
                    <h3 className="text-[16px] font-medium text-gray-900 truncate">{p.name}</h3>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="text-secondary font-semibold">৳{p.price}</span>
                      {p.oldPrice && <span className="text-gray-500 line-through text-sm">৳{p.oldPrice}</span>}
                    </div>
                    <span className="text-gray-500 text-xs mt-1">{p.sold} sold</span>
                  </div>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

/* --------- Helpers --------- */
function Stars({ value }: { value: number }) {
  const full = Math.floor(value);
  const half = value - full >= 0.5;
  return (
    <div className="flex items-center">
      {Array.from({ length: 5 }).map((_, i) => {
        const filled = i < full || (i === full && half);
        return (
          <svg
            key={i}
            className={cn('w-4 h-4', filled ? 'text-yellow-500' : 'text-gray-300')}
            viewBox="0 0 20 20"
            fill="currentColor"
            aria-hidden="true"
          >
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.802 2.036a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.802-2.036a1 1 0 00-1.175 0l-2.802 2.036c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.88 8.72c-.783-.57-.38-1.81.588-1.81H6.93a1 1 0 00.95-.69l1.07-3.292z" />
          </svg>
        );
      })}
    </div>
  );
}

function WhyCard({ icon, title, desc }: { icon: React.ReactNode; title: string; desc: string }) {
  return (
    <div className="border rounded-xl p-5 text-center">
      <div className="mx-auto mb-2 w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center">
        {icon}
      </div>
      <h3 className="font-semibold">{title}</h3>
      <p className="text-sm text-gray-600 mt-1">{desc}</p>
    </div>
  );
}