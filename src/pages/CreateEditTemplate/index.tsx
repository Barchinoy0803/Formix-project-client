import { Typography } from "@mui/material"
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import ControlledTextField from "../../components/TextField"
import { useForm } from "react-hook-form"
import { TemplateForm } from "../../types/form"
import { initialStateTemplate, templateTypeOptions } from "../../constants"
import CustomSelect from "../../components/Select"

const CreateEditTemplate = () => {
    const { id } = useParams()
    const [isCreateOption, setIsCreateOption] = useState<boolean>(false)

    const { control, handleSubmit, setValue } = useForm<TemplateForm>({
        defaultValues: initialStateTemplate,
        mode: 'onChange'
    })

    const handleFilesChange = (files: File[]) => {
        console.log("Uploaded files:", files);
    };

    useEffect(() => {
        if (id === "new") {
            setIsCreateOption(true)
        } else {
            setIsCreateOption(false)
        }
    }, [])

    return (
        <div className="container mx-auto w-[800px] flex flex-col gap-3">
            <Typography variant="h5" >{isCreateOption ? "Create new template" : "Update template"}</Typography>
            <div>
                <form className="flex flex-col gap-5" action="">
                    <div className="grid grid-cols-3 gap-2">
                        <ControlledTextField control={control} name='title' label="Title" />
                        <ControlledTextField control={control} name='topic' label="Topic" />
                        <CustomSelect control={control} name="type" label="Type" options={templateTypeOptions} />
                    </div>
                    <ControlledTextField lineCount={5} control={control} name='description' label="Description" />
                </form>
            </div>
        </div>
    )
}

export default CreateEditTemplate