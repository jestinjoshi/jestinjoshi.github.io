import { fadeIn, initialFadeDown } from "@/app/animations";
import { motion } from "framer-motion";
import { MouseEventHandler } from "react";
    
const NavMenu = ({ menu, handleHashClick }: { menu: string[], handleHashClick: MouseEventHandler }) => (
    <nav className="header-menu hidden sm:block">
        <motion.ul animate="hidden" className="flex gap-6">
            {menu.map((m, i) =>
                <motion.li key={m} className="capitalize" animate={fadeIn(0.5 + i * 0.3)} initial={initialFadeDown}>
                    <a className="hover:opacity-75" onClick={handleHashClick} href={`#${m}`}>{m}</a>
                </motion.li>
            )}
        </motion.ul>
    </nav>
);

export default NavMenu;