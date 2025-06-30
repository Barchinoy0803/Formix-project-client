import ReactECharts from 'echarts-for-react'

interface CloseQuestionAnalyzeProps {
    analyze: any
}

const CloseQuestionAnalyze = ({ analyze }: CloseQuestionAnalyzeProps) => {
    const option = {
        title: {
            text: 'Answers',
        },
        tooltip: { trigger: "item" },
        legend: { orient: "vertical", right: "right" },
        xAxis: {},
        yAxis: {},
        series: [
            {
                type: 'pie',
                radius: "65%",
                data: [
                    {
                        value: analyze.YES, name: "Yes"
                    },
                    {
                        value: analyze.NO, name: "No"
                    }
                ]
            },
        ],
        color: ["#F44336", "#FFC107"]
    }

    return (
        <div>
            <ReactECharts option={option} style={{ height: 550 }} />
        </div>
    )
}

export default CloseQuestionAnalyze