import { memo } from 'react';
import {
  Table, TableBody, TableCell, TableContainer,
  TableHead, TableRow, Paper, Chip
} from '@mui/material';
import { TemplateForm } from '../../types/form';
import { useTranslator } from '../../hooks/useTranslator';
import { useNavigate } from 'react-router-dom';

interface SimpleTableProps {
  data: TemplateForm[]
}

const SimpleTable = ({ data }: SimpleTableProps) => {
  const { t } = useTranslator('table');
  const navigate = useNavigate();

  const handleRowClick = (id: string) => {
    navigate(`/dashboard/template/${id}?readmode=true`);
  };

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 1200 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell width={100}>{t('title')}</TableCell>
            <TableCell width={50} align="right">{t('author')}</TableCell>
            <TableCell width={50} align="right">{t('topic')}</TableCell>
            <TableCell width={100} align="right">{t('type')}</TableCell>
            <TableCell width={130} align="right">{t('createdAt')}</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data?.map((item) => (
            <TableRow
              key={item.id}
              hover
              sx={{ cursor: 'pointer' }}
              onClick={() => handleRowClick(item.id)}
            >
              <TableCell component="th" scope="row">
                {item.title}
              </TableCell>
              <TableCell align="right">{item.user?.username}</TableCell>
              <TableCell align="right">
                <Chip
                  label={item.topic}
                  sx={{
                    backgroundColor: 'transparent',
                    border: '1px solid #FFA500',
                    color: '#FFA500'
                  }}
                />
              </TableCell>
              <TableCell align="right">{item.type}</TableCell>
              <TableCell align="right">{item.createdAt}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default memo(SimpleTable);
