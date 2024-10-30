import { AnimatePresence, motion } from "framer-motion";
import { fadeIn, initialFadeUp } from "../animations";
import { useRef, useState } from "react";
import React, { memo } from 'react';
import { useDateDiff } from "../hooks/useDateDiff";

export type ExperienceType = {
    position: string;
    company: string;
    companyWebsite: string;
    linkedIn: string;
    location: string;
    startDate: string;
    endDate: string;
    responsibilities: Array<string>
};

export const experience: ExperienceType[] = [
    {
        position: "Freelance Web Developer",
        company: "Upwork",
        companyWebsite: "https://upwork.com",
        linkedIn: "https://linkedin.com/company/upwork",
        location: "Toronto",
        startDate: "Oct 2023",
        endDate: "Present",
        responsibilities: [
            "Built 7 websites using React, Vue, WordPress, Express.js, JavaScript, HTML and CSS.",
            "Created detailed project proposals outlining the scope, timelines, deliverables, and cost estimates.",
            "Kept clients informed of project progress and incorporated feedback.",
            "Worked with other freelancers or team members as needed.",
            "Stayed updated with web development trends and continuously improved technical skills.",
        ]
    },
    {
        position: "UI Developer 2",
        company: "Media.net",
        companyWebsite: "https://www.media.net/",
        linkedIn: "https://www.linkedin.com/company/media.net/",
        location: "Mumbai",
        startDate: "Nov 2021",
        endDate: "Sept 2023",
        responsibilities: [
            "Delivered 50+ custom widgets and pages by seamlessly integrating WordPress, Vue.js, and Laravel, meeting business requirements promptly within weekly sprint deadlines.",
            "Developed RESTful APIs using the Laravel framework, which involved designing and implementing API endpoints, handling data requests and responses, and ensuring efficient and secure communication between client applications and the server.",
            "Contributed to the development of an interview tool built with Next.js, Redux, and Express. This tool was instrumental in facilitating the interview task within the team, enabling efficient management of interview-related tasks, candidate evaluations, and reducing the interview feedback time by 50%.",
            "Managed Media.net's official website UI, orchestrating collaborative efforts across cross-functional teams to guarantee strict adherence to regulatory frameworks like CCPA, GDPR, and WCGA. Simultaneously, promoted ongoing optimization initiatives, which not only facilitated timely compliance but also led to 10% improvements in SEO rankings.",
            "Successfully identified and endorsed more than 10 top-tier UI developer candidates through a rigorous interview process, contributing to the selection of 2 developers in the team.",
            "Proficiently delegated tasks to 3 junior developers while offering mentorship and guidance as required. This strategic approach resulted in reduced rounds of QA testing and expedited project delivery timelines by 30%.",
            "Implemented and upheld uniform coding practices across projects to streamline debugging.",
            "Conducted thorough code reviews during merge requests, offering recommendations for optimal coding practices.",
            "Thoroughly documented the entire development lifecycle to facilitate seamless knowledge transfer and ensure comprehensive understanding of the project."
        ]
    },
    {
        position: "Software Developer",
        company: "eDAS Tech",
        companyWebsite: "https://edas.tech/",
        linkedIn: "https://www.linkedin.com/company/edastech/",
        location: "Mumbai",
        startDate: "Feb 2021",
        endDate: "Nov 2021",
        responsibilities: [
            "Redeveloped the frontend of a contact center web application, encompassing both the agent and admin panels which improved user experience reducing user disposition of a customer by 40%.",
            "Designed a novel chat-bot architecture in PHP, incorporating webhooks, and seamlessly integrated key APIs including WhatsApp Business API, Facebook Graph API, and Gupshup API to enhance the bot's functionality and capabilities.",
            "Modernized outdated JavaScript code, bringing it in line with the latest ES6+ standards. Additionally, initiated and drove migration of the existing project to utilize React and Redux, harnessing the benefits of the virtual DOM and improved state management to significantly enhance both performance and maintainability.",
            "Engineered RESTful APIs using PHP and implemented stored procedures within MySQL to enhance the functionality of the dialer dashboard.",
            "Streamlined data retrieval processes by optimizing complex SQL queries, resulting in a 20% reduction in load times for user-facing features.",
            "Collaborated closely with backend developers and engaged stakeholders to design and develop IVR (Interactive Voice Response) flows and user interfaces tailored to meet the specific requirements of 8 clients.",
            "Successfully identified and endorsed 4 top-tier UI developer candidates through a rigorous interview process, contributing to their selection and integration into the team.",
            "Validated and deployed the developed web application on more than 10 client servers, ensuring its robust functionality and reliability across various environments.",
            "Collaborated with customer success teams to tailor UI features, which resulted in a marked 20% improvement in customer satisfaction scores as per the quarterly feedback survey"
        ]
    },
    {
        position: "Associate UI Developer",
        company: "Media.net",
        companyWebsite: "https://www.media.net/",
        linkedIn: "https://www.linkedin.com/company/media.net/",
        location: "Mumbai",
        startDate: "Nov 2018",
        endDate: "Feb 2021",
        responsibilities: [
            "Developed websites using React, Vue, WordPress, and CakePHP",
            "Implemented custom WordPress themes from scratch as per the designs for 15+ websites",
            "Solely developed a mobile app using React Native"
        ]
    },
    {
        position: "Software Development Trainee",
        company: "VSPL",
        companyWebsite: "https://www.vedanshis.com/",
        linkedIn: "https://www.linkedin.com/company/vedanshisysteminc/",
        location: "Mumbai",
        startDate: "June 2018",
        endDate: "Sep 2018",
        responsibilities: [
            "Learnt Web Development, React and React Native as part of the training",
            "Developed web apps using ReactJS and REST APIs",
            "Developed Android Apps using React Native"
        ]
    }
];

