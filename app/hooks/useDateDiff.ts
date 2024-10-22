import { useMemo } from "react";

export const useDateDiff = (date1: string, date2: string) => {
    return useMemo(() => {
        const dateObj1 = new Date(date1);
        const dateObj2 = date2 === "Present" ? new Date() : new Date(date2);

        let years = dateObj2.getFullYear() - dateObj1.getFullYear();
        let months = dateObj2.getMonth() - dateObj1.getMonth();

        if (months < 0) {
            years--;
            months += 12;
        }

        const yearString = years === 1 ? "yr" : "yrs";
        const monthString = months === 1 ? "month" : "months";

        let result = years > 0 ? `${years} ${yearString} ` : '';
        result += months > 0 ? `${months} ${monthString}` : '';

        return result;
    }, [date1, date2]);
};
