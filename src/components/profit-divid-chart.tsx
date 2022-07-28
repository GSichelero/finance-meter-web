import Chart from 'chart.js/auto';
import { useEffect, useState } from 'react';

let updated = false;
let newDatesStored: any;
let newData3: any;
export function ProfitDividChart() {
    // financeData pattern = [{"product":"ALUP11.SA","type":"Stock","date":"2021-10-13T03:00:00.000Z","quantity":"4.00","unit_price":"24.25","history":[{"date":"2021-10-13T00:00:00.000Z","close":25},{"date":"2021-10-14T00:00:00.000Z","close":24.98},

    const [financeData, financeDataSet] = useState<any>(null)
    useEffect(() => {
        async function fetchMyAPI() {
            let response = await fetch('https://finance-meter-server.herokuapp.com/get-financial-data')
            response = await response.json()
            let request = {
                "financeData": response,
                "withDividends": true
            }
            let transform_results: any = await fetch('https://finance-meter-server.herokuapp.com/transform-finance-data', {
                headers: {
                    'Content-Type': 'application/json'
                },
                method: 'POST',
                body: JSON.stringify(request)
            });

            transform_results = await transform_results.json();
            newDatesStored = transform_results[0];
            // loop through all elements in newDatesStored
            for (let i = 0; i < newDatesStored.length; i++) {
                // if newDatesStored[i].toString() contains the word 'Standart', delete it
                if (newDatesStored[i].toString().includes('Standart')) {
                    newDatesStored.splice(i, 1);
                }
            }
            // order newDatesStored by date
            newDatesStored.sort((a: any, b: any) => {
                return new Date(a).getTime() - new Date(b).getTime();
            });
            
            newData3 = transform_results[1];
            financeDataSet(response);

        }
        
        if (financeData === null) {
            updated = false;
            fetchMyAPI()
        }
      }, [])

    if (financeData && !updated) {
        updated = true;
        
        // create a myChart element in the DOM
        let myChart: any;
        if (myChart) {
            myChart.destroy();
        }
        const myChartHtml = window.document.createElement('canvas');
        myChartHtml.id = 'myChart';
        window.document.body.appendChild(myChartHtml);
        const canvas = window.document.getElementById('myChart');
        const ctx = (canvas as HTMLCanvasElement).getContext('2d')!;
        myChart = new Chart(ctx, {
            type: 'line',
            data: {
                labels: newDatesStored,
                datasets: [
                    ...newData3.map((element: any, index: number) => {
                        return {
                            label: element[0].product,
                            data: [...element.map((element2: any) => {
                                return {
                                    x: String(new Date(element2.date)),
                                    y: Number(element2.delta)
                                }
                            })],
                            backgroundColor:`rgba(${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)}, 0.2)`,
                            borderColor: `rgba(${Math.floor(Math.random() * 246) + 10}, ${Math.floor(Math.random() * 246) + 10}, ${Math.floor(Math.random() * 246) + 10}, 1)`,
                            borderWidth: 1
                        }
                    })
                ]
            },
            options: {
                scales: {
                    y: {
                        beginAtZero: true
                    }
                }
            }
        });

        return (
            <div>
                <canvas id="myChart"></canvas>
            </div>
        );
    }

    return (
        <div>
            <a href="/">Menu</a>
            <h2>Profit with Dividends Chart</h2>
        </div>
    );
}