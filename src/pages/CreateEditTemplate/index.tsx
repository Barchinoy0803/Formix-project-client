import { Button, CircularProgress, Typography } from "@mui/material"
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import ControlledTextField from "../../components/TextField"
import { FormProvider, useFieldArray, useForm } from "react-hook-form"
import { TemplateForm } from "../../types/form"
import { defaultImageLink, initialStateTemplate, templateTypeOptions } from "../../constants"
import CustomSelect from "../../components/Select"
import FileUpload from "../../components/FileUpload"
import { useCreateTemplateMutation, useFileUploadMutation, useGetOneTemplateQuery, useUpdateTemplateMutation } from "../../service/api/template.api"
import toast from "react-hot-toast"
import Question from "../../components/Question"

const CreateEditTemplate = () => {
    const [file, setFile] = useState<File>()
    const { id } = useParams()
    const [isCreateOption, setIsCreateOption] = useState<boolean>(false)

    const [fileUpload] = useFileUploadMutation()
    const [createTemplate] = useCreateTemplateMutation()
    const [updateTemplate] = useUpdateTemplateMutation()
    const { data, isLoading } = useGetOneTemplateQuery(id, { skip: id === "new" })


    const methods = useForm<TemplateForm>({
        defaultValues: initialStateTemplate,
        mode: 'onChange'
    })

    const { control, handleSubmit, reset } = methods

    useEffect(() => {
        if (data) {
            reset(data)
        }
    }, [data])

    useEffect(() => {
        if (id === "new") {
            setIsCreateOption(true)
        } else {
            setIsCreateOption(false)
        }
    }, [])
    const { fields, remove } = useFieldArray({ control, name: "Question" })

    const handleRemoveQuestion = (index: number) => {
        remove(index)
    }

    const onSubmit = async (data: TemplateForm) => {
        let imageUrl = defaultImageLink;
        if (file) {
            const formData = new FormData();
            formData.append("file", file);

            const response = await fileUpload({ body: formData });
            imageUrl = response.data.url;
        }
        if (isCreateOption) {

            const result = await createTemplate({ ...data, image: imageUrl });

            if (result) {
                toast.success("Successfully created!")
            } else {
                toast.error("Something went wrong!")
            }
        } else {
            await updateTemplate({ id, body: { ...data, image: imageUrl } })
        }
        reset(initialStateTemplate)
    };

    return (
        <>
            {
                !isLoading ? <div className="container mx-auto w-[800px] flex flex-col gap-3">
                    <Typography variant="h5" >{isCreateOption ? "Create new template" : "Update template"}</Typography>
                    <div>
                        <FormProvider {...methods}>
                            <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5" action="">
                                <FileUpload file={file} setFile={setFile} />
                                <div className="grid grid-cols-3 gap-2">
                                    <ControlledTextField control={control} name='title' label="Title" />
                                    <ControlledTextField control={control} name='topic' label="Topic" />
                                    <CustomSelect control={control} name="type" label="Type" options={templateTypeOptions} />
                                </div>
                                <ControlledTextField lineCount={5} control={control} name='description' label="Description" />
                                <Typography variant="h6">Questions</Typography>
                                {
                                    fields?.map((el, inx) => (
                                        <Question removeQuestion={() => handleRemoveQuestion(inx)} key={el.id} question={el} index={inx} />
                                    ))
                                }
                                <Button type="submit" variant="contained">Submit</Button>
                            </form>
                        </FormProvider>
                    </div>
                </div> : <CircularProgress />
            }
        </>
    )
}

export default CreateEditTemplate