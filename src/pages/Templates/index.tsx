import { memo, useMemo, useState } from 'react'
import { useDeleteTemplateMutation, useGetAllUserTemplatesQuery, useGetTemplatesQuery } from '../../service/api/template.api'
import { GridRowSelectionModel } from '@mui/x-data-grid';
import { Button, CircularProgress, Tooltip } from '@mui/material';
import { TemplateTableColumns, templateTabNames } from '../../constants';
import toast from 'react-hot-toast';
import { FaRegTrashCan } from "react-icons/fa6";
import { FaEdit, FaPlus } from 'react-icons/fa';
import { useNavigate, useOutletContext } from 'react-router-dom';
import CustomTabs from '../../components/Tabs';
import { OutletContext } from '../../types';

const Templates = () => {
  const navigate = useNavigate()
  const [activeTab, setActiveTab] = useState<string>("all")
  const [selectedIds, setSelectedIds] = useState<GridRowSelectionModel>()
  const { search } = useOutletContext<OutletContext>()
  console.log(search);

  const { data: allData } = useGetTemplatesQuery({ search }, { skip: activeTab !== "all" })
  const [deleteTemplate, { isLoading: deleteLoading }] = useDeleteTemplateMutation()
  const { data, isLoading } = useGetAllUserTemplatesQuery({ search },  { skip: activeTab === "all" })

  const handleDelete = async () => {
    await deleteTemplate({ ids: [...selectedIds?.ids!] })
    toast.success("Templates deleted!")
  }

  const ids = useMemo(() => {
    return selectedIds?.ids ? [...selectedIds.ids] : []
  }, [selectedIds])

  const handleUpdate = () => {
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

  const handleStartSurvey = () => {
    navigate(`/dashboard/survey/${ids[0]}`)
  }

  return (
    <div className='container mx-auto flex flex-col gap-3 mt-[50px] mb-[30px]'>
      <div className='flex items-center gap-5 mb-3'>
        {
          isAllTemplates ?
            <Tooltip placement='top' title='Please select only one template to field out!'>
              <span>
                <Button onClick={handleStartSurvey} disabled={ids.length !== 1}>Start Survey</Button>
              </span>
            </Tooltip>
            : <>
              <Tooltip placement='top' title='Delete templates'>
                <Button color='error' disabled={deleteLoading || isAllTemplates || !ids.length} onClick={handleDelete} startIcon={<FaRegTrashCan />} variant='outlined'>Delete</Button>
              </Tooltip>
              <Tooltip placement='top' title='Update templates'>
                <Button disabled={isAllTemplates || !ids.length} onClick={handleUpdate} startIcon={<FaEdit />} variant='outlined'>Update</Button>
              </Tooltip>
              <Tooltip placement='top' title='Create templates'>
                <Button disabled={deleteLoading} onClick={handleCreate} startIcon={<FaPlus />} variant='outlined'>Create</Button>
              </Tooltip>
            </>
        }
      </div>
      {
        isLoading ? <CircularProgress /> : <CustomTabs tabNames={templateTabNames} setActiveTab={setActiveTab} activeTab={activeTab} allData={allData} columns={TemplateTableColumns} selectedIds={selectedIds} setSelectedIds={setSelectedIds} data={data} />
      }
    </div>
  )
}

export default memo(Templates)