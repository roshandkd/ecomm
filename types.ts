export interface User {
    id: number;
    email: string;
    username: string;
    phone_number?: string;
    shipping_address?: string;
    billing_address?: string;
    role: 'customer' | 'admin';
    created_at: string;
    updatedAt: string;
    orders: Order[];
    wishlist: Wishlist[];
  }
  
  export interface Order {
    id: number;
    status: string;
  }
  
  export interface Wishlist {
    id: number;
    product: string;
  }
  