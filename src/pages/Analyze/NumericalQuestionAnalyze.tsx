import ReactECharts from 'echarts-for-react'
import { useTranslator } from '../../hooks/useTranslator'
import { memo } from 'react'

interface NumericalQuestionAnalyzeProps {
    analyze: any
}

const NumericalQuestionAnalyze = ({ analyze }: NumericalQuestionAnalyzeProps) => {
    const { t } = useTranslator('analyze')
    const option = {
        title: {
            text: t('answers'),
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

export default memo(NumericalQuestionAnalyze)