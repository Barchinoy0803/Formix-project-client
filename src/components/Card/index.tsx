import { Typography } from "@mui/material"
import { TemplateForm } from "../../types/form"
import { NavLink } from "react-router-dom"

interface CardProps {
    templateData: TemplateForm
}

const Card = ({ templateData }: CardProps) => {
    return (
        <NavLink to={`/dashboard/template/${templateData.id}?readmode=true`} className="container mx-auto flex gap-5">
            <div className="flex flex-col gap-2 rounded-sm overflow-hidden">
                <img className="w-[200px] h-[200px] object-cover" src={templateData.image} alt="" />
                <Typography>{templateData.title}</Typography>
            </div>
        </NavLink>
    )
}

export default Card