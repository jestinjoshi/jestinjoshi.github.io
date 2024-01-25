export default function Skills() {
    return (
        <section id="skills" className="py-10">
            <div className="container px-4 mx-auto">
                <h2 className="text-3xl section-title">Skills</h2>
                <div className="skill-type-wrap">
                    <div className="skill-type">
                        <p className="skill-type-heading">Web Development</p>
                        <p className="skills">Next.js, Node.js, PHP, WordPress, Laravel, RESTful API</p>
                    </div>
                    <div className="skill-type">
                        <p className="skill-type-heading">Frontend Development</p>
                        <p className="skills">HTML5, CSS3, Bootstrap, JavaScript, ES6, jQuery, React, Redux, Next.js</p>
                    </div>
                    <div className="skill-type">
                        <p className="skill-type-heading">UI/UX Design</p>
                        <p className="skills">Photoshop, Zeplin, Figma, Wireframing, User Research, Usability Testing</p>
                    </div>
                    <div className="skill-type">
                        <p className="skill-type-heading">Professional Skills</p>
                        <p className="skills">Effective Communication, Time Management, Website Optimization, Agile methodologies, SEO, Design Patterns and Principles</p>
                    </div>
                </div>
            </div>
        </section>
    )
}