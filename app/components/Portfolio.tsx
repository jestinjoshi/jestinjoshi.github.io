import { motion } from "framer-motion";
import { fadeIn, initialFadeUp } from "../animations";
import { useRef, useState } from "react";

const portfolio = [
    {
        id: 0,
        name: 'Meet Participants Checklist',
        link: 'https://chrome.google.com/webstore/detail/meet-participants-checkli/oomekahllchgbndfpgjjggokkcjginmn',
        description: 'A Chrome extension that adds a checkbox next to each Google Meet participant',
    },
    {
        id: 1,
        name: 'Master Builder',
        link: 'https://github.com/jestinjoshi/master-builder',
        description: 'An Electron App to execute builds on an internal project with multiple configs simultaneously',
    },
    {
        id: 2,
        name: 'Forstar Engineers',
        link: 'https://forstarengineers.com',
        description: 'A website for a local business that I developed as a freelancer.'
    },
    {
        id: 3,
        name: 'Online Lottery Picker (Frontend)',
        link: 'https://online-lottery-23667.web.app/lottery',
        description: 'A website for a raffle event of a local church. This was a pro bono work',
    },
    {
        id: 4,
        name: 'Online Lottery Seller (Backend)',
        link: 'https://online-lottery-23667.web.app/',
        description: 'A website for a raffle event of a local church. This was a pro bono work',
    },
    {
        id: 5,
        name: 'Online Quiz',
        link: 'https://vue-assignment-virid.vercel.app/',
        description: 'A website that fetches data from a public quiz API and asks you 10 questions and gives out result',
    },
    {
        id: 6,
        name: 'WordPress Templates',
        description: 'As a UI Developer in Media.net, I developed 10+ custom WordPress templates as per business requirements. The details of the websites cannot be shared because of an NDA but screenshots of the same are attached',
    },
];

export default function Portfolio() {
    const scrollRef = useRef(null);

    const [selectedPortfolio, selectPortfolio] = useState<null | number>(null);

    const handlePortfolioClick = (i: number) => {
        selectPortfolio(i);
    }

    return (
        <motion.section ref={scrollRef} id="portfolio" className="py-5 sm:py-10" initial={initialFadeUp} whileInView={fadeIn(0.5)} viewport={{ once: true }}>
            <div className="custom-container px-5 mx-auto">
                <h2 className="text-3xl section-heading mb-10 gradient-text">Portfolio</h2>
                <div className="portfolio-wrap grid grid-cols-1 sm:grid-cols-2 gap-5 lg:gap-10">
                    {portfolio.map((e, i) =>
                        <motion.div key={e.id} onClick={() => handlePortfolioClick(i)} className="portfolio glass rounded-lg p-6" initial={initialFadeUp} whileInView={fadeIn(i * 0.2)} viewport={{ once: true }}>
                            <div className="portfolio-title">
                                {e.link ?
                                    <a href={e.link} target="_blank" rel="noopener noreferrer" className="hover:underline text-xl mb-4 inline-block link-underline">
                                        <p className="project-name">{e.name}</p>
                                    </a>
                                    :
                                    <p className="project-name text-xl mb-4">{e.name}</p>
                                }
                                <p className="portfolio-description">{e.description}</p>
                            </div>
                        </motion.div>
                    )}
                </div>
            </div>
        </motion.section>
    )
}