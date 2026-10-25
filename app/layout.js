import "./globals.css";
import Header from '@/components/Header'
import SessionProvider from '@/components/SessionProvider'

export const metadata = {
  title: "BLOG",
  description: "A minimalist blog",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="min-h-screen flex flex-col">
        <SessionProvider>
          <Header />
          <main className="flex-1">
            {children}
          </main>
        </SessionProvider>
      </body>
    </html>
  );
}
