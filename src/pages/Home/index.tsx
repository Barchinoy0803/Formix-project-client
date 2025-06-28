import { memo } from 'react'
import Navbar from '../../components/Navbar'
import { useGetTemplatesQuery } from '../../service/api/template.api'
import { Box, CircularProgress } from '@mui/material'
import Card from '../../components/Card'
import { TemplateForm } from '../../types/form'
import AddTemplate from '../../components/AddTemplate'
import { useSelector } from 'react-redux'
import { RootState } from '../../redux'

const Home = () => {
  const { searchtext } = useSelector((state: RootState) => state.templates)

  const { data: allTemplates, isLoading } = useGetTemplatesQuery({ searchtext })
  return (
    <Box className='flex flex-col gap-6'>
      <Navbar />
      <div className='container mx-auto flex gap-5'>
        <AddTemplate />
        {
          isLoading ? <CircularProgress /> : allTemplates?.map((template: TemplateForm) => (
            <Card templateData={template} />
          ))
        }
      </div>
    </Box>
  )
}

export default memo(Home)
