import Button from "@mui/material/Button";
import { MuiOtpInput } from "mui-one-time-password-input";
import { Controller, useForm } from "react-hook-form";
import { Box, Typography } from "@mui/material";
import { memo } from "react";
import { OtpDefaultValues } from "../../../constants";
import { OtpForm } from "../../../types/form";
import { useActivateMutation } from "../../../service/api/user.api";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../../../redux";
import toast from "react-hot-toast";

const OtpVerification = () => {
    const { email } = useSelector((state: RootState) => state.users)

    const { control, handleSubmit } = useForm<OtpForm>({
        defaultValues: OtpDefaultValues
    });

    const [activateUser, { isLoading }] = useActivateMutation()

    const navigate = useNavigate()

    const onSubmit = async (data: OtpForm) => {
        try {
            const { activated } = await activateUser({ ...data, email }).unwrap()
            if (activated) {
                navigate("/auth/login")
            }
        } catch (error) {
            toast.error(`Invalid code.\nPlease enter correct code that you recieve on ${email}.`)
        }

    };

    return (
        <form className="flex flex-col gap-3" onSubmit={handleSubmit(onSubmit)}>
            <Typography variant="h5">
                Email Verification
            </Typography>

            <Controller
                name="otp"
                control={control}
                rules={{
                    validate: (value) =>
                        value.length === 6 || 'OTP must be exactly 6 digits',
                }}
                render={({ field }) => (
                    <Box >
                        <MuiOtpInput
                            {...field}
                            length={6}
                            className='flex gap-4 mb-4 w-[450px]'
                            TextFieldsProps={{ size: 'small' }}
                        />
                    </Box>
                )}
            />

            <Typography variant="body2" className=" text-gray-600">
                We have sent a verification code to your email.
            </Typography>

            <Button
                type="submit"
                variant="contained"
                loading={isLoading}
                className=" w-[150px]"
            >
                Send
            </Button>
        </form>
    )
}

export default memo(OtpVerification)
