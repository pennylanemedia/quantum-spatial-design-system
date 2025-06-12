import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { unifiedDesignTokens, designUtils } from './UnifiedDesignSystem';

// Checkout Types
interface CheckoutItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image?: string;
  variant?: string;
}

interface ShippingAddress {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address1: string;
  address2?: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
}

interface PaymentMethod {
  type: 'card' | 'paypal' | 'apple_pay';
  cardNumber?: string;
  expiryDate?: string;
  cvv?: string;
  name?: string;
}

interface CheckoutStep {
  id: 'cart' | 'shipping' | 'payment' | 'confirmation';
  title: string;
  completed: boolean;
  active: boolean;
}

// Mock cart data
const mockCartItems: CheckoutItem[] = [
  {
    id: '1',
    name: 'Wireless Gaming Headset Pro',
    price: 199.99,
    quantity: 1,
    variant: 'Midnight Black'
  },
  {
    id: '2', 
    name: 'Mechanical Keyboard RGB',
    price: 149.99,
    quantity: 1,
    variant: 'Cherry MX Blue'
  },
  {
    id: '3',
    name: 'Gaming Mouse Pad XL',
    price: 39.99,
    quantity: 2,
    variant: 'Dark Theme'
  }
];

// Step Indicator Component
const CheckoutStepIndicator: React.FC<{ 
  steps: CheckoutStep[]; 
  currentStep: string;
  isMobile: boolean;
}> = ({ steps, currentStep, isMobile }) => (
  <motion.div
    initial={{ opacity: 0, y: -10 }}
    animate={{ opacity: 1, y: 0 }}
    style={{
      ...designUtils.getGlassCard('subtle'),
      padding: unifiedDesignTokens.spacing.medium,
      marginBottom: unifiedDesignTokens.spacing.large,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: isMobile ? unifiedDesignTokens.spacing.small : unifiedDesignTokens.spacing.medium,
      overflowX: 'auto',
    }}
  >
    {steps.map((step, index) => (
      <div key={step.id} style={{ display: 'flex', alignItems: 'center' }}>
        <motion.div
          whileHover={{ scale: 1.05 }}
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: isMobile ? '32px' : '40px',
            height: isMobile ? '32px' : '40px',
            borderRadius: unifiedDesignTokens.cornerRadius.continuous,
            background: step.completed || step.active 
              ? unifiedDesignTokens.gradients.primaryButton
              : unifiedDesignTokens.colors.tertiarySystemFill,
            color: step.completed || step.active 
              ? '#FFFFFF'
              : unifiedDesignTokens.colors.tertiaryLabel,
            fontSize: isMobile ? '12px' : '14px',
            fontWeight: '600',
            transition: `all ${unifiedDesignTokens.animation.duration.medium} ${unifiedDesignTokens.animation.easing.standard}`,
            boxShadow: step.active ? unifiedDesignTokens.depth.shadows.medium : 'none',
          }}
        >
          {step.completed ? '✓' : index + 1}
        </motion.div>
        
        {!isMobile && (
          <div style={{
            marginLeft: unifiedDesignTokens.spacing.small,
            color: step.active 
              ? unifiedDesignTokens.colors.label
              : unifiedDesignTokens.colors.tertiaryLabel,
            fontSize: unifiedDesignTokens.typography.caption1.size,
            fontWeight: step.active ? '600' : '400',
            whiteSpace: 'nowrap',
          }}>
            {step.title}
          </div>
        )}
        
        {index < steps.length - 1 && (
          <div style={{
            width: isMobile ? '20px' : '40px',
            height: '1px',
            background: step.completed 
              ? unifiedDesignTokens.colors.systemBlue
              : unifiedDesignTokens.colors.separator,
            margin: `0 ${unifiedDesignTokens.spacing.small}`,
          }} />
        )}
      </div>
    ))}
  </motion.div>
);

