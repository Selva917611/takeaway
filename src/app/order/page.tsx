'use client';

import { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';

export default function OrderPage() {
  const [billAmount, setBillAmount] = useState<number | null>(null);
  const [totalAmount, setTotalAmount] = useState<number | null>(null);
  const router = useRouter();

  useEffect(() => {
    // Retrieve the bill amount from localStorage
    const amount = localStorage.getItem('billAmount');
    if (amount) {
      const parsedAmount = parseFloat(amount);
      setBillAmount(parsedAmount);

      // Calculate tax (2%) and total amount
      const tax = parsedAmount * 0.02;
      const total = parsedAmount + tax;
      setTotalAmount(total);
    }
  }, []);

  const handlePayNow = () => {
    // Redirect to a placeholder payment gateway
    router.push('/payment');
  };

  return (
    <div className="container mx-auto p-4 flex justify-center">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>Your Order</CardTitle>
        </CardHeader>
        <CardContent>
          {billAmount !== null ? (
            <>
              <p className="text-lg">Bill Amount: Rs. {billAmount.toFixed(2)}</p>
              <p className="text-sm text-muted-foreground">Tax (2%): Rs. {(billAmount * 0.02).toFixed(2)}</p>
              <p className="text-lg font-semibold">Total Amount (incl. tax): Rs. {totalAmount ? totalAmount.toFixed(2) : '0.00'}</p>
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
