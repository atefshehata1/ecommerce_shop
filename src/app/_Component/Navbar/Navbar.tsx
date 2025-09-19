"use client"
import Link from "next/link"
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu"

import Image from "next/image"
import { signOut, useSession } from "next-auth/react"
import React, { useContext, useState } from "react"
import { CountContext } from "../../../CountProvider"
import { LogOutIcon, MenuIcon, ShoppingCartIcon, UserIcon, XIcon } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../../../../image/components/ui/dropdown-menu"

export default function Navbar() {
  const { data, status } = useSession()
  const context = useContext(CountContext)
  if (!context) throw new Error("CountContext must be used within a CountProvider")
  const { count } = context

  const [isOpen, setIsOpen] = useState(false)

  const menuItems: { path: string; content: string; protected: boolean }[] = [
    { path: "/products", content: "Products", protected: false },
    { path: "/category", content: "Category", protected: false },
    { path: "/brands", content: "Brands", protected: false },
    { path: "/wishlist", content: "Wishlist", protected: false },
    { path: "/allorders", content: "Order", protected: true },
  ]

  const menuAuthItems: { path: string; content: string }[] = [
    { path: "/register", content: "Register" },
    { path: "/login", content: "Login" },
  ]

  function logOut() {
    signOut({
      callbackUrl: "/login",
    })
  }

  return (
    <nav className="bg-gray-200 shadow-md p-3 sticky top-0 z-50">
      <div className="flex justify-between items-center max-w-7xl mx-auto">
        {/* Logo */}
        <Link href={"/"} className="flex items-center gap-2">
          <Image
            src="/images/Logo.png"
            alt="Logo"
            width={40}
            height={40}
            className="object-contain"
          />
          <h1 className="text-xl sm:text-2xl font-bold">
            Shop <span className="text-blue-600">Mart</span>
          </h1>
        </Link>

        {/* Desktop Menu */}
        <NavigationMenu className="hidden md:flex gap-4">
          <NavigationMenuList>
            {menuItems.map((item) =>
              item.protected ? (
                status === "authenticated" && (
                  <NavigationMenuItem key={item.path}>
                    <NavigationMenuLink asChild>
                      <Link href={item.path}>{item.content}</Link>
                    </NavigationMenuLink>
                  </NavigationMenuItem>
                )
              ) : (
                <NavigationMenuItem key={item.path}>
                  <NavigationMenuLink asChild>
                    <Link href={item.path}>{item.content}</Link>
                  </NavigationMenuLink>
                </NavigationMenuItem>
              )
            )}
          </NavigationMenuList>
        </NavigationMenu>

        {/* Right icons */}
        <div className="flex items-center gap-3">
          {/* user menu */}
          <DropdownMenu>
            <DropdownMenuTrigger className="outline-0 rounded-full p-2 hover:bg-gray-300 cursor-pointer transition">
              <UserIcon className="w-6 h-6 text-black" />
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              {status === "authenticated" && (
                <>
                  <DropdownMenuLabel>Hello {data?.user?.name}</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem
                    onClick={logOut}
                    className="cursor-pointer text-red-600 flex items-center gap-2"
                  >
                    <LogOutIcon className="w-4 h-4" /> Sign out
                  </DropdownMenuItem>
                </>
              )}
              {status === "unauthenticated" && (
                <>
                  {menuAuthItems.map((item, index) => (
                    <React.Fragment key={item.path}>
                      <DropdownMenuItem asChild>
                        <Link
                          href={item.path}
                          className="w-full block px-2 py-1 hover:bg-accent rounded-sm"
                        >
                          {item.content}
                        </Link>
                      </DropdownMenuItem>
                      {index < menuAuthItems.length - 1 && <DropdownMenuSeparator />}
                    </React.Fragment>
                  ))}
                </>
              )}
            </DropdownMenuContent>
          </DropdownMenu>

          {/* cart */}
          {status === "authenticated" && (
            <Link href="/cart" className="relative">
              <ShoppingCartIcon className="w-6 h-6" />
              <span className="absolute -top-2 -right-2 bg-black text-white text-xs w-5 h-5 rounded-full flex justify-center items-center">
                {count}
              </span>
            </Link>
          )}

          {/* mobile menu button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 rounded hover:bg-gray-300"
          >
            {isOpen ? <XIcon className="w-6 h-6" /> : <MenuIcon className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden mt-3 bg-gray-100 rounded-md shadow-md p-3 space-y-2">
          {menuItems.map((item) =>
            item.protected ? (
              status === "authenticated" && (
                <Link
                  key={item.path}
                  href={item.path}
                  className="block px-3 py-2 rounded hover:bg-gray-200"
                >
                  {item.content}
                </Link>
              )
            ) : (
              <Link
                key={item.path}
                href={item.path}
                className="block px-3 py-2 rounded hover:bg-gray-200"
              >
                {item.content}
              </Link>
            )
          )}
        </div>
      )}
    </nav>
  )
}
