import React, { MouseEventHandler, useCallback, useEffect, useRef, useState } from "react";
import { motion, useCycle } from "framer-motion";
import { fadeIn, initialFadeDown } from "../../animations";
import Logo from "./Logo";
import NavMenu from "./NavMenu";
import HamburgerMenu from "./HamburgerMenu";

type HeaderProps = {
    mainRef: React.RefObject<HTMLDivElement>;
}

export const menu = ["about", "skills", "experience", "education", "portfolio", "contact"];

const Header = ({ mainRef }: HeaderProps) => {
    const headerRef = useRef<HTMLElement>(null);
    const highlightRef = useRef<HTMLDivElement>(null);

    const handleHashClick: MouseEventHandler = useCallback((e) => {
        e.preventDefault();
        const href = (e.currentTarget as Element).getAttribute('href');
        const targetElement = mainRef?.current?.querySelector(href || '') as HTMLElement;

        if (targetElement) {
            const offsetTop = targetElement.offsetTop - (headerRef.current?.offsetHeight || 0);
            window.scroll({
                top: offsetTop
            });
        }
    }, [mainRef]);

    const highlightSection = useCallback((target: Element) => {
        if (target && highlightRef.current) {
            const { width, left, top } = target.getBoundingClientRect();
            const newStyle = {
                width: `${width}px`,
                left: `${left}px`,
                top: `${top + 25}px`
            };

            Object.assign(highlightRef.current.style, newStyle);
        }
    }, []);

    useEffect(() => {
        // Delay to allow animations to complete
        const animationDelay = 1000;
        const initialTarget = headerRef.current?.querySelector(`a[href="#${menu[0]}"]`);

        if (initialTarget) {
            setTimeout(() => {
                highlightSection(initialTarget);
                highlightRef?.current?.classList.remove('invisible');
            }, animationDelay);
        }
    }, [highlightSection]);

    useEffect(() => {
        const handleIntersection: IntersectionObserverCallback = (entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const target = headerRef.current?.querySelector(`a[href="#${entry.target.id}"]`);
                    if (target) {
                        highlightSection(target);
                    }
                }
            });
        };

        const observer = new IntersectionObserver(handleIntersection, {
            rootMargin: "-19% 0px -80% 0px",
        });

        mainRef.current?.querySelectorAll('section').forEach(el => observer.observe(el));

        const handleResize = () => {
            const target = headerRef.current?.querySelector(`a[href="#about"]`);
            if (target) {
                highlightSection(target);
            }
        };

        window.addEventListener('resize', handleResize);

        return () => {
            observer.disconnect();
            window.removeEventListener('resize', handleResize);
        };
    }, [mainRef, highlightSection]);

    return (
        <motion.header initial={initialFadeDown} animate={fadeIn(0.2)} ref={headerRef} className="py-4 sm:py-10 sticky top-0 backdrop-blur-lg z-20 header">
            <div className="custom-container px-5 mx-auto">
                <div className="logo-menu-wrap flex justify-between items-center">
                    <Logo />
                    <NavMenu menu={menu} handleHashClick={handleHashClick} />
                    <div ref={highlightRef} className="highlight absolute h-1 bg-white transition-all rounded-full invisible"></div>
                    <HamburgerMenu handleHashClick={handleHashClick} />
                </div>
            </div>
        </motion.header>
    );
}

export default Header;
