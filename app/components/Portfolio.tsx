export default function Portfolio() {
    const portfolio = [
        {
            name: 'Meet Participants Checlist',
            link: 'https://chrome.google.com/webstore/detail/meet-participants-checkli/oomekahllchgbndfpgjjggokkcjginmn',
            description: 'A Chrome extension that adds a checkbox next to each Google Meet participant',
        },
        {
            name: 'Master Builder',
            link: 'https://github.com/jestinjoshi/master-builder',
            description: 'An Electron App to execute builds on an internal project with multiple configs simultaneously',
        },
        {
            name: 'Forstar Engineers',
            link: 'https://forstarengineers.com',
            description: 'A website for a local business that I developed as a freelancer.'
        },
        {
            name: 'Online Lottery Picker (Frontend)',
            link: 'https://online-lottery-23667.web.app/lottery',
            description: 'A website for a raffle event of a local church. This was a pro bono work',
        },
        {
            name: 'Online Lottery Seller (Backend)',
            link: 'https://online-lottery-23667.web.app/',
            description: 'A website for a raffle event of a local church. This was a pro bono work',
        },
        {
            name: 'Online Quiz',
            link: 'https://vue-assignment-virid.vercel.app/',
            description: '',
        },
    ];

    return (
        <section id="portfolio" className="py-10">
            <div className="custom-container px-4 mx-auto">
                <h2 className="text-3xl section-heading mb-10">Portfolio</h2>
                <div className="portfolio-wrap">
                    {portfolio.map(e =>
                        <div key={e.link} className="portfolio mb-10">
                            <div className="portfolio-title">
                                <a href={e.link} target="_blank" rel="noopener noreferrer" className="hover:underline">
                                    <p className="project-name">{e.name}</p>
                                </a>
                                <p className="portfolio-description">{e.description}</p>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </section>
    )
}