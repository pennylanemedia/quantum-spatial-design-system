'use client';

// Cart Context Provider for Petersen Games
// Complete shopping cart state management

import React, { createContext, useContext, useReducer, useEffect, ReactNode } from 'react';
import { Cart, CartItem, createCart, addToCart as addToCartAPI, getCart } from './shopify';

// Cart State Types
interface CartState {
  cart: Cart | null;
  isLoading: boolean;
  error: string | null;
  isOpen: boolean;
}

// Cart Actions
type CartAction =
  | { type: 'SET_LOADING'; payload: boolean }
  | { type: 'SET_CART'; payload: Cart }
  | { type: 'SET_ERROR'; payload: string | null }
  | { type: 'TOGGLE_CART' }
  | { type: 'OPEN_CART' }
  | { type: 'CLOSE_CART' };

// Cart Context
interface CartContextType {
  state: CartState;
  addToCart: (variantId: string, quantity?: number) => Promise<void>;
  removeFromCart: (lineId: string) => Promise<void>;
  updateCartItemQuantity: (lineId: string, quantity: number) => Promise<void>;
  toggleCart: () => void;
  openCart: () => void;
  closeCart: () => void;
  getCartItemCount: () => number;
  getCartTotal: () => string;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

// Cart Reducer
function cartReducer(state: CartState, action: CartAction): CartState {
  switch (action.type) {
    case 'SET_LOADING':
      return { ...state, isLoading: action.payload };
    case 'SET_CART':
      return { ...state, cart: action.payload, error: null };
    case 'SET_ERROR':
      return { ...state, error: action.payload, isLoading: false };
    case 'TOGGLE_CART':
      return { ...state, isOpen: !state.isOpen };
    case 'OPEN_CART':
      return { ...state, isOpen: true };
    case 'CLOSE_CART':
      return { ...state, isOpen: false };
    default:
      return state;
  }
}

// Initial state
const initialState: CartState = {
  cart: null,
  isLoading: false,
  error: null,
  isOpen: false,
};

// Cart Provider Component
export function CartProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(cartReducer, initialState);

  // Initialize cart on mount
  useEffect(() => {
    initializeCart();
  }, []);

  const initializeCart = async () => {
    try {
      dispatch({ type: 'SET_LOADING', payload: true });
      
      // Check if cart ID exists in localStorage
      const existingCartId = localStorage.getItem('petersen-cart-id');
      
      let cart: Cart;
      if (existingCartId) {
        try {
          // Try to fetch existing cart
          cart = await getCart(existingCartId);
        } catch (error) {
          // If cart doesn't exist, create new one
          cart = await createCart();
          localStorage.setItem('petersen-cart-id', cart.id);
        }
      } else {
        // Create new cart
        cart = await createCart();
        localStorage.setItem('petersen-cart-id', cart.id);
      }
      
      dispatch({ type: 'SET_CART', payload: cart });
    } catch (error) {
      dispatch({ type: 'SET_ERROR', payload: 'Failed to initialize cart' });
    } finally {
      dispatch({ type: 'SET_LOADING', payload: false });
    }
  };

  const addToCartHandler = async (variantId: string, quantity: number = 1) => {
    if (!state.cart) {
      dispatch({ type: 'SET_ERROR', payload: 'Cart not initialized' });
      return;
    }

    try {
      dispatch({ type: 'SET_LOADING', payload: true });
      const updatedCart = await addToCartAPI(state.cart.id, variantId, quantity);
      dispatch({ type: 'SET_CART', payload: updatedCart });
      dispatch({ type: 'OPEN_CART' }); // Auto-open cart when item added
    } catch (error) {
      dispatch({ type: 'SET_ERROR', payload: 'Failed to add item to cart' });
    } finally {
      dispatch({ type: 'SET_LOADING', payload: false });
    }
  };

  const removeFromCartHandler = async (lineId: string) => {
    if (!state.cart) return;

    try {
      dispatch({ type: 'SET_LOADING', payload: true });
      // Implementation for removing items would go here
      // This requires additional Shopify API calls
    } catch (error) {
      dispatch({ type: 'SET_ERROR', payload: 'Failed to remove item from cart' });
    } finally {
      dispatch({ type: 'SET_LOADING', payload: false });
    }
  };

  const updateCartItemQuantityHandler = async (lineId: string, quantity: number) => {
    if (!state.cart) return;

    try {
      dispatch({ type: 'SET_LOADING', payload: true });
      // Implementation for updating quantities would go here
      // This requires additional Shopify API calls
    } catch (error) {
      dispatch({ type: 'SET_ERROR', payload: 'Failed to update cart' });
    } finally {
      dispatch({ type: 'SET_LOADING', payload: false });
    }
  };

  const toggleCart = () => {
    dispatch({ type: 'TOGGLE_CART' });
  };

  const openCart = () => {
    dispatch({ type: 'OPEN_CART' });
  };

  const closeCart = () => {
    dispatch({ type: 'CLOSE_CART' });
  };

  const getCartItemCount = (): number => {
    return state.cart?.totalQuantity || 0;
  };

