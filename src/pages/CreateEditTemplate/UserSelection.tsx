import { memo } from 'react'
import { Autocomplete, TextField } from '@mui/material'
import { Control, Controller, FieldValues, Path } from 'react-hook-form'
import { getAllUserOptions } from './helpers'
import { useGetUsersQuery } from '../../service/api/user.api'

interface UserSelectionProps <T extends FieldValues> {
    name: Path<T>,
    control: Control<T>,
}

const UserSelection = <T extends FieldValues> ({ control, name }: UserSelectionProps<T>) => {
  const { data: allUsers } = useGetUsersQuery({})
  const userOptions = getAllUserOptions(allUsers)

  return (
    <div>
      <Controller
        control={control}
        name={name}
        render={({ field: { onChange, value }, fieldState: { error } }) => (
          <Autocomplete
            className="w-full"
            multiple
            limitTags={6}
            id="multiple-limit-tags"
            options={userOptions}
            value={value || []}
            onChange={(_, newValue) => onChange(newValue)}
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
        )}
      />
    </div>
  )
}

export default memo(UserSelection)
