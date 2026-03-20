import { useCallback, useEffect, useRef, useState } from "react";
import { motion, useCycle } from "framer-motion";
import { menu } from "./Header";

type HamburgerProps = {
    handleHashClick: React.MouseEventHandler
}

const HamburgerMenu = (props: HamburgerProps) => {
    const [isOpen, toggleOpen] = useCycle(false, true);
    const [isMobile, setIsMobile] = useState(false);
    const containerRef = useRef(null);
    const containerHeightRef = useRef(1000);
    const hamburgerRef = useRef<HTMLDivElement>(null);

    const checkIsMobile = useCallback(() => {
        setIsMobile(window.innerWidth < 640); // 640px is Tailwind's sm breakpoint
    }, []);

    const setContainerHeight = useCallback(() => {
        if (containerRef.current) {
            containerHeightRef.current = (containerRef.current as Element).clientHeight;
        }
    }, []);

    const handleHamburgerMenuClick: React.MouseEventHandler<HTMLAnchorElement> = e => {
        props.handleHashClick(e);
        toggleOpen();
    }

    const handleHamburgerKeyDown: React.KeyboardEventHandler<HTMLDivElement> = (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            toggleOpen();
        }
    }

    useEffect(() => {
        checkIsMobile();
        setContainerHeight();
        window.addEventListener('resize', checkIsMobile);
        window.addEventListener('resize', setContainerHeight);
        return () => {
            window.removeEventListener('resize', checkIsMobile);
            window.removeEventListener('resize', setContainerHeight);
        };
    }, [checkIsMobile, setContainerHeight]);

    return (
        <>
            <motion.nav
                ref={containerRef}
                initial="closed"
                animate={isOpen ? "open" : "closed"}
                variants={sidebarVariant}
                custom={containerHeightRef.current}
                className="absolute right-0 top-0 z-[1] w-full h-screen text-center flex items-center justify-center hamburger-menu"
                aria-label="Mobile navigation menu"
            >
                <motion.ul variants={menuContainerVariant} className="flex flex-col gap-8">
                    {menu.map((m, i) =>
                        <motion.li key={m} className="capitalize" whileTap={{ scale: 0.95 }} variants={menuVariant}>
                            <a className="hover:opacity-75 text-xl" onClick={handleHamburgerMenuClick} href={`#${m}`} tabIndex={isMobile ? 0 : -1}>{m}</a>
                        </motion.li>
                    )}
                </motion.ul>
            </motion.nav>
            <div 
                ref={hamburgerRef}
                className={`hamburger z-[1] sm:hidden ${isOpen ? 'open' : ''}`} 
                onClick={() => toggleOpen()}
                onKeyDown={handleHamburgerKeyDown}
                role="button"
                tabIndex={isMobile ? 0 : -1}
                aria-label="Toggle navigation menu"
                aria-expanded={isOpen}
            >
                <span aria-hidden="true"></span>
                <span aria-hidden="true"></span>
                <span aria-hidden="true"></span>
                <span aria-hidden="true"></span>
            </div>
        </>
    );
}

const menuContainerVariant = {
    open: {
        transition: { staggerChildren: 0.07, delayChildren: 0.2 }
    },
    closed: {
        transition: { staggerChildren: 0.05, staggerDirection: -1 }
    }
};
const menuVariant = {
    open: {
        y: 0,
        opacity: 1,
        transition: {
            y: { stiffness: 1000, velocity: -100 }
        }
    },
    closed: {
        y: 50,
        opacity: 0,
        transition: {
            y: { stiffness: 1000 }
        }
    }
};

const sidebarVariant = {
    open: (height = 1000) => ({
        clipPath: `circle(${height * 2 + 200}px at right top)`,
        transition: {
            type: "spring",
            stiffness: 20,
            restDelta: 2
        }
    }),
    closed: {
        clipPath: "circle(0px at right top)",
        transition: {
            delay: 0.5,
            type: "spring",
            stiffness: 400,
            damping: 40
        }
    }
};
export default HamburgerMenu;
