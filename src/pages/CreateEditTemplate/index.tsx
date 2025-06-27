import { Button, CircularProgress, Typography } from "@mui/material"
import { useEffect, useMemo, useState } from "react"
import { useLocation, useParams } from "react-router-dom"
import ControlledTextField from "../../components/TextField"
import { FormProvider, useFieldArray, useForm } from "react-hook-form"
import { TemplateForm } from "../../types/form"
import { defaultImageLink, initialStateTemplate, templateTypeOptions } from "../../constants"
import CustomSelect from "../../components/Select"
import FileUpload from "../../components/FileUpload"
import { useCreateTemplateMutation, useFileUploadMutation, useGetOneTemplateQuery, useUpdateTemplateMutation } from "../../service/api/template.api"
import toast from "react-hot-toast"
import Question from "../../components/Question"
import { TiPlus } from "react-icons/ti";
import { QUESTION_TYPE } from "../../types"

const CreateEditTemplate = () => {
    const [file, setFile] = useState<File>()
    const location = useLocation();
    const { id } = useParams()

    const [fileUpload] = useFileUploadMutation()
    const [createTemplate, { isLoading: createLoading }] = useCreateTemplateMutation()
    const [updateTemplate, { isLoading: updateLoading }] = useUpdateTemplateMutation()
    const { data, isLoading } = useGetOneTemplateQuery(id, { skip: id === "new" })

    const searchParams = new URLSearchParams(location.search);
    const isReadMode = searchParams.get('readmode');

    const methods = useForm<TemplateForm>({
        defaultValues: initialStateTemplate,
        mode: 'onChange'
    })

    const { control, handleSubmit, reset, getValues, formState: { isDirty, isValid } } = methods
    const { fields, remove, insert } = useFieldArray({ control, name: "Question" })

    const isCreateOption = useMemo(() => {
        return id === "new"
    }, [id])

    useEffect(() => {
        if (data) {
            reset(data)
        }
    }, [data])

    const handleRemoveQuestion = (index: number) => {
        remove(index)

    }

    const handleAddQuestion = () => {
        const { id } = getValues()

        insert(fields.length, { templateId: id, sequence: fields.length, description: "", type: QUESTION_TYPE.OPEN, Options: [], title: "", isPublished: false })
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
            console.log(data);

            await updateTemplate({ id, body: { ...data, image: imageUrl } })
        }
        console.log(data);
        
        reset(initialStateTemplate)
    };


    return (
        <>
            {
                !isLoading ? <div className="container mx-auto w-[800px] flex flex-col gap-3">
                    <Typography variant="h5" >{isCreateOption ? "Create new template" : "Update template"}</Typography>
                    <div>
                        <FormProvider {...methods}>
                            <form key={fields.length} onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5" action="">
                                <FileUpload isReadMode={!!isReadMode} file={file} setFile={setFile} />
                                <div className="grid grid-cols-3 gap-2">
                                    <ControlledTextField disabled={!!isReadMode} control={control} name='title' label="Title" />
                                    <ControlledTextField disabled={!!isReadMode} control={control} name='topic' label="Topic" />
                                    <CustomSelect disabled={!!isReadMode} control={control} name="type" label="Type" options={templateTypeOptions} />
                                </div>
                                <ControlledTextField disabled={!!isReadMode} lineCount={5} control={control} name='description' label="Description" />
                                <div className="flex justify-between items-center">
                                    <Typography variant="h6">Questions</Typography>
                                    <Button disabled={!!isReadMode} onClick={handleAddQuestion} variant="outlined" startIcon={<TiPlus />}>Add question</Button>
                                </div>
                                {
                                    fields?.map((el: any, inx: any) => (
                                        <Question isReadMode={!!isReadMode} removeQuestion={() => handleRemoveQuestion(inx)} key={el.id} question={el} index={inx} />
                                    ))
                                }
                                {
                                    !isReadMode &&
                                    <Button type="submit" variant="contained" disabled={createLoading || updateLoading || !isValid || !isDirty}>Submit</Button>
                                }
                            </form>
                        </FormProvider>
                    </div>
                </div> : <CircularProgress />
            }
        </>
    )
}

export default CreateEditTemplate