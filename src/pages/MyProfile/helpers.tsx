
export const getStatusColor = (status: string) => {
    switch (status?.toLowerCase()) {
        case 'active':
            return 'bg-green-100 text-green-800'
        case 'inactive':
            return 'bg-red-100 text-red-800'
        case 'pending':
            return 'bg-yellow-100 text-yellow-800'
        default:
            return 'bg-gray-100 text-gray-800'
    }
}

export const getRoleColor = (role: string) => {
    switch (role?.toLowerCase()) {
        case 'admin':
            return 'bg-purple-100 text-purple-800'
        case 'manager':
            return 'bg-blue-100 text-blue-800'
        case 'user':
            return 'bg-gray-100 text-gray-800'
        default:
            return 'bg-gray-100 text-gray-800'
    }
}