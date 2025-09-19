"use client"
import Link from "next/link"
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu"

import Image from "next/image"
import { signOut, useSession } from "next-auth/react"
import React, { useContext } from "react"
import { CountContext } from "../../../CountProvider"
import { LogOutIcon, ShoppingCartIcon, UserIcon } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger, } from "../../../../image/components/ui/dropdown-menu"

export default function Navbar() {
  const { data, status  } = useSession()
  const context = useContext(CountContext)
  if (!context) throw new Error("CountContext must be used within a CountProvider")
  const { count } = context
  

  const menuItems: { path: string, content: string, protected:boolean }[] = [

    { path: "/products", content: "Products",  protected:false  },
    { path: "/category", content: "Category",  protected:false  },
    { path: "/brands", content: "Brands" , protected:false},
    { path: "/wishlist", content: "Wishlist" ,  protected:false },
    { path: "/allorders", content: "Order" ,  protected:true},
    // { path: "/cart", content: "Cart" ,  protected:true },
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
    <NavigationMenu viewport={false} className="max-w-full p-3 shadow-md justify-between bg-gray-200  ">

    {/* Logo */}
<NavigationMenuList>
  <NavigationMenuItem>
    <Link href={"/"} className="flex items-center gap-2 px-2 py-1 rounded-md hover:text-black">
      <Image
        src="/images/Logo.png"
        alt="Logo"
        width={40}
        height={40}
        className="object-contain"
      />
      <h1 className="text-2xl font-bold tracking-wide">
        Shop <span className="text-blue-600">Mart</span>
      </h1>
    </Link>
  </NavigationMenuItem>
</NavigationMenuList>



      {/* Menu Items */}
      <NavigationMenuList>
       {menuItems.map((item) => (
  item.protected ? (
    status === "authenticated" && (
      <NavigationMenuItem key={item.path}>
        <NavigationMenuLink
          asChild
         
        >
          <Link href={item.path}>{item.content}</Link>
        </NavigationMenuLink>
      </NavigationMenuItem>
    )
  ) : (
    <NavigationMenuItem key={item.path}>
      <NavigationMenuLink
        asChild
       
      >
        <Link href={item.path}>{item.content}</Link>
      </NavigationMenuLink>
    </NavigationMenuItem>
  )
))}
      </NavigationMenuList>

      {/* User icon  &  Cart  */}
      <div className="flex items-center gap-1 mr-10">
  {/* icon user */}
  <NavigationMenuList className="list-none">
    <DropdownMenu>
      <DropdownMenuTrigger className="outline-0 rounded-full  p-2 hover:bg-gray-400 cursor-pointer transition">
        <UserIcon className="w-6 h-6 text-black" />
      </DropdownMenuTrigger>

      <DropdownMenuContent>
        {/* name & signOut */}
        {status === "authenticated" && (
          <>
            <DropdownMenuLabel>
              Hello {data?.user?.name}
            </DropdownMenuLabel>

            <DropdownMenuSeparator />

            {/* sign out */}
            <DropdownMenuItem
              onClick={logOut}
              className="cursor-pointer text-red-600 focus:text-red-700 border-0 flex items-center gap-2"
            >
              <LogOutIcon className="w-4 h-4" />
              Sign out
            </DropdownMenuItem>
          </>
        )}

        {/* Menu Auth */}
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
  </NavigationMenuList>

 {/* cart static */}
{status === "authenticated" && (
  <NavigationMenuItem className="list-none">
    <NavigationMenuLink
      asChild
      className="!bg-transparent hover:!bg-gray-400 rounded-full hover:!text-black focus:!bg-gray-500"
    >
      <Link href="/cart" className="relative text-black hover:text-black focus:text-black ">
        <ShoppingCartIcon className="size-6" />
        <span className="absolute -top-2 -right-0.5 bg-black text-white w-5 h-5 rounded-full flex justify-center items-center">
          {count}
        </span>
      </Link>
    </NavigationMenuLink>
  </NavigationMenuItem>
)}

      </div>

    </NavigationMenu>
  )
}
