import React from 'react'
import {Chart as ChartJS, ArcElement, Tooltip, Legend} from 'chart.js'
import {pie} from 'react-chartjs-2'

const BudgetRoleChart = ( {brideCnt , broomCnt , bothCnt , etcCnt}) => {
    ChartJS.register(ArcElement, Tooltip, Legend);

    const data = {
    label : ["신부","신랑","공동","기타"],
    datasets : [
         {
            labels : "expense",
            data : [brideCnt , broomCnt , bothCnt , etcCnt] ,
            backgroundColor: [
        
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(153, 102, 255, 0.2)',
                
              ],
              borderColor: [
               
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)',
              
              ],
              borderWidth: 0.5,
         }
    ],
    };
  return (
    <div>
        <Pie data = {data}/>
    </div>
  )
}

export default BudgetRoleChart