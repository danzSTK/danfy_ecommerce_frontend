import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "login admin",
};

export default function AdminPage() {
  return (
    <div className="container h-screen">
      <div className="flex items-center justify-center h-full">
        <Card className="w-full max-w-sm md:max-w-md">
          <CardHeader className="text-center">
            <CardTitle className="font-bold text-2xl">Danfy Admin</CardTitle>
            <CardDescription>
              Faça login para acessar o painel administrativo
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form>
              <div className="flex flex-col gap-6">
                <div className="grid gap-2">
                  <label htmlFor="email">Email</label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="danfy@exemple.com"
                    required
                  />
                </div>
                <div className="grid gap-2">
                  <div className="flex items-center">
                    <label htmlFor="password">Password</label>
                    <a
                      href="#"
                      className="ml-auto inline-block text-sm underline-offset-4 hover:underline"
                    >
                      Forgot your password?
                    </a>
                  </div>
                  <Input
                    type="password"
                    id="password"
                    placeholder="*******"
                    required
                  />
                </div>
              </div>
            </form>
          </CardContent>
          <CardFooter className="flex-col gap-2">
            <Button type="submit" className="w-full">
              Login
            </Button>
            <Button variant="outline" className="w-full">
              Login with Google
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}