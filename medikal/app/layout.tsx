
import Header from "@/app/admin/Header";
import "./globals.css";
import Footer from "@/Footer";


export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang='en'>
      <body >
      
        {children}
      
      </body>
    </html>
  );
}
