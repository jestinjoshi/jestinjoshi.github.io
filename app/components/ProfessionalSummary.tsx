import { experience } from "./Experience";

export default function ProfessionalSummary() {
    return (
        <div id="professional-summary" className="py-5 sm:py-10 hidden lg:block">
            <div className="custom-container px-5 mx-auto flex gap-8">
                <div className="year-wrap w-[160px]">
                    <h3 className="mb-4">Professional Summary</h3>
                    <span className="gradient-text text-5xl font-semibold mr-1">5</span>
                    <span>Years</span>
                </div>
                <div className="experience-wrap flex gap-y-20 flex-wrap justify-end w-full pr-20">
                    {experience.map((e, i) =>
                        <div key={e.startDate} className={`experience ${i === 1 ? 'w-[60%]' : 'w-[40%]'} relative ${i === 2 && 'order-1'} pr-6`}>
                            <div className="flex flex-col mb-10">
                                <span className="text-sm mb-2">{e.startDate} - {e.endDate}</span>
                                <span className="text-xs font-semibold">1 yr 10 months</span>
                            </div>
                            {i === 2 && <span className="curve"></span>}
                            <div className="sd-bottom">
                                <p className="font-medium">{e.position}</p>
                                <span className="text-sm">{e.company}</span>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}