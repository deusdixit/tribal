import {useState} from 'react'
import './App.css'
import Tribal from './core/tribal.ts'
import {Chart as Chart2} from "react-chartjs-2"
import {CategoryScale, ChartEvent, ChartTypeRegistry, LegendElement, LegendItem} from "chart.js";
import Chart from "chart.js/auto"
import {toDatapoints} from "./core/converter.ts";
// import {Table} from "react-bootstrap";
// import {useReactTable} from "@tanstack/react-table";
import PrimeTable from "./PrimeTable.tsx";

Chart.register(CategoryScale);
Chart.defaults.borderColor = '#5c5c5c'
Chart.defaults.color = '#FFFFFF'

function App() {
    const [tribal, setTribal] = useState(new Tribal(""));
    // const modulos: number[] = [3, 5, 7, 11, 13, 17, 19, 23];
    // const table = useReactTable(options);
    const chartPlugins = {
        legend: {
            onClick(_ : ChartEvent, legendItem: LegendItem, legend: LegendElement<keyof ChartTypeRegistry>) {
                const index = legendItem.datasetIndex;
                const ci = legend.chart;
                let biggest = 0;

                if (index !== undefined) {
                    if (ci.isDatasetVisible(index)) {
                        ci.hide(index);
                        legendItem.hidden = true;
                    } else {
                        ci.show(index);
                        legendItem.hidden = false;
                    }
                    ci.data.datasets.forEach((ds, dsIndex) => {
                        if (ci.isDatasetVisible(dsIndex) && ds.data.length > biggest) {
                            biggest = ds.data.length;
                        }
                    });
                    ci.data.labels = [...Array(biggest).keys()].map((x) => x.toString());
                    //console.log(ci.data.labels);
                    ci.update();
                }
            }
        }
    };

    const chartDS = toDatapoints(tribal);


    return (
        <>
            <div style={{width: '100%'}}>
                <textarea style={{width: '100%'}} onChange={x => setTribal(new Tribal(x.target.value))}></textarea>
            </div>
            <h1>{tribal.getStatus().valid ? `Score = ${tribal.getStatus().score}, Duplikate = ${tribal.getStatus().doubles}` : tribal.getStatus().message}</h1>
            <div className={"chart-container"}>
                <Chart2 type={"line"} data={chartDS} options={{
                    responsive: true, maintainAspectRatio: true, plugins: chartPlugins
                }}></Chart2>
            </div>
            <h2>Logarithmische Darstellung</h2>
            <div className={"chart-container"}>
                <Chart2 type={"line"} data={chartDS} options={{
                    scales: { xAxis: { type: 'logarithmic'}},
                    responsive: true, maintainAspectRatio: true, plugins: chartPlugins
                }}></Chart2>
            </div>
            <div className="card">
                <PrimeTable tribal={tribal}></PrimeTable>
            </div>
        </>
    )
}

export default App
