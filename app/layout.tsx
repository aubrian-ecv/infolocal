import { Providers } from "@/components/features/providers";
import type { Metadata } from "next";
import { Toaster } from "sonner";
import "./globals.css";

export const metadata: Metadata = {
  title: {
      default: "InfoLocal+",
      template: "InfoLocal+ | %s"
  },
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
  modal
}: Readonly<{
  children: React.ReactNode;
  modal: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <body>
        <Providers>
          {children}
          {modal}
          <div id="modal-root"></div>
          <Toaster />
        </Providers>
      </body>
    </html>
  );
}
