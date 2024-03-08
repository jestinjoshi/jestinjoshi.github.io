import { experience } from "./Experience";

export const getDateDiff = (date1: string, date2: string) => {
    const dateObj1 = new Date(date1);
    const dateObj2 = new Date(date2);

    let years = dateObj2.getFullYear() - dateObj1.getFullYear();
    let months = dateObj2.getMonth() - dateObj1.getMonth();

    // Handle months exceeding a year
    if (months > 12) {
        years++;
        months -= 12;
    } else if (months < 0) { // Handle negative months (previous year)
        years--;
        months += 12;
    }

    const yearString = years === 1 ? "yr" : "yrs"; // Pluralize year
    const monthString = months === 1 ? "month" : "months"; // Pluralize month

    let result = years > 0 ? `${years} ${yearString} ` : '';
    result += months > 0 ? `${months} ${monthString}` : '';

    return result;
}

const variableWidth = ['w-[40%]', 'w-[60%]', 'w-[40%] order-1', 'w-[50%]'];

export default function ProfessionalSummary() {
    return (
        <div id="professional-summary" className="py-5 sm:py-10 hidden md:block">
            <div className="custom-container px-5 mx-auto flex flex-col lg:flex-row gap-8">
                <div className="year-wrap w-full lg:w-[160px] flex flex-row lg:flex-col justify-between lg:justify-start items-center lg:items-start">
                    <h3 className="mb-4 border-b pb-2 lg:pb-4 flex-1 lg:flex-none">Professional Summary</h3>
                    <div className="pl-4 lg:pl-0">
                        <span className="gradient-text text-5xl font-semibold mr-1">5</span>
                        <span>Years</span>
                    </div>
                </div>
                <div className="experience-wrap flex gap-y-20 flex-wrap justify-end w-full pr-20">
                    {experience.map((e, i) =>
                        <div key={e.startDate} className={`experience ${variableWidth[i]} relative pr-6`}>
                            <div className="flex flex-col mb-10">
                                <span className="text-sm mb-2">{e.startDate} - {e.endDate}</span>
                                <span className="text-xs font-semibold">{getDateDiff(e.startDate, e.endDate)}</span>
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