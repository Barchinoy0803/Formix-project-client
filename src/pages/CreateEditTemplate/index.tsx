import { Box, Button, CircularProgress, Typography } from "@mui/material"
import { useEffect, useMemo, useState } from "react"
import { useLocation, useParams } from "react-router-dom"
import { FormProvider, useForm } from "react-hook-form"
import { TemplateForm } from "../../types/form"
import { defaultImageLink, initialStateTemplate } from "../../constants"
import { useCreateTemplateMutation, useFileUploadMutation, useGetOneTemplateQuery, useUpdateTemplateMutation } from "../../service/api/template.api"
import toast from "react-hot-toast"
import { useTranslator } from "../../hooks/useTranslator"
import { useGetAllTagsQuery } from "../../service/api/tags.api"
import CreateDeleteTagDialog from "./CreateDeleteDialog"
import Details from "./Details"
import Questions from "./Questions"
import Comments from "./Comments"

const CreateEditTemplate = () => {
    const [file, setFile] = useState<File>()
    const location = useLocation();
    const { id } = useParams()
    const { t } = useTranslator('buttons')
    const { t: template } = useTranslator('template')

    const [fileUpload] = useFileUploadMutation()
    const [createTemplate, { isLoading: createLoading }] = useCreateTemplateMutation()
    const [updateTemplate, { isLoading: updateLoading }] = useUpdateTemplateMutation()

    const { data, isLoading } = useGetOneTemplateQuery(id, { skip: id === "new" })
    const { data: tagData } = useGetAllTagsQuery({})

    const searchParams = new URLSearchParams(location.search);
    const isReadMode = searchParams.get('readmode');

    const methods = useForm<TemplateForm>({
        defaultValues: initialStateTemplate,
        mode: 'onChange'
    })

    const { handleSubmit, reset, getValues, formState: { isDirty, isValid } } = methods

    const isCreateOption = useMemo(() => {
        return id === "new"
    }, [id])

    useEffect(() => {
        if (data) {
            reset(data)
        }
        console.log(getValues());

    }, [data])

    const onSubmit = async (data: TemplateForm) => {
        let imageUrl = defaultImageLink;
        const payload = {
            ...data,
            allowedUsers: data.TemplateAccess?.map((item) => ({ id: item.value })),
            tagIds: data.tagIds.map((tag: any) => tag.value)
        }

        if (file) {
            const formData = new FormData();
            formData.append("file", file);

            const response = await fileUpload({ body: formData });
            imageUrl = response.data.url;
        }
        if (isCreateOption) {
            const result = await createTemplate({ ...payload, image: imageUrl });

            if (result) {
                toast.success(template('success'))
            } else {
                toast.error(template('error'))
            }
        } else {
            await updateTemplate({ id, body: { ...payload, image: imageUrl } })
        }

        reset(initialStateTemplate)
    };

    return (
        <>
            {
                !isLoading ? <Box className="container mx-auto w-[800px] flex flex-col gap-3">
                    {
                        !isReadMode && <Typography variant="h5" >{isCreateOption ? template('createTemplate') : template('updateTemplate')}</Typography>
                    }
                    <Box>
                        <FormProvider {...methods}>
                            <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5 mb-3" action="">
                                <Details templateId={id!} file={file} setFile={setFile} tagData={tagData} isReadMode={!!isReadMode} />
                                <Questions isReadMode={!!isReadMode} />
                                {
                                    !isReadMode &&
                                    <Button type="submit" variant="contained" disabled={createLoading || updateLoading || !isValid || !isDirty}>{t('submit')}</Button>
                                }
                            </form>
                        </FormProvider>
                        {
                            isReadMode &&
                            <Comments templateId={id!}/>
                        }
                    </Box>
                    <CreateDeleteTagDialog tags={tagData} />
                </Box> : <CircularProgress className="grid place-content-center" />
            }
        </>
    )
}

export default CreateEditTemplate
