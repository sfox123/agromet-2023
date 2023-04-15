// import React, { useState } from 'react'
// import {
//     ResponsiveContainer,
//     AreaChart,
//     XAxis,
//     YAxis,
//     Tooltip,
//     CartesianGrid,
//     Area
// } from 'recharts'

// const LineGraph = (props) => {
//     const [data, setData] = useState([
//         { "rainfall": "1", "value": "20" },
//         { "rainfall": "2", "value": "40" },
//         { "rainfall": "3", "value": "50" },
//         { "rainfall": "4", "value": "60" }
//     ])
//     return (
//         <>
//             <div className="m-top">
//                 <ResponsiveContainer width="50%" height={400}>
//                     <AreaChart data={data}>
//                         <Area dataKey="value" />
//                         <XAxis dataKey='rainfall' />
//                         <YAxis dataKey='value' />
//                     </AreaChart>
//                 </ResponsiveContainer>
//             </div>
//         </>
//     )
// }

// export default LineGraph