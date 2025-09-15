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
import { useContext } from "react"
import { CountContext } from "../../../CountProvider"

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
    <NavigationMenu
      viewport={false}
      className="max-w-full p-4 shadow-2xl justify-between "
    >
      {/* Logo */}
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuLink
            asChild
            className={`${navigationMenuTriggerStyle()} bg-transparent hover:bg-transparent`}
          >
            <Link href={"#"}>
            <Image
            src="/images/freshcart-logo.svg"
            alt="Logo"
            width={150} 
            height={50} 
            className="object-contain"
          />

            </Link>
          </NavigationMenuLink>
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
          className={`${navigationMenuTriggerStyle()} bg-transparent hover:bg-transparent`}
        >
          <Link href={item.path}>{item.content}</Link>
        </NavigationMenuLink>
      </NavigationMenuItem>
    )
  ) : (
    <NavigationMenuItem key={item.path}>
      <NavigationMenuLink
        asChild
        className={`${navigationMenuTriggerStyle()}bg-transparent hover:bg-transparent`}
      >
        <Link href={item.path}>{item.content}</Link>
      </NavigationMenuLink>
    </NavigationMenuItem>
  )
))}
          {/* cart static */}
        { 
           status === "authenticated" &&   <NavigationMenuItem>
          <NavigationMenuLink
            asChild
            className={`${navigationMenuTriggerStyle()} bg-transparent hover:bg-transparent`}
          >
            <Link href='/cart' className="relative">Cart   
            <span className="absolute -top-1 -right-1 bg-black text-white w-5 h-5 rounded-full flex justify-center items-center">
            {count}
            </span>
            </Link>
          </NavigationMenuLink>
        </NavigationMenuItem>

        }

      </NavigationMenuList>







      {/* Auth Section */}
      <NavigationMenuList>
        {status === "loading" && (
          <>
            {/* Skeleton Loading */}
            <NavigationMenuItem>
              <div className="w-24 h-6 bg-gray-800 rounded-md animate-pulse" />
            </NavigationMenuItem>
            <NavigationMenuItem>
              <div className="w-20 h-6 bg-gray-500 rounded-md animate-pulse" />
            </NavigationMenuItem>
          </>
        )}

        {status === "authenticated" && (
          <>
            {/* name */}
            <NavigationMenuItem className="last:list-none">
              <NavigationMenuLink
                asChild
                className={`${navigationMenuTriggerStyle()} bg-transparent hover:bg-transparent`}
              >
                <span>hello {data?.user?.name}</span>
              </NavigationMenuLink>
            </NavigationMenuItem>

            {/* sign out */}
            <NavigationMenuItem className="last:list-none">
              <NavigationMenuLink
                asChild
                className={`${navigationMenuTriggerStyle()}bg-transparent hover:bg-transparent cursor-pointer`}
              >
                <span onClick={logOut}>sign out</span>
              </NavigationMenuLink>
            </NavigationMenuItem>
          </>
        )}

        {status === "unauthenticated" && (
          <>
            {/* Auth Items */}
            {menuAuthItems.map((item) => (
              <NavigationMenuItem key={item.path}>
                <NavigationMenuLink
                  asChild
                  className={`${navigationMenuTriggerStyle()}bg-transparent hover:bg-transparent`}
                >
                  <Link href={item.path}>{item.content}</Link>
                </NavigationMenuLink>
              </NavigationMenuItem>
            ))}
          </>
        )}
      </NavigationMenuList>
    </NavigationMenu>
  )
}
