'use client';

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function PaymentPage() {
  return (
    <div className="container mx-auto p-4 flex justify-center">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>Payment Gateway</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-lg">This is a placeholder for the payment gateway.</p>
          <p className="text-sm text-muted-foreground">In a real application, you would integrate with a payment provider here.</p>
        </CardContent>
      </Card>
    </div>
  );
}
