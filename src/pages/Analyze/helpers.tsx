import { Option, QUESTION_TYPE } from "../../types";
import { QuestionForm } from "../../types/form";
import CloseQuestionAnalyze from "./CloseQuestionAnalyze";
import MultichoiceQuestionAnalyze from "./MultichoiceQuestionAnalyze";
import NumericalQuestionAnalyze from "./NumericalQuestionAnalyze";
import OpenQuestionAnalyze from "./OpenQuestionAnalyze";

export const getQuestionOptions = (questions?: QuestionForm[]): Option[] => {
  if (!Array.isArray(questions)) {
    return [];
  }

  return questions.map((q: QuestionForm) => ({
    label: q.title!,
    value: q.id!,
  }));
};


export const getAnalyzes = (analyze: any) => {
    switch (analyze?.questionType) {
        case QUESTION_TYPE.OPEN:
            return <OpenQuestionAnalyze answers={analyze?.answers} />
        case QUESTION_TYPE.NUMERICAL:
            return <NumericalQuestionAnalyze analyze={analyze} />
        case QUESTION_TYPE.CLOSE:
            return <CloseQuestionAnalyze analyze={analyze} />
        case QUESTION_TYPE.MULTICHOICE:
            return <MultichoiceQuestionAnalyze analyze={analyze} />
    }
}   
