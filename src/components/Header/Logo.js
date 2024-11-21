"use client";

import { usePathname } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import Tippy from "@tippyjs/react";
import "tippy.js/dist/tippy.css";

const Logo = () => {
  const pathname = usePathname();
  const isHomePage = pathname === "/";

  const textVariants = {
    hover: {
      scale: 1.1,
      color: "#2563EB",
      transition: { duration: 0.3 },
    },
  };

  return (
    <Tippy content={isHomePage ? "You are here!" : "Go back to the homepage"}>
      <Link href="/" className="flex items-center group space-x-3">
        <motion.div
          whileHover={{ scale: 1.05 }}
          className="relative w-12 md:w-16 h-12 md:h-16 p-1 rounded-full overflow-hidden border border-solid border-dark dark:border-gray mb-2 md:mb-0 md:mr-4 bg-gradient-to-r from-purple-500 to-blue-500"
        >
          <div className="rounded-full overflow-hidden">
            <Image
              src="/images/profileImg.png"
              alt="Blog's logo"
              fill
              className="object-cover rounded-full"
              priority
            />
          </div>
        </motion.div>
        <motion.span
          variants={textVariants}
          whileHover="hover"
          className={`font-bold dark:font-semibold sm:text-xl text-lg bg-gradient-to-r from-gray-950 dark:from-slate-200 to-green-900 dark:to-cyan-500 text-transparent bg-clip-text text-center md:text-left`}
        >
          {isHomePage ? "Jesuloluwa" : "Back to Home"}
        </motion.span>
      </Link>
    </Tippy>
  );
};

export default Logo;
