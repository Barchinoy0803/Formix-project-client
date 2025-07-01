import ReactECharts from 'echarts-for-react'
import { useTranslator } from '../../hooks/useTranslator'

interface MultichoiceQuestionAnalyzeProps {
    analyze: any
}

const MultichoiceQuestionAnalyze = ({ analyze }: MultichoiceQuestionAnalyzeProps) => {
    const { t } = useTranslator('analyze')
    const option = {
        title: {
            text: t('answers')
        },
        tooltip: { trigger: "item" },
        legend: { orient: "vertical", right: "right" },
        xAxis: {},
        yAxis: {},
        series: [
            {
                type: 'pie',
                radius: "65%",
                data: analyze?.stats?.map((item: any) => ({
                    value: item.percentage,
                    name: item.title
                }))
            },
        ],
    }

    return (
        <div>
            <ReactECharts option={option} style={{ height: 550 }} />
        </div>
    )
}

export default MultichoiceQuestionAnalyze