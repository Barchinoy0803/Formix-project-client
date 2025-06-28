import { memo } from 'react'
import { Autocomplete, CircularProgress, TextField } from '@mui/material'
import { Control, Controller } from 'react-hook-form'
import { getAllUserOptions } from './helpers'
import { useGetUsersQuery } from '../../service/api/user.api'
import { TemplateForm, AllowedUsers } from '../../types/form'

interface UserSelectionProps {
    name: keyof TemplateForm,
    control: Control<TemplateForm>,
}

const UserSelection = ({ control, name }: UserSelectionProps) => {
    const { data: allUsers } = useGetUsersQuery({})
    const userOptions = getAllUserOptions(allUsers)

    return (
        <>
            {
                allUsers ? <div>
                    <Controller
                        control={control}
                        name={name}
                        render={({ field: { onChange, value }, fieldState: { error } }) => {
                            const usersArray = Array.isArray(value) &&
                                value.every(item => typeof item === 'object' && 'id' in item)
                                ? value as AllowedUsers[]
                                : []

                            return (
                                <Autocomplete
                                    className="w-full"
                                    multiple
                                    limitTags={6}
                                    id="multiple-limit-tags"
                                    options={userOptions}
                                    value={usersArray.map(user => user.id) || []}
                                    onChange={(_, newValue) => {
                                        const selectedUsers = newValue.map(id => ({
                                            id,
                                            username: userOptions.find((opt: any) => opt.value === id)?.label || id
                                        }))
                                        onChange(selectedUsers)
                                    }}
                                    renderInput={(params) => (
                                        <TextField
                                            {...params}
                                            label="Users"
                                            placeholder="Users"
                                            error={!!error}
                                            helperText={error?.message}
                                        />
                                    )}
                                />
                            )
                        }}
                    />
                </div> : <CircularProgress />
            }
        </>

    )
}

export default memo(UserSelection)