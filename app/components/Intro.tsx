"use client"

import Image from "next/image";
import { useEffect, useState } from "react";
import { motion } from "framer-motion"
import { fadeIn, initialFadeUp } from "../animations";

let helloArray = [
    "Hello",             // English
    "Bonjour",           // French
    "Namaste",           // Hindi
    "Hola",              // Spanish
    "Ciao",              // Italian
    "Salam",             // Arabic
    "Nǐ hǎo",            // Mandarin Chinese
];

let i = 0;
let j = 0;
let deleting = false;
let pause = 5000;

export default function Intro() {
    const calculateExperience = () => {
        const d = new Date();
        let year = d.getFullYear();
        if (d.getMonth() < 6) {
            year--;
        }
        return Math.abs(2018 - year)
    }

    return (
        <section id="about" className="py-5 sm:py-10">
            <div className="custom-container px-5 mx-auto">
                <div className="flex justify-center gap-5 sm:gap-20 flex-wrap items-center">
                    <motion.div initial={{ ...initialFadeUp }} animate={{ ...fadeIn(0.5) }} className="avatar-wrap relative w-full lg:w-[300px]">
                        <Image priority className="relative z-10 rounded-full mx-auto backdrop-blur-sm" alt="Avatar" width={300} height={300} src="/img/avatar.webp"></Image>
                        <div id="shape"></div>
                    </motion.div>
                    <div className="about flex-1 text-center lg:text-left">
                        <motion.h1 initial={initialFadeUp} animate={fadeIn(0.7)} className="text-3xl sm:text-5xl mb-5">
                            <Greeting />
                            <span className="cursor"></span>, I&apos;m <span className="gradient-text">Jestin</span>
                        </motion.h1>
                        <motion.p initial={initialFadeUp} animate={fadeIn(0.9)} className="text-lg mb-5 text-center lg:text-justify">I am a frontend web developer with a track record of {calculateExperience()}+ years in developing websites across diverse categories, including blogs, e-commerce, dashboards, and static sites. I love solving complex problems with cutting-edge web technologies, implementing challenging UI interactions and components; and collaborating with talented teams.</motion.p>

                        <motion.p initial={initialFadeUp} animate={fadeIn(1.1)} className="text-lg mb-5 text-center lg:text-justify">I am always eager to learn new skills and explore new challenges. Currently, I&apos;m keen on delving into backend technologies, CI/CD, and database development as I am inclined to become a fullstack developer in the future.</motion.p>
                        <motion.div initial={initialFadeUp} animate={fadeIn(1.3)} className="inline-flex mt-12 items-center">
                            <a aria-label="Github" href="https://github.com/jestinjoshi/" target="_blank" rel="noreferrer" className="mr-8 text-white transition relative p-3 group">
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-github"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path></svg>
                                <span className="glass absolute w-full h-full rounded-full top-0 left-0 z-[-1] group-hover:scale-100 scale-0 transition-all"></span>
                            </a>
                            <a aria-label="LinkedIn" href="https://linkedin.com/in/jestinjoshi/" target="_blank" rel="noreferrer" className="mr-8 text-white transition relative p-3 group">
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-linkedin"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" /><rect x="2" y="9" width="4" height="12" /><circle cx="4" cy="4" r="2" /></svg>
                                <span className="glass absolute w-full h-full rounded-full top-0 left-0 z-[-1] group-hover:scale-100 scale-0 transition-all"></span>
                            </a>
                            <a className="px-2 text-sm md:text-base md:px-4 py-3 rounded-lg ml-0 transition text-white flex items-center font-semibold resume glass glass-hover group overflow-hidden hover:pl-12 transition-all" href="/Resume_Jestin.pdf" target="_blank" rel="noreferrer">
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-download absolute group-hover:start-4 -start-full transition-all"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="7 10 12 15 17 10"></polyline><line x1="12" y1="15" x2="12" y2="3"></line></svg>
                                Resume
                            </a>
                        </motion.div>
                    </div>
                </div>
            </div>
        </section>
    )
}

function Greeting() {
    const [greeting, setGreeting] = useState('Hi');

    const handleTyping = () => {
        if (helloArray[i].length >= j && !deleting) {
            pause = 100;
            setGreeting(helloArray[i].substring(0, j));
            const hasWordEnded = helloArray[i].length === j;
            if (hasWordEnded) {
                deleting = true;
                pause = 3000;
            }
            j++;
        } else {
            pause = 25;
            setGreeting(helloArray[i].substring(-1, j - 2));
            j--;
            if (j === 1) {
                deleting = false;
                i++;
                const isLastWord = i > helloArray.length - 1;
                if (isLastWord) {
                    i = 0;
                }
            }
        }
    };

    useEffect(() => {
        const id = setTimeout(handleTyping, pause);
        return () => {
            clearTimeout(id)
        };
    }, [greeting]);

    return (
        <>{greeting.length ? greeting : ''}</>
    )
}