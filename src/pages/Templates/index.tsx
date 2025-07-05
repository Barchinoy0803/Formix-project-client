import { memo, useMemo, useState } from 'react'
import { useDeleteTemplateMutation, useGetAllUserTemplatesQuery, useGetTemplatesQuery } from '../../service/api/template.api'
import { GridRowSelectionModel } from '@mui/x-data-grid';
import { Box, Button, CircularProgress, Tooltip } from '@mui/material';
import { TemplateTableColumns, templateTabNames } from '../../constants';
import toast from 'react-hot-toast';
import { FaRegTrashCan } from "react-icons/fa6";
import { FaEdit, FaPlus } from 'react-icons/fa';
import { useNavigate, useOutletContext } from 'react-router-dom';
import CustomTabs from '../../components/Tabs';
import { OutletContext } from '../../types';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux';
import Card from '../../components/Card';
import { useTranslator } from '../../hooks/useTranslator'

const Templates = () => {
  const { searchtext, searchResults } = useSelector((state: RootState) => state.templates)
  const navigate = useNavigate()
  const [activeTab, setActiveTab] = useState<string>("all")
  const [selectedIds, setSelectedIds] = useState<GridRowSelectionModel>()
  
  const { t } = useTranslator('buttons')
  const { t:template } = useTranslator('template')

  const { data: allData } = useGetTemplatesQuery({ skip: activeTab !== "all" })
  const [deleteTemplate, { isLoading: deleteLoading }] = useDeleteTemplateMutation()
  const { data, isLoading } = useGetAllUserTemplatesQuery({ skip: activeTab === "all" })

  const ids = useMemo(() => {
    return selectedIds?.ids ? [...selectedIds.ids] : []
  }, [selectedIds])

  const handleDelete = async () => {
    await deleteTemplate({ ids: [...selectedIds?.ids!] })
    toast.success(template('templatesDeleted'))
  }

  const handleUpdate = () => {
    if (ids.length > 1) {
      toast.error(template('templateUpdateError'))
    } else {
      navigate(`/dashboard/template/${ids[0]}`)
    }
  };

  const handleCreate = () => {
    navigate(`/dashboard/template/new`)
  }

  const isAllTemplates = useMemo(() => {
    return activeTab === "all"
  }, [activeTab])

  const handleStartSurvey = () => {
    navigate(`/dashboard/survey/${ids[0]}`)
  }

  const handleStartCheck = () => {
    navigate(`/dashboard/template/${ids[0]}?readmode=true`)
  }

  return (
    <div className='container mx-auto flex flex-col gap-3 mt-[50px] mb-[30px]'>
      {
        !searchtext.length &&
        <div className='flex items-center gap-5 mb-3'>
          {
            isAllTemplates ?
              <Box className="flex gap-3">
                <Tooltip placement='top' title={template('selectTemplateNote')}>
                  <span>
                    <Button variant='outlined' onClick={handleStartSurvey} disabled={ids.length !== 1}>{t('startSurvey')}</Button>
                  </span>
                </Tooltip>
                <Tooltip placement='top' title={template('checkNote')}>
                  <span>
                    <Button variant='outlined' onClick={handleStartCheck} disabled={ids.length !== 1}>{t('show')}</Button>
                  </span>
                </Tooltip>
              </Box>
              : <>
                <Tooltip placement='top' title='Delete templates'>
                  <Button color='error' disabled={deleteLoading || isAllTemplates || !ids.length} onClick={handleDelete} startIcon={<FaRegTrashCan />} variant='outlined'>{t('delete')}</Button>
                </Tooltip>
                <Tooltip placement='top' title='Update templates'>
                  <Button disabled={isAllTemplates || !ids.length} onClick={handleUpdate} startIcon={<FaEdit />} variant='outlined'>{t('update')}</Button>
                </Tooltip>
                <Tooltip placement='top' title='Create templates'>
                  <Button disabled={deleteLoading} onClick={handleCreate} startIcon={<FaPlus />} variant='outlined'>{t('create')}</Button>
                </Tooltip>
              </>
          }
        </div>
      }
      {
        searchtext.length ? <div className='flex items-center gap-4'>{searchResults.map((item) => (<Card templateData={item} />))}</div> : isLoading ? <CircularProgress /> : <CustomTabs tabNames={templateTabNames} setActiveTab={setActiveTab} activeTab={activeTab} allData={allData} columns={TemplateTableColumns} selectedIds={selectedIds} setSelectedIds={setSelectedIds} data={data} />
      }
    </div>
  )
}

export default memo(Templates)