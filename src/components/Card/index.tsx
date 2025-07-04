import { Box, Typography } from "@mui/material"
import { TemplateForm } from "../../types/form"
import { NavLink } from "react-router-dom"
import { FaIdCard } from "react-icons/fa";

interface CardProps {
    templateData: TemplateForm
}

const Card = ({ templateData }: CardProps) => {
    console.log(templateData, "template");

    return (
        <NavLink to={`/dashboard/template/${templateData.id}?readmode=true`} className="flex gap-5">
            <Box className="flex flex-col gap-1 rounded-sm overflow-hidden shadow">
                <img className="w-[200px] h-[200px] object-cover" src={templateData.image} alt="" />
                <Box className="px-3 py-1">
                    <Box className="flex gap-1 items-center">
                        <FaIdCard className="text-gray-500 text-[22px]" />
                        <Typography className="break-words whitespace-normal">{templateData.title}</Typography>
                    </Box>
                    <Box className="flex gap-1">
                        <Typography>{templateData.user?.username}</Typography>
                    </Box>
                </Box>
            </Box>
        </NavLink>
    )
}

export default Card