import { Box, Button, Paper, Typography } from '@mui/material';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import { Link } from 'react-router-dom';
import { useTranslator } from '../../hooks/useTranslator';

const ThankYouPage = () => {
  const { t } = useTranslator('home')
  return (
    <Box className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-[#1e1e1e]">
      <Paper
        elevation={3}
        className="p-8 lg:p-12 rounded-2xl flex flex-col items-center gap-4 text-center shadow-md dark:bg-[#2a2a2a]"
      >
        <CheckCircleOutlineIcon className="text-green-500 text-6xl" />

        <Typography
          variant="h4"
          component="h1"
          className="font-semibold text-gray-800 dark:text-gray-100"
        >
          {t('thankYou')}
        </Typography>

        <Typography variant="body1" className="text-gray-600 dark:text-gray-300">
          {t('submittionNote')}
        </Typography>

        <Button
          component={Link}
          to="/"
          variant="contained"
          className="mt-4"
        >
          {t('back')}
        </Button>
      </Paper>
    </Box>
  );
}

export default ThankYouPage;
