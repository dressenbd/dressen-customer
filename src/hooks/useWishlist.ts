"use client";

import { useState, useEffect, useCallback } from 'react';
import { useSession } from 'next-auth/react';
import { wishlistAPI, guestWishlistService, userAPI } from '@/lib/wishlistApi';
import { WishlistItem } from '@/types/wishlist';
import toast from 'react-hot-toast';

export const useWishlist = () => {
  const { data: session } = useSession();
  const [wishlist, setWishlist] = useState<WishlistItem[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  
  // Get user ID from session
  const getUserId = useCallback(async () => {
    if (!session?.user?.email) return null;
    try {
      const userResponse = await userAPI.getUserByEmail(session.user.email);
      return userResponse.success ? userResponse.data._id : null;
    } catch (error) {
      console.error('Failed to get user ID:', error);
      return null;
    }
  }, [session?.user?.email]);

  // Load wishlist
  const loadWishlist = useCallback(async () => {
    setIsLoading(true);
    try {
      if (session?.user?.email) {
        const userId = await getUserId();
        if (userId) {
          const response = await wishlistAPI.get(userId);
          setWishlist(response.success ? response.data : []);
        }
      } else {
        setWishlist(guestWishlistService.get().map(id => ({ _id: id })));
      }
    } catch (error) {
      console.error('Failed to load wishlist:', error);
      setWishlist([]);
    }
    setIsLoading(false);
  }, [session?.user?.email, getUserId]);

  useEffect(() => {
    loadWishlist();
  }, [loadWishlist]);

  // Add to wishlist
  const addToWishlist = async (productId: string) => {
    setIsLoading(true);
    try {
      if (session?.user?.email) {
        const userId = await getUserId();
        if (userId) {
          await wishlistAPI.add(userId, productId);
        }
      } else {
        guestWishlistService.add(productId);
      }
      await loadWishlist();
      toast.success('Added to wishlist!');
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to add to wishlist';
      toast.error(errorMessage);
    }
    setIsLoading(false);
  };

  // Remove from wishlist
  const removeFromWishlist = async (productId: string) => {
    setIsLoading(true);
    try {
      if (session?.user?.email) {
        const userId = await getUserId();
        if (userId) {
          await wishlistAPI.remove(userId, productId);
        }
      } else {
        guestWishlistService.remove(productId);
      }
      await loadWishlist();
      toast.success('Removed from wishlist!');
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to remove from wishlist';
      toast.error(errorMessage);
    }
    setIsLoading(false);
  };

  // Clear wishlist
  const clearWishlist = async () => {
    setIsLoading(true);
    try {
      if (session?.user?.email) {
        const userId = await getUserId();
        if (userId) {
          await wishlistAPI.clear(userId);
        }
      } else {
        guestWishlistService.clear();
      }
      setWishlist([]);
      toast.success('Wishlist cleared!');
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to clear wishlist';
      toast.error(errorMessage);
    }
    setIsLoading(false);
  };

  // Sync guest wishlist when user logs in
  const syncWishlist = async () => {
    if (!session?.user?.email) return;
    
    const guestWishlist = guestWishlistService.get();
    if (guestWishlist.length === 0) return;

    const userId = await getUserId();
    if (!userId) return;

    try {
      for (const productId of guestWishlist) {
        await wishlistAPI.add(userId, productId);
      }
      guestWishlistService.clear();
      await loadWishlist();
      toast.success('Wishlist synced successfully!');
    } catch (error) {
      console.error('Failed to sync wishlist:', error);
    }
  };

  // Check if product is in wishlist
  const isInWishlist = (productId: string): boolean => {
    if (!Array.isArray(wishlist)) return false;
    return wishlist.some((item: WishlistItem) => item._id === productId);
  };

  // Toggle wishlist item
  const toggleWishlist = (productId: string) => {
    if (isInWishlist(productId)) {
      removeFromWishlist(productId);
    } else {
      addToWishlist(productId);
    }
  };

  return {
    wishlist,
    isLoading,
    addToWishlist,
    removeFromWishlist,
    clearWishlist,
    toggleWishlist,
    isInWishlist,
    syncWishlist
  };
};