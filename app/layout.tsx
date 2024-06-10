import "./globals.css";
import type { Metadata } from "next";
import { Nunito } from "next/font/google";
import { ClerkProvider, auth } from "@clerk/nextjs";
import NextTopLoader from "nextjs-toploader";
import Sidebar from "@/app/components/Sidebar/Sidebar";
import ContextProvider from "./providers/ContextProvider";
import GlobalStylesProvider from "./providers/GlobalStylesProvider";

const nunito = Nunito({ subsets: ["latin"], weight: ["300", "400", "500", "600", "700", "800", "900"] })

export const metadata: Metadata = {
  title: "Task Manager",
  description: "Created using Next.js, Typescript, Prisma & MongoDB",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {

  const { userId } = auth();

  return (
    <ClerkProvider
      appearance={{
        variables: {
          colorText: "#FFF",
          colorPrimary: "#0E78F9",
          colorBackground: "#212121",
          colorInputBackground: "#181818",
          colorInputText: "#FFF",
        },
      }}
    >
      <html lang="en">
        <body className={nunito.className}>
          <NextTopLoader
            height={2}
            color="#27AE60"
            easing="cubic-bezier(0.53,0.21,0,1)"
            showSpinner={true}
          />
          <ContextProvider>
            <GlobalStylesProvider>
              {userId && <Sidebar />}
              <div className="w-full">
                {children}
              </div>
            </GlobalStylesProvider>
          </ContextProvider>
          <script src="https://kit.fontawesome.com/2d3ee0c5cd.js"></script>
        </body>
      </html>
    </ClerkProvider>
  )
}