import React from 'react';
import ReactQuill from 'react-quill';
import { Controller, Control } from 'react-hook-form';

interface RichTextFieldProps {
    name: string;
    control: Control<any>;
    label?: string;
    placeholder?: string;
}

export const RichTextField: React.FC<RichTextFieldProps> = ({
    name,
    control,
    label = 'Description',
    placeholder = 'Write here...',
}) => {
    return (
        <div className="w-full mb-4">
            {label && <label className="block mb-1 font-medium">{label}</label>}

            <Controller
                name={name}
                control={control}
                defaultValue=""
                render={({ field: { onChange, value }, fieldState: { error } }) => (
                    <>
                        <ReactQuill
                            theme="snow"
                            value={value}
                            onChange={onChange}
                            placeholder={placeholder}
                        />
                        {error && (
                            <p className="text-red-500 text-sm mt-1">{error.message}</p>
                        )}
                    </>
                )}
            />
        </div>
    );
};
