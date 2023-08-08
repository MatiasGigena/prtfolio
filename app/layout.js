import "./globals.css";
import { Poppins } from "next/font/google";
import NavBar from "./components/nav";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

export const metadata = {
  title: "Matias Gigena",
  description: "Mi portafolio de desarrollo web",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="bg-black">
      <body className={poppins.className}>
          <NavBar/>
          {children}
      </body>
    </html>
  );
}
