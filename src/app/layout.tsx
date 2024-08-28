import Header from "./components/Header";
import Footer from "./components/Footer";
import "../../styles/globals.css"; // Ensure your global styles are imported
import { ThemeProvider } from "../app/components/ThemeContext"; // Adjust path as needed
import { AuthProvider } from "../../contexts/AuthContext";

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
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css"
        />
      </head>
      <body>
        <AuthProvider>
          <ThemeProvider>
            <header className="flex-none">
              <Header />
            </header>
            <div className="flex flex-col h-screen">
              <main className="flex-grow relative h-[100%]">{children}</main>
            </div>
            {/* <footer className="flex flex-none">
              <Footer />
            </footer> */}
            {/* <TestComponent /> */}
          </ThemeProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