// Input Component with unified styling
const CheckoutInput: React.FC<{
  label: string;
  type?: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  required?: boolean;
  error?: string;
  isMobile?: boolean;
}> = ({ label, type = 'text', value, onChange, placeholder, required, error, isMobile = false }) => (
  <motion.div
    initial={{ opacity: 0, y: 10 }}
    animate={{ opacity: 1, y: 0 }}
    style={{
      marginBottom: unifiedDesignTokens.spacing.medium,
    }}
  >
    <label style={{
      display: 'block',
      color: unifiedDesignTokens.colors.label,
      fontSize: unifiedDesignTokens.typography.subheadline.size,
      fontWeight: '600',
      marginBottom: unifiedDesignTokens.spacing.tiny,
    }}>
      {label} {required && <span style={{ color: unifiedDesignTokens.colors.systemRed }}>*</span>}
    </label>
    
    <input
      type={type}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      style={{
        width: '100%',
        minHeight: unifiedDesignTokens.components.input.minHeight,
        padding: `0 ${unifiedDesignTokens.components.input.paddingHorizontal}`,
        background: unifiedDesignTokens.components.input.background,
        border: `${unifiedDesignTokens.components.input.borderWidth} solid ${
          error ? unifiedDesignTokens.colors.systemRed : unifiedDesignTokens.components.input.borderColor
        }`,
        borderRadius: unifiedDesignTokens.components.input.borderRadius,
        color: unifiedDesignTokens.colors.label,
        fontSize: unifiedDesignTokens.typography.body.size,
        outline: 'none',
        transition: `all ${unifiedDesignTokens.animation.duration.medium} ${unifiedDesignTokens.animation.easing.standard}`,
      }}
      onFocus={(e) => {
        e.target.style.borderColor = unifiedDesignTokens.colors.systemBlue;
        e.target.style.background = 'rgba(255, 255, 255, 0.15)';
      }}
      onBlur={(e) => {
        e.target.style.borderColor = error ? unifiedDesignTokens.colors.systemRed : unifiedDesignTokens.components.input.borderColor;
        e.target.style.background = unifiedDesignTokens.components.input.background;
      }}
    />
    
    {error && (
      <motion.div
        initial={{ opacity: 0, height: 0 }}
        animate={{ opacity: 1, height: 'auto' }}
        style={{
          color: unifiedDesignTokens.colors.systemRed,
          fontSize: unifiedDesignTokens.typography.caption1.size,
          marginTop: unifiedDesignTokens.spacing.tiny,
        }}
      >
        {error}
      </motion.div>
    )}
  </motion.div>
);

// Button Component with unified styling
const CheckoutButton: React.FC<{
  children: React.ReactNode;
  onClick?: () => void;
  variant?: 'primary' | 'secondary' | 'danger';
  disabled?: boolean;
  loading?: boolean;
  fullWidth?: boolean;
  isMobile?: boolean;
}> = ({ 
  children, 
  onClick, 
  variant = 'primary', 
  disabled = false, 
  loading = false, 
  fullWidth = false,
  isMobile = false 
}) => (
  <motion.button
    whileHover={disabled ? {} : { scale: 1.02, y: -1 }}
    whileTap={disabled ? {} : { scale: 0.98 }}
    onClick={onClick}
    disabled={disabled || loading}
    style={{
      ...designUtils.getButton(variant),
      width: fullWidth ? '100%' : 'auto',
      opacity: disabled ? 0.5 : 1,
      cursor: disabled ? 'not-allowed' : 'pointer',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: unifiedDesignTokens.spacing.small,
      fontSize: isMobile ? unifiedDesignTokens.typography.subheadline.size : unifiedDesignTokens.typography.body.size,
      color: variant === 'secondary' ? unifiedDesignTokens.colors.label : '#FFFFFF',
    }}
  >
    {loading && (
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
        style={{
          width: '16px',
          height: '16px',
          border: '2px solid currentColor',
          borderTop: '2px solid transparent',
          borderRadius: '50%',
        }}
      />
    )}
    {children}
  </motion.button>
);

