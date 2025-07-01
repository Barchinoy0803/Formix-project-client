import { Box, Button, CircularProgress, Typography } from "@mui/material"
import { useEffect, useMemo, useState } from "react"
import { useLocation, useParams } from "react-router-dom"
import ControlledTextField from "../../components/TextField"
import { FormProvider, useFieldArray, useForm, useWatch } from "react-hook-form"
import { TemplateForm } from "../../types/form"
import { defaultImageLink, initialStateTemplate, templateTypeOptions } from "../../constants"
import CustomSelect from "../../components/Select"
import FileUpload from "../../components/FileUpload"
import { useCreateTemplateMutation, useFileUploadMutation, useGetOneTemplateQuery, useUpdateTemplateMutation } from "../../service/api/template.api"
import toast from "react-hot-toast"
import Question from "../../components/Question"
import { TiPlus } from "react-icons/ti";
import { QUESTION_TYPE, TEMPLATE_TYPE } from "../../types"
import { closestCenter, DndContext, DragEndEvent } from "@dnd-kit/core"
import { SortableContext, verticalListSortingStrategy } from "@dnd-kit/sortable"
import { useTranslator } from "../../hooks/useTranslator"
import MultiSelect from "../../components/MultiSelect"
import { useGetUsersQuery } from "../../service/api/user.api"
import { useGetAllTagsQuery } from "../../service/api/tags.api"
import ManageTag from "./ManageTag"
import CreateDeleteTagDialog from "./CreateDeleteDialog"

const CreateEditTemplate = () => {
    const [file, setFile] = useState<File>()
    const location = useLocation();
    const { id } = useParams()
    const { t } = useTranslator('buttons')
    const { t: template } = useTranslator('template')

    const [fileUpload] = useFileUploadMutation()
    const [createTemplate, { isLoading: createLoading }] = useCreateTemplateMutation()
    const [updateTemplate, { isLoading: updateLoading }] = useUpdateTemplateMutation()


    const { data: allUsers, isFetching } = useGetUsersQuery({});
    const { data, isLoading } = useGetOneTemplateQuery(id, { skip: id === "new" })
    const { data: tagData } = useGetAllTagsQuery({})

    const searchParams = new URLSearchParams(location.search);
    const isReadMode = searchParams.get('readmode');

    const methods = useForm<TemplateForm>({
        defaultValues: initialStateTemplate,
        mode: 'onChange'
    })

    const { control, handleSubmit, reset, getValues, formState: { isDirty, isValid } } = methods
    const { fields, remove, insert, move } = useFieldArray({ control, name: "Question" })
    const templateType = useWatch({ control, name: "type" })

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

    const handleDragEnd = (event: DragEndEvent) => {
        const { active, over } = event

        if (!over) return

        if (active.id !== over.id) {
            const oldIndex = fields.findIndex((item) => item.id === active.id)
            const newIndex = fields.findIndex((item) => item.id === over.id)
            move(oldIndex, newIndex)
        }
    }

    const onSubmit = async (data: TemplateForm) => {
        let imageUrl = defaultImageLink;
        const payload = {
            ...data,
            allowedUsers: data.TemplateAccess?.map((item) => ({ id: item.value }))
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
                            <form key={fields.length} onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5" action="">
                                <FileUpload isReadMode={!!isReadMode} file={file} setFile={setFile} />
                                <Box className="grid grid-cols-3 gap-2">
                                    <ControlledTextField disabled={!!isReadMode} control={control} name='title' label="Title" />
                                    <ControlledTextField disabled={!!isReadMode} control={control} name='topic' label="Topic" />
                                    <CustomSelect disabled={!!isReadMode} control={control} name="type" label="Type" options={templateTypeOptions} />
                                </Box>
                                <Box className="flex gap-3">
                                    <MultiSelect
                                        name="Tags"
                                        control={control}
                                        data={tagData}
                                        isLoading={isFetching}
                                        label="Tags"
                                        placeholder="Select tags"
                                        mapOption={(u) => ({ value: u.id, label: u.name })}
                                    />
                                    <ManageTag />
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
                                    />
                                }
                                <ControlledTextField disabled={!!isReadMode} lineCount={5} control={control} name='description' label="Description" />
                                <Box className="flex justify-between items-center">
                                    <Typography variant="h6">{template('questions')}</Typography>
                                    <Button disabled={!!isReadMode} onClick={handleAddQuestion} variant="outlined" startIcon={<TiPlus />}>{template('addQuestion')}</Button>
                                </Box>
                                <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
                                    <SortableContext items={fields} strategy={verticalListSortingStrategy}>
                                        {
                                            fields?.map((el: any, inx: any) => (
                                                <Question isReadMode={!!isReadMode} removeQuestion={() => handleRemoveQuestion(inx)} key={el.id} question={el} index={inx} />
                                            ))
                                        }
                                    </SortableContext>
                                </DndContext>
                                {
                                    !isReadMode &&
                                    <Button type="submit" variant="contained" disabled={createLoading || updateLoading || !isValid || !isDirty}>{t('submit')}</Button>
                                }
                            </form>
                        </FormProvider>
                    </Box>
                    <CreateDeleteTagDialog tags={tagData} />
                </Box> : <CircularProgress />
            }
        </>
    )
}

export default CreateEditTemplate