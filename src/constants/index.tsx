import { TEMPLATE_TYPE } from "../types"

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
  type: TEMPLATE_TYPE.PUBLIC
}

export const templateTypeOptions = [
  {
    label: "Public",
    value: TEMPLATE_TYPE.PUBLIC
  },
  {
    label: "Private",
    value: TEMPLATE_TYPE.PRIVATE
  }
]

export const DrawerListItems = [
  {
    title: "Templates",
    link: "/dashboard/templates"
  },
  {
    title: "Forms",
    link: "/dashboard/forms"
  },
  {
    title: "Analyze",
    link: "/dashboard/analyze"
  }
]

export const UserTableColumns = [
  { field: 'username', headerName: 'Username', width: 200 },
  { field: 'email', headerName: 'Email', width: 400 },
  { field: 'status', headerName: 'Status', width: 150 },
  { field: 'role', headerName: 'Role', width: 150 },
  { field: 'createdAt', headerName: 'Join Us', width: 450 },
];

export const TemplateTableColumns = [
  {
    field: 'image',
    headerName: 'Image',
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
  { field: 'title', headerName: 'Title', width: 250 },
  { field: 'topic', headerName: 'Topic', width: 250 },
  { field: 'description', headerName: 'description', width: 500 },
  { field: 'type', headerName: 'type', width: 150 }
];