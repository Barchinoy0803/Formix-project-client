import { GridColDef } from "@mui/x-data-grid";
import { TFunction } from "i18next";

export const getTranslatedColumns = (
  columns: GridColDef[],
  t: TFunction
): GridColDef[] => {
  return columns.map((column) => ({
    ...column,
    headerName: column.headerName ? t(column.headerName) : column.headerName,
  }));
};
