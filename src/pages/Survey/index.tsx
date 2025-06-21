import { memo, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useGetOneTemplateQuery } from '../../service/api/template.api'
import { CircularProgress, Typography } from '@mui/material'
import { useFieldArray, useForm } from 'react-hook-form'
import { Form } from '../../types/form'

const Survey = () => {
  const { id } = useParams()
  const { data: template, isLoading } = useGetOneTemplateQuery(id)
  const { reset, control } = useForm<Form>()
  const { fields } = useFieldArray({ control, name:'Answer' })
  
  useEffect(() => {
    if (template) {
      reset(template)
    }
  }, [template])
  
  console.log(fields);


  return (
    !isLoading ?
      <div>
        <div>
          <img src={template.image} alt="" />
          <Typography variant='h5'>{template.title}</Typography>
          <Typography variant='h5'>{template.topic}</Typography>
          <Typography variant='h6'>{template.description}</Typography>
        </div>
        <div>

        </div>
      </div> : <CircularProgress />
  )
}

export default memo(Survey)
