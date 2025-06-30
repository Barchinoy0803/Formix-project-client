import { Typography } from "@mui/material"

interface OpenQuestionAnalyzeProps {
    answers: any
}

const OpenQuestionAnalyze = ({ answers }: OpenQuestionAnalyzeProps) => {
    return (
        <div className="container mx-auto mt-7 flex flex-col gap-4 items-center">
            {
                answers?.map((answer: any) => (
                    <div className=" bg-gray-100 p-4 rounded-[10px] w-full">
                        <Typography key={answer.id}>{answer.answer}</Typography>
                    </div>
                ))
            }
        </div>
    )
}

export default OpenQuestionAnalyze