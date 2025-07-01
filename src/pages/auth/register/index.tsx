import { Button, Typography } from '@mui/material'
import { memo } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { ErrorType, User } from '../../../types'
import toast from 'react-hot-toast'
import { useRegisterMutation } from '../../../service/api/user.api'
import { defaultUser } from '../../../constants'
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod";
import { RegisterForm, RegisterSchema } from '../../../types/form'
import ControlledTextField from '../../../components/TextField'
import { useDispatch } from 'react-redux'
import { setEmail } from '../../../redux/features/user.slice'
import { useTranslator } from '../../../hooks/useTranslator'

const Register = () => {
  const dispatch = useDispatch()
  const { t } = useTranslator('auth')
  const { control, handleSubmit, formState: { isValid } } = useForm<RegisterForm>(
    {
      defaultValues: defaultUser,
      resolver: zodResolver(RegisterSchema),
      mode: 'onChange'
    })

  const [registerUser, { isLoading }] = useRegisterMutation()
  const navigate = useNavigate()

  const onSubmit = async (data: User) => {
    dispatch(setEmail(data.email))
    try {
      const { id } = await registerUser(data).unwrap()

      if (id) {
        navigate("/auth/email-verification")
      }
    } catch (error) {
      const err = error as ErrorType
      if (err.status === 400 || err.status === 409) {
        toast.error(err.data.message)
      }

    }
  }

  return (
    <div className='w-[400px] h-[400px] max-[430px]:w-full flex flex-col gap-3'>
      <Typography variant="h5">
        {t('register')}
      </Typography>
      <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col gap-4' action="">
        <ControlledTextField label='Username' name='username' control={control} />
        <ControlledTextField label='Email' name='email' control={control} />
        <ControlledTextField label='Password' name='password' control={control} />
        <Button disabled={!isValid} type='submit' loading={isLoading} variant='contained' color='primary' size='large'>{t('register')}</Button>
        <span>{t('haveAccount')} <Link className='text-[#7985f7]' to='/auth/login'>{t('login')}</Link></span>
      </form>
    </div>
  )
}

export default memo(Register)