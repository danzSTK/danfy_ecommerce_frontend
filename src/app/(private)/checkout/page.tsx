"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { CreditCard, MapPin, Package, User } from "lucide-react";
import Image from "next/image";

const mockCartItems = [
  {
    id: "1",
    name: "Camiseta Nike Sportswear",
    price: 129.99,
    quantity: 1,
    image: "/images/image-card-product.png",
    size: "M",
    color: "Preto",
  },
  {
    id: "2",
    name: "Tênis Adidas Ultraboost",
    price: 799.9,
    quantity: 1,
    image: "/images/image-card-product.png",
    size: "42",
    color: "Branco",
  },
];

export default function CheckoutPage() {
  const subtotal = mockCartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );
  const frete = 25.0;
  const total = subtotal + frete;

  return (
    <div className="container mx-auto py-12 px-4 md:px-6">
      <h1 className="text-3xl font-bold mb-8 text-foreground">
        Finalizar Compra
      </h1>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        {/* Coluna de Informações */}
        <div className="lg:col-span-2 space-y-8">
          {/* Informações de Contato */}
          <Card>
            <CardHeader className="flex flex-row items-center gap-4">
              <User className="w-6 h-6 text-primary" />
              <CardTitle>Informações de Contato</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Daniel Silva - daniel.silva@example.com
              </p>
            </CardContent>
          </Card>

          {/* Endereço de Entrega */}
          <Card>
            <CardHeader className="flex flex-row items-center gap-4">
              <MapPin className="w-6 h-6 text-primary" />
              <CardTitle>Endereço de Entrega</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Rua das Flores, 123, Bairro Jardim, São Paulo - SP, 01234-567
              </p>
              <Button variant="outline" className="mt-4">
                Alterar Endereço
              </Button>
            </CardContent>
          </Card>

          {/* Método de Pagamento */}
          <Card>
            <CardHeader className="flex flex-row items-center gap-4">
              <CreditCard className="w-6 h-6 text-primary" />
              <CardTitle>Método de Pagamento</CardTitle>
            </CardHeader>
            <CardContent>
              {/* Aqui você pode adicionar um formulário para cartão de crédito, pix, etc. */}
              <p className="text-muted-foreground">
                Formulário de pagamento será implementado aqui.
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Coluna do Resumo do Pedido */}
        <div className="lg:col-span-1">
          <Card className="sticky top-24">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Package className="w-6 h-6 text-primary" />
                Resumo do Pedido
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {mockCartItems.map((item) => (
                <div key={item.id} className="flex items-start gap-4">
                  <div className="relative w-20 h-20 rounded-md overflow-hidden">
                    <Image
                      src={item.image}
                      alt={item.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="flex-1">
                    <p className="font-semibold text-foreground">{item.name}</p>
                    <p className="text-sm text-muted-foreground">
                      {item.color} / {item.size}
                    </p>
                    <p className="text-sm font-medium">
                      R$ {item.price.toFixed(2)}
                    </p>
                  </div>
                  <p className="text-sm">x{item.quantity}</p>
                </div>
              ))}
              <Separator />
              <div className="space-y-2">
                <div className="flex justify-between">
                  <p className="text-muted-foreground">Subtotal</p>
                  <p className="font-medium">R$ {subtotal.toFixed(2)}</p>
                </div>
                <div className="flex justify-between">
                  <p className="text-muted-foreground">Frete</p>
                  <p className="font-medium">R$ {frete.toFixed(2)}</p>
                </div>
                <Separator />
                <div className="flex justify-between text-lg font-bold">
                  <p>Total</p>
                  <p>R$ {total.toFixed(2)}</p>
                </div>
              </div>
              <Button className="w-full mt-4" size="lg">
                Confirmar Pedido
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
