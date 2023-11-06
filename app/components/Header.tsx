export default function Header() {
    const menu = ["about", "skills", "experience", "education", "portfolio", "contact"];

    return (
        <header className="py-10">
            <div className="container mx-auto">
                <div className="logo-menu-wrap flex justify-between items-center">
                    <h1 className="logo text-2xl"><strong>Jestin</strong> Palamuttam</h1>

                    <nav className="header-menu">
                        <ul className="flex">
                            {menu.map(m => <li key={m} className="px-3 capitalize">
                                <a href={`#${m}`}>{m}</a>
                            </li>)}
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