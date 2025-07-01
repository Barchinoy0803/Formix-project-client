import { memo, useState } from 'react'
import Navbar from '../../components/Navbar'
import { useGetTemplatesQuery } from '../../service/api/template.api'
import { Box, CircularProgress, Typography } from '@mui/material'
import Card from '../../components/Card'
import { TemplateForm } from '../../types/form'
import { useTranslator } from '../../hooks/useTranslator'
import { NavLink } from 'react-router-dom'
import { FaPlus } from 'react-icons/fa6'

const Home = () => {
  const { t } = useTranslator('dashboard')
  const [search, setSearch] = useState<string>('');

  const { data: allTemplates, isLoading } = useGetTemplatesQuery({ search })
  return (
    <Box className='flex flex-col gap-6'>
      <Navbar search={search} setSearch={setSearch} />
      <div className='container mx-auto flex gap-5'>
        <NavLink to={'/dashboard/templates'} className="flex flex-col gap-2 ">
            <div className="bg-white w-[200px] h-[200px] flex items-center justify-center text-[75px] border border-gray-200 rounded-sm">
                <button className="p-[200px] cursor-pointer">
                    <FaPlus className="text-[#47aed6]" />
                </button>
            </div>
            <Typography>{t('blankTemplate')}</Typography>
        </NavLink>
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
