import { memo } from 'react';
import { Box, Typography } from '@mui/material';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import { useTranslator } from '../../hooks/useTranslator';

const NoDataPlaceholder = () => {
  const { t } = useTranslator('home')

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      textAlign="center"
      p={4}
    >
      <InfoOutlinedIcon fontSize="large" sx={{ mb: 1 }} />
      <Typography variant="h6" gutterBottom>
        {t('noData')}
      </Typography>
      <Typography variant="body2" color="text.secondary">
        {t('noDataNote')}
      </Typography>
    </Box>
  )
};

export default memo(NoDataPlaceholder);
