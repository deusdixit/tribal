import Tribal from "./tribal.ts";
import {ChartData} from "chart.js";
import {createColumnHelper} from "@tanstack/react-table";

export function toDatapoints(tribal: Tribal): ChartData {
    const labels: string[] = [];
    const sum2 = tribal.getSum2();
    const sum3 = tribal.getSum3();
    for (let i = 0; i < Math.max(tribal.getArray().length, sum2.length, sum3.length); ++i) {
        labels.push(i.toString());
    }
    const datapoints = tribal.getArray();
    return {
        labels: labels,
        datasets: [
            {
                data: datapoints,
                label: "Primes",
                cubicInterpolationMode: 'monotone',
                backgroundColor: 'rgb(75, 192, 192)',
                tension: 0.4,
                borderColor: 'rgb(75, 192, 192)'
            },
            {
                data: sum2,
                label: "2er Summen",
                cubicInterpolationMode: 'monotone',
                backgroundColor: 'rgb(255, 205, 86)',
                borderColor: 'rgb(255, 205, 86)'
            },
            {
                data: sum3,
                label: "3er Summen",
                cubicInterpolationMode: 'monotone',
                backgroundColor: 'rgb(225,66,66)',
                borderColor: 'rgb(225,66,66)'
            }
        ]
    }
}

type Data = {
    prime: number,
    mod3: number,
    mod5: number,
    mod7: number,
    mod11: number,
    mod13: number,
    mod17: number,
    mod19: number,
    mod23: number,
}

const columnHelper = createColumnHelper<Data>()

export const columns = [
    columnHelper.accessor('prime', {
        cell: info => info.getValue(),
        footer: info => info.column.id,
    }),
    columnHelper.accessor(row => row.mod3, {
        id: 'mod3',
        cell: info => info.getValue(),
        header: () => "Mod 3",
        footer: info => info.column.id,
    }),
    columnHelper.accessor(row => row.mod5, {
        id: 'mod5',
        cell: info => info.getValue(),
        header: () => "Mod 5",
        footer: info => info.column.id,
    }),
    columnHelper.accessor(row => row.mod7, {
        id: 'mod7',
        cell: info => info.getValue(),
        header: () => "Mod 7",
        footer: info => info.column.id,
    }),
    columnHelper.accessor(row => row.mod11, {
        id: 'mod11',
        cell: info => info.getValue(),
        header: () => "Mod 11",
        footer: info => info.column.id,
    }),
    columnHelper.accessor(row => row.mod13, {
        id: 'mod13',
        cell: info => info.getValue(),
        header: () => "Mod 13",
        footer: info => info.column.id,
    }),
    columnHelper.accessor(row => row.mod17, {
        id: 'mod17',
        cell: info => info.getValue(),
        header: () => "Mod 17",
        footer: info => info.column.id,
    }),
    columnHelper.accessor(row => row.mod19, {
        id: 'mod19',
        cell: info => info.getValue(),
        header: () => "Mod 19",
        footer: info => info.column.id,
    }),
    columnHelper.accessor(row => row.mod23, {
        id: 'mod23',
        cell: info => info.getValue(),
        header: () => "Mod 23",
        footer: info => info.column.id,
    }),
]

export function toData(tribal: Tribal): Data[] {
    const result: Data[] = [];
    tribal.getArray().forEach((x) => {
        result.push({
            prime: x,
            mod3: x % 3,
            mod5: x % 5,
            mod7: x % 7,
            mod11: x % 11,
            mod13: x % 13,
            mod17: x % 17,
            mod19: x % 19,
            mod23: x % 23
        })
    });
    return result;
}