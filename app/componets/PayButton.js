'use client';

import { useEffect } from 'react';

const loadRazorpayScript = () => {
  return new Promise((resolve) => {
    const script = document.createElement('script');
    script.src = 'https://checkout.razorpay.com/v1/checkout.js';
    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);
    document.body.appendChild(script);
  });
};

const PayButton = ({ onSuccess }) => {
  const handlePayment = async () => {
    const res = await fetch('/api/razorpay/create-order', {
      method: 'POST',
    });
    const data = await res.json();
    const order = data.order;

    const isLoaded = await loadRazorpayScript();
    if (!isLoaded) return alert('Razorpay failed to load. Try again.');

    const options = {
      key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
      amount: order.amount,
      currency: order.currency,
      name: 'Your Website',
      description: 'Article Upload Fee',
      order_id: order.id,
      handler: function (response) {
        // payment success
        console.log('Payment success:', response);
        onSuccess(); // trigger article upload
      },
      theme: {
        color: '#3399cc',
      },
    };

    const rzp = new window.Razorpay(options);
    rzp.open();
  };

  return (
    <button onClick={handlePayment} className="bg-green-600 text-white px-4 py-2 rounded">
      Pay ₹50 to Upload
    </button>
  );
};

export default PayButton;
