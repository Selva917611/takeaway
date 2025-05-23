'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Separator } from '@/components/ui/separator';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input"

// Define menu items with descriptions and dietary info
const menu = {
  'South Indian': [
    { name: 'Dosa', price: 30, description: 'Crispy rice and lentil crepe', vegetarian: true, spicy: false, image: 'https://www.cookwithmanali.com/wp-content/uploads/2020/07/Masala-Dosa-Recipe-500x500.jpg' },
    { name: 'Idli', price: 25, description: 'Steamed rice cakes', vegetarian: true, spicy: false, image: '/idli.jpg' },
    { name: 'Vada', price: 35, description: 'Savory fried lentil donuts', vegetarian: true, spicy: true, image: '/vada.jpg' },
    { name: 'Pongal', price: 45, description: 'Rice and lentil dish', vegetarian: true, spicy: false, image: '/pongal.jpg' },
    { name: 'Uttapam', price: 50, description: 'Thick pancake with toppings', vegetarian: true, spicy: false, image: '/uttapam.jpg' },
    { name: 'Sambar Vada', price: 55, description: 'Vada dipped in sambar', vegetarian: true, spicy: true, image: '/sambarvada.jpg' },
    { name: 'Rava Dosa', price: 60, description: 'Crispy crepe made from semolina', vegetarian: true, spicy: false, image: '/ravadosa.jpg' },
    { name: 'Masala Dosa', price: 65, description: 'Dosa stuffed with spiced potatoes', vegetarian: true, spicy: true, image: '/masaladosa.jpg' },
    { name: 'Mysore Masala Dosa', price: 70, description: 'Spicy dosa from Mysore', vegetarian: true, spicy: true, image: '/mysoremasaladosa.jpg', special: true },
    { name: 'Plain Dosa', price: 25, description: 'Simple and tasty Dosa', vegetarian: true, spicy: false, image: '/plaindosa.jpg' },
  ],
  'North Indian': [
    { name: 'Butter Chicken', price: 150, description: 'Creamy tomato-based chicken curry', vegetarian: false, spicy: false, image: '/butterchicken.jpg', special: true },
    { name: 'Palak Paneer', price: 120, description: 'Spinach and cottage cheese curry', vegetarian: true, spicy: true, image: '/palakpaneer.jpg' },
    { name: 'Dal Makhani', price: 100, description: 'Black lentil curry', vegetarian: true, spicy: false, image: '/dalmakhani.jpg' },
    { name: 'Chole Bhature', price: 110, description: 'Chickpea curry served with fried bread', vegetarian: true, spicy: true, image: '/cholebhature.jpg' },
    { name: 'Aloo Gobi', price: 90, description: 'Potato and cauliflower curry', vegetarian: true, spicy: false, image: '/aloogobi.jpg' },
    { name: 'Navratan Korma', price: 130, description: 'Vegetable curry with nuts and fruits', vegetarian: true, spicy: false, image: '/navratankorma.jpg' },
    { name: 'Malai Kofta', price: 140, description: 'Cottage cheese balls in creamy gravy', vegetarian: true, spicy: false, image: '/malaikofta.jpg' },
    { name: 'Chicken Tikka Masala', price: 160, description: 'Marinated chicken in a spiced sauce', vegetarian: false, spicy: true, image: '/chickentikkamasala.jpg' },
    { name: 'Shahi Paneer', price: 130, description: 'Cottage cheese in a rich gravy', vegetarian: true, spicy: false, image: '/shahipaneer.jpg' },
    { name: 'Baingan Bharta', price: 95, description: 'Mashed eggplant dish', vegetarian: true, spicy: true, image: '/bainganbharta.jpg' },
        { name: 'Tandoori Chicken', price: 170, description: 'Marinated and roasted chicken', vegetarian: false, spicy: true, image: '/tandoorichicken.jpg' },
        { name: 'Rogan Josh', price: 180, description: 'Aromatic lamb curry', vegetarian: false, spicy: true, image: '/roganjosh.jpg' },
        { name: 'Fish Curry', price: 190, description: 'Spicy fish curry', vegetarian: false, spicy: true, image: '/fishcurry.jpg' },
  ],
  'Desserts': [
    { name: 'Gulab Jamun', price: 40, description: 'Deep-fried milk balls in syrup', vegetarian: true, spicy: false, image: '/gulabjamun.jpg' },
    { name: 'Rasmalai', price: 50, description: 'Cheese patties in sweet milk', vegetarian: true, spicy: false, image: '/rasmalai.jpg' },
    { name: 'Jalebi', price: 30, description: 'Crispy fried batter in syrup', vegetarian: true, spicy: false, image: '/jalebi.jpg' },
    { name: 'Kulfi', price: 55, description: 'Indian ice cream', vegetarian: true, spicy: false, image: '/kulfi.jpg' },
    { name: 'Ladoo', price: 35, description: 'Sweet balls made from flour, sugar and ghee', vegetarian: true, spicy: false, image: '/ladoo.jpg' },
    { name: 'Barfi', price: 45, description: 'Milk-based sweet', vegetarian: true, spicy: false, image: '/barfi.jpg' },
    { name: 'Gajar ka Halwa', price: 60, description: 'Carrot-based sweet dessert', vegetarian: true, spicy: false, image: '/gajarkahalwa.jpg' },
    { name: 'Moong Dal Halwa', price: 65, description: 'Lentil-based sweet dessert', vegetarian: true, spicy: false, image: '/moongdalhalwa.jpg' },
    { name: 'Kheer', price: 55, description: 'Rice pudding', vegetarian: true, spicy: false, image: '/kheer.jpg' },
    { name: 'Faluda', price: 70, description: 'Iced dessert with vermicelli', vegetarian: true, spicy: false, image: '/faluda.jpg' },
  ],
  'Ice Creams': [
    { name: 'Vanilla Ice Cream', price: 60, description: 'Classic vanilla ice cream', vegetarian: true, spicy: false, image: '/vanillaicecream.jpg' },
    { name: 'Chocolate Ice Cream', price: 60, description: 'Rich chocolate ice cream', vegetarian: true, spicy: false, image: '/chocolateicecream.jpg' },
    { name: 'Strawberry Ice Cream', price: 65, description: 'Refreshing strawberry ice cream', vegetarian: true, spicy: false, image: '/strawberryicecream.jpg' },
    { name: 'Butter Pecan Ice Cream', price: 70, description: 'Creamy butter pecan ice cream', vegetarian: true, spicy: false, image: '/butterpecanicecream.jpg' },
    { name: 'Mango Ice Cream', price: 75, description: 'Tropical mango ice cream', vegetarian: true, spicy: false, image: '/mangoicecream.jpg' },
    { name: 'Pistachio Ice Cream', price: 80, description: 'Nutty pistachio ice cream', vegetarian: true, spicy: false, image: '/pistachioicecream.jpg' },
    { name: 'Coffee Ice Cream', price: 70, description: 'Invigorating coffee ice cream', vegetarian: true, spicy: false, image: '/coffeeicecream.jpg' },
    { name: 'Rocky Road Ice Cream', price: 75, description: 'Chocolate ice cream with nuts and marshmallows', vegetarian: true, spicy: false, image: '/rockyroadicecream.jpg' },
    { name: 'Mint Chocolate Chip Ice Cream', price: 65, description: 'Mint flavored ice cream with chocolate chips', vegetarian: true, spicy: false, image: '/mintchocolatechipicecream.jpg' },
    { name: 'Cookies and Cream Ice Cream', price: 70, description: 'Vanilla ice cream with crushed cookies', vegetarian: true, spicy: false, image: '/cookiesandcreamicecream.jpg' },
  ],
  'Fresh Juices': [
    { name: 'Orange Juice', price: 40, description: 'Freshly squeezed orange juice', vegetarian: true, spicy: false, image: '/orangejuice.jpg' },
    { name: 'Apple Juice', price: 40, description: 'Freshly squeezed apple juice', vegetarian: true, spicy: false, image: '/applejuice.jpg' },
    { name: 'Mango Juice', price: 45, description: 'Freshly squeezed mango juice', vegetarian: true, spicy: false, image: '/mangojuice.jpg' },
    { name: 'Pineapple Juice', price: 45, description: 'Freshly squeezed pineapple juice', vegetarian: true, spicy: false, image: '/pineapplejuice.jpg' },
    { name: 'Watermelon Juice', price: 35, description: 'Freshly squeezed watermelon juice', vegetarian: true, spicy: false, image: '/watermelonjuice.jpg' },
    { name: 'Lemon Juice', price: 30, description: 'Freshly squeezed lemon juice', vegetarian: true, spicy: false, image: '/lemonjuice.jpg' },
    { name: 'Grape Juice', price: 40, description: 'Freshly squeezed grape juice', vegetarian: true, spicy: false, image: '/grapejuice.jpg' },
    { name: 'Cranberry Juice', price: 45, description: 'Freshly squeezed cranberry juice', vegetarian: true, spicy: false, image: '/cranberryjuice.jpg' },
     { name: 'Pomegranate Juice', price: 50, description: 'Freshly squeezed pomegranate juice', vegetarian: true, spicy: false, image: '/pomegranatejuice.jpg' },
    { name: 'Sugarcane Juice', price: 35, description: 'Freshly squeezed sugarcane juice', vegetarian: true, spicy: false, image: '/sugarcanejuice.jpg' },
  ],
};

