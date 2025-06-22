import i18next from "i18next"
import { QUESTION_TYPE, TEMPLATE_TYPE } from "../types"
import i18n from "../utils/i18n"

export const defaultUser = {
  username: "",
  email: "",
  password: ""
}

export const initialStateLogin = {
  email: "",
  password: ""
}

export const OtpDefaultValues = {
  otp: ""
}

export const initialStateTemplate = {
  title: "",
  topic: "",
  description: "",
  image: "",
  type: TEMPLATE_TYPE.PUBLIC,
  Question: []
}

export const templateTypeOptions = [
  {
    label: 'template.public',
    value: TEMPLATE_TYPE.PUBLIC
  },
  {
    label: 'template.private',
    value: TEMPLATE_TYPE.PRIVATE
  }
]

export const questionTypeOptions = [
  {
    label: "question.open",
    value: QUESTION_TYPE.OPEN
  },
  {
    label: "question.close",
    value: QUESTION_TYPE.CLOSE
  },
  {
    label: "question.multichoice",
    value: QUESTION_TYPE.MULTICHOICE
  },
  {
    label: "question.numerical",
    value: QUESTION_TYPE.NUMERICAL
  },
]


export const drawerListItems = [
  {
    title: "templates",
    link: "/dashboard/templates"
  },
  {
    title: "forms",
    link: "/dashboard/forms"
  },
  {
    title: "analyze",
    link: "/dashboard/analyze"
  }
]

export const UserTableColumns = [
  { field: 'username', headerName: 'table.username', width: 200 },
  { field: 'email', headerName: 'table.email', width: 400 },
  { field: 'status', headerName: 'table.status', width: 150 },
  { field: 'role', headerName: 'table.role', width: 150 },
  { field: 'createdAt', headerName: 'table.joinUs', width: 450 },
];

export const TemplateTableColumns = [
  {
    field: 'image',
    headerName: 'table.image',
    width: 150,
    renderCell: (params: any) => (
      <img
        src={params.value}
        alt="template"
        className="w-full h-full object-contain rounded-[8px]"
      />
    ),
    sortable: false,
    filterable: false,
  },
  { field: 'title', headerName: 'table.title', width: 250 },
  { field: 'topic', headerName: 'table.topic', width: 250 },
  { field: 'description', headerName: 'table.description', width: 500 },
  { field: 'type', headerName: 'table.type', width: 150 }
];

export const defaultImageLink = "https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.shutterstock.com%2Fsearch%2Fdefault-image-icon&psig=AOvVaw1PRDcwsEDtSTJH9zlDEeNF&ust=1750335955327000&source=images&cd=vfe&opi=89978449&ved=0CBEQjRxqFwoTCLiz_9j7-o0DFQAAAAAdAAAAABAE"

export const YES_NO_OPTIONS = [
  {
    label: 'question.yes',
    value: "YES",
  },
  {
    label: 'question.no',
    value: "NO",
  }
]