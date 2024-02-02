export const initialFadeUp = {
    y: 20,
    opacity: 0
}

export const initialFadeDown = {
    y: -20,
    opacity: 0
}

export const fadeIn = (delay?: number) => {
    let style = {
        y: 0,
        opacity: 1,
        transition: {
            delay: 0
        }
    };
    if (delay) {
        style['transition']['delay'] = delay
    }
    return style;
}
