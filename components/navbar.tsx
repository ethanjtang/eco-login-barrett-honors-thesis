"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useState, useEffect } from 'react';

import "@/styles/navbar.css";

import { auth } from "@/auth";
import { SignIn_Sm } from "@/components/sign-in";
import { SignOut, SignOut_Sm } from "@/components/sign-out";

const Navbar = () => {
    const [session, setSession] = useState<any>(null);

    useEffect(() => {
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