"use client";
import { useState } from "react";
import { Button } from "~/components/ui/button";

export default function PassBuyPage() {
  const [customQuantity, setCustomQuantity] = useState<number | string>("");

  const calculatePricePerPass = (quantity: number) => {
    if (quantity < 10) return 3;
    if (quantity <= 50) return 2.4;
    return 2;
  };

  const parsedQuantity = Number(customQuantity) || 0;
  const pricePerPass = calculatePricePerPass(parsedQuantity);
  const estimatedPrice = parsedQuantity * pricePerPass;

  const handleQuantityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/^0+(?=\d)/, "");
    setCustomQuantity(value);
  };

  const presetOptions = [
    { id: 1, qty: 100, price: 200 },
    { id: 2, qty: 50, price: 120 },
    { id: 3, qty: 25, price: 60 },
    { id: 4, qty: 10, price: 24 },
  ];

  const handlePay = async (id: number, quantity: number, price: number) => {
    console.log("Pay", { id, quantity, price });
  };

  return (
    <div className="mx-auto max-w-4xl p-6">
      <h1 className="mb-5 flex items-center justify-center text-xl font-semibold">
        Comprar Cuponeras
      </h1>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <div className="grid grid-cols-2 gap-3">
          {presetOptions.map((opt) => (
            <Button
              key={opt.id}
              className="h-16 text-sm leading-tight font-medium"
              onClick={() => handlePay(opt.id, opt.qty, opt.price)}
            >
              {opt.qty} cuponeras — ${opt.price}
            </Button>
          ))}
        </div>

        <div className="flex flex-col justify-center rounded-lg border p-5 shadow-sm">
          <label className="mb-2 text-base font-medium">
            Cantidad personalizada
          </label>
          <input
            type="number"
            placeholder="Ej: 15"
            className="mb-2 w-full rounded border p-2 text-center text-base"
            value={customQuantity}
            onChange={handleQuantityChange}
            min={0}
          />
          <p className="mb-3 text-xs text-gray-600">
            Precio estimado: ${estimatedPrice.toFixed(2)} ( $
            {pricePerPass.toFixed(2)} por cuponera)
          </p>
          <Button
            className="text-sm font-medium"
            disabled={parsedQuantity <= 0}
            onClick={() => handlePay(0, parsedQuantity, estimatedPrice)}
          >
            Comprar
          </Button>
        </div>
      </div>
    </div>
  );
}
