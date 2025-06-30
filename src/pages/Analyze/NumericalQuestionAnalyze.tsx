import ReactECharts from 'echarts-for-react'

interface NumericalQuestionAnalyzeProps {
    analyze: any
}

const NumericalQuestionAnalyze = ({ analyze }: NumericalQuestionAnalyzeProps) => {
    const option = {
        title: {
            text: 'Answers',
        },
        tooltip: {},
        xAxis: {
            data: analyze?.answers?.map((answer: any) => answer.user.username),
        },
        yAxis: {},
        series: [
            {
                type: 'bar',
                data: analyze?.answers?.map((answer: any) => answer.answer),
            },
        ],
    }

    return (
        <div>
            <ReactECharts option={option} style={{ height: 500 }} />

        </div>
    )
}

export default NumericalQuestionAnalyze