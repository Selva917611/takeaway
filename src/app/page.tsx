'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Separator } from '@/components/ui/separator';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

// Define menu items with descriptions and dietary info
const menu = {
  'South Indian': [
    { name: 'Dosa', price: 30, description: 'Crispy rice and lentil crepe', vegetarian: true, spicy: false, image: '/dosa.jpg' },
    { name: 'Idli', price: 25, description: 'Steamed rice cakes', vegetarian: true, spicy: false, image: '/idli.jpg' },
    { name: 'Vada', price: 35, description: 'Savory fried lentil donuts', vegetarian: true, spicy: true, image: '/vada.jpg' },
  ],
  'North Indian': [
    { name: 'Butter Chicken', price: 150, description: 'Creamy tomato-based chicken curry', vegetarian: false, spicy: false, image: '/butterchicken.jpg' },
    { name: 'Palak Paneer', price: 120, description: 'Spinach and cottage cheese curry', vegetarian: true, spicy: true, image: '/palakpaneer.jpg' },
    { name: 'Dal Makhani', price: 100, description: 'Black lentil curry', vegetarian: true, spicy: false, image: '/dalmakhani.jpg' },
  ],
  'Desserts': [
    { name: 'Gulab Jamun', price: 40, description: 'Deep-fried milk balls in syrup', vegetarian: true, spicy: false, image: '/gulabjamun.jpg' },
    { name: 'Rasmalai', price: 50, description: 'Cheese patties in sweet milk', vegetarian: true, spicy: false, image: '/rasmalai.jpg' },
    { name: 'Jalebi', price: 30, description: 'Crispy fried batter in syrup', vegetarian: true, spicy: false, image: '/jalebi.jpg' },
  ],
};

export default function Home() {
  const [selectedItems, setSelectedItems] = useState<{ [key: string]: number }>({});
  const [takeAway, setTakeAway] = useState(false);
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("all");

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

  const filteredMenu = Object.entries(menu).map(([category, items]) => {
    const filteredItems = items.filter(item => {
      if (activeTab === "veg") {
        return item.vegetarian;
      } else if (activeTab === "nonveg") {
        return !item.vegetarian;
      }
      return true;
    });
    return [category, filteredItems];
  }).filter(([, items]) => items.length > 0);

  return (
    <>
      <div className="container mx-auto p-4 flex flex-col gap-4">
        <Card>
          <CardHeader>
            <CardTitle>Menu</CardTitle>
            <Tabs defaultValue="all" className="mt-4">
              <TabsList>
                <TabsTrigger value="all" onClick={() => setActiveTab("all")}>All</TabsTrigger>
                <TabsTrigger value="veg" onClick={() => setActiveTab("veg")} className="hover:bg-lightgreen-500">Veg</TabsTrigger>
                <TabsTrigger value="nonveg" onClick={() => setActiveTab("nonveg")} className="hover:bg-lightred-500">Non-Veg</TabsTrigger>
              </TabsList>
            </Tabs>
          </CardHeader>
           
          <CardContent className="flex flex-col gap-4">
            {filteredMenu.find(([category]) => category === 'South Indian') && (
              <div key="South Indian" className="mb-4">
                <h2 className="text-xl font-semibold mb-2">South Indian</h2>
                <Separator className="mb-2" />
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {menu['South Indian'].filter(item => {
                    if (activeTab === "veg") {
                      return item.vegetarian;
                    } else if (activeTab === "nonveg") {
                      return !item.vegetarian;
                    }
                    return true;
                  }).map(item => (
                    <Card key={item.name} className="shadow-md">
                      <CardHeader>
                        <CardTitle className="text-lg hover:text-red-500">{item.name}</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <Avatar className="mb-4 h-24 w-24">
                           <AvatarImage src={item.image || "https://picsum.photos/200/150?random=1"} alt={item.name} />
                           <AvatarFallback>{item.name.charAt(0)}</AvatarFallback>
                        </Avatar>
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
            )}

            {filteredMenu.find(([category]) => category === 'North Indian') && (
              <div key="North Indian" className="mb-4">
                <h2 className="text-xl font-semibold mb-2">North Indian</h2>
                <Separator className="mb-2" />
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {menu['North Indian'].filter(item => {
                    if (activeTab === "veg") {
                      return item.vegetarian;
                    } else if (activeTab === "nonveg") {
                      return !item.vegetarian;
                    }
                    return true;
                  }).map(item => (
                    <Card key={item.name} className="shadow-md">
                      <CardHeader>
                        <CardTitle className="text-lg hover:text-red-500">{item.name}</CardTitle>
                      </CardHeader>
                      <CardContent>
                         <Avatar className="mb-4 h-24 w-24">
                           <AvatarImage src={item.image || "https://picsum.photos/200/150?random=2"} alt={item.name} />
                           <AvatarFallback>{item.name.charAt(0)}</AvatarFallback>
                        </Avatar>
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
            )}

            {filteredMenu.find(([category]) => category === 'Desserts') && (
              <div key="Desserts" className="mb-4">
                <h2 className="text-xl font-semibold mb-2">Desserts</h2>
                <Separator className="mb-2" />
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {menu['Desserts'].filter(item => {
                    if (activeTab === "veg") {
                      return item.vegetarian;
                    } else if (activeTab === "nonveg") {
                      return !item.vegetarian;
                    }
                    return true;
                  }).map(item => (
                    <Card key={item.name} className="shadow-md">
                      <CardHeader>
                        <CardTitle className="text-lg hover:text-red-500">{item.name}</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <Avatar className="mb-4 h-24 w-24">
                           <AvatarImage src={item.image || "https://picsum.photos/200/150?random=3"} alt={item.name} />
                           <AvatarFallback>{item.name.charAt(0)}</AvatarFallback>
                        </Avatar>
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
            )}
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
    </>
  );
}
