'use client';

import { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';

export default function OrderPage() {
  const [billAmount, setBillAmount] = useState<number | null>(null);
  const [totalAmount, setTotalAmount] = useState<number | null>(null);
  const [orderedItems, setOrderedItems] = useState<{[key: string]: {price: number, quantity: number}} | null>(null);
  const router = useRouter();
  const [takeAway, setTakeAway] = useState(false);
  const takeAwayCharge = 5;

  useEffect(() => {
    // Retrieve the bill amount and ordered items from localStorage
    const amount = localStorage.getItem('billAmount');
    const items = localStorage.getItem('orderedItems');
    const takeAwayValue = localStorage.getItem('takeAway');

    if (takeAwayValue) {
        setTakeAway(takeAwayValue === 'true');
    }

    if (amount) {
      const parsedAmount = parseFloat(amount);
      setBillAmount(parsedAmount);
    }

    if (items) {
      setOrderedItems(JSON.parse(items));
    }
  }, []);

  useEffect(() => {
      // Calculate total amount whenever billAmount or takeAway changes
      if (billAmount !== null) {
          let total = billAmount;
          const tax = billAmount * 0.02;
          total += tax;
          if (takeAway) {
              total += takeAwayCharge;
          }
          setTotalAmount(total);
      }
  }, [billAmount, takeAway]);


  const handlePayNow = async () => {
    // Simulate a successful payment
    alert('Payment Successful!');

    // Clear the bill amount from localStorage
    localStorage.removeItem('billAmount');
    localStorage.removeItem('orderedItems');
    localStorage.removeItem('takeAway');


    // Redirect to the home page
    router.push('/');
  };

  return (
    <div className="container mx-auto p-4 flex justify-center">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>Your Order</CardTitle>
        </CardHeader>
        <CardContent>
          {billAmount !== null && orderedItems !== null ? (
            <>
              <div className="mb-4">
                <p className="text-lg font-medium">Ordered Items:</p>
                <ul>
                  {Object.entries(orderedItems).map(([name, item]) => (
                    <li key={name} className="flex justify-between py-2 border-b">
                      <span>{name}</span>
                      <span>Quantity: {item.quantity}</span>
                      <span>Rs. {(item.price * item.quantity).toFixed(2)}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="mb-4">
                <p className="text-lg font-medium">Bill Details:</p>
                <div className="flex justify-between py-2">
                    <span>Subtotal:</span>
                    <span>Rs. {billAmount.toFixed(2)}</span>
                </div>
                <div className="flex justify-between py-2">
                    <span>Tax (2%):</span>
                    <span>Rs. {(billAmount * 0.02).toFixed(2)}</span>
                </div>
                 {takeAway && (
                    <div className="flex justify-between py-2">
                        <span>Take Away Charge:</span>
                        <span>Rs. {takeAwayCharge.toFixed(2)}</span>
                    </div>
                )}
                <div className="flex justify-between py-2 font-semibold">
                    <span>Total:</span>
                    <span>Rs. {totalAmount ? totalAmount.toFixed(2) : '0.00'}</span>
                </div>
              </div>
              <Button onClick={handlePayNow} className="mt-4 bg-blue-500 text-white rounded-md p-2 hover:bg-blue-600">
                Pay Now
              </Button>
            </>
          ) : (
            <p>No order placed yet.</p>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
