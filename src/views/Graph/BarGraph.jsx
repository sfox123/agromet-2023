import React from 'react'
import { Bar } from 'react-chartjs-2'

const BarGraph = (props) => {
    const { value } = props;
    return (
        <div className="m-top chart__body">
            <Bar
                height={400}
                width={600}
                data={{
                    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'July', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
                    datasets: [{
                        label: 'Rainfall (mm)',
                        data: value,
                        backgroundColor: '#2887EB',
                        borderColor: '#235F9E',
                        borderWidth: 2
                    }]
                }

                }
                options={{
                    maintainAspectRatio: false,
                    responsive: true,
                    scales: {
                        yAxes: [{
                            ticks: {
                                beginAtZero: true
                            }
                        }]
                    }
                }}
            />
        </div>
    )
}

export default BarGraph