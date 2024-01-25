"use client";

import emailjs from '@emailjs/browser';

export default function Contact() {

    const handleSubmit = (e: SubmitEvent) => {

    };

    return (
        <section id="contact" className="py-10">
            <div className="container px-4 mx-auto">
                <h2 className="text-3xl section-heading mb-10">Contact</h2>
                <div className="contact-wrap">
                    <form onSubmit={handleSubmit} action="dialog">
                        <input type="text" name="name" id="name" placeholder="Name" />
                        <input type="email" name="email" id="email" placeholder="Email" />
                        <textarea name="message" id="message" placeholder="Message" />
                        <input type="submit" value="Send" />
                    </form>
                </div>
            </div>
        </section>
    )
}