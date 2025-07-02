import { memo, useRef, useState } from 'react'
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import { Box } from '@mui/material';
import { AiOutlineComment } from "react-icons/ai";
import { useForm } from 'react-hook-form';
import 'react-quill-new/dist/quill.snow.css'; 
import ReactQuill from 'react-quill-new';

const Comments = () => {
    const [value, setValue] = useState('');
    const quillRef = useRef<ReactQuill | null>(null);
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
                 <ReactQuill
      ref={quillRef}
      theme="snow"
      value={value}
      onChange={setValue}
      placeholder="Matn kiriting..."
    />
                </AccordionDetails>
            </Accordion>
        </div>
    )
}

export default memo(Comments)