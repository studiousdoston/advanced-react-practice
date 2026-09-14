import React from "react";
import Navigation from "./components/Navigation";
import Logo from "./components/Logo";

export const metadata = {
  title: "The Wild Oasis",
};

type Props = {
  children: React.ReactNode;
};

export default function RootLayout({ children }: Props) {
  return (
    <html lang="en">
      <body>
        <header>
          <Logo />
        </header>
        <Navigation />
        <main>{children}</main>
        <footer>Copyright by The Wild Oasis</footer>
      </body>
    </html>
  );
}
