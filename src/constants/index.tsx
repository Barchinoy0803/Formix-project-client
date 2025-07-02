import { QUESTION_TYPE, TEMPLATE_TYPE } from "../types"
import { Box, Typography } from "@mui/material"

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
  Question: [],
  tags: [],
  allowedUsers: []
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
    renderCell: () => (
      <img
        src={defaultImageLink}
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

export const defaultImageLink = "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBw0NDQ0NDQ0PDg0NDQ0NDQ0NDQ8NDQ4NFhEWFhURExMYHSggGBolGxUWITEhJSkrLi4uFx8zODMsNygtLisBCgoKBQUFDgUFDisZExkrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrK//AABEIAJ8BPgMBIgACEQEDEQH/xAAaAAEBAQEBAQEAAAAAAAAAAAAAAgEDBAUH/8QAMBABAQACAAIGCAcBAQAAAAAAAAECEQMEEiExQVJxFTJRYWKRobEFExQigZKi0XL/xAAUAQEAAAAAAAAAAAAAAAAAAAAA/8QAFBEBAAAAAAAAAAAAAAAAAAAAAP/aAAwDAQACEQMRAD8A/RAAAAAAAAAADQ0GaNNAZo0oBOjSzQI0adDQOejTpo0Dno0vRoEaNLYCdGlMBg2sAAAAAAAAAAAAAAAAAAAAAayKBjRoDdEipATpulaboE6NLkNAjRpejQIZpemaBGmLsZYCBVTQZWNYAAAAAAAAAAAAAAAAAAAABFJioDWyEVAFSEipAZMVSNkVICZG6Xo0COizTthw7l1SW+UdOLyuWGPSuu3Wu2wHk0yx1sTYDlYyulibAc9JrpU0EJVUgAAAAAAAAAAAAAAAAAAAARcRF4gqKjIuA2RWMZHfg8HLL1cbff3fMESKmL28LkPHf4x/69Mxw4fZjd+7G2/MHi4XKZ5d2p7+p6ceUwx68rvz6ozPj8S+rhZ77La4ZY53rsyvnKD0Zc1hj1YzflNRWN/N4dl7bueV7nk/Ly8N+Vd+U3LZZdWey9oPBcU2PbzXBvStktl6+qb63C8HPwZf1oPNYmx1sRYDlU10sRkDlUrqAAAAAAAAAAAAAAAAAAAAAI6YucdMQXF4oi8Qev8AD5jc9ZSXc6t+17+Z5n8vUmPbOr2Pk8PKyyztllj6nN49PhzOd2sv47wOT4uWeWXSvdNTuis+a6Ns6O9X2uX4d25eUc+P6+XmD0fq/h+p+q+H6rnLY613+3byZTVs9lsB6f1Xw/Vl5v4fq8yuJhcdb75sHa858P1duX43T31a179vn16uQ7MvOfYHg4vrZed+7lXbi+tfO/dxoIrnXSudBzyRV5IoAAAAAAAAAAAAAAAAAAAAEdMXOOmILi8XOLgLj6n4fn0sLhe77V8qPVyXF6OePsv7b/IPXyWHRzzxvc48f18vN75w9Z3L24yXzj5/Mevl5g7Y8zlJrq8+9y2rluF07u+rO2+33PTxOWl7P2/YHPluFu7vZOz316eJw5lOvuVjjJJJ2RoPnc1h0curss3HbkOzLzn2bz+O8Zl7L9Kn8OvVl5wHh4vrXzv3csl8W/uy8793Ogioq7UZA55IXkgAAAAAAAAAAAAAAAAAAAACLiIqAuKiIqA6Sqlc5VSg+7yvE6eGN79avnHh5jDLp5axys32yVz5Tm/y5ZZuXr7dar0+kp4L/YDHmOJJqcPUnw5N/VcXwf5yPSM8H1PSM8F+YN/VcTwf5yZ+q4vg/wA5HpGeC/M9IzwfUE8Tj8TKWXDqvV6uTr+HY2TLcs652zTn6SngvzZ6Tngv9geHi392X/q/dztbnlu2+22otBlTk2poIqVVIAAAAAAAAAAAAAAAAAAAAEVEqBqpUNBcqtucqtguVUrnK3YOkrduezYOmzbn0i0FbZck7ZsG2stZtloFqaUBiWsAAAAAAAAAAAAAAAAAAAAAaxoDWAKakBcptICzaGgrZtIDdm07Ng3bGAAMArG1gAAAAAAAAAAAAAAAAAAAABsAaMAaMAUJAUJAUJAUJAaMAaMAbWAAAAAAAAAAAD//2Q=="

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

export const FormTableColums = [
  {
    field: 'image',
    headerName: 'table.image',
    width: 150,
    renderCell: (params: any) => (
      <img
        src={params?.row?.template?.image || defaultImageLink}
        alt="template"
        className="w-full h-full object-contain rounded-[8px]"
      />
    ),
    sortable: false,
    filterable: false,
  },
  {
    field: 'title',
    headerName: 'table.title',
    width: 250,
    renderCell: (params: any) => (
      <Box display="flex" alignItems="center" height="100%">
        <Typography>{params.row.template.title || ""}</Typography>
      </Box>
    ),
  },
  {
    field: 'topic',
    headerName: 'table.topic',
    width: 250,
    renderCell: (params: any) => (
      <Box display="flex" alignItems="center" height="100%">
        <Typography>{params.row.template.topic || ""}</Typography>
      </Box>
    ),
  },
  {
    field: 'createdAt',
    headerName: 'Filled date',
    width: 250,
    renderCell: (params: any) => (
      <Box display="flex" alignItems="center" height="100%">
        <Typography>{params.row.createdAt}</Typography>
      </Box>
    ),
  },
  {
    field: 'type',
    headerName: 'table.type',
    width: 150,
    renderCell: (params: any) => (
      <Box display="flex" alignItems="center" height="100%">
        <Typography>{params.row.template.type || ""}</Typography>
      </Box>
    ),
  },
];

export const templateTabNames = [
  'template.all',
  'template.your'
];

export const formTabNames = [
  'forms.all',
  'forms.your'
]

 export const languages = [
    { code: 'uz', label: 'UZ' },
    { code: 'en', label: 'EN' },
    { code: 'ru', label: 'RU' },
  ];