// Cart Summary Component
const CartSummary: React.FC<{
  items: CheckoutItem[];
  onUpdateQuantity: (id: string, quantity: number) => void;
  onRemoveItem: (id: string) => void;
  isMobile: boolean;
}> = ({ items, onUpdateQuantity, onRemoveItem, isMobile }) => {
  const subtotal = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const shipping = subtotal > 100 ? 0 : 15.99;
  const tax = subtotal * 0.08;
  const total = subtotal + shipping + tax;

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      style={{
        ...designUtils.getGlassCard('medium'),
        padding: unifiedDesignTokens.spacing.large,
        height: 'fit-content',
        position: 'sticky',
        top: unifiedDesignTokens.spacing.large,
      }}
    >
      <h3 style={{
        ...unifiedDesignTokens.typography.title3,
        color: unifiedDesignTokens.colors.label,
        margin: `0 0 ${unifiedDesignTokens.spacing.medium}`,
      }}>
        Order Summary
      </h3>

      <div style={{
        display: 'flex',
        flexDirection: 'column',
        gap: unifiedDesignTokens.spacing.medium,
        marginBottom: unifiedDesignTokens.spacing.large,
      }}>
        {items.map((item) => (
          <motion.div
            key={item.id}
            layout
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: unifiedDesignTokens.spacing.small,
              padding: unifiedDesignTokens.spacing.small,
              borderRadius: unifiedDesignTokens.cornerRadius.small,
              background: unifiedDesignTokens.colors.quaternarySystemFill,
            }}
          >
            <div style={{
              width: '60px',
              height: '60px',
              borderRadius: unifiedDesignTokens.cornerRadius.small,
              background: unifiedDesignTokens.colors.tertiarySystemFill,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: unifiedDesignTokens.colors.tertiaryLabel,
              fontSize: '12px',
              flexShrink: 0,
            }}>
              IMG
            </div>

            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{
                color: unifiedDesignTokens.colors.label,
                fontSize: unifiedDesignTokens.typography.subheadline.size,
                fontWeight: '600',
                marginBottom: '2px',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                whiteSpace: 'nowrap',
              }}>
                {item.name}
              </div>
              {item.variant && (
                <div style={{
                  color: unifiedDesignTokens.colors.tertiaryLabel,
                  fontSize: unifiedDesignTokens.typography.caption1.size,
                  marginBottom: '4px',
                }}>
                  {item.variant}
                </div>
              )}
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: unifiedDesignTokens.spacing.tiny,
              }}>
                <button
                  onClick={() => onUpdateQuantity(item.id, Math.max(0, item.quantity - 1))}
                  style={{
                    width: '24px',
                    height: '24px',
                    borderRadius: '4px',
                    background: unifiedDesignTokens.colors.tertiarySystemFill,
                    border: 'none',
                    color: unifiedDesignTokens.colors.label,
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  −
                </button>
                <span style={{
                  color: unifiedDesignTokens.colors.label,
                  fontSize: unifiedDesignTokens.typography.caption1.size,
                  fontWeight: '600',
                  minWidth: '20px',
                  textAlign: 'center',
                }}>
                  {item.quantity}
                </span>
                <button
                  onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                  style={{
                    width: '24px',
                    height: '24px',
                    borderRadius: '4px',
                    background: unifiedDesignTokens.colors.tertiarySystemFill,
                    border: 'none',
                    color: unifiedDesignTokens.colors.label,
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  +
                </button>
              </div>
            </div>

            <div style={{ textAlign: 'right' }}>
              <div style={{
                color: unifiedDesignTokens.colors.label,
                fontSize: unifiedDesignTokens.typography.subheadline.size,
                fontWeight: '700',
              }}>
                ${(item.price * item.quantity).toFixed(2)}
              </div>
              <button
                onClick={() => onRemoveItem(item.id)}
                style={{
                  background: 'none',
                  border: 'none',
                  color: unifiedDesignTokens.colors.systemRed,
                  fontSize: unifiedDesignTokens.typography.caption2.size,
                  cursor: 'pointer',
                  marginTop: '2px',
                }}
              >
                Remove
              </button>
            </div>
          </motion.div>
        ))}
      </div>

      <div style={{
        borderTop: `${unifiedDesignTokens.lineWeights.thin} solid ${unifiedDesignTokens.colors.separator}`,
        paddingTop: unifiedDesignTokens.spacing.medium,
        display: 'flex',
        flexDirection: 'column',
        gap: unifiedDesignTokens.spacing.small,
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <span style={{ color: unifiedDesignTokens.colors.secondaryLabel }}>Subtotal</span>
          <span style={{ color: unifiedDesignTokens.colors.label }}>${subtotal.toFixed(2)}</span>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <span style={{ color: unifiedDesignTokens.colors.secondaryLabel }}>
            Shipping {subtotal > 100 && <span style={{ color: unifiedDesignTokens.colors.systemGreen }}>(Free!)</span>}
          </span>
          <span style={{ color: unifiedDesignTokens.colors.label }}>
            ${shipping.toFixed(2)}
          </span>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <span style={{ color: unifiedDesignTokens.colors.secondaryLabel }}>Tax</span>
          <span style={{ color: unifiedDesignTokens.colors.label }}>${tax.toFixed(2)}</span>
        </div>
        <div style={{
          borderTop: `${unifiedDesignTokens.lineWeights.thin} solid ${unifiedDesignTokens.colors.separator}`,
          paddingTop: unifiedDesignTokens.spacing.small,
          display: 'flex',
          justifyContent: 'space-between',
          ...unifiedDesignTokens.typography.title3,
          color: unifiedDesignTokens.colors.label,
        }}>
          <span>Total</span>
          <span>${total.toFixed(2)}</span>
        </div>
      </div>
    </motion.div>
  );
};

// Main Checkout Component
interface EcommerceCheckoutProps {
  isMobile?: boolean;
  onOrderComplete?: (orderData: any) => void;
}

const EcommerceCheckout: React.FC<EcommerceCheckoutProps> = ({ 
  isMobile = false,
  onOrderComplete 
}) => {
  const [currentStep, setCurrentStep] = useState<'cart' | 'shipping' | 'payment' | 'confirmation'>('cart');
  const [cartItems, setCartItems] = useState<CheckoutItem[]>(mockCartItems);
  const [shippingAddress, setShippingAddress] = useState<Partial<ShippingAddress>>({});
  const [paymentMethod, setPaymentMethod] = useState<Partial<PaymentMethod>>({});
  const [isProcessing, setIsProcessing] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const steps: CheckoutStep[] = [
    { id: 'cart', title: 'Cart', completed: currentStep !== 'cart', active: currentStep === 'cart' },
    { id: 'shipping', title: 'Shipping', completed: ['payment', 'confirmation'].includes(currentStep), active: currentStep === 'shipping' },
    { id: 'payment', title: 'Payment', completed: currentStep === 'confirmation', active: currentStep === 'payment' },
    { id: 'confirmation', title: 'Confirmation', completed: false, active: currentStep === 'confirmation' },
  ];

  const validateShipping = (): boolean => {
    const newErrors: Record<string, string> = {};
    
    if (!shippingAddress.firstName) newErrors.firstName = 'First name is required';
    if (!shippingAddress.lastName) newErrors.lastName = 'Last name is required';
    if (!shippingAddress.email) newErrors.email = 'Email is required';
    if (!shippingAddress.address1) newErrors.address1 = 'Address is required';
    if (!shippingAddress.city) newErrors.city = 'City is required';
    if (!shippingAddress.state) newErrors.state = 'State is required';
    if (!shippingAddress.postalCode) newErrors.postalCode = 'Postal code is required';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validatePayment = (): boolean => {
    const newErrors: Record<string, string> = {};
    
    if (!paymentMethod.type) newErrors.type = 'Payment method is required';
    if (paymentMethod.type === 'card') {
      if (!paymentMethod.cardNumber) newErrors.cardNumber = 'Card number is required';
      if (!paymentMethod.expiryDate) newErrors.expiryDate = 'Expiry date is required';
      if (!paymentMethod.cvv) newErrors.cvv = 'CVV is required';
      if (!paymentMethod.name) newErrors.name = 'Cardholder name is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = async () => {
    if (currentStep === 'cart' && cartItems.length > 0) {
      setCurrentStep('shipping');
    } else if (currentStep === 'shipping' && validateShipping()) {
      setCurrentStep('payment');
    } else if (currentStep === 'payment' && validatePayment()) {
      setIsProcessing(true);
      // Simulate payment processing
      await new Promise(resolve => setTimeout(resolve, 2000));
      setIsProcessing(false);
      setCurrentStep('confirmation');
      
      if (onOrderComplete) {
        onOrderComplete({
          items: cartItems,
          shipping: shippingAddress,
          payment: paymentMethod,
          total: cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0),
        });
      }
    }
  };

  const updateQuantity = (id: string, quantity: number) => {
    if (quantity === 0) {
      setCartItems(items => items.filter(item => item.id !== id));
    } else {
      setCartItems(items => 
        items.map(item => 
          item.id === id ? { ...item, quantity } : item
        )
      );
    }
  };

  const removeItem = (id: string) => {
    setCartItems(items => items.filter(item => item.id !== id));
  };

  return (
    <div style={{
      minHeight: '100vh',
      background: unifiedDesignTokens.gradients.primaryBackground,
      fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Display", system-ui, sans-serif',
      padding: unifiedDesignTokens.spacing.large,
    }}>
      <div style={{
        maxWidth: '1200px',
        margin: '0 auto',
      }}>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          style={{
            textAlign: 'center',
            marginBottom: unifiedDesignTokens.spacing.xxlarge,
          }}
        >
          <h1 style={{
            ...unifiedDesignTokens.typography.largeTitle,
            color: unifiedDesignTokens.colors.label,
            margin: `0 0 ${unifiedDesignTokens.spacing.small}`,
          }}>
            Secure Checkout
          </h1>
          <p style={{
            ...unifiedDesignTokens.typography.body,
            color: unifiedDesignTokens.colors.secondaryLabel,
            margin: 0,
          }}>
            Complete your purchase with our secure checkout process
          </p>
        </motion.div>

        {/* Step Indicator */}
        <CheckoutStepIndicator 
          steps={steps} 
          currentStep={currentStep} 
          isMobile={isMobile}
        />

        {/* Main Content */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: isMobile ? '1fr' : '1fr 400px',
          gap: unifiedDesignTokens.spacing.xxlarge,
          alignItems: 'start',
        }}>
          {/* Left Column - Forms */}
          <div>
            <AnimatePresence mode="wait">
              {currentStep === 'cart' && (
                <motion.div
                  key="cart"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  style={{
                    ...designUtils.getGlassCard('medium'),
                    padding: unifiedDesignTokens.spacing.large,
                  }}
                >
                  <h2 style={{
                    ...unifiedDesignTokens.typography.title2,
                    color: unifiedDesignTokens.colors.label,
                    margin: `0 0 ${unifiedDesignTokens.spacing.large}`,
                  }}>
                    Shopping Cart ({cartItems.length} items)
                  </h2>

                  {cartItems.length === 0 ? (
                    <div style={{
                      textAlign: 'center',
                      padding: unifiedDesignTokens.spacing.xxlarge,
                      color: unifiedDesignTokens.colors.tertiaryLabel,
                    }}>
                      Your cart is empty
                    </div>
                  ) : (
                    <>
                      <div style={{
                        display: 'flex',
                        flexDirection: 'column',
                        gap: unifiedDesignTokens.spacing.medium,
                        marginBottom: unifiedDesignTokens.spacing.xxlarge,
                      }}>
                        {cartItems.map((item) => (
                          <motion.div
                            key={item.id}
                            layout
                            style={{
                              display: 'flex',
                              alignItems: 'center',
                              gap: unifiedDesignTokens.spacing.medium,
                              padding: unifiedDesignTokens.spacing.medium,
                              borderRadius: unifiedDesignTokens.cornerRadius.medium,
                              background: unifiedDesignTokens.colors.quaternarySystemFill,
                              border: `${unifiedDesignTokens.lineWeights.thin} solid ${unifiedDesignTokens.colors.separator}`,
                            }}
                          >
                            <div style={{
                              width: '80px',
                              height: '80px',
                              borderRadius: unifiedDesignTokens.cornerRadius.small,
                              background: unifiedDesignTokens.colors.tertiarySystemFill,
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              color: unifiedDesignTokens.colors.tertiaryLabel,
                              fontSize: '14px',
                              flexShrink: 0,
                            }}>
                              IMG
                            </div>

                            <div style={{ flex: 1 }}>
                              <h3 style={{
                                ...unifiedDesignTokens.typography.headline,
                                color: unifiedDesignTokens.colors.label,
                                margin: `0 0 ${unifiedDesignTokens.spacing.tiny}`,
                              }}>
                                {item.name}
                              </h3>
                              {item.variant && (
                                <p style={{
                                  ...unifiedDesignTokens.typography.subheadline,
                                  color: unifiedDesignTokens.colors.tertiaryLabel,
                                  margin: `0 0 ${unifiedDesignTokens.spacing.small}`,
                                }}>
                                  {item.variant}
                                </p>
                              )}
                              <div style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: unifiedDesignTokens.spacing.small,
                              }}>
                                <button
                                  onClick={() => updateQuantity(item.id, Math.max(0, item.quantity - 1))}
                                  style={{
                                    width: '32px',
                                    height: '32px',
                                    borderRadius: unifiedDesignTokens.cornerRadius.small,
                                    background: unifiedDesignTokens.colors.tertiarySystemFill,
                                    border: `${unifiedDesignTokens.lineWeights.thin} solid ${unifiedDesignTokens.colors.separator}`,
                                    color: unifiedDesignTokens.colors.label,
                                    cursor: 'pointer',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    fontSize: '18px',
                                  }}
                                >
                                  −
                                </button>
                                <span style={{
                                  ...unifiedDesignTokens.typography.headline,
                                  color: unifiedDesignTokens.colors.label,
                                  minWidth: '40px',
                                  textAlign: 'center',
                                }}>
                                  {item.quantity}
                                </span>
                                <button
                                  onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                  style={{
                                    width: '32px',
                                    height: '32px',
                                    borderRadius: unifiedDesignTokens.cornerRadius.small,
                                    background: unifiedDesignTokens.colors.tertiarySystemFill,
                                    border: `${unifiedDesignTokens.lineWeights.thin} solid ${unifiedDesignTokens.colors.separator}`,
                                    color: unifiedDesignTokens.colors.label,
                                    cursor: 'pointer',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    fontSize: '18px',
                                  }}
                                >
                                  +
                                </button>
                              </div>
                            </div>

                            <div style={{ textAlign: 'right' }}>
                              <div style={{
                                ...unifiedDesignTokens.typography.title3,
                                color: unifiedDesignTokens.colors.label,
                                marginBottom: unifiedDesignTokens.spacing.tiny,
                              }}>
                                ${(item.price * item.quantity).toFixed(2)}
                              </div>
                              <div style={{
                                ...unifiedDesignTokens.typography.caption1,
                                color: unifiedDesignTokens.colors.tertiaryLabel,
                                marginBottom: unifiedDesignTokens.spacing.small,
                              }}>
                                ${item.price.toFixed(2)} each
                              </div>
                              <button
                                onClick={() => removeItem(item.id)}
                                style={{
                                  background: 'none',
                                  border: 'none',
                                  color: unifiedDesignTokens.colors.systemRed,
                                  fontSize: unifiedDesignTokens.typography.caption1.size,
                                  cursor: 'pointer',
                                  textDecoration: 'underline',
                                }}
                              >
                                Remove
                              </button>
                            </div>
                          </motion.div>
                        ))}
                      </div>

                      <CheckoutButton
                        onClick={handleNext}
                        fullWidth
                        isMobile={isMobile}
                        disabled={cartItems.length === 0}
                      >
                        Continue to Shipping
                      </CheckoutButton>
                    </>
                  )}
                </motion.div>
              )}

              {currentStep === 'shipping' && (
                <motion.div
                  key="shipping"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  style={{
                    ...designUtils.getGlassCard('medium'),
                    padding: unifiedDesignTokens.spacing.large,
                  }}
                >
                  <h2 style={{
                    ...unifiedDesignTokens.typography.title2,
                    color: unifiedDesignTokens.colors.label,
                    margin: `0 0 ${unifiedDesignTokens.spacing.large}`,
                  }}>
                    Shipping Information
                  </h2>

                  <div style={{
                    display: 'grid',
                    gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr',
                    gap: unifiedDesignTokens.spacing.medium,
                    marginBottom: unifiedDesignTokens.spacing.large,
                  }}>
                    <CheckoutInput
                      label="First Name"
                      value={shippingAddress.firstName || ''}
                      onChange={(value) => setShippingAddress({...shippingAddress, firstName: value})}
                      placeholder="John"
                      required
                      error={errors.firstName}
                      isMobile={isMobile}
                    />
                    <CheckoutInput
                      label="Last Name"
                      value={shippingAddress.lastName || ''}
                      onChange={(value) => setShippingAddress({...shippingAddress, lastName: value})}
                      placeholder="Doe"
                      required
                      error={errors.lastName}
                      isMobile={isMobile}
                    />
                  </div>

                  <div style={{
                    display: 'grid',
                    gridTemplateColumns: isMobile ? '1fr' : '2fr 1fr',
                    gap: unifiedDesignTokens.spacing.medium,
                    marginBottom: unifiedDesignTokens.spacing.large,
                  }}>
                    <CheckoutInput
                      label="Email"
                      type="email"
                      value={shippingAddress.email || ''}
                      onChange={(value) => setShippingAddress({...shippingAddress, email: value})}
                      placeholder="john.doe@example.com"
                      required
                      error={errors.email}
                      isMobile={isMobile}
                    />
                    <CheckoutInput
                      label="Phone"
                      type="tel"
                      value={shippingAddress.phone || ''}
                      onChange={(value) => setShippingAddress({...shippingAddress, phone: value})}
                      placeholder="(555) 123-4567"
                      isMobile={isMobile}
                    />
                  </div>

                  <CheckoutInput
                    label="Address"
                    value={shippingAddress.address1 || ''}
                    onChange={(value) => setShippingAddress({...shippingAddress, address1: value})}
                    placeholder="123 Main Street"
                    required
                    error={errors.address1}
                    isMobile={isMobile}
                  />

                  <CheckoutInput
                    label="Apartment, suite, etc. (optional)"
                    value={shippingAddress.address2 || ''}
                    onChange={(value) => setShippingAddress({...shippingAddress, address2: value})}
                    placeholder="Apt 4B"
                    isMobile={isMobile}
                  />

                  <div style={{
                    display: 'grid',
                    gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr 1fr',
                    gap: unifiedDesignTokens.spacing.medium,
                    marginBottom: unifiedDesignTokens.spacing.large,
                  }}>
                    <CheckoutInput
                      label="City"
                      value={shippingAddress.city || ''}
                      onChange={(value) => setShippingAddress({...shippingAddress, city: value})}
                      placeholder="New York"
                      required
                      error={errors.city}
                      isMobile={isMobile}
                    />
                    <CheckoutInput
                      label="State"
                      value={shippingAddress.state || ''}
                      onChange={(value) => setShippingAddress({...shippingAddress, state: value})}
                      placeholder="NY"
                      required
                      error={errors.state}
                      isMobile={isMobile}
                    />
                    <CheckoutInput
                      label="Postal Code"
                      value={shippingAddress.postalCode || ''}
                      onChange={(value) => setShippingAddress({...shippingAddress, postalCode: value})}
                      placeholder="10001"
                      required
                      error={errors.postalCode}
                      isMobile={isMobile}
                    />
                  </div>

                  <div style={{
                    display: 'flex',
                    gap: unifiedDesignTokens.spacing.medium,
                    flexDirection: isMobile ? 'column' : 'row',
                  }}>
                    <CheckoutButton
                      variant="secondary"
                      onClick={() => setCurrentStep('cart')}
                      fullWidth={isMobile}
                    >
                      Back to Cart
                    </CheckoutButton>
                    <CheckoutButton
                      onClick={handleNext}
                      fullWidth={isMobile}
                    >
                      Continue to Payment
                    </CheckoutButton>
                  </div>
                </motion.div>
              )}

              {currentStep === 'payment' && (
                <motion.div
                  key="payment"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  style={{
                    ...designUtils.getGlassCard('medium'),
                    padding: unifiedDesignTokens.spacing.large,
                  }}
                >
                  <h2 style={{
                    ...unifiedDesignTokens.typography.title2,
                    color: unifiedDesignTokens.colors.label,
                    margin: `0 0 ${unifiedDesignTokens.spacing.large}`,
                  }}>
                    Payment Method
                  </h2>

                  <div style={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: unifiedDesignTokens.spacing.medium,
                    marginBottom: unifiedDesignTokens.spacing.large,
                  }}>
                    {['card', 'paypal', 'apple_pay'].map((method) => (
                      <motion.label
                        key={method}
                        whileHover={{ scale: 1.01 }}
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: unifiedDesignTokens.spacing.medium,
                          padding: unifiedDesignTokens.spacing.medium,
                          borderRadius: unifiedDesignTokens.cornerRadius.medium,
                          background: paymentMethod.type === method 
                            ? unifiedDesignTokens.colors.secondarySystemFill
                            : unifiedDesignTokens.colors.quaternarySystemFill,
                          border: `${unifiedDesignTokens.lineWeights.thin} solid ${
                            paymentMethod.type === method 
                              ? unifiedDesignTokens.colors.systemBlue
                              : unifiedDesignTokens.colors.separator
                          }`,
                          cursor: 'pointer',
                          transition: `all ${unifiedDesignTokens.animation.duration.medium} ${unifiedDesignTokens.animation.easing.standard}`,
                        }}
                      >
                        <input
                          type="radio"
                          name="paymentMethod"
                          value={method}
                          checked={paymentMethod.type === method}
                          onChange={() => setPaymentMethod({...paymentMethod, type: method as 'card' | 'paypal' | 'apple_pay'})}
                          style={{ margin: 0 }}
                        />
                        <span style={{
                          ...unifiedDesignTokens.typography.body,
                          color: unifiedDesignTokens.colors.label,
                          textTransform: 'capitalize',
                        }}>
                          {method.replace('_', ' ')}
                        </span>
                      </motion.label>
                    ))}
                  </div>

                  {paymentMethod.type === 'card' && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      style={{
                        marginBottom: unifiedDesignTokens.spacing.large,
                      }}
                    >
                      <CheckoutInput
                        label="Cardholder Name"
                        value={paymentMethod.name || ''}
                        onChange={(value) => setPaymentMethod({...paymentMethod, name: value})}
                        placeholder="John Doe"
                        required
                        error={errors.name}
                        isMobile={isMobile}
                      />

                      <CheckoutInput
                        label="Card Number"
                        value={paymentMethod.cardNumber || ''}
                        onChange={(value) => setPaymentMethod({...paymentMethod, cardNumber: value})}
                        placeholder="1234 5678 9012 3456"
                        required
                        error={errors.cardNumber}
                        isMobile={isMobile}
                      />

                      <div style={{
                        display: 'grid',
                        gridTemplateColumns: '1fr 1fr',
                        gap: unifiedDesignTokens.spacing.medium,
                      }}>
                        <CheckoutInput
                          label="Expiry Date"
                          value={paymentMethod.expiryDate || ''}
                          onChange={(value) => setPaymentMethod({...paymentMethod, expiryDate: value})}
                          placeholder="MM/YY"
                          required
                          error={errors.expiryDate}
                          isMobile={isMobile}
                        />
                        <CheckoutInput
                          label="CVV"
                          value={paymentMethod.cvv || ''}
                          onChange={(value) => setPaymentMethod({...paymentMethod, cvv: value})}
                          placeholder="123"
                          required
                          error={errors.cvv}
                          isMobile={isMobile}
                        />
                      </div>
                    </motion.div>
                  )}

                  <div style={{
                    display: 'flex',
                    gap: unifiedDesignTokens.spacing.medium,
                    flexDirection: isMobile ? 'column' : 'row',
                  }}>
                    <CheckoutButton
                      variant="secondary"
                      onClick={() => setCurrentStep('shipping')}
                      fullWidth={isMobile}
                    >
                      Back to Shipping
                    </CheckoutButton>
                    <CheckoutButton
                      onClick={handleNext}
                      loading={isProcessing}
                      fullWidth={isMobile}
                      disabled={!paymentMethod.type}
                    >
                      {isProcessing ? 'Processing...' : 'Complete Order'}
                    </CheckoutButton>
                  </div>
                </motion.div>
              )}

              {currentStep === 'confirmation' && (
                <motion.div
                  key="confirmation"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  style={{
                    ...designUtils.getGlassCard('medium'),
                    padding: unifiedDesignTokens.spacing.large,
                    textAlign: 'center',
                  }}
                >
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
                    style={{
                      width: '80px',
                      height: '80px',
                      borderRadius: '50%',
                      background: unifiedDesignTokens.gradients.successButton,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      margin: `0 auto ${unifiedDesignTokens.spacing.large}`,
                      color: '#FFFFFF',
                      fontSize: '32px',
                    }}
                  >
                    ✓
                  </motion.div>

                  <h2 style={{
                    ...unifiedDesignTokens.typography.title1,
                    color: unifiedDesignTokens.colors.label,
                    margin: `0 0 ${unifiedDesignTokens.spacing.medium}`,
                  }}>
                    Order Confirmed!
                  </h2>

                  <p style={{
                    ...unifiedDesignTokens.typography.body,
                    color: unifiedDesignTokens.colors.secondaryLabel,
                    margin: `0 0 ${unifiedDesignTokens.spacing.large}`,
                  }}>
                    Thank you for your order. You'll receive a confirmation email shortly with tracking information.
                  </p>

                  <div style={{
                    background: unifiedDesignTokens.colors.quaternarySystemFill,
                    borderRadius: unifiedDesignTokens.cornerRadius.medium,
                    padding: unifiedDesignTokens.spacing.medium,
                    marginBottom: unifiedDesignTokens.spacing.large,
                  }}>
                    <p style={{
                      ...unifiedDesignTokens.typography.caption1,
                      color: unifiedDesignTokens.colors.tertiaryLabel,
                      margin: `0 0 ${unifiedDesignTokens.spacing.tiny}`,
                    }}>
                      Order Number
                    </p>
                    <p style={{
                      ...unifiedDesignTokens.typography.headline,
                      color: unifiedDesignTokens.colors.label,
                      margin: 0,
                      fontFamily: 'monospace',
                    }}>
                      #PG{Date.now().toString().slice(-6)}
                    </p>
                  </div>

                  <CheckoutButton
                    onClick={() => window.location.href = '/'}
                    fullWidth={isMobile}
                  >
                    Continue Shopping
                  </CheckoutButton>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Right Column - Order Summary */}
          {!isMobile && (
            <CartSummary
              items={cartItems}
              onUpdateQuantity={updateQuantity}
              onRemoveItem={removeItem}
              isMobile={isMobile}
            />
          )}
        </div>

        {/* Mobile Cart Summary */}
        {isMobile && currentStep !== 'cart' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            style={{ marginTop: unifiedDesignTokens.spacing.large }}
          >
            <CartSummary
              items={cartItems}
              onUpdateQuantity={updateQuantity}
              onRemoveItem={removeItem}
              isMobile={isMobile}
            />
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default EcommerceCheckout;