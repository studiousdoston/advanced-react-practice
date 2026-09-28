import React from "react";
import { Josefin_Sans } from "next/font/google";

import "./_styles/globals.css";
import Header from "./_components/Header";

const josefinFont = Josefin_Sans({
  subsets: ["latin"],
  display: "swap",
});

export const metadata = {
  title: {
    template: "%s / The Wild Oasis",
    default: "Welcome / The Wild Oasis",
  },
  description:
    "Luxurious cabin hotel, located in the heart of Dagestan Mountains surrounded by beautiful forests and green pastures",
};

type Props = {
  children: React.ReactNode;
};

export default function RootLayout({ children }: Props) {
  return (
    <html lang="en">
      <body
        className={`${josefinFont.className} bg-primary-950 text-primary-100 min-h-screen flex flex-col antialiased `}
      >
        <Header />
        <div className="flex-1 px-8 py-12 ">
          <main className="max-w-7xl   mx-auto ">{children}</main>
        </div>
      </body>
    </html>
  );
}
