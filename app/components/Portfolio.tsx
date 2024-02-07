import { motion } from "framer-motion";
import { fadeIn, initialFadeUp } from "../animations";
import { useRef } from "react";

export default function Portfolio() {
    const portfolio = [
        {
            name: 'Meet Participants Checlist',
            link: 'https://chrome.google.com/webstore/detail/meet-participants-checkli/oomekahllchgbndfpgjjggokkcjginmn',
            description: 'A Chrome extension that adds a checkbox next to each Google Meet participant',
        },
        {
            name: 'Master Builder',
            link: 'https://github.com/jestinjoshi/master-builder',
            description: 'An Electron App to execute builds on an internal project with multiple configs simultaneously',
        },
        {
            name: 'Forstar Engineers',
            link: 'https://forstarengineers.com',
            description: 'A website for a local business that I developed as a freelancer.'
        },
        {
            name: 'Online Lottery Picker (Frontend)',
            link: 'https://online-lottery-23667.web.app/lottery',
            description: 'A website for a raffle event of a local church. This was a pro bono work',
        },
        {
            name: 'Online Lottery Seller (Backend)',
            link: 'https://online-lottery-23667.web.app/',
            description: 'A website for a raffle event of a local church. This was a pro bono work',
        },
        {
            name: 'Online Quiz',
            link: 'https://vue-assignment-virid.vercel.app/',
            description: 'A website that fetches data from a public quiz API and asks you 10 questions and gives out result',
        },
    ];

    const scrollRef = useRef(null)

    return (
        <motion.section ref={scrollRef} id="portfolio" className="py-10" initial={initialFadeUp} whileInView={fadeIn(0.5)} viewport={{ once: true }}>
            <div className="custom-container px-5 mx-auto">
                <h2 className="text-3xl section-heading mb-10 gradient-text">Portfolio</h2>
                <div className="portfolio-wrap grid grid-cols-1 sm:grid-cols-2 gap-5 lg:gap-10">
                    {portfolio.map((e, i) =>
                        <motion.div key={e.link} className="portfolio glass rounded-lg p-6" initial={initialFadeUp} whileInView={fadeIn(i * 0.2)} viewport={{ once: true }}>
                            <div className="portfolio-title">
                                <a href={e.link} target="_blank" rel="noopener noreferrer" className="hover:underline text-xl mb-2 inline-block">
                                    <p className="project-name">{e.name}</p>
                                </a>
                                <p className="portfolio-description">{e.description}</p>
                            </div>
                        </motion.div>
                    )}
                </div>
            </div>
        </motion.section>
    )
}