import { memo, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useGetAnalyzesQuery, useGetTemplateQuestionsQuery } from '../../service/api/question.api'
import { getAnalyzes, getQuestionOptions } from './helpers'
import { useForm, useWatch } from 'react-hook-form'
import { QuestionAnalyzesForm } from '../../types/form'
import  ControlledFilterArrows  from '../../components/ControlledFilterArrows'
import NoDataPlaceholder from '../../components/NoDataPlaceholder'
import { useTranslator } from '../../hooks/useTranslator'

const Analyze = () => {
    const { id } = useParams()
    const { t } = useTranslator('analyze')
    const { control, reset } = useForm<QuestionAnalyzesForm>({ defaultValues: { question: "" } })
    const questionId = useWatch({ control, name: "question" })

    const { data: questionData } = useGetTemplateQuestionsQuery(id)
    const { data: analyzeData } = useGetAnalyzesQuery(questionId)
    
    console.log(analyzeData)

    useEffect(() => {
    if (questionData?.length) {
            reset({ question: questionData[0].id })
        }
    }, [questionData])

    return (
        <div className='flex flex-col gap-4'>
            {
                questionData?.length ? 
                    <>
                        <ControlledFilterArrows control={control} name='question' options={getQuestionOptions(questionData) ?? []} />
                        {analyzeData?.answers.length ?  getAnalyzes(analyzeData) : <NoDataPlaceholder title={t('noAnswer')}/>}
                    </>
                    : 
                    <NoDataPlaceholder title={t('noData')} />
            }
        </div>
    )
}
export default memo(Analyze)
