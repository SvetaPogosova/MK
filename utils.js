export const getRandom = num => {
    const length = num - 1;
    return Math.ceil(Math.random() * length)
}