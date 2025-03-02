"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";

import "@/styles/navbar.css";

import { auth } from "@/auth";
import { SignOut } from "@/components/sign-out";

const Navbar = () => {

    const path = usePathname();
    const menuItem = [
        {
            name: "Interests",
            link: "/interests"
        },
        {
            name: "Dashboard",
            link: "/dashboard"
        }
    ]

    return (
    <div className="nav-bar-header">
        <div>
            <Link href="/" passHref>
                <Image
                    src="/green-leaf-logo.png"
                    alt="GEACRE Sign-in Portal Logo"
                    width={70}
                    height={70}
                    className="transition hover:filer-coffee-green hover:brightness-90"
                    priority
                />
            </Link>
        </div>
        <ul className="flex">
            {menuItem.map((menu) => {
                const isActive = menu.link === path;
                    return (
                    <li key={menu.link}>
                        <Link 
                            href = {menu.link}
                            className = 
                            {
                                isActive?
                                "nav-bar-element-select":
                                "nav-bar-element-default"
                            }
                        >
                            {menu.name}
                        </Link>
                    </li>
                    );
                }
            )}
        </ul>
    </div>
    );
  };
  
  export default Navbar;