export default function Home() {
  const [selectedItems, setSelectedItems] = useState<{ [key: string]: { price: number; quantity: number } }>({});
  const [takeAway, setTakeAway] = useState(false);
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("all");

  const setItemQuantity = (itemName: string, quantity: number, price: number) => {
    setSelectedItems(prev => {
      if (quantity <= 0) {
        const { [itemName]: removed, ...rest } = prev;
        return rest;
      } else {
        return { ...prev, [itemName]: { price: price, quantity: quantity } };
      }
    });
  };


  const toggleItem = (itemName: string, price: number) => {
      setSelectedItems(prev => {
          if (prev[itemName]) {
              // Item is already selected, remove it
              const { [itemName]: removed, ...rest } = prev;
              return rest;
          } else {
              // Item is not selected, add it with a default quantity of 1
              return { ...prev, [itemName]: { price: price, quantity: 1 } };
          }
      });
  };

  const calculateTotal = () => {
    let total = 0;
    for (const itemName in selectedItems) {
      if (selectedItems.hasOwnProperty(itemName)) {
        total += selectedItems[itemName].price * selectedItems[itemName].quantity;
      }
    }
    return total;
  };

  const total = calculateTotal();

  const handlePlaceOrder = () => {
    // Store the total and selected items in localStorage
    localStorage.setItem('billAmount', total.toString());
    localStorage.setItem('orderedItems', JSON.stringify(selectedItems));
    localStorage.setItem('takeAway', takeAway.toString());

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
                <TabsTrigger value="veg" onClick={() => setActiveTab("veg")} className="hover:bg-green-200">Veg</TabsTrigger>
                <TabsTrigger value="nonveg" onClick={() => setActiveTab("nonveg")} className="hover:bg-red-200">Non-Veg</TabsTrigger>
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
                        <CardTitle className="text-lg hover:text-red-500 flex items-center justify-between">
                          {item.name}
                           {item.special && <Badge variant="secondary">Special</Badge>}
                        </CardTitle>
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
                         {selectedItems[item.name] && (
                            <div className="flex items-center mt-2">
                                <label htmlFor={`${item.name}-quantity`} className="mr-2 text-sm font-medium">Quantity:</label>
                                <Input
                                    type="number"
                                    id={`${item.name}-quantity`}
                                    min="1"
                                    defaultValue="1"
                                    className="w-20 text-sm"
                                    onChange={(e) => {
                                        const quantity = parseInt(e.target.value);
                                        setItemQuantity(item.name, quantity, item.price);
                                    }}
                                />
                            </div>
                        )}
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
                        <CardTitle className="text-lg hover:text-red-500 flex items-center justify-between">
                          {item.name}
                           {item.special && <Badge variant="secondary">Special</Badge>}
                        </CardTitle>
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
                         {selectedItems[item.name] && (
                            <div className="flex items-center mt-2">
                                <label htmlFor={`${item.name}-quantity`} className="mr-2 text-sm font-medium">Quantity:</label>
                                <Input
                                    type="number"
                                    id={`${item.name}-quantity`}
                                    min="1"
                                    defaultValue="1"
                                    className="w-20 text-sm"
                                    onChange={(e) => {
                                        const quantity = parseInt(e.target.value);
                                        setItemQuantity(item.name, quantity, item.price);
                                    }}
                                />
                            </div>
                        )}
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
                        <CardTitle className="text-lg hover:text-red-500 flex items-center justify-between">
                          {item.name}
                        </CardTitle>
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
                         {selectedItems[item.name] && (
                            <div className="flex items-center mt-2">
                                <label htmlFor={`${item.name}-quantity`} className="mr-2 text-sm font-medium">Quantity:</label>
                                <Input
                                    type="number"
                                    id={`${item.name}-quantity`}
                                    min="1"
                                    defaultValue="1"
                                    className="w-20 text-sm"
                                    onChange={(e) => {
                                        const quantity = parseInt(e.target.value);
                                        setItemQuantity(item.name, quantity, item.price);
                                    }}
                                />
                            </div>
                        )}
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            )}
             {filteredMenu.find(([category]) => category === 'Ice Creams') && (
              <div key="Ice Creams" className="mb-4">
                <h2 className="text-xl font-semibold mb-2">Ice Creams</h2>
                <Separator className="mb-2" />
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {menu['Ice Creams'].filter(item => {
                    if (activeTab === "veg") {
                      return item.vegetarian;
                    } else if (activeTab === "nonveg") {
                      return !item.vegetarian;
                    }
                    return true;
                  }).map(item => (
                    <Card key={item.name} className="shadow-md">
                      <CardHeader>
                        <CardTitle className="text-lg hover:text-red-500 flex items-center justify-between">
                          {item.name}
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <Avatar className="mb-4 h-24 w-24">
                           <AvatarImage src={item.image || "https://picsum.photos/200/150?random=4"} alt={item.name} />
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
                         {selectedItems[item.name] && (
                            <div className="flex items-center mt-2">
                                <label htmlFor={`${item.name}-quantity`} className="mr-2 text-sm font-medium">Quantity:</label>
                                <Input
                                    type="number"
                                    id={`${item.name}-quantity`}
                                    min="1"
                                    defaultValue="1"
                                    className="w-20 text-sm"
                                    onChange={(e) => {
                                        const quantity = parseInt(e.target.value);
                                        setItemQuantity(item.name, quantity, item.price);
                                    }}
                                />
                            </div>
                        )}
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            )}

            {filteredMenu.find(([category]) => category === 'Fresh Juices') && (
              <div key="Fresh Juices" className="mb-4">
                <h2 className="text-xl font-semibold mb-2">Fresh Juices</h2>
                <Separator className="mb-2" />
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {menu['Fresh Juices'].filter(item => {
                    if (activeTab === "veg") {
                      return item.vegetarian;
                    } else if (activeTab === "nonveg") {
                      return !item.vegetarian;
                    }
                    return true;
                  }).map(item => (
                    <Card key={item.name} className="shadow-md">
                      <CardHeader>
                        <CardTitle className="text-lg hover:text-red-500 flex items-center justify-between">
                          {item.name}
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <Avatar className="mb-4 h-24 w-24">
                           <AvatarImage src={item.image || "https://picsum.photos/200/150?random=5"} alt={item.name} />
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
                         {selectedItems[item.name] && (
                            <div className="flex items-center mt-2">
                                <label htmlFor={`${item.name}-quantity`} className="mr-2 text-sm font-medium">Quantity:</label>
                                <Input
                                    type="number"
                                    id={`${item.name}-quantity`}
                                    min="1"
                                    defaultValue="1"
                                    className="w-20 text-sm"
                                    onChange={(e) => {
                                        const quantity = parseInt(e.target.value);
                                        setItemQuantity(item.name, quantity, item.price);
                                    }}
                                />
                            </div>
                        )}
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
              <Checkbox id="take-away" checked={takeAway} onCheckedChange={(checked) => {
                  setTakeAway(checked);
                   localStorage.setItem('takeAway', checked.toString()); // Store takeAway in localStorage

              }} />
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
