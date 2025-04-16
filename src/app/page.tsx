'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Separator } from '@/components/ui/separator';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';

// Define menu items with descriptions and dietary info
const menu = {
  'South Indian': [
    { name: 'Dosa', price: 30, description: 'Crispy rice and lentil crepe', vegetarian: true, spicy: false, image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/94/Masala_dosa.jpg/1280px-Masala_dosa.jpg' },
    { name: 'Idli', price: 25, description: 'Steamed rice cakes', vegetarian: true, spicy: false, image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/7d/Idli_Sambar.jpg/1280px-Idli_Sambar.jpg' },
    { name: 'Vada', price: 35, description: 'Savory fried lentil donuts', vegetarian: true, spicy: true, image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/dc/Vada_at_Mattancherry.JPG/1280px-Vada_at_Mattancherry.JPG' },
  ],
  'North Indian': [
    { name: 'Butter Chicken', price: 150, description: 'Creamy tomato-based chicken curry', vegetarian: false, spicy: false, image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/44/Butter_Chicken_%28Murgh_Makhani%29.jpg/1280px-Butter_Chicken_%28Murgh_Makhani%29.jpg' },
    { name: 'Palak Paneer', price: 120, description: 'Spinach and cottage cheese curry', vegetarian: true, spicy: true, image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/5f/Palak_Paneer.jpg/1280px-Palak_Paneer.jpg' },
    { name: 'Dal Makhani', price: 100, description: 'Black lentil curry', vegetarian: true, spicy: false, image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/25/Dal_Makhani.jpg/1280px-Dal_Makhani.jpg' },
  ],
  'Desserts': [
    { name: 'Gulab Jamun', price: 40, description: 'Deep-fried milk balls in syrup', vegetarian: true, spicy: false, image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/2b/Gulab_Jamun_with_syrup.JPG/1280px-Gulab_Jamun_with_syrup.JPG' },
    { name: 'Rasmalai', price: 50, description: 'Cheese patties in sweet milk', vegetarian: true, spicy: false, image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/dd/Rasmalai_Kolkata_India.jpg/1280px-Rasmalai_Kolkata_India.jpg' },
    { name: 'Jalebi', price: 30, description: 'Crispy fried batter in syrup', vegetarian: true, spicy: false, image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/3c/Jalebi.JPG/1280px-Jalebi.JPG' },
  ],
};

export default function Home() {
  const [selectedItems, setSelectedItems] = useState<{ [key: string]: number }>({});
  const [takeAway, setTakeAway] = useState(false);
  const router = useRouter();

  const toggleItem = (itemName: string, price: number) => {
    setSelectedItems(prev => {
      if (prev[itemName]) {
        const { [itemName]: removed, ...rest } = prev;
        return rest;
      } else {
        return { ...prev, [itemName]: price };
      }
    });
  };

  const calculateTotal = () => {
    let total = Object.values(selectedItems).reduce((acc, price) => acc + price, 0);
    if (takeAway) {
      total += 5;
    }
    return total;
  };

  const total = calculateTotal();

  const handlePlaceOrder = () => {
    // Store the total in localStorage
    localStorage.setItem('billAmount', total.toString());
    // Navigate to the order page
    router.push('/order');
  };

  return (
    <div className="container mx-auto p-4 flex flex-col gap-4">
      <Card>
        <CardHeader>
          <CardTitle>Menu</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col gap-4">
          {Object.entries(menu).map(([category, items]) => (
            <div key={category} className="mb-4">
              <h2 className="text-xl font-semibold mb-2">{category}</h2>
              <Separator className="mb-2" />
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {items.map(item => (
                  <Card key={item.name} className="shadow-md">
                    <CardHeader>
                      <CardTitle className="text-lg hover:text-red-500">{item.name}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      
                      <p className="text-sm text-muted-foreground">{item.description}</p>
                      <p className="text-sm font-medium">Rs. {item.price}</p>
                      <div className="flex items-center mt-2">
                        <Checkbox
                          id={item.name}
                          checked={!!selectedItems[item.name]}
                          onCheckedChange={() => toggleItem(item.name, item.price)}
                        />
                        <label
                          htmlFor={item.name}
                          className="ml-2 text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                        >
                          Select
                        </label>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      <Card className="shadow-md">
        <CardHeader>
          <CardTitle>Bill Details</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <p className="text-lg font-medium">Total:</p>
            <p className="text-lg font-semibold">Rs. {total}</p>
          </div>
          <div className="flex items-center">
            <Checkbox id="take-away" checked={takeAway} onCheckedChange={setTakeAway} />
            <label htmlFor="take-away" className="ml-2 text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
              Take Away (+Rs. 5)
            </label>
          </div>
          <Button variant="lightBlue" onClick={handlePlaceOrder}>Place Order</Button>
        </CardContent>
      </Card>
    </div>
  );
}
