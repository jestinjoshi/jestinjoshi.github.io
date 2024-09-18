import React, { useMemo } from "react";
import useExperience from "../utils/useExperience";
import { experience, ExperienceType } from "./Experience";

export const getDateDiff = (date1: string, date2: string) => {
    const dateObj1 = new Date(date1);
    const dateObj2 = date2 === "Present" ? new Date() : new Date(date2);

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

const variableWidth = ['w-[40%]', 'w-[60%]', 'w-[40%] order-1', 'w-[60%] order-2', 'w-[40%] order-3'];

export default function ProfessionalSummary() {
    const yearsOfExperience = useExperience();

    const chunksOfExperience = useMemo(() => {
        const chunkSize = 2;
        return experience.reduce<ExperienceType[][]>((acc, curr, i) => {
            const chunkIndex = Math.floor(i / chunkSize);
            if (!acc[chunkIndex]) {
                acc[chunkIndex] = []; // Start a new chunk
            }
            acc[chunkIndex].push(curr);
            return acc;
        }, []);
    }, [])

    return (
        <div id="professional-summary" className="py-5 sm:py-10 hidden sm:block">
            <div className="custom-container px-5 mx-auto flex flex-col lg:flex-row gap-8">
                <div className="year-wrap w-full lg:w-[160px] flex flex-row lg:flex-col justify-between lg:justify-start items-center lg:items-start">
                    <h3 className="mb-4 border-b pb-2 lg:pb-4 flex-1 lg:flex-none">Professional Summary</h3>
                    <div className="pl-4 lg:pl-0">
                        <span className="gradient-text text-5xl font-semibold mr-1">{yearsOfExperience}</span>
                        <span>Years</span>
                    </div>
                </div>
                <div className="experience-wrap gap-y-20 flex flex-wrap justify-end px-20">
                    {chunksOfExperience.map((experienceChunk, ind) => (
                        <div key={ind} className={`relative flex w-full ${ind % 2 !== 0 ? 'flex-row-reverse' : 'flex-row'}`}>
                            {experienceChunk.map((e, i) =>
                                <React.Fragment key={e.startDate}>
                                    {ind > 0 && i === 0 && <span className={`curve ${ind % 2 === 0 ? 'reverse' : ''}`}></span>}
                                    <div className={`experience relative flex-auto ${i % 2 === 0 ? 'basis-3/5' : 'basis-2/5'} pr-6`}>
                                        <div className="flex flex-col mb-10">
                                            <span className="text-sm mb-2 whitespace-nowrap">{e.startDate} - {e.endDate}</span>
                                            <span className="text-xs font-semibold">{getDateDiff(e.startDate, e.endDate)}</span>
                                        </div>
                                        <div className="sd-bottom">
                                            <p className="font-medium whitespace-nowrap">{e.position}</p>
                                            <span className="text-sm">{e.company}</span>
                                        </div>
                                    </div>
                                </React.Fragment>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}