"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";

import "@/styles/navbar.css";

const Navbar = () => {
    const path = usePathname();
    const menuItem = [
        {
            name: "Interests",
            link: "/interests"
        },
        {
            name: "Leaderboard",
            link: "/leaderboard"
        }
    ]

    return (
    <div className="nav-bar-header">
        <div>
            <Link href="/" passHref>
                <Image
                    src="/green-leaf-logo.png"
                    alt="GEACRE Sign-in Portal Logo"
                    width={60}
                    height={60}
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
        <div className="flex-col-centered ml-auto">
            {/* Add a link to the GreenExpectations website */}
            <Link 
            href="https://greenifyai.com/"
            className="green-expectations-us-link" 
            // Used to open website in a new tab
            target="_blank" rel="noopener noreferrer"
            >
                <Image
                    src="/green_expectations_logo.png"
                    alt="Green Expectations Logo"
                    width={35}
                    height={35}
                    className="transition hover:filer-coffee-green hover:brightness-90"
                    priority
                />
            </Link>
            <Link
                href="https://greenifyai.com/"
                className="green-expectations-us-link" 
                // Used to open website in a new tab
                target="_blank" rel="noopener noreferrer"
            >
                GreenifyAI
            </Link>
        </div>
    </div>
    );
  };
  
  export default Navbar;