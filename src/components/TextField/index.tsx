import { TextField } from "@mui/material"
import { Control, Controller, FieldValues, Path } from "react-hook-form"

interface ControlledTextFieldProps<T extends FieldValues> {
    name: Path<T>,
    control: Control<T>,
    label?: string,
    disabled?: boolean,
    lineCount?: number,
    size?: "medium" | "small";  
    type?: 'number' | "text"
}

const ControlledTextField = <T extends FieldValues>({ name, control, label, disabled, lineCount, size = "medium", type='text' }: ControlledTextFieldProps<T>) => {
    return (
        <div>
            <Controller name={name} control={control} render={({ field, fieldState: { error } }) => (
                <TextField type={type} size={size} minRows={lineCount} multiline={!!lineCount} disabled={disabled} label={label} fullWidth {...field} error={!!error} helperText={error?.message} value={field.value || ""} onChange={(newValue) => field.onChange(newValue)} />
            )} />
        </div>
    )
}

export default ControlledTextField  
