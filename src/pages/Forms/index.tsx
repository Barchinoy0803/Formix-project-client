import { memo, useMemo, useState } from 'react'
import { useDeleteFormsMutation, useGetAllFormsQuery, useGetAllUserFormsQuery, useGetFormsQuery } from '../../service/api/form.api'
import { Alert, Button, CircularProgress, Tooltip } from '@mui/material'
import CustomTabs from '../../components/Tabs'
import { FormTableColums, formTabNames } from '../../constants'
import { GridRowSelectionModel } from '@mui/x-data-grid'
import { FaRegTrashCan } from "react-icons/fa6";
import { FaEdit, FaPlus } from 'react-icons/fa';
import toast from 'react-hot-toast'
import { useLocation, useNavigate } from 'react-router-dom'
import { FaEye } from "react-icons/fa";


const Form = () => {
  const navigate = useNavigate()
  const { data, isLoading } = useGetAllFormsQuery({})
  const { data: alldata } = useGetAllUserFormsQuery({})
  const { data: formsData } = useGetFormsQuery({})
  const [deleteForms, { isLoading: deleteLoading }] = useDeleteFormsMutation()
  const [activeTab, setActiveTab] = useState<string>("all")
  const [selectedIds, setSelectedIds] = useState<GridRowSelectionModel>()

  const ids = useMemo(() => {
    return selectedIds?.ids ? [...selectedIds.ids] : []
  }, [selectedIds])

  const isAllForms = useMemo(() => {
    return activeTab === "all"
  }, [activeTab])

  const handleDelete = async () => {
    await deleteForms({ ids: [...selectedIds?.ids!] })
    toast.success("Forms deleted!")
  }

  const handleUpdate = async () => {
    navigate(`/dashboard/form/${ids[0]}`)
  }

  const handleShow = async () => {
    navigate(`/dashboard/form/${ids[0]}?readMode=true`)
  }

  return (
    <div className='container mx-auto flex flex-col gap-3 mt-[50px] mb-[30px]'>
      <Alert className='mb-5' variant="outlined" severity="info">
        {activeTab === 'all'
          ? "This table includes filled forms submitted to your templates."
          : "This table includes forms that you have filled out."}
      </Alert>
      <div className='flex items-center gap-5 mb-3'>
        {
          !isAllForms ? <>
            <Tooltip placement='top' title='Delete forms'>
              <Button color='error' disabled={deleteLoading || isAllForms} onClick={handleDelete} startIcon={<FaRegTrashCan />} variant='outlined'>Delete</Button>
            </Tooltip>
            <Tooltip placement='top' title='Update forms'>
              <Button disabled={deleteLoading || isAllForms} onClick={handleUpdate} startIcon={<FaEdit />} variant='outlined'>Update</Button>
            </Tooltip>
          </> :
            <Tooltip placement='top' title='Show forms'>
              <Button disabled={deleteLoading} onClick={handleShow} startIcon={<FaEye />} variant='outlined'>Show</Button>
            </Tooltip>
        }
      </div>
      {
        isLoading ? <CircularProgress /> : <CustomTabs tabNames={formTabNames} setActiveTab={setActiveTab} activeTab={activeTab} allData={formsData} columns={FormTableColums} selectedIds={selectedIds} setSelectedIds={setSelectedIds} data={alldata} />
      }
    </div>
  )
}

export default memo(Form)
