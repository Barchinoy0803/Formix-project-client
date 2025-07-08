import { FormControl, FormControlLabel, Checkbox, Grid, Typography, FormGroup } from '@mui/material';
import { Control, Controller, ControllerRenderProps, FieldValues, Path } from 'react-hook-form';
import { Option, OptionValue } from '../../types';
import { memo } from 'react';

interface CheckboxGroupProps<T extends FieldValues> {
    label?: string;
    options: Option[];
    control: Control<T>;
    name: Path<T>;
    disabled?: boolean
}

const CheckboxGroup = <T extends FieldValues>({ label, options, control, name, disabled }: CheckboxGroupProps<T>) => {
    const handleCheckboxChange =
        (field: ControllerRenderProps<T, Path<T>>, optionValue: OptionValue) =>
            (event: React.ChangeEvent<HTMLInputElement>) => {
                const valueArray = Array.isArray(field.value) ? [...field.value] : [];

                if (event.target.checked) {
                    if (!valueArray.includes(optionValue)) {
                        field.onChange([...valueArray, optionValue]);
                    }
                } else {
                    field.onChange(valueArray.filter((item: OptionValue) => item !== optionValue));
                }
            };

    return (
        <Grid container gap={0.25} flexDirection="column">
            {label && (
                <Typography variant="body2" color="textSecondary">
                    {label}
                </Typography>
            )}
            <FormControl component="fieldset">
                <Controller
                    name={name}
                    control={control}
                    render={({ field }) => {
                        return (
                            <FormGroup>
                                {options.map(({ value, label }) => (
                                    <FormControlLabel
                                        key={value}
                                        control={
                                            <Checkbox
                                                disabled={disabled}
                                                checked={Array.isArray(field.value) ? (field.value as OptionValue[]).includes(value) : false}
                                                onChange={handleCheckboxChange(field, value)}
                                                value={value}
                                            />
                                        }
                                        label={label}
                                    />
                                ))}
                            </FormGroup>
                        );
                    }}
                />

            </FormControl>
        </Grid>
    );
};

export default memo(CheckboxGroup);
