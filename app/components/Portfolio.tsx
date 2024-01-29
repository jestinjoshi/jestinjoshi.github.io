export default function Portfolio() {
    const portfolio = [
        {
            name: 'Forstar Engineers',
            link: 'https://forstarengineers.com',
            description: ''
        },
        {
            name: 'Online Lottery Picker (Frontend)',
            link: 'https://online-lottery-23667.web.app/lottery',
            description: '',
        },
        {
            name: 'Online Lottery Seller (Backend)',
            link: 'https://online-lottery-23667.web.app/',
            description: '',
        },
        {
            name: 'Online Quiz',
            link: 'https://vue-assignment-virid.vercel.app/',
            description: '',
        },
        {
            name: 'Meet Participants Checlist',
            link: 'https://chrome.google.com/webstore/detail/meet-participants-checkli/oomekahllchgbndfpgjjggokkcjginmn',
            description: '',
        },
        {
            name: 'Master Builder',
            link: 'https://github.com/jestinjoshi/master-builder',
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
                                <a href={e.link} target="_blank" className="portfolio-company hover:underline">{e.name}</a>
                            </div>
                            <p className="portfolio-description">{e.description}</p>
                        </div>
                    )}
                </div>
            </div>
        </section>
    )
}