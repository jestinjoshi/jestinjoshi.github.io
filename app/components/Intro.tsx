import Image from "next/image";
import avatar from '../img/avatar.png';

export default function Intro() {
    return (
        <section id="about" className="py-10">
            <div className="container mx-auto">
                <div className="flex justify-center">
                    <div className="avatar-wrap w-max relative w-[300px]">
                        <Image className="relative z-10" alt="Avatar" width={300} height={300} src={avatar}></Image>
                        <div id="shape"></div>
                    </div>
                    <div className="about">
                        <h1 className="text-5xl mb-5">Hi, I'm Jestin</h1>
                        <p className="text-base">I am a frontend web developer with a track record of {Math.abs(2018 - new Date().getFullYear())}+ five years in developing websites across diverse categories, including blogs, e-commerce, dashboards, and static sites. I love solving complex problems with cutting-edge web technologies and collaborating with talented teams. I like implementing challenging UI interactions and components.</p>

                        <p className="text-base">I am always eager to learn new skills and explore new challenges. Currently, I'm keen on delving into backend technologies, continuous integration and continuous deployment (CI/CD), and database development.</p>

                        <p className="text-base">If you want to connect with me or learn more about my work, feel free to reach out to me on LinkedIn or drop me an email. I look forward to hearing from you!</p>
                    </div>
                </div>
            </div>
        </section>
    )
}