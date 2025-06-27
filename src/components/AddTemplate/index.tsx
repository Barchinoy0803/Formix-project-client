import { Typography } from "@mui/material";
import { FaPlus } from "react-icons/fa";
import { NavLink } from "react-router-dom";

const AddTemplate = () => {
    return (
        <NavLink to={'/dashboard/templates'} className="flex flex-col gap-2 ">
            <div className="bg-white w-[200px] h-[200px] flex items-center justify-center text-[75px] border border-gray-200 rounded-sm">
                <button className="p-[200px] cursor-pointer">
                    <FaPlus className="text-[#47aed6]" />
                </button>
            </div>
            <Typography>Blank Template</Typography>
        </NavLink>
    )
}

export default AddTemplate
