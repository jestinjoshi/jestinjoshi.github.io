export default function Experience() {
    const experience = [
        {
            position: "UI Developer 2",
            company: "Media.net",
            companyWebsite: "https://www.media.net/",
            linkedIn: "https://www.linkedin.com/company/media-net/",
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
            company: "EDAS Tech",
            companyWebsite: "https://www.edastech.com/",
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
            linkedIn: "https://www.linkedin.com/company/media-net/",
            location: "Mumbai",
            startDate: "Nov 2018",
            endDate: "Feb 2021",
            responsibilities: [
                "Developed websites using React, Vue, WordPress, and CakePHP.",
                "Solely developed a mobile app using React Native"
            ]
        },
        {
            position: "Software Development Trainee",
            company: "VSPL",
            companyWebsite: "https://www.vspl.com/",
            linkedIn: "https://www.linkedin.com/company/vspl/",
            location: "Mumbai",
            startDate: "June 2018",
            endDate: "Sep 2021",
            responsibilities: [
                "Developed web apps using ReactJS and REST APIs",
                "Developed Android Apps using React Native"
            ]
        }
    ];

    return (
        <section id="experience" className="py-10">
            <div className="container mx-auto">
                <h2 className="text-3xl section-heading mb-10">Experience</h2>
                <div className="experience-wrap">
                    {experience.map(e =>
                        <div key={e.startDate} className="experience mb-10">
                            <div className="experience-title">
                                <span className="experience-role mr-1">{e.position}</span>
                                <span className="sep mr-1">|</span>
                                <a href={e.companyWebsite} target="_blank" className="experience-company hover:underline">{e.company}</a>
                            </div>
                            <p className="experience-duration">{e.startDate} - {e.endDate}</p>
                            <ul className="experience-description">
                                {e.responsibilities.map((r, i) =>
                                    <li key={i} className="experience-bullets">{r}</li>
                                )}
                            </ul>
                        </div>
                    )}
                </div>
            </div>
        </section>
    )
}