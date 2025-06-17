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

const UserManagment = () => {
    const { data, isLoading } = useGetUsersQuery({})
    const [selectedIds, setSelectedIds] = useState<GridRowSelectionModel>();
    const [deleteUser, { isLoading: deleteLoading }] = useDeleteUsersMutation()
    const [updateUserRole] = useUpdateUserRoleMutation()
    const [updateUserStatus] = useUpdateUserStatusMutation()

    const handleDelete = async () => {
        await deleteUser({ ids: [...selectedIds?.ids!] })
        toast.success("User deleted!")
    }

    const handleUpdateUserStatus = async (isBlockAction: boolean) => {
        await updateUserStatus({ ids: [...selectedIds?.ids!], status: isBlockAction ? "BLOCKED" : "ACTIVE" })
        toast.success("User status updated!")
    }

     const handleUpdateUserRole = async (isAdminAction: boolean) => {
        await updateUserRole({ ids: [...selectedIds?.ids!], role: isAdminAction ? "ADMIN" : "USER" })
        toast.success("User status updated!")
    }

    return (
        <div className='container mx-auto flex flex-col gap-3 mt-[50px] mb-[30px]'>
            <div className='flex items-center gap-5 mb-3'>
                <Tooltip placement='top' title='Block Users'>
                    <Button onClick={() => handleUpdateUserStatus(true)} startIcon={<FaLock />} variant='outlined'>Block</Button>
                </Tooltip>
                <Tooltip placement='top' title='Unlock Users'>
                    <Button onClick={() => handleUpdateUserStatus(false)} startIcon={<FaUnlockKeyhole className='text-[#1976d2]' />} variant='outlined'>Unblock</Button>
                </Tooltip>
                <Tooltip placement='top' title='Promote Admin'>
                    <Button className='text-red-600' disabled={deleteLoading} onClick={() => handleUpdateUserRole(true)} startIcon={<FaUserShield />} variant='outlined'>Promote Admin</Button>
                </Tooltip>
                <Tooltip placement='top' title='Demote Admin'>
                    <Button className='text-red-600' disabled={deleteLoading} onClick={() => handleUpdateUserRole(false)} startIcon={<FaUserSlash />} variant='outlined'>Demote Admin</Button>
                </Tooltip>
                <Tooltip placement='top' title='Delete Users'>
                    <Button color='error' disabled={deleteLoading} onClick={handleDelete} startIcon={<FaRegTrashCan />} variant='outlined'>Delete</Button>
                </Tooltip>
            </div>
            {
                isLoading ? <CircularProgress /> : <CustomTable columns={UserTableColumns} selectedIds={selectedIds} setSelectedIds={setSelectedIds} data={data} />
            }
        </div>
    )
}

export default memo(UserManagment)
