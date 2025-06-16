import { memo, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Button, Typography } from '@mui/material'
import { useLoginMutation } from '../../../service/api/user.api'
import { ErrorType, User } from '../../../types'
import { useDispatch, useSelector } from 'react-redux'
import { resetUserState, setToken, setUserRole } from '../../../redux/features/user.slice'
import toast from 'react-hot-toast'
import { initialStateLogin } from '../../../constants'
import { useForm } from "react-hook-form"
import ControlledTextField from '../../../components/TextField'
import { zodResolver } from '@hookform/resolvers/zod'
import { LoginForm, LoginSchema } from '../../../types/form'
import { RootState } from '../../../redux'

const Login = () => {
    const { email } = useSelector((state: RootState) => state.users)
    const { control, handleSubmit, setValue } = useForm<LoginForm>({
        defaultValues: initialStateLogin,
        resolver: zodResolver(LoginSchema),
        mode: 'onChange'
    })

    const [loginUser, { isLoading }] = useLoginMutation()
    const navigate = useNavigate()
    const dispatch = useDispatch()

    useEffect(() => {
        if (email)
            setValue("email", email)
    }, [email])

    const onSubmit = async (data: User) => {
        try {
            const { token, role } = await loginUser(data).unwrap()
            if (token && role) {
                dispatch(setToken(token))
                dispatch(setUserRole(role))
                navigate("/dashboard")
            }
            dispatch(resetUserState())
        } catch (error) {
            const err = error as ErrorType;
            if (err.status === 404 || err.status === 400) {
                toast.error(err.data?.message || "User not found!");
            } else {
                toast.error("Your password is incorrect");
            }
        }
    }

    return (
        <div className='w-[400px] h-[400px] max-[430px]:w-full flex flex-col gap-3'>
            <Typography variant="h5">
                Login
            </Typography>
            <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col gap-4' action="">
                <ControlledTextField disabled={!!email} control={control} name='email' label="Email" />
                <ControlledTextField control={control} name='password' label="Password" />
                <Button type='submit' loading={isLoading} variant='contained' color='primary' size='large'>Login</Button>
                <span>If you don't have an account: <Link className='text-[#7985f7]' to='/auth/register'>Register</Link></span>
            </form>
        </div>
    )
}

export default memo(Login)