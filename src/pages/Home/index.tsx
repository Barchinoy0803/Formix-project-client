import { memo, useState } from 'react'
import Navbar from '../../components/Navbar'
import { useGetTemplatesQuery } from '../../service/api/template.api'
import { Box, CircularProgress } from '@mui/material'
import Card from '../../components/Card'
import { TemplateForm } from '../../types/form'
import AddTemplate from '../../components/AddTemplate'

const Home = () => {
  const [search, setSearch] = useState<string>('');

  const { data: allTemplates, isLoading } = useGetTemplatesQuery({ search })
  return (
    <Box className='flex flex-col gap-6'>
      <Navbar search={search} setSearch={setSearch} />
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
