import React, { useMemo } from "react";
import useExperience from "../hooks/useExperience";
import { experience, ExperienceType } from "./Experience";
import { useDateDiff } from "../hooks/useDateDiff";

const ExperienceItem: React.FC<{ experience: ExperienceType; isFirstInChunk: boolean; isEvenIndex: boolean; }> = ({ experience, isFirstInChunk, isEvenIndex }) => {
    const dateDiff = useDateDiff(experience.startDate, experience.endDate);

    return (
        <React.Fragment>
            {isFirstInChunk && <span className={`curve ${isEvenIndex ? 'reverse' : ''}`}></span>}
            <div className={`experience relative flex-auto ${isEvenIndex ? 'basis-3/5' : 'basis-2/5'} pr-6`}>
                <div className="flex flex-col mb-10">
                    <span className="text-sm mb-2 whitespace-nowrap">{experience.startDate} - {experience.endDate}</span>
                    <span className="text-xs font-semibold">{dateDiff}</span>
                </div>
                <div className="sd-bottom">
                    <p className="font-medium whitespace-nowrap">{experience.position}</p>
                    <span className="text-sm">{experience.company}</span>
                </div>
            </div>
        </React.Fragment>
    );
};

const ExperienceChunk = React.memo(function ExperienceChunk({ experienceChunk, index }: { experienceChunk: ExperienceType[], index: number }) {
    return (
        <div key={index} className={`relative flex w-full ${index % 2 !== 0 ? 'flex-row-reverse' : 'flex-row'}`}>
            {experienceChunk.map((e, i) => (
                <ExperienceItem
                    key={e.startDate}
                    experience={e}
                    isFirstInChunk={index > 0 && i === 0}
                    isEvenIndex={index % 2 === 0}
                />
            ))}
        </div>
    );
});

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
                    {chunksOfExperience.map((experienceChunk, index) => (
                        <ExperienceChunk key={index} experienceChunk={experienceChunk} index={index} />
                    ))}
                </div>
            </div>
        </div>
    );
}
