export default function Education() {
    return (
        <section id="education" className="py-10">
            <div className="custom-container px-4 mx-auto">
                <h2 className="text-3xl section-heading mb-10">Education</h2>
                <div className="education-wrap">
                    <div className="education mb-10">
                        <div className="flex flex-col sm:flex-row justify-between items-center mb-2">
                            <div className="education-title text-xl">
                                <span className="education-role mr-1">Bachelor of Science (Information Technology)</span>
                                <span className="sep mr-1">|</span>
                                <a href="https://mu.ac.in/" className="education-company hover:underline">University of Mumbai</a>
                            </div>
                            <p className="education-duration italic">July 2014 - Oct 2017</p>
                        </div>
                        <p className="education-description">A comprehensive undergraduate program specializing in Information Technology, equipping me with a strong foundation in programming, software development, and IT concepts. Gained practical experience through real-world projects, fostering the ability to apply theoretical knowledge in practical settings. Developed industry-relevant skills and knowledge to excel in IT roles.</p>
                    </div>
                </div>
            </div>
        </section>
    )
}