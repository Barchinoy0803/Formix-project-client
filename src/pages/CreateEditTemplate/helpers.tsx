import { avatarColors } from "../../constants"

export const getBgColor = () => {
    return avatarColors[Math.floor(Math.random() * avatarColors.length)];
}