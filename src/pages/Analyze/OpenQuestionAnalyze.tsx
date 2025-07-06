import { Typography } from "@mui/material"

interface OpenQuestionAnalyzeProps {
  answers: any
}

const OpenQuestionAnalyze = ({ answers }: OpenQuestionAnalyzeProps) => {
  return (
    <div className="container mx-auto mt-7 flex flex-col gap-4 items-center">
      {
        answers?.map((answer: any) => (
          <div
            key={answer.id}
            className="bg-gray-100 dark:bg-gray-800 p-4 rounded-[10px] w-full"
          >
            <Typography className="text-gray-800 dark:text-gray-100">
              {answer.answer}
            </Typography>
          </div>
        ))
      }
    </div>
  )
}

export default OpenQuestionAnalyze
