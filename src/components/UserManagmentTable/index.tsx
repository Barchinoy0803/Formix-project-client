import { DataGrid, GridColDef, GridRowSelectionModel } from '@mui/x-data-grid';
import Paper from '@mui/material/Paper';
import { User } from '../../types';

interface UserTableProps {
    data: User[];
    setSelectedIds: React.Dispatch<React.SetStateAction<GridRowSelectionModel | undefined>>;
    selectedIds: GridRowSelectionModel | undefined
}

const columns: GridColDef[] = [ 
    { field: 'username', headerName: 'Username', width: 200 },
    { field: 'email', headerName: 'Email', width: 400 },
    { field: 'status', headerName: 'Status', width: 150 },
    { field: 'role', headerName: 'Role', width: 150 },
    { field: 'createdAt', headerName: 'Join Us', width: 450 },
];

export const UserTable = ({ data, setSelectedIds, selectedIds }: UserTableProps) => {
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
