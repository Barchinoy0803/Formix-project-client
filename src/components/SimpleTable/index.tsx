import { memo } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Chip } from '@mui/material';
import { TemplateForm } from '../../types/form';
import { useTranslator } from '../../hooks/useTranslator';

interface SimpleTableProps {
    data: TemplateForm[]
}
const SimpleTable = ({ data }: SimpleTableProps) => {
    const {t} = useTranslator('table')

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
                    {data?.map((item: TemplateForm) => (
                        <TableRow
                            key={item.title}
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        >
                            <TableCell component="th" scope="row">
                                {item.title}
                            </TableCell>
                            <TableCell align="right">{item.user?.username}</TableCell>
                            <TableCell align="right">{<Chip
                                label={item.topic}
                                style={{
                                    backgroundColor: 'transparent',
                                    border: '1px solid #FFA500',
                                    color: '#FFA500',
                                }}
                            />}</TableCell>
                            <TableCell align="right">{item.type}</TableCell>
                            <TableCell align="right">{item.createdAt}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}

export default memo(SimpleTable)