import { memo, useEffect, useMemo } from 'react'
import { useLocation, useParams } from 'react-router-dom'
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
import { useCreateFormMutation, useGetOneFormQuery, useIsExistingTemplateMutation, useUpdateFormMutation } from '../../service/api/form.api'
import { useTranslator } from '../../hooks/useTranslator'

const Survey = () => {
  const location = useLocation();
  const { id } = useParams();
  const { t } = useTranslator('submitSurvey')

  const [isExsist] = useIsExistingTemplateMutation()

  const [createForm] = useCreateFormMutation()
  const [updateForm] = useUpdateFormMutation()
  const { reset, control, handleSubmit } = useForm<Form>()
  const { fields } = useFieldArray({ control, name: 'Question' })

  const searchParams = new URLSearchParams(location.search);
  const isReadMode = searchParams.get('readMode');

  const isUpdateForm = useMemo(() => {
    return location.pathname.includes("form")
  }, [location])

  const { data: form } = useGetOneFormQuery(id, {
    skip: !isUpdateForm
  });

  const { data: template } = useGetOneTemplateQuery(
    isUpdateForm ? form?.templateId : id,
    {
      skip: isUpdateForm && !form?.templateId,
    }
  );

  useEffect(() => {
    if (template) {
      reset({
        ...template,
        Answer:
          template.Question?.map((q: QuestionForm, i: number) => ({
            sequence: i,
            answer: '',
            questionId: q.id,
            formId: template.templateId,
          })) || [],
      })
    }
  }, [template])

  useEffect(() => {
    if (form) {
      reset({ Answer: form.answer })
    }

  }, [form])

  const onSubmit = async (data: Form) => {
    const payload = {
      templateId: template.id,
      Answer: data.Answer.map((a: AnswerForm) => ({
        ...a,
        answer:
          Array.isArray(a.selectedOptionOnAnswer) && a.selectedOptionOnAnswer.length > 0
            ? a.selectedOptionOnAnswer
            : a.answer,
      }))
    }

    if (!isUpdateForm) {
      const { data: filledForm } = await isExsist(id)

      if (filledForm) {
        await updateForm({ id: filledForm.id, body: payload })
      } else {
        await createForm(payload)
      }
    }
    if (isUpdateForm) {
      await updateForm({ id, body: payload })
    }
  }

  return (
    <Container maxWidth="lg" className="py-8 px-6 w-full max-w-6xl mx-auto">
      {template ? (
        <form onSubmit={handleSubmit(onSubmit)} className="w-full space-y-8">
          <Paper
            elevation={3}
            className="rounded-2xl overflow-hidden border border-gray-200 shadow-lg"
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
              <Stack spacing={3} alignItems="center" className="space-y-6 items-center">
                <Typography
                  variant="h3"
                  component="h1"
                  className="text-4xl font-bold text-center text-blue-700 leading-tight"
                >
                  {template.title}
                </Typography>

                <Box className="flex justify-center">
                  <Typography
                    component="span"
                    className="inline-flex items-center px-4 py-2 rounded-full text-sm font-semibold text-purple-700 bg-purple-100 border border-purple-200"
                  >
                    {template.topic}
                  </Typography>
                </Box>

                <Typography
                  variant="h6"
                  component="p"
                  className="text-center text-gray-600 text-lg leading-relaxed max-w-2xl mx-auto"
                >
                  {template.description}
                </Typography>
              </Stack>
            </CardContent>
          </Paper>

          <Stack spacing={3} className="space-y-6">
            {fields.map((question, index) => (
              <Paper
                key={question.id}
                elevation={1}
                className="p-8 rounded-xl border border-gray-200 shadow-sm hover:shadow-md hover:border-blue-300 transition-all duration-300 hover:-translate-y-1 group w-full"
              >
                <Box className="flex items-start gap-4 mb-6 w-full">
                  <Box className="flex-shrink-0 w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-bold shadow-sm group-hover:bg-blue-700 transition-colors duration-200">
                    {index + 1}
                  </Box>
                  <Box className="flex-1 min-w-0">
                    <Typography
                      variant="h6"
                      component="h3"
                      className="text-xl font-semibold text-gray-800 leading-relaxed"
                    >
                      {question.title}
                    </Typography>
                  </Box>
                </Box>
                <Divider className="mb-6 border-gray-200" />
                <Box className="w-full">
                  {renderQuestion({ question, control, index, isReadMode: !!isReadMode })}
                </Box>
              </Paper>
            ))}
          </Stack>

          {
            !isReadMode &&
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
          }
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