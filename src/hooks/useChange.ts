import { ChangeEvent, useState } from "react"

export const useChange = <T,>(initialState: T) => {
    const [formData, setFormData] = useState<T>(initialState)

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        let { name, value } = event.target
        setFormData((prev: T) => ({ ...prev, [name]: value }))
    }

    return { formData, setFormData, handleChange }
}   