type ExperienceItemProps = {
    e: ExperienceType;
    i: number;
    expanded: false | number;
    setExpanded: React.Dispatch<React.SetStateAction<false | number>>;
    scrollRef: React.RefObject<HTMLElement>;
};

const ExperienceItem: React.FC<ExperienceItemProps> = memo(
    ({ e, i, expanded, setExpanded, scrollRef }) => {
        const dateDiff = useDateDiff(e.startDate, e.endDate);

        return (
            <motion.div
                key={e.startDate}
                className={`experience relative pl-5 lg:pl-10 xl:pl-20 ${i < experience.length - 1 && 'pb-5 lg:pb-10'}`}
                initial={initialFadeUp}
                whileInView={fadeIn(0.5 + i * 0.2)}
                viewport={{ once: true, root: scrollRef }}
            >
                <div className="flex flex-col sm:flex-row justify-between sm:items-center">
                    <div className="">
                        <span className="experience-role block font-medium text-lg">{e.position}</span>
                        <a href={e.companyWebsite} target="_blank" rel="noopener noreferrer" className="experience-company text-sm">{e.company}</a>
                    </div>
                    <div>
                        <p className="experience-duration hidden sm:block text-sm">{e.startDate} - {e.endDate}</p>
                        <p className="experience-duration hidden sm:block text-xs">{dateDiff}</p>
                    </div>
                </div>
                <AnimatePresence initial={false}>
                    <ul className="experience-description list-disc pl-2 md:pl-5 mt-3">
                        {e.responsibilities.map((r, j) =>
                            (i === expanded || j === 0) && <li key={j} className="experience-bullets mb-2 text-justify text-sm">{r} {((i !== expanded && j === 0) || (i === expanded && j === e.responsibilities.length - 1)) && <span className="underline cursor-pointer text-blue-500" onClick={() => setExpanded(i === expanded ? false : i)}>Read {(i !== expanded && j === 0) ? 'More' : 'Less'}</span>}</li>
                        )}
                    </ul>
                </AnimatePresence>
            </motion.div>
        );
    },
    (prevProps, nextProps) => prevProps.expanded === nextProps.expanded && prevProps.i === nextProps.i
);

ExperienceItem.displayName = "ExperienceItem";

export default function Experience() {
    const [expanded, setExpanded] = useState<false | number>(0);
    const scrollRef = useRef<HTMLElement>(null);

    return (
        <motion.section ref={scrollRef} initial={initialFadeUp} whileInView={fadeIn(0.5)} viewport={{ once: true }} id="experience" className="py-5 sm:py-10">
            <div className="custom-container px-5 mx-auto">
                <h2 className="text-3xl section-heading mb-10 gradient-text">Experience</h2>
                <div className="experience-wrap">
                    {experience.map((e, i) =>
                        <ExperienceItem
                            key={i}
                            e={e}
                            i={i}
                            expanded={expanded}
                            setExpanded={setExpanded}
                            scrollRef={scrollRef}
                        />
                    )}
                </div>
            </div>
        </motion.section>
    );
}
