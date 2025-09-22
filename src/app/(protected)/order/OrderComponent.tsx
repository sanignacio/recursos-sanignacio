"use client";

import { useState } from "react";
import { Laptop, Minus, Plus } from "lucide-react";
import { Card, CardContent } from "~/components/ui/card";
import { Button } from "~/components/ui/button";

export default function OrderComponent() {
  const [quantity, setQuantity] = useState(0);

  const decrease = () => setQuantity((q) => Math.max(0, q - 1));
  const increase = () => setQuantity((q) => q + 1);

  const handleOrder = () => {
    alert(`Has pedido ${quantity} laptops`);
  };

  return (
    <div className="flex flex-col items-center space-y-6">
      <h2 className="flex items-center justify-center text-xl font-bold tracking-tight md:text-3xl">
        <Laptop className="mr-2 h-auto w-6 md:w-8" />
        Encargar laptops
      </h2>

      <Card className="min-w-[500px]">
        <CardContent>
          <div className="flex items-center justify-center space-x-6 py-6">
            <Minus onClick={decrease} className="h-auto w-8 cursor-pointer" />
            <div className="flex flex-col items-center">
              <Laptop className="h-auto w-16 md:w-20" />
              <span className="mt-2 text-lg font-semibold">{quantity}</span>
            </div>
            <Plus onClick={increase} className="h-auto w-8 cursor-pointer" />
          </div>
          <div className="flex justify-center">
            <Button
              className="bg-blue-500 text-white hover:bg-blue-600"
              onClick={handleOrder}
              disabled={quantity === 0}
            >
              Pedir
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
