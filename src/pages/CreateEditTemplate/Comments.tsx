import { memo } from 'react'
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import { Box } from '@mui/material';
import { AiOutlineComment } from "react-icons/ai";
import { RichTextField } from '../../components/RichTextField';
import { useForm } from 'react-hook-form';

const Comments = () => {
    const { handleSubmit, control } = useForm({
        defaultValues: {
            content: '',
        },
    });

    const onSubmit = (data:any) => {
        console.log('Form data:', data);
    };
    return (
        <div>
            <Accordion>
                <AccordionSummary
                    expandIcon={<ArrowDropDownIcon />}
                    aria-controls="panel2-content"
                    id="panel2-header"
                >
                    <Box className="flex gap-2 items-center">
                        <AiOutlineComment className='text-2xl' />
                        <Typography variant='h6' component="span">Comments</Typography>
                    </Box>
                </AccordionSummary>
                <AccordionDetails>
                    <RichTextField name="content" control={control} label="Content" />
                </AccordionDetails>
            </Accordion>
        </div>
    )
}

export default memo(Comments)