import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import { CustomTable } from '../Table';
import { TemplateForm } from '../../types/form';
import { GridColDef, GridRowSelectionModel } from '@mui/x-data-grid';
import { useTranslator } from '../../hooks/useTranslator';

interface TabsProps {
    data: TemplateForm[],
    columns: GridColDef[],
    selectedIds: GridRowSelectionModel | undefined,
    setSelectedIds: React.Dispatch<React.SetStateAction<GridRowSelectionModel | undefined>>,
    allData: TemplateForm[],
    activeTab: string,
    setActiveTab: React.Dispatch<React.SetStateAction<string>>
    tabNames: string[]
}

const CustomTabs = ({ data, columns, selectedIds, setSelectedIds, allData, activeTab, setActiveTab, tabNames }: TabsProps) => {
    const { t } = useTranslator()

    const handleChange = (_: React.SyntheticEvent, newValue: string) => {
        setActiveTab(newValue);
        setSelectedIds(undefined)
    };

    return (
        <Box sx={{ width: '100%', typography: 'body1' }}>
            <TabContext value={activeTab}>
                <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                    <TabList onChange={handleChange} aria-label="lab API tabs example">
                        <Tab label={t(tabNames[0])} value='all' />
                        <Tab label={t(tabNames[1])} value='owner' />
                    </TabList>
                </Box>
                <TabPanel value="all">
                    <CustomTable selectedIds={selectedIds} setSelectedIds={setSelectedIds} data={allData} columns={columns} />
                </TabPanel>
                <TabPanel value="owner">
                    <CustomTable selectedIds={selectedIds} setSelectedIds={setSelectedIds} data={data} columns={columns} />
                </TabPanel>
            </TabContext>
        </Box>
    );
}

export default CustomTabs
