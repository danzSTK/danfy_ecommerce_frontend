import Link from "next/link";
import FooterTitle from "./FooterTitle";
import { Button } from "../ui/button";
import { Facebook, Instagram, Linkedin, Twitter } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-foreground py-14 mt-20 text-background">
      <div className="container">
        <div className="grid grid-cols-1 px-0 md:px-20 gap-y-10 md:gap-y-20 md:grid-cols-2 lg:grid-cols-4">
          <section aria-labelledby="company" className="">
            <FooterTitle id="campany">Empresa</FooterTitle>
            <ul className="flex flex-col gap-2 text-muted-foreground">
              <li>
                <a href="" className="hover:text-secondary transition-colors">
                  Sobre nós
                </a>
              </li>
              <li>
                <Link
                  className="hover:text-secondary transition-colors"
                  href={""}
                >
                  Colaboradores
                </Link>
              </li>
            </ul>
          </section>
          <section aria-labelledby="need-help" className="">
            <FooterTitle id="need-help">Precisa de ajuda?</FooterTitle>
            <ul className="flex flex-col gap-2 text-muted-foreground">
              <li>
                <a href="" className="hover:text-secondary transition-colors">
                  Entrar em contato
                </a>
              </li>
              <li>
                <Link
                  className="hover:text-secondary transition-colors"
                  href={""}
                >
                  FAQ&apos;s
                </Link>
              </li>
            </ul>
          </section>
          <section aria-labelledby="more-info" className="">
            <FooterTitle id="more-info">Mais informações</FooterTitle>
            <ul className="flex flex-col gap-2 text-muted-foreground">
              <li>
                <a href="" className="hover:text-secondary transition-colors">
                  Termos e condições
                </a>
              </li>
              <li>
                <a href="" className="hover:text-secondary transition-colors">
                  Politica de privacidade
                </a>
              </li>
              <li>
                <a href="" className="hover:text-secondary transition-colors">
                  Politica de envio
                </a>
              </li>
            </ul>
          </section>
          <section aria-labelledby="location" className="">
            <FooterTitle id="location">Precisa de ajuda?</FooterTitle>
            <ul className="flex flex-col gap-2 text-muted-foreground">
              <li>
                <p className="hover:text-secondary transition-colors">
                  supportdanfy@gmail.com
                </p>
              </li>
              <li>
                <p className="hover:text-secondary transition-colors">
                  Em algum lugar, 1234 - São Paulo Brasil
                </p>
              </li>
            </ul>
          </section>
          <nav className="lg:col-span-4 flex gap-2.5 list-none">
            <li>
              <Button asChild size="icon" variant="secondary">
                <a
                  href="http://facebook.com"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Facebook fill="oklch(0.2795 0.0368 260.0310)" />
                </a>
              </Button>
            </li>
            <li>
              <Button asChild size="icon" variant="secondary">
                <a
                  href="http://facebook.com"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Instagram />
                </a>
              </Button>
            </li>
            <li>
              <Button asChild size="icon" variant="secondary">
                <a
                  href="http://facebook.com"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Twitter fill="oklch(0.2795 0.0368 260.0310)" />
                </a>
              </Button>
            </li>
            <li>
              <Button asChild size="icon" variant="secondary">
                <a
                  href="http://facebook.com"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Linkedin fill="oklch(0.3729 0.0306 259.7328)" />
                </a>
              </Button>
            </li>
          </nav>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
