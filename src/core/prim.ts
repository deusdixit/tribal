export const LIMIT = Math.pow(2, 26);

export const isPrime = (num: number) => {
    for(let i = 2, s = Math.sqrt(num); i <= s; i++) {
        if(num % i === 0) return false;
    }
    return num > 1;
}