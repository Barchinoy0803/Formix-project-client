import { DataGrid, GridColDef, GridRowSelectionModel } from '@mui/x-data-grid';
import Paper from '@mui/material/Paper';
import { User } from '../../types';

interface CustomTableProps {
    data: User[];
    setSelectedIds: React.Dispatch<React.SetStateAction<GridRowSelectionModel | undefined>>;
    selectedIds: GridRowSelectionModel | undefined,
    columns: GridColDef[]
}

export const CustomTable = ({ data, setSelectedIds, selectedIds, columns }: CustomTableProps) => {
    const handleSelectionChange = (newSelection: GridRowSelectionModel) => {
        setSelectedIds(newSelection);
    };

    return (
        <Paper sx={{ width: '100%', overflowX: 'auto' }}>
            <DataGrid
                rows={data}
                columns={columns}
                checkboxSelection
                hideFooterPagination
                onRowSelectionModelChange={handleSelectionChange}
                rowSelectionModel={selectedIds}
                sx={{
                    border: 0,
                    minWidth: '600px',
                }}
                getRowId={(row) => row.id}
            />
        </Paper>
    );
};
