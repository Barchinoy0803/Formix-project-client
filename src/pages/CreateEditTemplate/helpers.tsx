export const getAllUserOptions = (users: any) => {
    return users?.map((user: any) => ({
        label: user.username,
        id: user.id
    }))
}