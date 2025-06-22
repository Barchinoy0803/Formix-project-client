import { memo, useState } from 'react'
import { useGetFormsQuery } from '../../service/api/form.api'
import { CircularProgress } from '@mui/material'
import CustomTabs from '../../components/Tabs'
import { FormTableColums } from '../../constants'
import { GridRowSelectionModel } from '@mui/x-data-grid'

const Form = () => {
  const { data, isLoading } = useGetFormsQuery({})
    const [activeTab, setActiveTab] = useState<string>("all")
    const [selectedIds, setSelectedIds] = useState<GridRowSelectionModel>()
  
  console.log(data);
  

  return (
    <div>
      {
        isLoading ? <CircularProgress /> : <CustomTabs setActiveTab={setActiveTab} activeTab={activeTab} allData={data} columns={FormTableColums} selectedIds={selectedIds} setSelectedIds={setSelectedIds} data={data} />
      }
    </div>
  )
}

export default memo(Form)
