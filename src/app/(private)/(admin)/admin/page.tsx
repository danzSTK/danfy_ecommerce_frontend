/* eslint-disable @typescript-eslint/no-explicit-any */
/* export const metadata: Metadata = {
  title: "admin page",
}; */
"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useAppSelector } from "@/lib/redux/hooks";
import { Package, ShoppingCart, Users, DollarSign } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

interface DashboardStats {
  totalProducts: number;
  totalOrders: number;
  totalUsers: number;
  totalRevenue: number;
  recentOrders: any[];
  topProducts: any[];
}

export default function AdminDashboard() {
  const [stats] = useState<DashboardStats | null>(null);
  const { user } = useAppSelector((state) => state.auth);

  console.log("usuario no dashboard", user);

  const statCards = [
    {
      title: "Total de Produtos",
      value: stats?.totalProducts || 0,
      icon: Package,
      color: "text-blue-600",
      bgColor: "bg-blue-100",
    },
    {
      title: "Pedidos",
      value: stats?.totalOrders || 0,
      icon: ShoppingCart,
      color: "text-green-600",
      bgColor: "bg-green-100",
    },
    {
      title: "Usuários",
      value: stats?.totalUsers || 0,
      icon: Users,
      color: "text-purple-600",
      bgColor: "bg-purple-100",
    },
    {
      title: "Receita",
      value: `R$ ${(stats?.totalRevenue || 0).toLocaleString("pt-BR", {
        minimumFractionDigits: 2,
      })}`,
      icon: DollarSign,
      color: "text-yellow-600",
      bgColor: "bg-yellow-100",
    },
  ];
  return (
    <div className="lg:ml-64 p-6">
      <div className="space-y-6">
        <div className="">
          <h1 className="text-3xl font-bold text-foreground ">Dashboard</h1>
          <p className="text-muted-foreground">Visão geral do seu e-commerce</p>
        </div>

        {/* stats cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {statCards.map((stat) => {
            const Icon = stat.icon;

            return (
              <Card key={stat.title}>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">
                        {stat.title}
                      </p>
                      <p className="text-2xl font-bold text-foreground">
                        {stat.value}
                      </p>
                    </div>

                    <div className={`p-3 rounded-full ${stat.bgColor}`}>
                      <Icon className={`h0-6 w-6 ${stat.color}`} />
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Pedidos Recentes</CardTitle>
              <CardDescription>Últimos pedidos realizados</CardDescription>
            </CardHeader>
            <CardContent>
              {stats?.recentOrders.length ? (
                <div className="space-y-4">
                  {stats.recentOrders.slice(0, 5).map((order) => (
                    <div
                      key={order.id}
                      className="flex items-center justify-between p-3 rounded-lg"
                    >
                      <div>
                        <p className="font-medium">#{order.orderNumber}</p>
                        <p className="text-sm text-muted-foreground">
                          {order.customer.name}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="font-medium">
                          R$ {order.total.toFixed(2)}
                        </p>
                        <p
                          className={`text-xs px-2 py-1 rounded-full ${
                            order.status === "delivered"
                              ? "bg-green-100 text-green-800"
                              : order.status === "processing"
                              ? "bg-blue-100 text-blue-800"
                              : "bg-yellow-100 text-yellow-800"
                          }`}
                        >
                          {order.status}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-muted-foreground text-center py-4">
                  Nenhum pedido encontrado
                </p>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Produtos Populares</CardTitle>
              <CardDescription>Produtos mais vendidos</CardDescription>
            </CardHeader>
            <CardContent>
              {stats?.topProducts.length ? (
                <div className="space-y-4">
                  {stats.topProducts.slice(0, 5).map((product) => (
                    <div
                      key={product.id}
                      className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                    >
                      <div className="flex items-center">
                        <Image
                          src={product.image}
                          alt={product.name}
                          className="w-10 h-10 rounded-lg object-cover mr-3"
                        />
                        <div>
                          <p className="font-medium">{product.name}</p>
                          <p className="text-sm text-gray-600">
                            SKU: {product.sku}
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-medium">{product.sold} vendidos</p>
                        <p className="text-sm text-gray-600">
                          R$ {product.price.toFixed(2)}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-muted-foreground text-center py-4">
                  Nenhum pedido encontrado
                </p>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
