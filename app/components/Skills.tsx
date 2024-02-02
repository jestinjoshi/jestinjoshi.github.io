import { motion } from "framer-motion";
import { fadeIn, initialFadeUp } from "../animations";

export default function Skills() {
    const skills = [
        {
            "skillCategory": "Web Development",
            "skills": "Next.js, Node.js, PHP, WordPress, Laravel, RESTful API"
        },
        {
            "skillCategory": "Frontend Development",
            "skills": "HTML5, CSS3, Bootstrap, JavaScript, ES6, jQuery, React, Redux, Next.js"
        },
        {
            "skillCategory": "UI/UX Design",
            "skills": "Photoshop, Zeplin, Figma, Wireframing, User Research, Usability Testing"
        },
        {
            "skillCategory": "Professional Skills",
            "skills": "Effective Communication, Time Management, Website Optimization, Agile methodologies, SEO, Design Patterns and Principles"
        }
    ]

    return (
        <motion.section initial={initialFadeUp} whileInView={fadeIn(1.5)} viewport={{ once: true }} id="skills" className="py-10">
            <div className="custom-container px-4 mx-auto">
                <h2 className="text-4xl section-heading mb-10 gradient-text">Skills</h2>
                <div className="skill-type-wrap grid grid-cols-2 gap-10">
                    {skills.map(({ skillCategory, skills }) =>
                        <div className="skill-type glass p-6 rounded-lg backdrop-blur" key={skillCategory}>
                            <p className="skill-type-heading text-xl mb-2">{skillCategory}</p>
                            <p className="skills">{skills}</p>
                        </div>
                    )}
                </div>
            </div>
        </motion.section>
    )
}