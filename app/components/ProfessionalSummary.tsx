import React, { useMemo } from "react";
import useExperience from "../hooks/useExperience";
import { experience, ExperienceType } from "./Experience";
import { useDateDiff } from "../hooks/useDateDiff";

const ExperienceChunk = React.memo(({ experienceChunk, ind }: { experienceChunk: ExperienceType[], ind: number }) => (
    <div key={ind} className={`relative flex w-full ${ind % 2 !== 0 ? 'flex-row-reverse' : 'flex-row'}`}>
        {experienceChunk.map((e, i) => {
            const dateDiff = useDateDiff(e.startDate, e.endDate);
            return (
                <React.Fragment key={e.startDate}>
                    {ind > 0 && i === 0 && <span className={`curve ${ind % 2 === 0 ? 'reverse' : ''}`}></span>}
                    <div className={`experience relative flex-auto ${i % 2 === 0 ? 'basis-3/5' : 'basis-2/5'} pr-6`}>
                        <div className="flex flex-col mb-10">
                            <span className="text-sm mb-2 whitespace-nowrap">{e.startDate} - {e.endDate}</span>
                            <span className="text-xs font-semibold">{dateDiff}</span>
                        </div>
                        <div className="sd-bottom">
                            <p className="font-medium whitespace-nowrap">{e.position}</p>
                            <span className="text-sm">{e.company}</span>
                        </div>
                    </div>
                </React.Fragment>
            );
        })}
    </div>
));

export default function ProfessionalSummary() {
    const yearsOfExperience = useExperience();

    const chunksOfExperience = useMemo(() => {
        const chunkSize = 2;
        return experience.reduce<ExperienceType[][]>((acc, curr, i) => {
            const chunkIndex = Math.floor(i / chunkSize);
            if (!acc[chunkIndex]) {
                acc[chunkIndex] = [];
            }
            acc[chunkIndex].push(curr);
            return acc;
        }, []);
    }, []);

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
                        <ExperienceChunk key={ind} experienceChunk={experienceChunk} ind={ind} />
                    ))}
                </div>
            </div>
        </div>
    );
}
