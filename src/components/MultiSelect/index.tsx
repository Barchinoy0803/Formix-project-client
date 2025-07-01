import { memo, useMemo } from 'react';
import { Autocomplete, CircularProgress, TextField } from '@mui/material';
import { Control, Controller } from 'react-hook-form';
import { Option } from '../../types';

interface SelectProps {
  name: string;
  control: Control<any>;
  data?: any[];
  isLoading: boolean;
  label?: string;
  placeholder?: string;
  mapOption: (item: any) => Option;
}

const MultiSelect = ({
  name,
  control,
  data = [],
  isLoading,
  label = 'Select',
  placeholder = 'Select',
  mapOption,
}: SelectProps) => {
  const options: Option[] = useMemo(() => data.map(mapOption), [data]);

  if (isLoading) return <CircularProgress />;

  return (
    <Controller
      name={name}
      control={control}
      render={({ field: { onChange, value }, fieldState: { error } }) => (
        <Autocomplete
          multiple
          className="w-full"
          limitTags={6}
          options={options}
          value={value || []}
          getOptionLabel={(opt) => opt.label}
          isOptionEqualToValue={(a, b) => a.id === b.id}
          onChange={(_, val) => onChange(val)}
          renderInput={(params) => (
            <TextField
              {...params}
              label={label}
              placeholder={placeholder}
              error={!!error}
              helperText={error?.message}
            />
          )}
        />
      )}
    />
  );
};

export default memo(MultiSelect);
