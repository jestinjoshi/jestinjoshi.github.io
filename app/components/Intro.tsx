"use client"

import Image from "next/image";
import avatar from '../img/avatar.png';
import { useEffect, useState } from "react";

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
let pause = 100;

export default function Intro() {
    const [greeting, setGreeting] = useState(' ');

    const handleTyping = () => {
        if (helloArray[i].length >= j && !deleting) {
            pause = 100;
            setGreeting(helloArray[i].substring(0, j));
            const hasWordEnded = helloArray[i].length === j;
            if (hasWordEnded) {
                deleting = true;
                pause = 2000;
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

    const calculateExperience = () => {
        const d = new Date();
        let year = d.getFullYear();
        if (d.getMonth() < 6) {
            year--;
        }
        return Math.abs(2018 - year)
    }

    return (
        <section id="about" className="py-10">
            <div className="custom-container px-4 mx-auto">
                <div className="flex justify-center gap-20 flex-wrap items-center">
                    <div className="avatar-wrap relative w-full sm:w-[300px]">
                        <Image priority className="relative z-10 rounded-full mx-auto backdrop-blur-sm" alt="Avatar" width={300} height={300} src={avatar}></Image>
                        <div id="shape"></div>
                    </div>
                    <div className="about flex-1">
                        <h1 className="text-5xl mb-5">{greeting.length ? greeting : ''}<span className="cursor"></span>, I&apos;m Jestin</h1>
                        <p className="text-lg mb-5">I am a frontend web developer with a track record of {calculateExperience()}+ years in developing websites across diverse categories, including blogs, e-commerce, dashboards, and static sites. I love solving complex problems with cutting-edge web technologies, implementing challenging UI interactions and components; and collaborating with talented teams.</p>

                        <p className="text-lg mb-5">I am always eager to learn new skills and explore new challenges. Currently, I&apos;m keen on delving into backend technologies, continuous integration and continuous deployment (CI/CD), and database development.</p>
                    </div>
                </div>
            </div>
        </section>
    )
}