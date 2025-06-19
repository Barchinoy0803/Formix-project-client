import { memo, useMemo, useState } from 'react'
import { useDeleteTemplateMutation, useGetAllUserTemplatesQuery, useGetTemplatesQuery } from '../../service/api/template.api'
import { GridRowSelectionModel } from '@mui/x-data-grid';
import { Button, CircularProgress, Tooltip } from '@mui/material';
import { TemplateTableColumns } from '../../constants';
import toast from 'react-hot-toast';
import { FaRegTrashCan } from "react-icons/fa6";
import { FaEdit, FaPlus } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import CustomTabs from '../../components/Tabs';

const Templates = () => {
  const navigate = useNavigate()

  const [activeTab, setActiveTab] = useState<string>("all")
  const [selectedIds, setSelectedIds] = useState<GridRowSelectionModel>();

  const {t: buttons} = useTranslator()
  const { data: allData } = useGetTemplatesQuery({})
  const [deleteTemplate, { isLoading: deleteLoading }] = useDeleteTemplateMutation()
  const { data, isLoading } = useGetAllUserTemplatesQuery({})

  const handleDelete = async () => {
    await deleteTemplate({ ids: [...selectedIds?.ids!] })
    toast.success("User deleted!")
  }

  const handleUpdate = () => {
    const ids = [...selectedIds?.ids!]
    if (ids.length > 1) {
      toast.error("You cannot update more than one template at the same time")
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

  return (
    <div className='container mx-auto flex flex-col gap-3 mt-[50px] mb-[30px]'>
      <div className='flex items-center gap-5 mb-3'>
        <Tooltip placement='top' title='Delete templates'>
          <Button color='error' disabled={deleteLoading || isAllTemplates} onClick={handleDelete} startIcon={<FaRegTrashCan />} variant='outlined'>Delete</Button>
        </Tooltip>
        <Tooltip placement='top' title='Update templates'>
          <Button disabled={deleteLoading || isAllTemplates} onClick={handleUpdate} startIcon={<FaEdit />} variant='outlined'>Update</Button>
        </Tooltip>
        <Tooltip placement='top' title='Create templates'>
          <Button disabled={deleteLoading} onClick={handleCreate} startIcon={<FaPlus />} variant='outlined'>Create</Button>
        </Tooltip>
      </div>
      {
        isLoading ? <CircularProgress /> : <CustomTabs setActiveTab={setActiveTab} activeTab={activeTab} allData={allData} columns={TemplateTableColumns} selectedIds={selectedIds} setSelectedIds={setSelectedIds} data={data} />
      }
    </div>
  )
}

export default memo(Templates)