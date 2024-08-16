import { useMemo } from "react";

export default function useExperience() {
    return useMemo(() => {
        const d = new Date();
        let year = d.getFullYear();
        if (d.getMonth() < 6) {
            year--;
        }
        return Math.abs(2018 - year);
    }, [])
}