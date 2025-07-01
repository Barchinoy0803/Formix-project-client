import { memo, useState } from 'react'
import { GridRowSelectionModel } from '@mui/x-data-grid';
import { useDeleteUsersMutation, useGetUsersQuery, useUpdateUserRoleMutation, useUpdateUserStatusMutation } from '../../service/api/user.api';
import { Button, CircularProgress, Tooltip } from '@mui/material';
import { FaRegTrashCan, FaUnlockKeyhole } from "react-icons/fa6";
import { FaLock } from "react-icons/fa";
import toast from 'react-hot-toast';
import { FaUserShield, FaUserSlash } from "react-icons/fa";
import { CustomTable } from '../../components/Table';
import { UserTableColumns } from '../../constants';
import { useTranslator } from '../../hooks/useTranslator';

const UserManagment = () => {
    const { data, isLoading } = useGetUsersQuery({})
    const { t } = useTranslator('auth')
    const [selectedIds, setSelectedIds] = useState<GridRowSelectionModel>();
    const [deleteUser, { isLoading: deleteLoading }] = useDeleteUsersMutation()
    const [updateUserRole] = useUpdateUserRoleMutation()
    const [updateUserStatus] = useUpdateUserStatusMutation()

    const handleDelete = async () => {
        await deleteUser({ ids: [...selectedIds?.ids!] })
        toast.success(t('userDeleted'))
    }

    const handleUpdateUserStatus = async (isBlockAction: boolean) => {
        await updateUserStatus({ ids: [...selectedIds?.ids!], status: isBlockAction ? "BLOCKED" : "ACTIVE" })
        toast.success(t('statusUpdated'))
    }

     const handleUpdateUserRole = async (isAdminAction: boolean) => {
        await updateUserRole({ ids: [...selectedIds?.ids!], role: isAdminAction ? "ADMIN" : "USER" })
        toast.success(t('statusUpdated'))
    }

    return (
        <div className='container mx-auto flex flex-col gap-3 mt-[50px] mb-[30px]'>
            <div className='flex items-center gap-5 mb-3'>
                <Tooltip placement='top' title={t('blockUsers')}>
                    <Button onClick={() => handleUpdateUserStatus(true)} startIcon={<FaLock />} variant='outlined'>{t('block')}</Button>
                </Tooltip>
                <Tooltip placement='top' title={t('unlockUsers')}>
                    <Button onClick={() => handleUpdateUserStatus(false)} startIcon={<FaUnlockKeyhole className='text-[#1976d2]' />} variant='outlined'>{t('unblock')}</Button>
                </Tooltip>
                <Tooltip placement='top' title={t('promoteAdmin')}>
                    <Button className='text-red-600' disabled={deleteLoading} onClick={() => handleUpdateUserRole(true)} startIcon={<FaUserShield />} variant='outlined'>{t('promoteAdmin')}</Button>
                </Tooltip>
                <Tooltip placement='top' title={t('demoteAdmin')}>
                    <Button className='text-red-600' disabled={deleteLoading} onClick={() => handleUpdateUserRole(false)} startIcon={<FaUserSlash />} variant='outlined'>{t('demoteAdmin')}</Button>
                </Tooltip>
                <Tooltip placement='top' title={t('deleteUsers')}>
                    <Button color='error' disabled={deleteLoading} onClick={handleDelete} startIcon={<FaRegTrashCan />} variant='outlined'>{t('delete')}</Button>
                </Tooltip>
            </div>
            {
                isLoading ? <CircularProgress /> : <CustomTable columns={UserTableColumns} selectedIds={selectedIds} setSelectedIds={setSelectedIds} data={data} />
            }
        </div>
    )
}

export default memo(UserManagment)
