import { DataGrid, GridColDef, GridRowSelectionModel } from '@mui/x-data-grid';
import Paper from '@mui/material/Paper';
import { useTranslator } from '../../hooks/useTranslator';
import { getTranslatedColumns } from './helpers';

interface CustomTableProps<T> {
  data: T[];
  setSelectedIds: React.Dispatch<React.SetStateAction<GridRowSelectionModel | undefined>>;
  selectedIds: GridRowSelectionModel | undefined;
  columns: GridColDef[];
}

export const CustomTable = <T,>({
  data,
  setSelectedIds,
  selectedIds,
  columns,
}: CustomTableProps<T>) => {
  const { t } = useTranslator();

  const handleSelectionChange = (newSelection: GridRowSelectionModel) => {
    setSelectedIds(newSelection);
  };

  return (
    <Paper sx={{ width: '100%', overflowX: 'auto' }}>
      <DataGrid
        rows={data}
        columns={getTranslatedColumns(columns, t)}
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
