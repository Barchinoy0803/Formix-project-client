import { memo, useMemo } from 'react';
import { Autocomplete, CircularProgress, TextField } from '@mui/material';
import { Control, Controller } from 'react-hook-form';
import { useGetUsersQuery } from '../../service/api/user.api';
import { TemplateForm, AllowedUsers } from '../../types/form';

type UserOption = AllowedUsers;

function isAllowedUser(item: unknown): item is AllowedUsers {
  return !!item && typeof item === 'object' && 'id' in item && 'username' in item;
}

interface UserSelectionProps {
  name: keyof TemplateForm;         
  control: Control<TemplateForm>;
}

const UserSelection = ({ control, name }: UserSelectionProps) => {
  const { data: allUsers, isFetching } = useGetUsersQuery({});

  const userOptions: UserOption[] = useMemo(
    () =>
      (allUsers ?? []).map((u: { id: any; username: any; }) => ({
        id: u.id,
        username: u.username,
      })),
    [allUsers]
  );

  if (isFetching) return <CircularProgress />;

  return (
    <Controller
      control={control}
      name={name}
      render={({ field: { onChange, value }, fieldState: { error } }) => {
        const usersArray: AllowedUsers[] =
          Array.isArray(value) && value.every(isAllowedUser) ? value : [];

        return (
          <Autocomplete
            className="w-full"
            multiple
            limitTags={6}
            options={userOptions}
            value={usersArray}
            getOptionLabel={(option) => option.username}
            isOptionEqualToValue={(opt, val) => opt.id === val.id}
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
        );
      }}
    />
  );
};

export default memo(UserSelection);
