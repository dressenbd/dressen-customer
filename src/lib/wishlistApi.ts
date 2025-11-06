const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api/v1';

// User API
export const userAPI = {
  getUserByEmail: async (email: string) => {
    const encodedEmail = encodeURIComponent(email);
    const response = await fetch(`${API_BASE}/user/email/${encodedEmail}`);
    if (!response.ok) throw new Error('Failed to get user');
    return response.json();
  }
};

// Wishlist API
export const wishlistAPI = {
  get: async (userId: string) => {
    const response = await fetch(`${API_BASE}/customer/wishlist/${userId}`);
    if (!response.ok) throw new Error('Failed to get wishlist');
    return response.json();
  },
  
  add: async (userId: string, productId: string) => {
    const response = await fetch(`${API_BASE}/customer/wishlist/add/${userId}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ productId })
    });
    if (!response.ok) throw new Error('Failed to add to wishlist');
    return response.json();
  },
  
  remove: async (userId: string, productId: string) => {
    const response = await fetch(`${API_BASE}/customer/wishlist/remove/${userId}`, {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ productId })
    });
    if (!response.ok) throw new Error('Failed to remove from wishlist');
    return response.json();
  },
  
  clear: async (userId: string) => {
    const response = await fetch(`${API_BASE}/customer/wishlist/clear/${userId}`, {
      method: 'DELETE'
    });
    if (!response.ok) throw new Error('Failed to clear wishlist');
    return response.json();
  }
};

// Guest wishlist service
export const guestWishlistService = {
  GUEST_WISHLIST_KEY: 'guest_wishlist',
  
  get: (): string[] => {
    if (typeof window === 'undefined') return [];
    return JSON.parse(localStorage.getItem(guestWishlistService.GUEST_WISHLIST_KEY) || '[]');
  },
  
  add: (productId: string): string[] => {
    if (typeof window === 'undefined') return [];
    const wishlist = guestWishlistService.get();
    if (!wishlist.includes(productId)) {
      wishlist.push(productId);
      localStorage.setItem(guestWishlistService.GUEST_WISHLIST_KEY, JSON.stringify(wishlist));
    }
    return wishlist;
  },
  
  remove: (productId: string): string[] => {
    if (typeof window === 'undefined') return [];
    const wishlist = guestWishlistService.get();
    const updatedWishlist = wishlist.filter(id => id !== productId);
    localStorage.setItem(guestWishlistService.GUEST_WISHLIST_KEY, JSON.stringify(updatedWishlist));
    return updatedWishlist;
  },
  
  clear: (): string[] => {
    if (typeof window === 'undefined') return [];
    localStorage.removeItem(guestWishlistService.GUEST_WISHLIST_KEY);
    return [];
  }
};