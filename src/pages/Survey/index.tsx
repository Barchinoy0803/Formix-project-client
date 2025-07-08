import { memo, useEffect, useMemo } from 'react'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import { useGetOneTemplateQuery } from '../../service/api/template.api'
import {
  Button,
  CircularProgress,
  Typography,
  Container,
  Paper,
  Box,
  CardContent,
  CardMedia,
  Divider,
  Stack
} from '@mui/material'
import { useFieldArray, useForm } from 'react-hook-form'
import { AnswerForm, Form, QuestionForm } from '../../types/form'
import { renderQuestion } from './helpers'
import {
  useCreateFormMutation,
  useGetOneFormQuery,
  useIsExistingTemplateMutation,
  useUpdateFormMutation
} from '../../service/api/form.api'
import { useTranslator } from '../../hooks/useTranslator'

const Survey = () => {
  const location = useLocation()
  const navigate = useNavigate()
  const { id } = useParams()
  const { t } = useTranslator('forms')

  const [checkExistingForm, { data: existingForm }] = useIsExistingTemplateMutation()
  const [createForm] = useCreateFormMutation()
  const [updateForm] = useUpdateFormMutation()

  const isUpdateForm = useMemo(() => location.pathname.includes('form'), [location])
  const searchParams = new URLSearchParams(location.search)
  const isReadMode = !!searchParams.get('readMode')

  const { reset, control, handleSubmit } = useForm<Form>({
    defaultValues: {
      Question: [],
      Answer: []
    }
  })

  const { fields } = useFieldArray({ control, name: 'Question' })

  const { data: form } = useGetOneFormQuery(id, { skip: !isUpdateForm })
  const { data: template } = useGetOneTemplateQuery(isUpdateForm ? form?.templateId : id, {
    skip: isUpdateForm && !form?.templateId
  })

  const isReady = !!template && (!isUpdateForm || !!form)

  useEffect(() => {
    if (!isUpdateForm && id) {
      checkExistingForm(id)
    }
  }, [id, isUpdateForm, checkExistingForm])

  useEffect(() => {
    if (!isReady) return

    if (isUpdateForm) {
      reset({
        ...template!,
        Question: template!.Question,
        Answer: form!.answer
      })
    } else {
      const published = template!.Question.filter((question: QuestionForm) => question.isPublished)
      reset({
        ...template!,
        Question: published,
        Answer: published.map((question: QuestionForm, i:number) => ({
          sequence: i,
          answer: '',
          questionId: question.id,
          formId: template!.id
        }))
      })
    }
  }, [isReady, isUpdateForm, template, form, reset])

  const onSubmit = async (data: Form) => {
    if (!template) return

    const payload = {
      templateId: template.id,
      Answer: data.Answer.map((a: AnswerForm) => ({
        ...a,
        answer:
          Array.isArray(a.selectedOptionOnAnswer) && a.selectedOptionOnAnswer.length
            ? a.selectedOptionOnAnswer
            : a.answer
      }))
    }

    if (isUpdateForm) {
      await updateForm({ id, body: payload })
    } else {
      if (existingForm) {
        await updateForm({ id: existingForm.id, body: payload })
      } else {
        await createForm(payload)
      }
    }

    navigate('/finishScreen')
  }

  return (
    <Container maxWidth="lg" className="py-8 px-6 w-full max-w-6xl mx-auto">
      {template ? (
        <form onSubmit={handleSubmit(onSubmit)} className="w-full space-y-8">
          <Paper
            elevation={3}
            className="rounded-2xl overflow-hidden border border-gray-200 dark:border-gray-700 shadow-lg bg-white dark:bg-gray-900"
          >
            {template.image && (
              <Box className="relative">
                <CardMedia
                  component="img"
                  height="300"
                  image={template.image}
                  alt={template.title}
                  className="object-contain w-full h-52"
                />
              </Box>
            )}
            <CardContent className="p-8">
              <Stack spacing={3} alignItems="center">
                <Typography
                  variant="h3"
                  component="h1"
                  className="text-4xl font-bold text-center text-blue-700 dark:text-blue-400 leading-tight"
                >
                  {template.title}
                </Typography>

                <Box className="flex justify-center">
                  <Typography
                    component="span"
                    className="inline-flex items-center px-4 py-2 rounded-full text-sm font-semibold text-purple-700 dark:text-purple-300 bg-purple-100 dark:bg-purple-800/40 border border-purple-200 dark:border-purple-600"
                  >
                    {template.topic}
                  </Typography>
                </Box>

                <Typography
                  variant="h6"
                  component="p"
                  className="text-center text-gray-600 dark:text-gray-300 text-lg leading-relaxed max-w-2xl mx-auto"
                >
                  {template.description}
                </Typography>
              </Stack>
            </CardContent>
          </Paper>

          <Stack spacing={3}>
            {fields.map((question, index) => (
              <Paper
                key={question.id}
                elevation={1}
                className="p-8 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm bg-white dark:bg-gray-900 hover:shadow-md hover:border-blue-300 dark:hover:border-blue-500 transition-all duration-300 hover:-translate-y-1 group w-full"
              >
                <Box className="flex items-start gap-4 mb-6 w-full">
                  <Box className="flex-shrink-0 w-8 h-8 bg-blue-600 group-hover:bg-blue-700 text-white rounded-full flex items-center justify-center text-sm font-bold shadow-sm transition-colors duration-200">
                    {index + 1}
                  </Box>
                  <Box className="flex-1 min-w-0">
                    <Typography
                      variant="h6"
                      component="h3"
                      className="text-xl font-semibold text-gray-800 dark:text-gray-100 leading-relaxed"
                    >
                      {question.title}
                    </Typography>
                  </Box>
                </Box>
                <Divider className="mb-6 border-gray-200 dark:border-gray-700" />
                <Box className="w-full">
                  {renderQuestion({ question, control, index, isReadMode })}
                </Box>
              </Paper>
            ))}
          </Stack>

          {!isReadMode && (
            <Box className="flex justify-center pt-6">
              <Button
                type="submit"
                variant="contained"
                size="large"
                className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white text-lg font-semibold px-12 py-4 rounded-xl shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-blue-300 focus:ring-opacity-50"
              >
                {t('submitSurvey')}
              </Button>
            </Box>
          )}
        </form>
      ) : (
        <Box className="flex flex-col items-center justify-center min-h-screen space-y-6">
          <CircularProgress size={64} thickness={4} className="text-blue-600" />
        </Box>
      )}
    </Container>
  )
}

export default memo(Survey)
