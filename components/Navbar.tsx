"use client";

import { cn } from "@/lib/utils";
import { UserButton } from "@clerk/nextjs";
import { MenuIcon, Sparkles } from "lucide-react";
import { Poppins } from "next/font/google";
import Link from "next/link";
import { Button } from "./ui/button";

const font = Poppins({ weight: "600", subsets: ["latin"] });

const Navbar = () => {
  return (
    <div className="fixed z-50 w-full flex justify-between items-center py-2 px-4 border-b border-primary/20 bg-secondary">
      <div className="flex items-center">
        <MenuIcon className="block md:hidden" />
        <Link className="hidden md:block" href={"/"}>
          <h1
            className={cn(
              "text-xl md:text-3xl font-bold  bg-gradient-to-r from-violet-500 to-purple-500 text-transparent bg-clip-text",
              font.className
            )}
          >
            ally-ai.
          </h1>
        </Link>
     
      </div>
      <div className="flex items-center gap-x-3">
        <Button size={'sm'} variant={'premium'}>
            Upgrade 
             <Sparkles className="h-4 w-4 fill-white text-white" />
        </Button>
       <UserButton/>
       </div>
    </div>
  );
};

export default Navbar;
