import { FormControl, FormControlLabel, RadioGroup, Radio, Grid, Typography } from '@mui/material';
import { Control, Controller, FieldValues, Path } from 'react-hook-form';

import { Option, OptionValue } from '../../types';
import { useTranslator } from '../../hooks/useTranslator';

interface RadioWithLabelProps<T extends FieldValues> {
    label?: string;
    options: Option[];
    isVertical?: boolean;
    defaultValue?: OptionValue;
    control: Control<T>;
    name: Path<T>;
}

const RadioWithLabel = <T extends FieldValues>({
    label,
    options,
    isVertical,
    defaultValue,
    control,
    name,
}: RadioWithLabelProps<T>) => {
    const { t } = useTranslator()

    return (
        <Grid container gap={0.25} flexDirection="column">
            {label && (
                <Typography variant="body2" color="textSecondary">
                    {label}
                </Typography>
            )}
            <FormControl>
                <Controller
                    name={name}
                    control={control}
                    render={({ field }) => (
                        <RadioGroup row={isVertical} defaultValue={defaultValue} {...field}>
                            {options?.map(({ value, label }, index) => (
                                <FormControlLabel key={`${index}${value}`} value={value} control={<Radio />} label={t(label)} />
                            ))}
                        </RadioGroup>
                    )}
                />
            </FormControl>
        </Grid>
    );
};

export default RadioWithLabel;
