import Header from "./components/Header";
import Footer from "./components/Footer";
import "../../styles/globals.css"; // Ensure your global styles are imported
import { ThemeProvider } from "../app/components/ThemeContext"; // Adjust path as needed

export const metadata = {
  title: "Your App Title",
  description: "Description of your app",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        {/* Google Fonts */}
        <link
          href="https://fonts.googleapis.com/css2?family=New+Amsterdam:wght@400;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <ThemeProvider>
          <header className="flex-none h-[15%]">
            <Header />
          </header>
          <main>{children}</main>
          <footer className="flex-none h-[5%]">
            <Footer />
          </footer>
        </ThemeProvider>
      </body>
    </html>
  );
}
