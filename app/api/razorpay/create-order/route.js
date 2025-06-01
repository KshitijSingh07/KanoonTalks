import Razorpay from 'razorpay';

export async function POST() {
  const razorpay = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_KEY_SECRET,
  });

  const options = {
    amount: 5000, // ₹50 in paise
    currency: 'INR',
    receipt: `receipt_${Date.now()}`,
  };

  const order = await razorpay.orders.create(options);
  return Response.json({ order });
}
