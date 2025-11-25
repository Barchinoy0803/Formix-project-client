import { memo, useState } from 'react'
import { useMeQuery } from '../../service/api/user.api'
import { Box, CircularProgress, IconButton, TextField } from '@mui/material'
import { MdContentCopy, MdVisibility, MdVisibilityOff } from "react-icons/md";
import { getRoleColor, getStatusColor } from './helpers';

const MyProfile = () => {
    const { data, isLoading } = useMeQuery({})
    const [showApiToken, setShowApiToken] = useState(false)

    const handleCopy = () => {
        navigator.clipboard.writeText(data?.apiToken)
    }

    const toggleApiTokenVisibility = () => {
        setShowApiToken(!showApiToken)
    }

    const getDisplayedApiToken = () => {
        if (!data?.apiToken) return ''
        return showApiToken ? data?.apiToken : '•'.repeat(data?.apiToken.length)
    }

    return (
        <Box className="min-h-screen bg-gray-50">
            <Box className="bg-gradient-to-r from-blue-600 to-purple-600">
                <Box className="max-w-4xl mx-auto px-4 py-12">
                    <Box className="flex items-center space-x-6">
                        <Box className="w-24 h-24 bg-blue-100 bg-opacity-20 rounded-full flex items-center justify-center backdrop-blur-sm">
                            <span className="text-[#47AED6] font-bold text-3xl">
                                {data?.username?.charAt(0).toUpperCase() || data?.email?.charAt(0).toUpperCase() || '?'}
                            </span>
                        </Box>

                        <Box className="flex-1">
                            <h1 className="text-3xl font-bold text-white mb-2">
                                {data?.username || 'User Profile'}
                            </h1>
                            <p className="text-blue-100 text-lg">
                                {data?.email}
                            </p>
                            <Box className="flex items-center space-x-3 mt-3">
                                <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(data?.status)}`}>
                                    {data?.status || 'Unknown'}
                                </span>
                                <span className={`px-3 py-1 rounded-full text-sm font-medium ${getRoleColor(data?.role)}`}>
                                    {data?.role || 'User'}
                                </span>
                            </Box>
                        </Box>
                    </Box>
                </Box>
            </Box>

            <Box className="max-w-4xl mx-auto px-4 py-8">
                <Box className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
                    <Box className="px-6 py-4 border-b border-gray-200">
                        <h2 className="text-xl font-semibold text-gray-900">Profile Information</h2>
                    </Box>

                    <Box className="px-6 py-6">
                        <Box className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <Box>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Username
                                </label>
                                <p className="text-gray-900 text-base">
                                    {data?.username || 'Not provided'}
                                </p>
                            </Box>

                            <Box>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Email Address
                                </label>
                                <p className="text-gray-900 text-base">
                                    {data?.email}
                                </p>
                            </Box>

                            <Box>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Account Status
                                </label>
                                <Box className="flex items-center">
                                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(data?.status)}`}>
                                        {data?.status || 'Unknown'}
                                    </span>
                                </Box>
                            </Box>

                            <Box>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Role
                                </label>
                                <Box className="flex items-center">
                                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${getRoleColor(data?.role)}`}>
                                        {data?.role || 'User'}
                                    </span>
                                </Box>
                            </Box>
                        </Box>
                    </Box>
                </Box>

                <Box className="flex gap-6 mt-8">
                    <Box className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 w-full">
                        <h3 className="text-lg font-semibold text-gray-900 mb-3">Account Details</h3>
                        <Box className="space-y-3">
                            <Box className="flex justify-between">
                                <span className="text-sm text-gray-600">Status</span>
                                <span className="text-sm font-medium text-gray-900">{data?.status || 'N/A'}</span>
                            </Box>
                            <Box className="flex justify-between">
                                <span className="text-sm text-gray-600">Role</span>
                                <span className="text-sm font-medium text-gray-900">{data?.role || 'N/A'}</span>
                            </Box>
                        </Box>
                    </Box>

                    <Box className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 w-full">
                        <h3 className="text-lg font-semibold text-gray-900 mb-3">Contact Information</h3>
                        <Box className="space-y-3">
                            <Box>
                                <span className="text-sm text-gray-600 block">Email</span>
                                <span className="text-sm font-medium text-gray-900">{data?.email}</span>
                            </Box>
                        </Box>
                    </Box>

                </Box>
                <Box className='flex gap-3 mt-4'>
                    <TextField
                        disabled
                        fullWidth
                        value={getDisplayedApiToken()}
                        InputProps={{
                            endAdornment: (
                                <IconButton onClick={toggleApiTokenVisibility} edge="end">
                                    {showApiToken ? <MdVisibilityOff /> : <MdVisibility />}
                                </IconButton>
                            )
                        }}
                    />
                    <IconButton onClick={handleCopy}><MdContentCopy /></IconButton>
                </Box>
            </Box>
            {
                isLoading && <CircularProgress />
            }
        </Box>
    )
}

export default memo(MyProfile)