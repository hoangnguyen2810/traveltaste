import "./globals.css";
import Providers from "./providers";
import { Plus_Jakarta_Sans } from "next/font/google";

export const metadata = {
  title: "TravelTaste",
  description: "Travel & Food Website",
};

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin", "vietnamese"],
  weight: ["400", "500", "600", "700"],
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="vi" className={jakarta.className}>
      <head>
        {/* FONT MATERIAL ICONS (GIỐNG HTML GỐC) */}
        <link
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1"
          rel="stylesheet"
        />

        {/* BASE STYLE GIỐNG HTML BẠN GỬI */}
        <style>{`
          body {
            background-color: #f9f9fc;
          }

          .material-symbols-outlined {
            font-variation-settings:
              'FILL' 0,
              'wght' 400,
              'GRAD' 0,
              'opsz' 24;
          }
        `}</style>
      </head>

      <body className="min-h-screen text-on-surface antialiased">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
