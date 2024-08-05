import * as prim from './prim.ts';

interface Status {
    valid: boolean,
    score: number,
    doubles: number,
    message: string
}

export default class Tribal {

    private arr: number[];

    private status: Status;

    constructor(str: string) {
        this.arr = this.parse(str);
        this.status = this.isValidCalc();
    }

    public getStatus(): Status {
        return this.status;
    }

    public getArray(): number[] {
        return this.arr;
    }

    public getSum2(): number[] {
        const result : number[] = [];
        for (let i = 0; i < this.getArray().length; i++) {
            for (let j = i+1; j < this.getArray().length; j++) {
                result.push(this.getArray()[i] + this.getArray()[j]);
            }
        }
        result.sort((a,b) => a-b);
        return result;
    }

    public getSum3() : number[] {
        const result : number[] = [];
        for (let i = 0; i < this.getArray().length; i++) {
            for (let j = i+1; j < this.getArray().length; j++) {
                for (let k = j+1; k < this.getArray().length; k++) {
                    result.push(this.getArray()[i] + this.getArray()[j] + this.getArray()[k]);
                }
            }
        }
        result.sort((a,b) => a-b);
        return result;
    }


    private isValidCalc(): Status {
        const values = [];
        if (this.arr.length != new Set(this.arr).size) {
            return {valid: false, doubles: -1, score: -1, message: "Duplicates primes"};
        }
        for (let i = 0; i < this.arr.length; i++) {
            if (!prim.isPrime(this.arr[i])) {
                return {valid: false, doubles: -1, score: -1, message: `${this.arr[i]} is not a prime.`};
            }
        }
        for (let i = 0; i < this.arr.length; i++) {
            for (let j = i + 1; j < this.arr.length; j++) {
                for (let k = j + 1; k < this.arr.length; k++) {
                    const sum = this.arr[i] + this.arr[j] + this.arr[k];
                    if (sum >= prim.LIMIT) {
                        return {valid: false, doubles: 0, score: -1, message: "Tribal Sum too big"}
                    } else {
                        values.push(sum);
                    }
                }
            }
        }
        const doubles = values.length - new Set(values).size;
        const score = [...new Set(values)].filter(x => prim.isPrime(x)).length;

        return {valid: true, score: score, doubles: doubles, message: "VALID"};
    }

    private parse(str: string): number[] {
        const filtered = str.replace(" ", "").split(",");
        const result: number[] = [];
        for (let i = 0; i < filtered.length; i++) {
            const num = Number(filtered[i]);
            if (isNaN(num)) {
                throw new TypeError("Falsches Format");
            } else {
                result.push(num);
            }
        }
        result.sort((a,b) => a-b);
        return result;
    }
}