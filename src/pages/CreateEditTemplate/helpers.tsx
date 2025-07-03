import { avatarColors } from "../../constants"

export const getAllUserOptions = (users: any) => {
    return users?.map((user: any) => ({
        id: user.id,
    }))
}

export const getBgColor = () => {
    return avatarColors[Math.floor(Math.random() * avatarColors.length)];
}