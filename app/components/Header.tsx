import { useRef } from "react";

export default function Header({ mainRef }) {
    const menu = ["about", "skills", "experience", "education", "portfolio", "contact"];

    const headerRef = useRef(null);

    const handleHashClick: MouseEventHandler = e => {
        e.preventDefault();
        const href = e.currentTarget.getAttribute('href');
        const offsetTop = mainRef?.current?.querySelector(href).offsetTop - headerRef.current.offsetHeight;
        window.scroll({
            top: offsetTop
        })
    }

    return (
        <header ref={headerRef} className="py-10 sticky top-0 backdrop-blur-lg z-20 relative header">
            <div className="custom-container px-4 mx-auto">
                <div className="logo-menu-wrap flex justify-between items-center">
                    <svg version="1.2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 600" width="30" height="30">
                        <path fill="white" d="m281.9 0.4c-0.2 0.2-4.2 0.7-8.9 1.1-4.7 0.3-9.2 0.7-10 0.7-0.8 0-3.8 0.4-6.5 0.9-2.8 0.5-6.4 1.2-8 1.5-1.7 0.3-3.9 0.7-5 0.8-1.1 0.2-2.9 0.6-4 0.9-1.1 0.3-3.4 0.9-5 1.2-1.7 0.3-4.4 0.8-6 1.1-1.7 0.3-5 1.3-7.5 2.1-2.5 0.8-5.2 1.7-6 1.9-0.8 0.1-7.1 2.1-14 4.4-6.9 2.3-15.4 5.5-19 7.2-3.6 1.6-10.1 4.6-14.5 6.6-4.4 2-9.4 4.7-11 5.9-1.7 1.2-3.6 2.3-4.3 2.3-0.6 0-2.1 0.9-3.2 2-1.1 1.1-2.7 2-3.5 2-0.8 0-1.5 0.4-1.5 1 0 0.5-0.5 1-1 1-0.6 0-2.9 1.3-5.3 3-2.3 1.6-4.7 2.7-5.2 2.3-0.6-0.3-0.7-0.2-0.3 0.3 0.5 0.5-0.1 1.5-1.2 2.1-1.1 0.7-2.6 1-3.2 0.5q-1.3-0.7-0.5 0.5c0.4 0.8-0.2 1.8-1.8 2.5-1.4 0.7-2.5 1.7-2.5 2.3 0 0.5-0.2 0.7-0.5 0.2-0.3-0.4-1.7 0.4-3.3 1.8-1.5 1.4-4.1 3.6-5.7 5-1.7 1.4-3.3 2.5-3.6 2.5-0.3 0-2.4 1.8-4.6 4-2.2 2.2-4.5 4-5.1 4-0.7 0-1.2 0.4-1.2 1 0 0.5-0.5 0.8-1 0.5-0.6-0.3-0.9-0.1-0.8 0.3 0.2 0.5-3.1 4.2-7.2 8.3-4.2 4.1-10.7 10.9-14.5 15.3-3.9 4.3-7.7 8.8-8.5 10-0.8 1.1-2.3 2.9-3.2 3.8-1 1-2.9 3.6-4.3 5.8-1.4 2.2-3 4-3.5 4-0.6 0-0.9 0.6-0.8 1.2 0.2 0.7-0.3 1.2-1 1-0.6-0.1-1 0.2-0.7 0.8 0.3 0.5-1.5 3.9-4 7.5-2.5 3.6-4.5 6.8-4.5 7.2 0 0.5-0.5 1.4-1.2 2.1-0.7 0.7-2.7 3.9-4.5 7-1.7 3.1-5.2 9.7-7.7 14.7-2.5 4.9-5.6 11.5-7 14.5-1.3 3-3 6.8-3.7 8.5-0.7 1.6-1.3 3.2-1.4 3.5 0 0.3-1.5 5-3.2 10.5-1.8 5.5-3.3 10.4-3.4 11 0 0.5-0.7 2.6-1.5 4.5-0.7 1.9-1.8 5.3-2.3 7.5-0.6 2.2-1.3 5.8-1.6 8-0.3 2.2-0.9 4.7-1.2 5.5-0.3 0.8-0.7 2.6-0.9 4-0.2 1.4-0.6 3.2-0.7 4-0.2 0.8-0.7 3.5-1.1 6-0.4 2.5-0.9 6.1-1.1 8-0.2 1.9-0.8 7.3-1.2 12-0.4 4.7-0.8 16.6-0.8 26.5 0 9.9 0.4 21.6 0.8 26 0.4 4.4 1 9.6 1.2 11.5 0.3 1.9 0.7 5.1 1 7 0.3 1.9 0.8 5.3 1.1 7.5 0.3 2.2 1 5.8 1.6 8 0.6 2.2 1.2 5.1 1.5 6.5 0.2 1.4 1.1 5 1.9 8 0.8 3 1.6 6.2 1.9 7 0.2 0.8 2.2 6.9 4.5 13.5 2.3 6.6 4.5 13.1 4.8 14.4 0.4 1.3 1 2.5 1.4 2.7 0.5 0.2 0.8 1.1 0.8 1.9 0 0.8 2.8 7.5 6.2 14.7 3.4 7.3 6.7 13.6 7.3 14 0.5 0.4 1.7 2.1 2.5 3.6 0.8 1.6 2.7 5.1 4.3 7.8 1.5 2.7 3.3 5.8 4 6.9 0.6 1.1 1.5 2.2 1.8 2.5 0.3 0.3 2.7 3.6 5.2 7.5 2.4 3.8 5.3 8.1 6.3 9.3 1.1 1.3 2.8 3.4 3.9 4.7 1.1 1.2 3.1 3.7 4.5 5.6 1.4 1.8 4.7 5.8 7.5 8.9 2.7 3 8.2 8.6 12 12.5 3.9 3.8 9.8 9.6 13.3 12.7 3.4 3.2 6.2 5.6 6.2 5.3 0-0.3 0.8 0.3 1.8 1.2 1.1 1 1.6 2.2 1.3 2.8q-0.6 1 0.8 0 1.3-1 2 0c0.3 0.6 3.3 3.1 6.6 5.6 3.3 2.4 8.4 5.9 11.2 7.7 2.9 1.7 5.3 3.6 5.3 4.2 0 0.5 0.3 0.9 0.7 0.8 0.5-0.1 2.6 0.9 4.8 2.2 2.3 1.4 5 3.1 6 3.8 1.1 0.6 3.1 1.7 4.5 2.3 1.4 0.6 3.4 1.8 4.5 2.8 1.1 0.9 6.3 3.6 11.5 6 5.2 2.4 10.8 4.9 12.5 5.6 1.6 0.7 4.2 1.8 5.7 2.4 1.6 0.6 3.8 1.5 5 2.1 1.3 0.5 7.5 2.5 13.8 4.6 6.3 2 12.6 4 14 4.4 1.4 0.5 4.3 1.4 6.5 1.9 2.2 0.6 5.6 1.3 7.5 1.6 1.9 0.3 5.1 1 7 1.5 1.9 0.5 5.3 1.1 7.5 1.5 2.2 0.3 5.8 0.8 8 1.1 2.2 0.3 5.1 0.7 6.5 0.9 1.4 0.3 6.1 0.8 10.5 1.2 4.4 0.4 16.3 0.8 26.5 0.8 10.2 0 22.3-0.4 27-0.9 4.7-0.4 9.6-0.9 11-1.1 1.4-0.1 4.3-0.5 6.5-0.9 2.2-0.3 5.1-0.8 6.5-1.1 1.4-0.3 4.2-0.7 6.2-1 2.1-0.3 4.9-1 6.3-1.5 1.4-0.6 2.5-0.8 2.5-0.5 0 0.3 3-0.4 6.7-1.4 3.8-1.1 9.3-2.7 12.3-3.6 3-0.9 6.3-1.7 7.2-1.8 1-0.1 1.8-0.5 1.8-1 0-0.4 1.5-1 3.2-1.4 1.8-0.4 3.7-0.8 4.3-0.9 0.5 0 3.6-1.3 6.7-2.7 3.2-1.5 6.2-2.7 6.8-2.7 0.5 0 2.7-0.9 4.7-1.9 2.1-1.1 8.3-4.1 13.7-6.8 5.4-2.6 11.5-5.7 13.5-6.7 2-1.1 4.2-2.6 4.9-3.3 0.7-0.7 1.8-1.3 2.3-1.3 0.5 0 4.8-2.7 9.6-6 4.9-3.3 9.2-6.3 9.8-6.7 0.5-0.5 3.5-2.6 6.5-4.8 3-2.2 6-4.4 6.6-5 0.6-0.5 2.8-2.4 5-4 2.1-1.7 5.2-4.2 6.8-5.7 1.7-1.5 3.5-2.4 4.1-2 0.6 0.4 0.7 0.2 0.2-0.6-0.4-0.7 0.8-2.4 3.4-4.5 2.3-1.7 8-7.5 12.7-12.7 4.8-5.3 10-11.3 11.7-13.4 1.6-2.1 3.5-4.4 4.1-5 0.5-0.6 3-3.8 5.4-7.1 2.4-3.3 6.8-9.6 9.7-14 3-4.4 5.3-8.1 5.3-8.3 0-0.1 1.2-2.1 2.7-4.5 1.5-2.3 3.5-5.6 4.5-7.2 0.9-1.7 3.8-7.3 6.5-12.6 2.6-5.3 5.5-11.4 6.4-13.5 0.9-2.1 2.8-6.8 4.2-10.4 1.4-3.6 3.9-10.6 5.6-15.5 1.7-5 3.3-10 3.6-11.3 0.3-1.2 0.7-3 1-4 0.2-0.9 0.9-3.7 1.6-6.2 0.6-2.5 1.3-5.4 1.5-6.5 0.2-1.1 0.6-3.1 1-4.5 0.3-1.4 0.7-3.4 0.9-4.5 0.2-1.1 0.6-3.4 0.9-5 0.3-1.7 0.9-5 1.2-7.5 0.4-2.5 0.8-5.6 1-7 0.2-1.4 0.7-6.1 1.1-10.5 0.4-4.4 0.8-16.3 0.8-26.5 0-10.2-0.4-22.1-0.8-26.5-0.4-4.4-0.9-9.1-1.1-10.5-0.2-1.4-0.6-4.5-1-7-0.3-2.5-0.9-5.9-1.2-7.5-0.3-1.7-0.7-3.9-0.9-5-0.1-1.1-0.5-2.7-0.8-3.5-0.3-0.8-0.9-3.3-1.2-5.5-0.3-2.2-1-5.8-1.6-8-0.5-2.2-1.4-5.1-2-6.5-0.5-1.4-1.1-3.4-1.3-4.5-0.2-1.1-1.6-5.6-3.1-10-1.4-4.4-3-8.9-3.4-10-0.5-1.1-1.9-4.7-3.1-8-1.3-3.3-3.1-7.5-4.1-9.3-1.1-1.7-1.7-3.2-1.4-3.2 0.3 0-1.5-3.9-4-8.8-2.5-4.8-5.7-10.5-7-12.7-1.3-2.2-2.9-4.9-3.5-6-0.6-1.1-1.6-2.9-2.3-4-0.7-1.1-3.9-6-7.2-10.9-3.3-4.8-6.7-9.8-7.5-11-0.8-1.3-3.1-4.2-5-6.5-1.9-2.4-4.1-5-4.8-5.7-0.6-0.8-1.2-1.6-1.2-1.9 0-0.3-1.1-1.7-2.5-3.3l-2.6-2.7c0 155-0.2 204.7-0.4 210.5-0.2 5.8-0.6 13.2-1 16.5-0.3 3.3-0.9 6.9-1.2 8-0.3 1.1-0.7 3.3-0.9 5-0.2 1.6-0.9 5.4-1.6 8.3-0.7 2.9-1.6 5.2-2.1 5.2-0.4 0-0.5 0.9-0.2 2 0.3 1.1 0.2 2-0.3 2-0.4 0-0.8 1.3-1 3-0.1 1.6-0.7 4-1.4 5.2-0.7 1.3-1.1 2.9-1 3.5 0.1 0.7-0.3 1.3-0.8 1.3-0.6 0-0.8 0.4-0.5 1 0.3 0.5-0.2 2.5-1 4.2-0.9 1.8-1.5 3.6-1.5 4 0 0.5-1 2.9-2.2 5.5-1.2 2.7-2.4 5-2.7 5.3-0.3 0.3-0.6 1.1-0.6 1.8 0 0.6-0.1 1.6-0.3 2.2-0.1 0.5-0.8 0.7-1.5 0.3q-1.2-0.8-0.5 0.5c0.5 0.7-0.4 3.4-2 6.3-1.5 2.8-3.4 6.3-4.2 7.7-0.9 1.5-2.9 4.7-4.5 7.2-1.7 2.5-3.3 4.6-3.8 4.7-0.4 0.2-0.7 0.9-0.7 1.5 0 0.7-1.8 3.8-4.1 6.8-2.2 3-5.2 7.1-6.7 9-1.5 1.9-4.5 5.2-6.7 7.3-2.2 2-3.7 3.7-3.3 3.7 0.5 0-2.9 3.7-7.5 8.2-4.6 4.6-10.5 10.1-13.1 12.3-2.7 2.2-6.3 5.2-8 6.7-1.7 1.5-3.4 2.8-3.8 2.8-0.4 0-1.3 0.6-2 1.3-0.7 0.7-4 3-7.3 5.1-3.3 2.1-7.2 4.7-8.8 5.7-1.5 1.1-2.9 1.9-3.2 1.9-0.3 0-3.5 1.8-7.3 4-3.7 2.2-7.3 3.8-8 3.5-0.6-0.3-1-0.2-0.8 0.2 0.3 0.5-2.9 2.3-7 4-4.1 1.8-8 3-8.7 2.6-0.7-0.5-0.9-0.4-0.5 0.2 0.4 0.6-3.1 2.2-8.5 3.9-5.1 1.6-11 3.5-13.2 4.2-2.2 0.7-8.5 2.1-14 3.2-5.5 1.2-13.2 2.4-17 2.8-3.9 0.5-16.2 0.8-27.5 0.9-11.3 0-23-0.4-26-0.8-3-0.4-6.9-0.9-8.5-1.2-1.7-0.2-4.4-0.6-6-0.9-1.7-0.4-4.1-0.9-5.5-1.2-1.4-0.3-3.9-0.8-5.5-1.1-1.7-0.2-4.8-1.1-7-1.9-2.2-0.7-4.6-1.4-5.3-1.4-0.6 0-2.9-0.7-5-1.6-2-1-4.8-1.9-6.2-2.1-1.4-0.3-4.5-1.4-7-2.5-2.5-1.1-5.9-2.6-7.5-3.3-1.7-0.8-4.9-2-7.3-2.9-2.8-1.1-4-2-3.5-2.9q0.8-1.2-0.5-0.5c-0.7 0.5-3.8-0.7-7.5-2.7-3.4-2-7.1-4.1-8.1-4.8-1.1-0.7-5.3-3.3-9.3-6-4-2.6-7.3-5.3-7.3-6 0-0.6-0.2-0.9-0.5-0.5-0.3 0.5-1.1 0.3-1.8-0.2-0.6-0.6-2.1-1.8-3.3-2.8-1.2-0.9-4.1-3.3-6.5-5.2-2.4-1.9-8.8-8-14.2-13.5-5.5-5.5-11.3-11.7-13.1-13.9-1.7-2.1-3.7-4.5-4.4-5.2-0.6-0.8-1-1.4-0.7-1.4 0.3 0-0.5-1.1-1.8-2.4-1.2-1.3-2.7-3-3.3-3.8-0.5-0.7-1.9-2.9-3-4.8-1-1.9-2.9-4.6-4.2-6-1.2-1.4-2.2-3.3-2.2-4.3 0-0.9-0.4-1.8-1-2-0.5-0.1-2.1-2.2-3.5-4.7-1.4-2.5-4-7.7-5.9-11.5-1.8-3.9-4.3-9.1-5.5-11.8-1.1-2.6-2.1-5.3-2.1-6 0-0.6-0.4-1.7-0.8-2.2-0.5-0.6-1.8-3.9-3-7.5-1.2-3.6-2.3-7.7-2.4-9.3-0.2-1.5-0.5-2.7-0.8-2.7-0.3 0-1.1-2.3-1.8-5.2-0.7-2.9-1.5-6.4-1.7-7.8-0.3-1.4-0.8-3.9-1-5.5-0.3-1.7-0.7-4.1-1-5.5-0.3-1.4-0.8-5.2-1.2-8.5-0.4-3.3-0.8-15-0.8-26 0-11 0.3-22.9 0.7-26.5 0.5-3.6 1-7.6 1.3-9 0.3-1.4 0.8-4.1 1.1-6 0.4-1.9 0.9-4.4 1.1-5.5 0.3-1.1 0.5-2.6 0.6-3.3 0.1-0.6 0.5-1.2 0.9-1.2 0.5 0 0.6-0.9 0.3-2-0.3-1.1-0.1-2 0.5-2 0.5 0 0.8-0.9 0.5-2-0.3-1.1-0.2-2 0.2-2 0.5 0 0.9-1.2 1-2.8 0.1-1.5 0.9-4.5 1.9-6.7 0.9-2.2 1.6-4.3 1.6-4.8-0.1-0.4 0.7-3.1 1.9-6 1.1-2.8 2.7-6.6 3.4-8.2 0.7-1.7 2.9-6.4 4.9-10.5 2-4.1 4.8-9.6 6.3-12.2 1.6-2.5 4.7-7.7 7-11.5 2.3-3.7 5.3-7.9 6.6-9.3 1.3-1.4 3-3.6 3.7-5 0.8-1.4 2.1-3.3 2.9-4.4 0.9-1 3.5-3.8 5.9-6.2 2.3-2.4 4-4.4 3.7-4.4-0.3 0 3.4-3.7 8.2-8.3 4.8-4.5 10.4-9.8 12.4-11.7 2.1-1.9 4.7-4.3 5.8-5.3 1.2-0.9 2.1-1.4 2.1-1 0 0.5 0.5 0.1 1.2-0.8 0.7-0.8 3.1-2.8 5.3-4.5 2.2-1.6 6-4.3 8.5-6 2.5-1.7 7.2-4.6 10.5-6.4 3.3-1.9 8.7-4.7 12-6.4 3.3-1.7 8-3.9 10.5-5 2.5-1 6.4-2.6 8.7-3.7 2.4-1 4.6-1.8 5-1.8 0.5 0.1 1.1 0.1 1.5 0 0.5 0 1.1-0.2 1.5-0.4 0.5-0.1 1.8-0.8 3-1.5 1.3-0.7 2.7-1 3.3-0.7 0.5 0.3 1.1 0 1.2-0.5 0.2-0.6 1.8-1.1 3.5-1.3 1.8-0.1 3.3-0.5 3.3-1 0-0.4 1.7-1 3.7-1.4 2.1-0.3 4.9-0.7 6.3-0.9 1.4-0.2 4.5-0.8 7-1.4 2.5-0.6 5.8-1.3 7.5-1.5 1.6-0.2 5.7-0.8 9-1.2 3.3-0.4 15-0.8 26-0.8 11 0 23.1 0.4 27 0.8 3.8 0.5 11.5 1.7 17 2.9 5.5 1.1 11 2.2 12.2 2.4 1.3 0.2 2.3 0.7 2.3 1.1 0 0.5 1.5 0.9 3.2 1.1 1.8 0.1 3.4 0.7 3.5 1.2 0.2 0.6 1 0.8 1.8 0.5 0.8-0.3 1.5-0.1 1.5 0.5 0 0.5 0.6 0.7 1.2 0.4 0.7-0.3 2.1 0.2 3 1 1.7 1.5 1.8 8 1.5 113.8-0.1 61.8-0.6 113.4-1 114.8-0.5 1.4-0.9 2.9-1 3.5-0.2 0.5-0.6 1.6-1 2.2-0.4 0.7-0.5 1.3-0.2 1.3 0.3 0-0.7 2.6-2.3 5.8-1.5 3.2-4.5 8.8-6.7 12.5-2.2 3.7-4.3 6.7-4.8 6.7-0.4 0-3.1 2.6-6.1 5.7-3 3.2-6.7 6.5-8.2 7.3-1.6 0.8-3.4 1.9-4.1 2.5-0.7 0.5-1.8 1.5-2.5 2.1-0.7 0.6-2.4 1.4-3.8 1.8-1.4 0.5-3.5 1.4-4.8 2.2-1.2 0.8-3.2 1.6-4.5 1.7-1.2 0.2-2.7 0.7-3.2 1-0.6 0.3-2.8 0.9-5 1.4-2.2 0.4-9.2 0.7-15.5 0.7-6.3 0-12.9-0.3-14.5-0.6-1.7-0.4-5.5-1.3-8.5-2.2-3-0.8-5.7-2-6-2.6-0.3-0.7-0.8-1.1-1.3-1.1-0.4 0.1-1 0.1-1.5 0.1-0.4 0-1.8-0.9-3.2-2-1.4-1.1-3-2-3.5-2-0.6 0-1.9-0.8-3-1.7-1.1-1-3.2-2.5-4.7-3.3-1.5-0.8-2.6-1.6-2.3-1.8 0.3-0.1-1.2-1.8-3.3-3.8-2-2-4.2-3.9-4.7-4.2-0.6-0.4-2.4-2.7-4.1-5.2-1.8-2.5-5-8.2-7.3-12.8-2.2-4.5-3.9-8.2-3.6-8.2 0.3 0-0.2-2.1-1-4.8-0.9-2.6-1.8-7.2-2.1-10.2-0.3-3-0.9-5.7-1.2-6-0.4-0.3-17.2-0.4-37.5-0.3l-36.7 0.3c0.7 12 1.2 16.8 1.5 18.5 0.4 1.6 0.7 4.3 0.9 6 0.1 1.6 0.4 3.4 0.8 4 0.3 0.5 1.3 4.1 2.1 8 0.9 3.8 2.1 8.3 2.8 10 0.7 1.6 1.3 3.2 1.3 3.5 0.1 0.3 0.5 1.1 0.9 1.7 0.4 0.7 0.5 1.7 0.2 2.3-0.3 0.5-0.2 1.2 0.2 1.4 0.5 0.2 3 4.5 5.6 9.7 2.6 5.2 5.3 10.3 6 11.4 0.7 1.1 3.7 5.4 6.7 9.5 3 4.1 6.8 9 8.5 10.9 1.6 2 4.1 4.7 5.5 6.1 1.4 1.4 5 4.7 8 7.3 3 2.7 6.6 5.6 7.9 6.5 1.3 0.9 2.9 2.3 3.7 2.9 0.8 0.7 1.7 1.3 2.1 1.3 0.5 0 1.6 0.8 2.7 1.8 1 0.9 2.7 2.1 3.7 2.7 1 0.5 6.4 3.3 12.1 6.2 5.7 2.8 11.9 5.8 13.8 6.7 1.9 0.8 6.2 2.2 9.5 3.1 3.3 0.9 6.6 1.8 7.2 1.8 0.7 0.1 1.3 0.5 1.3 0.9 0 0.5 0.4 0.6 1 0.3 0.5-0.3 3.1 0 5.7 0.6 2.7 0.6 6.1 1.3 7.8 1.6 1.6 0.3 11 0.6 20.8 0.7 9.9 0 18-0.1 18.2-0.4 0.2-0.3 2-0.6 4.2-0.8 2.1-0.2 5.9-0.9 8.5-1.7 2.7-0.8 4.8-1.3 4.8-1 0 0.3 1.5-0.1 3.2-0.9 1.8-0.7 4.1-1.2 5-1 1 0.2 2-0.1 2.3-0.6 0.3-0.6 0.9-0.8 1.5-0.5 0.5 0.3 1 0 1-0.5 0-0.6 0.7-0.8 1.5-0.5 0.8 0.3 2.1-0.2 2.7-1.1 0.7-0.8 1.9-1.3 2.5-1 0.7 0.3 1.5 0.3 1.7-0.2 0.2-0.4 4.5-2.9 9.7-5.5 5.2-2.7 11.2-5.8 13.4-7 2.2-1.2 4.1-2.5 4.2-3 0.2-0.4 1-0.7 1.8-0.7 0.8 0 1.3-0.5 1-1-0.3-0.6 0.4-1.2 1.5-1.5 1.1-0.3 2-1 2-1.5 0-0.6 0.8-1.2 1.7-1.5 1-0.2 6.6-5.1 12.4-10.7 5.8-5.7 11.2-11.4 11.9-12.8 0.8-1.4 1.7-3 2.2-3.5 0.4-0.6 1.8-2.4 3.2-4 1.3-1.7 3.3-4.6 4.4-6.5 1.1-1.9 4.3-8 7-13.5 2.8-5.5 5.7-11.6 6.6-13.5 0.8-1.9 2.2-6.2 3.1-9.5 0.9-3.3 1.8-6.9 2.1-8 0.2-1.1 0.6-2.7 0.9-3.5 0.3-0.8 0.7-2.9 0.9-4.5 0.2-1.7 0.7-5.3 1.1-8 0.4-2.8 0.9-7.3 1-10 0.2-2.8 0.4-64.4 0.4-137 0-72.6 0-132.1-0.2-132.2-0.1-0.1-1.6-1-3.4-2-1.7-1-6.6-3.7-11-5.9-4.3-2.3-8.9-4.5-10.3-4.9-1.4-0.4-4.2-1.9-6.3-3.1-2-1.3-3.9-2.1-4.2-1.7-0.2 0.5-1 0.3-1.7-0.3-0.7-0.6-2.2-1.4-3.3-1.7-1.1-0.3-6.7-2.2-12.5-4.2-5.8-2.1-11.9-4.1-13.5-4.6-1.7-0.4-6.3-1.7-10.3-2.8-3.9-1.2-7.2-1.9-7.2-1.6 0 0.3-1.1 0-2.5-0.5-1.4-0.6-4.2-1.2-6.3-1.5-2-0.3-4.9-0.7-6.5-1-1.5-0.3-3.9-0.7-5.5-1-1.5-0.3-5.2-0.7-8.2-1.1-3-0.3-6.9-0.8-8.5-1-1.7-0.3-12.7-0.7-24.6-0.9-11.9-0.3-21.8-0.3-22-0.1z" />
                    </svg>
                    <nav className="header-menu hidden sm:block">
                        <ul className="flex">
                            {menu.map(m =>
                                <li key={m} className="px-3 capitalize">
                                    <a onClick={handleHashClick} href={`#${m}`}>{m}</a>
                                </li>
                            )}
                        </ul>
                    </nav>

                    <div className="hamburger hidden">
                        <span></span>
                        <span></span>
                        <span></span>
                    </div>
                </div>
            </div>
        </header>
    )
}