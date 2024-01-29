"use client";

import emailjs from '@emailjs/browser';

export default function Contact() {

    // const handleSubmit = (e: SubmitEvent) => {

    // };

    return (
        <section id="contact" className="py-10">
            <div className="custom-container px-4 mx-auto">
                <h2 className="text-3xl section-heading mb-10">Contact</h2>
                <div className="contact-wrap">
                    <form action="dialog" className='flex gap-10 flex-wrap'>
                        <input type="text" name="name" id="name" placeholder="Name" className='flex-1 p-4 rounded-md bg-slate-900' />
                        <input type="email" name="email" id="email" placeholder="Email" className='flex-1 p-4 rounded-md bg-slate-900'/>
                        <textarea rows={4} name="message" id="message" placeholder="Message" className='w-full p-4 rounded-md bg-slate-900 resize-none' />
                        <input type="submit" value="Send" className='send py-4 px-12 text-white rounded-md cursor-pointer' />
                    </form>
                </div>
            </div>
        </section>
    )
}