import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { MantineProvider, createTheme } from "@mantine/core";
import '@mantine/core/styles.css';
import '@mantine/carousel/styles.css';
import NavBar from "@/components/navigation/NavBar";
import {Container} from "@mantine/core";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Clothing For You!",
  description: "A fake clothing store made as a personal project by Zoe Fisk.",
};

// Define a custom theme
const customTheme = createTheme({
  colors: {
    brand: ["#f0f", "#e0e", "#d0d", "#c0c", "#b0b", "#a0a", "#909", "#808", "#707", "#606"],
  },
  primaryColor: "brand",
  fontFamily: "var(--font-geist-sans)",
  headings: { fontFamily: "var(--font-geist-mono)" },
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <MantineProvider theme={customTheme}>
          <NavBar/>
          <Container style={{ margin: "20px auto", maxWidth: "90%", padding: "0 0" }}>
            {children}
          </Container>
        </MantineProvider>
      </body>
    </html>
  );
}