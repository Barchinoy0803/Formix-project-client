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
  disabled?: boolean
}

const MultiSelect = ({
  name,
  control,
  data = [],
  isLoading,
  label = 'Select',
  placeholder = 'Select',
  mapOption,
  disabled
}: SelectProps) => {
  const options: Option[] = useMemo(() => data.map(mapOption), [data]);

  if (isLoading) return <CircularProgress />;

  return (
   <Controller
  name={name}
  control={control}
  defaultValue={[]}                       
  render={({ field: { onChange, value }, fieldState: { error } }) => (
    <Autocomplete
      disabled={disabled}
      multiple
      className="w-full"
      limitTags={6}
      options={options}
      value={value as Option[]}       
      onChange={(_, selected) => onChange(selected)}
      getOptionLabel={(opt) => opt.label}
      isOptionEqualToValue={(a, b) => a.value === b.value}
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
