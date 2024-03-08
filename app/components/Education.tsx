import { motion } from "framer-motion"
import { fadeIn, initialFadeUp } from "../animations"

export default function Education() {
    return (
        <motion.section initial={initialFadeUp} whileInView={fadeIn(0.5)} viewport={{ once: true }} id="education" className="py-5 sm:py-12 bg-zinc-900">
            <div className="custom-container px-5 mx-auto">
                <h2 className="text-3xl section-heading mb-10 gradient-text">Education</h2>
                <div className="education-wrap">
                    <div className="education">
                        <div className="flex flex-col sm:flex-row justify-between sm:items-center mb-4 gap-5 sm:gap-0">
                            <div className="education-title text-xl flex flex-col lg:flex-row">
                                <span className="education-role">Bachelor of Science <span className="hidden sm:inline">(Information Technology)</span></span>
                                <span className="sep mx-2 hidden lg:inline"> | </span>
                                <a href="https://mu.ac.in/" className="education-company link-underline">University of Mumbai</a>
                            </div>
                            <p className="education-duration italic">July 2014 - Oct 2017</p>
                        </div>
                        <p className="education-description text-justify">A comprehensive undergraduate program specializing in Information Technology, equipping me with a strong foundation in programming, software development, and IT concepts. Gained practical experience through real-world projects, fostering the ability to apply theoretical knowledge in practical settings. Developed industry-relevant skills and knowledge to excel in IT roles.</p>
                    </div>
                </div>
            </div>
        </motion.section>
    )
}