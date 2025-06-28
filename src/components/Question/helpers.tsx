import { Transform, CSS } from "@dnd-kit/utilities"

export const getDndStyle = (transform: null | Transform, transition?: string) => ({
    transform: CSS.Transform.toString(transform),
    transition
})  