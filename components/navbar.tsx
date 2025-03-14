"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useState, useEffect } from 'react';

import "@/styles/navbar.css";

import { SignIn_Sm } from "@/components/sign-in";
import { SignOut_Sm } from "@/components/sign-out";

/* Top navigation bar for pages, Home page handles navigation using a menu instead */
const Navbar = () => {
    // eslint-disable-next-line
    const [session, setSession] = useState<any>(null);

    useEffect(() => {
    /* Fetch current session from session API */
    const fetchSession = async () => {
        try {
        const response = await fetch('/api/session');
        const data = await response.json();

        if (data.error) {
            setSession(null);
        } else {
            setSession(data.session);
        }
        } catch (error) {
        console.error('Error checking session', error);
        setSession(null);
        }
    };

    fetchSession();
    }, []);

    /* Creating individual menu items for interests and dashboard page */
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

    /* Navbar contents */
    return (
    <div className="nav-bar-header">
        <div className="hoverable-div">
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
        {/* Dynamically create each element in navbar from list of menu items */}
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
        {/* Include sign-in/sign-out button depending on whether there is an active user session detected */}
        <div className="flex items-center ml-auto">
            {session? (
                <>
                    <span className="text-lg font-semibold user-email mr-4">{session.user.email}</span>
                    <div className="hoverable-div">
                        <SignOut_Sm/>
                    </div>
                </>
            ) : (
                <>
                    <div className="hoverable-div">
                        <SignIn_Sm/>
                    </div>
                    
                </>
            )}
        </div>
    </div>
    );
  };
  
  export default Navbar;