import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import { Control, Controller, FieldValues, Path } from 'react-hook-form';
import { SelectOption } from '../../types';
import { FormControl } from '@mui/material';
import { useTranslator } from '../../hooks/useTranslator';

interface SelectProps<T extends FieldValues> {
    name: Path<T>,
    control: Control<T>,
    label?: string,
    options: SelectOption[],
    disabled?: boolean;
}

const CustomSelect = <T extends FieldValues>({ name, control, label, options, disabled }: SelectProps<T>) => {
    const { t } = useTranslator();

    return (
        <div>
            <Controller name={name} control={control} render={({ field, fieldState: { error } }) => (
                <FormControl className='w-[255px]'>
                    <InputLabel id="demo-simple-select-helper-label">{label}</InputLabel>
                    <Select
                        disabled={disabled}
                        labelId="demo-simple-select-helper-label"
                        id="demo-simple-select-helper"
                        {...field}
                        value={field.value || ""}
                        label={label}
                        error={!!error}
                        onChange={(newValue) => field.onChange(newValue)}
                    >
                        {
                            options.map((option) => (
                                <MenuItem value={option.value}>{t(option.label)}</MenuItem>
                            ))
                        }
                    </Select>
                </FormControl>
            )} />
        </div>
    );
}

export default CustomSelect;
