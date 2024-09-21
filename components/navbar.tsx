"use client";
import {
  Navbar as NextUINavbar,
  NavbarContent,
  NavbarMenu,
  NavbarBrand,
  NavbarItem,
  NavbarMenuItem,
  NavbarMenuToggle,
} from "@nextui-org/navbar";
import { Button } from "@nextui-org/button";
import { Link } from "@nextui-org/link";
import { link as linkStyles } from "@nextui-org/theme";
import NextLink from "next/link";
import clsx from "clsx";
import { siteConfig } from "@/config/site";
import { ThemeSwitch } from "@/components/theme-switch";
import { auth } from "@/config/firebase-config";
import { title } from "./primitives";
import { useRouter } from "next/navigation";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useEffect } from "react";
import { useState } from "react";
import { User } from 'firebase/auth';

export const Navbar = () => {

  const [user, setUser] = useState<User | null>(null);
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      setUser(user);
    });
  }, []);
  
  const router = useRouter();
  const handleSignOut = () => {
    auth.signOut();
    router.push("/");
  };
  return (
    <NextUINavbar
      position="sticky"
      className="dark:border-none border rounded-full max-w-[80%] flex justify-center items-center mx-auto mt-3 bg-opacity-20 backdrop-filter backdrop-blur-lg bg-white/10">
      <NavbarContent className="basis-1/5 sm:basis-full" justify="start">
        <NavbarBrand as="li" className="gap-3 max-w-fit">
          <NextLink className="flex justify-start items-center gap-1" href="/">
            <h1 className={title({ color: "violet", size: "xs" })}>
             {siteConfig.name}
            </h1>
          </NextLink>
        </NavbarBrand>
        <ul className="hidden lg:flex gap-4 justify-start ml-2 lg:justify-center lg:items-center lg:mx-auto">
          {siteConfig.navItems.map((item) => (
            <NavbarItem key={item.href}>
              <NextLink
                className={clsx(
                  linkStyles({ color: "foreground" }),
                  "data-[active=true]:text-primary data-[active=true]:font-medium"
                )}
                color="foreground"
                href={item.href}>
                {item.label}
              </NextLink>
            </NavbarItem>
          ))}
        </ul>
      </NavbarContent>

      <NavbarContent
        className="hidden sm:flex basis-1/5 sm:basis-full"
        justify="end">
        <NavbarItem className="hidden sm:flex gap-2">
          {/* <ThemeSwitch /> */}
        </NavbarItem>
        <NavbarItem className="hidden md:flex gap-2">
          {!user && (
            <NextLink href="/login">
              <Button
                className="text-sm font-normal rounded-full text-default-600 text-white bg-[#b249f8]"
                color="primary"
                variant="light">
                Login To Get Started
              </Button>
            </NextLink>
          )}

          {user && (
            <div className="relative">
              <button
                className="p-0 border-none bg-transparent"
                onClick={() => {
                  const dropdown = document.getElementById("userDropdown");
                  if (dropdown) dropdown.classList.toggle("hidden");
                }}
                aria-label="Toggle user menu"
              >
                <img
                  className="w-10 h-10 p-1 rounded-full ring-2 ring-gray-300 dark:ring-gray-500"
                  src={auth.currentUser?.photoURL || ""}
                  alt="User avatar"
                />
              </button>

              <div
                id="userDropdown"
                className="absolute right-0 mt-2 z-10 hidden bg-opacity-20 backdrop-filter backdrop-blur-lg bg-white/10 divide-y divide-gray-100 rounded-lg shadow w-100 dark:divide-gray-200">
                <div className="px-4 py-3 text-sm text-gray-900 dark:text-white">
                  <div>{getAuth().currentUser?.displayName}</div>
                  <div className="font-medium truncate">
                    {getAuth().currentUser?.email}
                  </div>
                </div>

                <div className="py-1">
                  <button
                    onClick={handleSignOut}
                    className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white cursor-pointer">
                    Sign out
                  </button>
                </div>
              </div>
            </div>
          )}

         
        </NavbarItem>
      </NavbarContent>

      <NavbarContent className="sm:hidden basis-1 pl-4" justify="end">
        {/* <ThemeSwitch /> */}
        <NavbarMenuToggle />
      </NavbarContent>

      <NavbarMenu>
        <div className="mx-4 mt-4 flex flex-col gap-2">
          {siteConfig.navMenuItems.map((item, index) => (
            <NavbarMenuItem key={`${item}-${index}`} className="ml-2">
              <Link color={index === 2 ? "primary" : "foreground"} href="#" size="lg">
                {item.label}
              </Link>
            </NavbarMenuItem>
          ))}
        </div>
      </NavbarMenu>
    </NextUINavbar>
  );
};
