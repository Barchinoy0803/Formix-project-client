import { Box, Tooltip, Typography } from "@mui/material"
import { TemplateForm } from "../../types/form"
import { NavLink } from "react-router-dom"
import { FaIdCard } from "react-icons/fa";
import { memo } from "react";

interface CardProps {
    templateData: TemplateForm
}

const Card = ({ templateData }: CardProps) => {
    return (
        <NavLink to={`/dashboard/template/${templateData.id}?readmode=true`} className="flex gap-5">
            <Box className="flex flex-col gap-1 rounded-sm overflow-hidden shadow">
                <img className="w-[200px] h-[200px] object-cover" src={templateData.image} alt="" />
                <Box className="px-3 py-1">
                    <Box className="flex gap-1 items-center">
                        <FaIdCard className="text-gray-500 text-[22px]" />
                        <Tooltip title={templateData.title.length > 15 ? templateData.title : ''}>
                            <Typography className="break-words whitespace-normal">{templateData.title.length > 15 ? templateData.title.slice(0,15) + '...' : templateData.title}</Typography>
                        </Tooltip>
                    </Box>
                    <Box className="flex gap-1">
                        <Typography>{templateData.user?.username}</Typography>
                    </Box>
                </Box>
            </Box>
        </NavLink>
    )
}

export default memo(Card)