import { memo, ReactNode } from 'react'
import { Box, Typography } from '@mui/material'
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined'

interface NoDataPlaceholderProps {
  title?: string
  description?: string
  icon?: ReactNode
}

const NoDataPlaceholder = ({
  title,
  description,
  icon = <InfoOutlinedIcon fontSize="large" sx={{ mb: 1 }} />
}: NoDataPlaceholderProps) => {
  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      textAlign="center"
      p={4}
    >
      {icon}
      <Typography variant="h6" gutterBottom>
        {title}
      </Typography>
      <Typography variant="body2" color="text.secondary">
        {description}
      </Typography>
    </Box>
  )
}

export default memo(NoDataPlaceholder)
