import { FormControl, Select, MenuItem, Box, Button } from '@mui/material';
import { Control, Controller, FieldValues, Path } from 'react-hook-form';
import { ArrowBack, ArrowForward } from '@mui/icons-material';

import { Option } from '../../types';

interface ControlledFilterArrowsProps<T extends FieldValues> {
  name: Path<T>;
  control: Control<T>;
  options: Option[];
}

export const ControlledFilterArrows = <T extends FieldValues>({
  name,
  control,
  options,
}: ControlledFilterArrowsProps<T>) => {
  return (
    <FormControl fullWidth>
      <Controller
        name={name}
        control={control}
        render={({ field }) => {
          const currentIndex = options.findIndex((option) => option.value === field.value);
          const hasPrevious = currentIndex > 0;
          const hasNext = currentIndex < options.length - 1;
          
          const handlePrevious = () => {
            if (hasPrevious) {
              field.onChange(options[currentIndex - 1].value);
            }
          };

          const handleNext = () => {
            if (hasNext) {
              field.onChange(options[currentIndex + 1].value);
            }
          };

          return (
            <Box className='flex gap-3'>
              <Button onClick={handlePrevious} disabled={!hasPrevious}>
                <ArrowBack />
              </Button>
              <Select {...field} variant="outlined" fullWidth>
                {options.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </Select>
              <Button onClick={handleNext} disabled={!hasNext}>
                <ArrowForward />
              </Button>
            </Box>
          );
        }}
      />
    </FormControl>
  );
};
