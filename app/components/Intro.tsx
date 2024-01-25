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
    "Guten Tag",         // German
    "Konnichiwa",        // Japanese
    "Salam",             // Arabic
    "Zdravstvuyte",      // Russian
    "Nǐ hǎo",            // Mandarin Chinese
    "Annyeonghaseyo"     // Korean
];

let i = 0;
let j = 0;
let deleting = false;
let pause = 100;

export default function Intro() {
    const [greeting, setGreeting] = useState('');

    const handleTyping = () => {
        if (helloArray[i].length >= j && !deleting) {
            pause = 100;
            setGreeting(helloArray[i].substring(0, j));
            if (helloArray[i].length === j) {
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
                if (i > helloArray.length - 1) {
                    i = 0;
                }
            }
        }
    };

    useEffect(() => {
        setTimeout(handleTyping, pause);
    }, [greeting]);

    return (
        <section id="about" className="py-10">
            <div className="container px-4 mx-auto">
                <div className="flex justify-center gap-10 flex-wrap">
                    <div className="avatar-wrap relative w-full sm:w-[300px]">
                        <Image className="relative z-10 rounded-full mx-auto" alt="Avatar" width={300} height={300} src={avatar}></Image>
                        <div id="shape"></div>
                    </div>
                    <div className="about flex-1">
                        <h1 className="text-5xl mb-5">{greeting.length ? greeting : ''}<span className="cursor"></span>, I&apos;m Jestin</h1>
                        <p className="text-base">I am a frontend web developer with a track record of {Math.abs(2018 - new Date().getFullYear())}+ years in developing websites across diverse categories, including blogs, e-commerce, dashboards, and static sites. I love solving complex problems with cutting-edge web technologies and collaborating with talented teams. I like implementing challenging UI interactions and components.</p>

                        <p className="text-base">I am always eager to learn new skills and explore new challenges. Currently, I&apos;m keen on delving into backend technologies, continuous integration and continuous deployment (CI/CD), and database development.</p>

                        <p className="text-base">If you want to connect with me or learn more about my work, feel free to reach out to me on LinkedIn or drop me an email. I look forward to hearing from you!</p>
                    </div>
                </div>
            </div>
        </section>
    )
}