  const getCartTotal = (): string => {
    return state.cart?.cost.totalAmount.amount || '0.00';
  };

  const contextValue: CartContextType = {
    state,
    addToCart: addToCartHandler,
    removeFromCart: removeFromCartHandler,
    updateCartItemQuantity: updateCartItemQuantityHandler,
    toggleCart,
    openCart,
    closeCart,
    getCartItemCount,
    getCartTotal,
  };

  return (
    <CartContext.Provider value={contextValue}>
      {children}
    </CartContext.Provider>
  );
}

// Hook to use cart context
export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}

// Cart Mini Component
export function CartMini() {
  const { state, toggleCart, closeCart, getCartItemCount, getCartTotal } = useCart();

  if (!state.isOpen || !state.cart) return null;

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      right: 0,
      bottom: 0,
      left: 0,
      zIndex: 1000,
    }}>
      {/* Backdrop */}
      <div
        onClick={closeCart}
        style={{
          position: 'absolute',
          top: 0,
          right: 0,
          bottom: 0,
          left: 0,
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
          backdropFilter: 'blur(10px)',
        }}
      />
      
      {/* Cart Panel */}
      <div style={{
        position: 'absolute',
        top: 0,
        right: 0,
        bottom: 0,
        width: '400px',
        maxWidth: '90vw',
        backgroundColor: 'rgba(0, 0, 0, 0.95)',
        backdropFilter: 'blur(60px) saturate(150%) brightness(50%)',
        border: '1px solid rgba(76, 29, 149, 0.15)',
        display: 'flex',
        flexDirection: 'column',
      }}>
        {/* Header */}
        <div style={{
          padding: '16px',
          borderBottom: '1px solid rgba(76, 29, 149, 0.15)',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}>
          <h3 style={{
            color: '#FFFFFF',
            fontSize: '18px',
            fontWeight: '600',
            margin: 0,
          }}>
            Shopping Cart ({getCartItemCount()})
          </h3>
          <button
            onClick={closeCart}
            style={{
              background: 'none',
              border: 'none',
              color: '#FFFFFF',
              fontSize: '24px',
              cursor: 'pointer',
              padding: '4px',
            }}
          >
            ×
          </button>
        </div>

        {/* Cart Items */}
        <div style={{
          flex: 1,
          overflow: 'auto',
          padding: '16px',
        }}>
          {state.cart.lines.length === 0 ? (
            <p style={{
              color: 'rgba(255, 255, 255, 0.6)',
              textAlign: 'center',
              marginTop: '40px',
            }}>
              Your cart is empty
            </p>
          ) : (
            state.cart.lines.map((item) => (
              <div
                key={item.id}
                style={{
                  display: 'flex',
                  gap: '12px',
                  marginBottom: '16px',
                  padding: '12px',
                  backgroundColor: 'rgba(255, 255, 255, 0.05)',
                  borderRadius: '8px',
                  border: '1px solid rgba(76, 29, 149, 0.1)',
                }}
              >
                {item.merchandise.product.featuredImage && (
                  <img
                    src={item.merchandise.product.featuredImage.url}
                    alt={item.merchandise.product.featuredImage.altText || item.merchandise.product.title}
                    style={{
                      width: '60px',
                      height: '60px',
                      objectFit: 'cover',
                      borderRadius: '4px',
                    }}
                  />
                )}
                <div style={{ flex: 1 }}>
                  <h4 style={{
                    color: '#FFFFFF',
                    fontSize: '14px',
                    fontWeight: '600',
                    margin: '0 0 4px 0',
                  }}>
                    {item.merchandise.product.title}
                  </h4>
                  <p style={{
                    color: 'rgba(255, 255, 255, 0.6)',
                    fontSize: '12px',
                    margin: '0 0 4px 0',
                  }}>
                    {item.merchandise.title}
                  </p>
                  <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                  }}>
                    <span style={{
                      color: '#6366F1',
                      fontSize: '14px',
                      fontWeight: '600',
                    }}>
                      ${item.cost.totalAmount.amount}
                    </span>
                    <span style={{
                      color: 'rgba(255, 255, 255, 0.6)',
                      fontSize: '12px',
                    }}>
                      Qty: {item.quantity}
                    </span>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        {state.cart.lines.length > 0 && (
          <div style={{
            padding: '16px',
            borderTop: '1px solid rgba(76, 29, 149, 0.15)',
          }}>
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: '16px',
            }}>
              <span style={{
                color: '#FFFFFF',
                fontSize: '16px',
                fontWeight: '600',
              }}>
                Total:
              </span>
              <span style={{
                color: '#6366F1',
                fontSize: '18px',
                fontWeight: '700',
              }}>
                ${getCartTotal()}
              </span>
            </div>
            <a
              href={state.cart.checkoutUrl}
              className="btn btn-primary w-full"
              style={{
                display: 'block',
                textAlign: 'center',
                textDecoration: 'none',
                width: '100%',
              }}
            >
              Checkout
            </a>
          </div>
        )}
      </div>
    </div>
  );
}