import React, { useState, useEffect } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import {
  Elements,
  CardElement,
  useStripe,
  useElements
} from '@stripe/react-stripe-js';
import { CreditCard, Lock, CheckCircle, AlertCircle, Coins, Sparkles } from 'lucide-react';

// Dummy Stripe publishable key for demo purposes
const stripePromise = loadStripe('pk_test_dummy_key_for_demo_purposes_only');

// Coin Animation Component
const CoinAnimation = ({ isVisible }) => {
  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
      {/* Floating Coins */}
      {[...Array(12)].map((_, i) => (
        <div
          key={i}
          className="absolute animate-coin-bounce"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            animationDelay: `${i * 0.15}s`,
            animationDuration: '2s'
          }}
        >
          <div className="w-8 h-8 bg-gradient-to-r from-yellow-400 to-yellow-600 rounded-full flex items-center justify-center shadow-lg animate-coin-spin">
            <Coins className="w-4 h-4 text-white" />
          </div>
        </div>
      ))}
      
      {/* Central Processing Animation */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="w-32 h-32 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full flex items-center justify-center animate-pulse shadow-2xl">
          <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center">
            <div className="w-12 h-12 border-4 border-purple-600 border-t-transparent rounded-full animate-spin"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Processing Steps Component
const ProcessingSteps = ({ currentStep }) => {
  const steps = [
    'Validating card...',
    'Processing payment...',
    'Securing transaction...',
    'Finalizing...'
  ];

  return (
    <div className="space-y-3">
      {steps.map((step, index) => (
        <div
          key={index}
          className={`flex items-center space-x-3 transition-all duration-500 ${
            index < currentStep ? 'text-green-600' : index === currentStep ? 'text-blue-600' : 'text-gray-400'
          }`}
        >
          <div className={`w-6 h-6 rounded-full flex items-center justify-center transition-all duration-500 ${
            index < currentStep ? 'bg-green-100' : index === currentStep ? 'bg-blue-100 animate-pulse' : 'bg-gray-100'
          }`}>
            {index < currentStep ? (
              <CheckCircle className="w-4 h-4 text-green-600" />
            ) : index === currentStep ? (
              <div className="w-3 h-3 bg-blue-600 rounded-full animate-pulse"></div>
            ) : (
              <div className="w-3 h-3 bg-gray-400 rounded-full"></div>
            )}
          </div>
          <span className={`font-medium transition-all duration-500 ${
            index === currentStep ? 'animate-pulse' : ''
          }`}>
            {step}
          </span>
        </div>
      ))}
    </div>
  );
};

const PaymentForm = ({ totalAmount, onPaymentSuccess, onPaymentError }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentStatus, setPaymentStatus] = useState(null);
  const [showCoins, setShowCoins] = useState(false);
  const [processingStep, setProcessingStep] = useState(0);

  const handleSubmit = async (event) => {
    event.preventDefault();
    
    if (!stripe || !elements) {
      return;
    }

    setIsProcessing(true);
    setPaymentStatus(null);
    setShowCoins(true);
    setProcessingStep(0);

    // Animate processing steps
    const steps = [
      'Validating card...',
      'Processing payment...',
      'Securing transaction...',
      'Finalizing...'
    ];

    steps.forEach((step, index) => {
      setTimeout(() => {
        setProcessingStep(index + 1);
      }, (index + 1) * 500);
    });

    // Simulate payment processing for demo
    setTimeout(() => {
      setIsProcessing(false);
      setShowCoins(false);
      
      // Simulate successful payment (90% success rate for demo)
      if (Math.random() > 0.1) {
        setPaymentStatus('success');
        onPaymentSuccess();
      } else {
        setPaymentStatus('error');
        onPaymentError('Payment failed. Please try again.');
      }
    }, 3000);
  };

  const cardElementOptions = {
    style: {
      base: {
        fontSize: '16px',
        color: '#424770',
        '::placeholder': {
          color: '#aab7c4',
        },
      },
      invalid: {
        color: '#9e2146',
      },
    },
  };

  return (
    <>
      <CoinAnimation isVisible={showCoins} />
      
      <div className="bg-white rounded-2xl border border-purple-100 p-6 relative overflow-hidden">
        {/* Background Sparkles */}
        {paymentStatus === 'success' && (
          <div className="absolute inset-0 pointer-events-none">
            {[...Array(20)].map((_, i) => (
              <div
                key={i}
                className="absolute animate-ping"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  animationDelay: `${i * 0.1}s`,
                  animationDuration: '1s'
                }}
              >
                <Sparkles className="w-4 h-4 text-yellow-400" />
              </div>
            ))}
          </div>
        )}

        <div className="flex items-center space-x-3 mb-6 relative z-10">
          <div className="w-10 h-10 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full flex items-center justify-center animate-payment-glow">
            <CreditCard className="w-5 h-5 text-white" />
          </div>
          <h3 className="text-xl font-bold text-gray-900">Payment Details</h3>
        </div>

        {isProcessing ? (
          <div className="text-center py-8 relative z-10">
            <div className="mb-6">
              <div className="w-20 h-20 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-4 animate-spin">
                <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center">
                  <Coins className="w-6 h-6 text-purple-600 animate-bounce" />
                </div>
              </div>
              <h4 className="text-lg font-semibold text-gray-900 mb-2">Processing Payment</h4>
              <p className="text-gray-600">Please wait while we process your payment...</p>
            </div>
            
            <ProcessingSteps currentStep={processingStep} />
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6 relative z-10">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Card Information
              </label>
              <div className="border border-gray-300 rounded-lg p-4 bg-gray-50 hover:bg-gray-100 transition-colors duration-300">
                <CardElement options={cardElementOptions} />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Cardholder Name
                </label>
                <input
                  type="text"
                  placeholder="John Doe"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email
                </label>
                <input
                  type="email"
                  placeholder="john@example.com"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300"
                  required
                />
              </div>
            </div>

            <div className="bg-gradient-to-r from-purple-50 to-blue-50 rounded-lg p-4 border border-purple-200">
              <div className="flex items-center justify-between text-lg font-semibold">
                <span className="flex items-center space-x-2">
                  <Coins className="w-5 h-5 text-purple-600" />
                  <span>Total Amount</span>
                </span>
                <span className="bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                  ₹{totalAmount.toFixed(2)}
                </span>
              </div>
            </div>

            {paymentStatus === 'success' && (
              <div className="flex items-center space-x-2 text-green-600 bg-green-50 p-4 rounded-lg animate-bounce">
                <CheckCircle className="w-5 h-5" />
                <span className="font-medium">Payment successful!</span>
              </div>
            )}

            {paymentStatus === 'error' && (
              <div className="flex items-center space-x-2 text-red-600 bg-red-50 p-4 rounded-lg animate-pulse">
                <AlertCircle className="w-5 h-5" />
                <span className="font-medium">Payment failed. Please try again.</span>
              </div>
            )}

            <button
              type="submit"
              disabled={!stripe || isProcessing}
              className="w-full h-14 rounded-xl font-semibold text-lg bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white transition-all duration-500 hover:scale-105 hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 relative overflow-hidden group animate-payment-glow"
            >
              <div className="absolute inset-0 animate-shimmer"></div>
              <div className="flex items-center justify-center space-x-2 relative z-10">
                <Lock className="w-5 h-5" />
                <span>Pay ₹{totalAmount.toFixed(2)}</span>
              </div>
            </button>
          </form>
        )}

        <div className="mt-4 text-center relative z-10">
          <p className="text-xs text-gray-500 flex items-center justify-center space-x-1">
            <Lock className="w-3 h-3" />
            <span>Your payment information is secure and encrypted</span>
          </p>
        </div>
      </div>
    </>
  );
};

const CheckoutForm = ({ totalAmount, onPaymentSuccess, onPaymentError }) => {
  return (
    <Elements stripe={stripePromise}>
      <PaymentForm 
        totalAmount={totalAmount}
        onPaymentSuccess={onPaymentSuccess}
        onPaymentError={onPaymentError}
      />
    </Elements>
  );
};

export default CheckoutForm;