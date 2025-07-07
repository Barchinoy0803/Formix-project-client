import { memo, useEffect, useState } from 'react'
import Navbar from '../../components/Navbar'
import { useGetTemplatesQuery, useGetTop5PopularTemplatesQuery } from '../../service/api/template.api'
import { Box, Button, Chip, CircularProgress, Typography } from '@mui/material'
import Card from '../../components/Card'
import { TagForm, TemplateForm } from '../../types/form'
import { useTranslator } from '../../hooks/useTranslator'
import { NavLink } from 'react-router-dom'
import { FaPlus } from 'react-icons/fa6'
import { useSelector } from 'react-redux'
import { RootState } from '../../redux'
import { BiShowAlt, BiHide } from "react-icons/bi";
import SimpleTable from '../../components/SimpleTable'
import { useGetAllTagsQuery, useGetOneTagQuery } from '../../service/api/tags.api'
import NoDataPlaceholder from '../../components/NoDataPlaceholder'

const Home = () => {
  const { searchtext, searchResults } = useSelector((state: RootState) => state.templates)
  const { t } = useTranslator('dashboard')
  const { t: buttons } = useTranslator('buttons')
  const { t: home } = useTranslator('home')
  const [tag, setTag] = useState<string>('all')

  const [showAll, setShowAll] = useState<boolean>(false)
  const [templates, setTemplates] = useState<TemplateForm[]>([])

  const { data: allTemplates, isLoading } = useGetTemplatesQuery({ searchtext })
  const { data: topRatingTemplates, isLoading: topLoading } = useGetTop5PopularTemplatesQuery({})
  const { data: tagData } = useGetAllTagsQuery({})
  const { data } = useGetOneTagQuery(tag)

  useEffect(() => {
    if (!showAll) {
      setTemplates(allTemplates?.slice(0, 4))
    } else {
      setTemplates(allTemplates)
    }
  }, [allTemplates, showAll])

  return (
    <Box className='flex flex-col gap-6'>
      <Navbar />

      <Box className="container-home flex gap-2 my-3 overflow-x-auto whitespace-nowrap"
        sx={{
          '&::-webkit-scrollbar': { display: 'none' },
          '-ms-overflow-style': 'none',
          'scrollbar-width': 'none'
        }}>
        <Chip onClick={() => setTag('all')} className="bg-transparent border border-[#47aed6] text-[#47aed6] text-sm h-8 shrink-0
           transition-all duration-200 ease-in-out
           hover:bg-[#47aed6] hover:text-white"
          label="All"
        />
        {tagData?.map((tag: TagForm, index: number) => (
          <Chip onClick={() => setTag(tag.id)} key={index} className="bg-transparent border border-[#47aed6] text-[#47aed6] text-sm h-8 shrink-0
             transition-all duration-200 ease-in-out
             hover:bg-[#47aed6] hover:text-white"
            label={tag.name}
          />
        ))}
      </Box>
      {
        !searchtext?.length && tag === 'all' && <>
          <Box className="flex justify-between container-home">
            <Typography fontFamily={'revert'} variant='h5'>{home('newForm')}</Typography>
            <Button startIcon={showAll ? <BiHide /> : <BiShowAlt />} variant='outlined' onClick={() => setShowAll(p => !p)}>{showAll ? buttons('hide') : buttons('showAll')}</Button>
          </Box>
          <div className='flex gap-5 container-home'>
            <Box className="grid grid-cols-5 gap-5 flex-wrap">
              <NavLink to="/dashboard/templates" className="flex flex-col gap-4">
                <div
                  className="
                    w-[200px] h-[200px] rounded-sm
                    flex items-center justify-center text-[75px]
                    bg-white  border border-gray-200      /* light */
                    dark:bg-gray-800 dark:border-gray-600 /* dark  */
                  "
                >
                  <button className="p-[200px] cursor-pointer">
                    <FaPlus className="text-[#47aed6] dark:text-[#6ec6ff]" />
                  </button>
                </div>
                <Typography className="text-gray-800 dark:text-gray-200">
                  {t('blankTemplate')}
                </Typography>
              </NavLink>
              {
                isLoading ? <CircularProgress /> : templates?.map((template: TemplateForm) => (
                  <Card templateData={template} />
                ))
              }
            </Box>
          </div>
          <Box className="flex container-home">
            <Box className="flex flex-col gap-5 my-[80px]">
              <Typography fontFamily={'revert'} variant='h5'>{home('popularForms')}</Typography>
              <Box className="flex gap-5">
                {
                  topLoading ? <CircularProgress /> :
                    <SimpleTable data={topRatingTemplates} />
                }
              </Box>
            </Box>
          </Box>
        </>
      }
      {tag !== 'all' && <div className='container-home flex items-center gap-4'>{data?.templates?.map((item:any) => (<Card templateData={item} />))}</div>}
      {!!searchtext.length && <div className='container-home flex items-center gap-4'>{searchResults?.map((item) => (<Card templateData={item} />))}</div>}
      {!!searchtext.length && !searchResults?.length || tag !== 'all' && !data?.templates?.length && <NoDataPlaceholder/>}
    </Box>
  )
}

export default memo(Home)
