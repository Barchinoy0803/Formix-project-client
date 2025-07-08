import ReactECharts from 'echarts-for-react'
import { useTranslator } from '../../hooks/useTranslator'
import { memo } from 'react'

interface CloseQuestionAnalyzeProps {
    analyze: any
}

const CloseQuestionAnalyze = ({ analyze }: CloseQuestionAnalyzeProps) => {
    const { t } = useTranslator('analyze')
    const option = {
        title: {
            text: t('answers'),
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
                        value: analyze.YES, name: t('yes')
                    },
                    {
                        value: analyze.NO, name: t('no')
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

export default memo(CloseQuestionAnalyze)