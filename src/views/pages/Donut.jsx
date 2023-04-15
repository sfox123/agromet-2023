import React from 'react'
import { Pie } from 'react-chartjs-2'

export default function Donut() {
    return (
        <div>
            <Pie
                height={100}
                width={100}
                data={{
                    labels: ['Rainfall', 'No Rain'],
                    datasets: [{
                        data: ['10', '21'],
                        backgroundColor: ['#2887EB', 'brown'],
                        borderColor: '#235F9E',
                        borderWidth: 2
                    }]
                }

                }
                options={{
                    maintainAspectRatio: false,
                    responsive: true,
                    scales: {
                        scaleLabel: false,
                    },
                    showLines: false,
                }}
            />
        </div>
    )
}
