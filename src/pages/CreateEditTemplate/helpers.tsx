export const getAllUserOptions = (users: any) => {
    return users?.map((user: any) => ({
        id: user.id,
    }))
}