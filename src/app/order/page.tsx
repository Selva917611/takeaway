'use client';

import { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function OrderPage() {
  const [billAmount, setBillAmount] = useState<number | null>(null);

  useEffect(() => {
    // Retrieve the bill amount from localStorage
    const amount = localStorage.getItem('billAmount');
    if (amount) {
      setBillAmount(parseFloat(amount));
    }
  }, []);

  return (
    <div className="container mx-auto p-4 flex justify-center">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>Your Order</CardTitle>
        </CardHeader>
        <CardContent>
          {billAmount !== null ? (
            <p className="text-lg">Total Bill Amount: Rs. {billAmount.toFixed(2)}</p>
          ) : (
            <p>No order placed yet.</p>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
