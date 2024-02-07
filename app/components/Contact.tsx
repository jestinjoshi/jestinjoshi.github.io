"use client";

import emailjs from '@emailjs/browser';
import { AnimatePresence, motion } from 'framer-motion';
import { FormEventHandler, useRef, useState } from 'react';
import { fadeIn, initialFadeUp } from '../animations';

export default function Contact() {

    const [emailResponse, setEmailResponse] = useState('');

    const handleSubmit: FormEventHandler<HTMLFormElement> = ({ target }) => {
        const publicKey = 'mwAHWxKqI18aSoZcb';
        const templateParams = {
            from_name: (target as any).name.value,
            email: (target as any).email.value,
            message: (target as any).message.value,
        };
        emailjs.send('default_service', 'template_9p5yu7j', templateParams, publicKey)
            .then(res => {
                if (res.status === 200) {
                    setEmailResponse('Your email has been sent successfully');
                };
            })
            .catch(res => {
                setEmailResponse('There is an error in the email plugin. Please send an email to jestinjoshi@gmail.com');
                (window as any).dataLayer.push({
                    event_name: 'email_error'
                })
            });
    };

    const scrollRef = useRef(null);

    return (
        <motion.section ref={scrollRef} initial={initialFadeUp} whileInView={fadeIn(0.5)} viewport={{ once: true }} id="contact" className="py-10">
            <div className="custom-container px-5 mx-auto">
                <h2 className="text-3xl section-heading mb-10 gradient-text">Contact</h2>
                <div className="contact-wrap">
                    <AnimatePresence initial={false}>
                        {emailResponse.length ?
                            <motion.div initial={initialFadeUp} animate={fadeIn()}>{emailResponse}</motion.div>
                            :
                            <motion.form exit={{ height: 0 }} initial={{ ...initialFadeUp, height: 'auto' }} animate={fadeIn()} onSubmit={handleSubmit} method="dialog" className='flex gap-5 lg:gap-10 flex-wrap'>
                                <motion.input initial={initialFadeUp} whileInView={fadeIn(0.7)} viewport={{ once: true, root: scrollRef }} required type="text" name="name" id="name" placeholder="Name" aria-label="Name" className='flex-1 p-4 rounded-md gradient-form' />
                                <motion.input initial={initialFadeUp} whileInView={fadeIn(0.9)} viewport={{ once: true, root: scrollRef }} required type="email" name="email" id="email" placeholder="Email" aria-label="Email" className='flex-1 p-4 rounded-md gradient-form' />
                                <motion.textarea initial={initialFadeUp} whileInView={fadeIn(1.1)} viewport={{ once: true, root: scrollRef }} required rows={4} name="message" id="message" placeholder="Message" aria-label="Message" className='w-full p-4 rounded-md gradient-form resize-none' />
                                <motion.input initial={initialFadeUp} whileInView={fadeIn(1.3)} viewport={{ once: true, root: scrollRef }} type="submit" value="Send" className='send py-3 px-10 text-white rounded-md cursor-pointer glass' />
                            </motion.form>
                        }
                    </AnimatePresence>
                </div>
            </div>
        </motion.section>
    )
}