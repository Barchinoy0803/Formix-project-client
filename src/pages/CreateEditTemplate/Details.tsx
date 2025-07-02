import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import { Accordion, AccordionDetails, AccordionSummary, Box, Typography } from '@mui/material'
import { Dispatch, memo, SetStateAction } from 'react'
import ControlledTextField from "../../components/TextField"
import CustomSelect from "../../components/Select"
import FileUpload from "../../components/FileUpload"
import MultiSelect from "../../components/MultiSelect"
import ManageTag from "./ManageTag"
import { useGetUsersQuery } from "../../service/api/user.api"
import { useFormContext, useWatch } from 'react-hook-form'
import { TEMPLATE_TYPE } from '../../types'
import { TemplateForm } from '../../types/form'
import { templateTypeOptions } from '../../constants'
import { TbListDetails } from "react-icons/tb";

interface DetailsProps {
  isReadMode: boolean;
  setFile: Dispatch<SetStateAction<File | undefined>>;
  file: File | undefined;
  tagData: any
}

const Details = ({ isReadMode, file, setFile, tagData }: DetailsProps) => {
  const { control } = useFormContext<TemplateForm>()

  const { data: allUsers, isFetching } = useGetUsersQuery({});
  const templateType = useWatch({ control, name: "type" })

  return (
    <div>
      <Accordion defaultExpanded>
        <AccordionSummary
          expandIcon={<ArrowDropDownIcon />}
          aria-controls="panel2-content"
          id="panel2-header"
        >
          <Box  className='flex gap-2 items-center'>
            <TbListDetails className='text-2xl'/>
            <Typography variant='h6' component="span">Details</Typography>
          </Box>
        </AccordionSummary>
        <AccordionDetails className='flex flex-col gap-4'>
          <FileUpload isReadMode={!!isReadMode} file={file} setFile={setFile} />
          <Box className="grid grid-cols-3 gap-2">
            <ControlledTextField disabled={!!isReadMode} control={control} name='title' label="Title" />
            <ControlledTextField disabled={!!isReadMode} control={control} name='topic' label="Topic" />
            <CustomSelect disabled={!!isReadMode} control={control} name="type" label="Type" options={templateTypeOptions} />
          </Box>
          {
            templateType === TEMPLATE_TYPE.PRIVATE && <MultiSelect
              name="TemplateAccess"
              control={control}
              data={allUsers}
              isLoading={isFetching}
              label="Users"
              placeholder="Select users"
              mapOption={(u) => ({ value: u.id, label: u.username })}
              disabled={!!isReadMode}
            />
          }
          <Box className="flex gap-3">
            <MultiSelect
              name="tagIds"
              control={control}
              data={tagData}
              isLoading={isFetching}
              label="Tags"
              placeholder="Select tags"
              mapOption={(u) => ({ value: u.id, label: u.name })}
              disabled={!!isReadMode}
            />
            {
              !isReadMode &&
              <ManageTag />
            }
          </Box>
          <ControlledTextField disabled={!!isReadMode} lineCount={5} control={control} name='description' label="Description" />
        </AccordionDetails>
      </Accordion>
    </div>
  )
}

export default memo(Details)