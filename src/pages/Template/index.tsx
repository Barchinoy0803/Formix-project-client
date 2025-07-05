import TabContext from '@mui/lab/TabContext'
import TabList from '@mui/lab/TabList'
import TabPanel from '@mui/lab/TabPanel'
import { Box, Tab } from '@mui/material'
import { memo, useState } from 'react'
import CreateEditTemplate from '../CreateEditTemplate'
import Analyze from '../Analyze'
import { useLocation } from 'react-router-dom'
import { useTranslator } from '../../hooks/useTranslator'

const Template = () => {
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const isReadMode = searchParams.get('readmode');
    const { t } = useTranslator('template');
    const [activeTab, setActiveTab] = useState<string>("Template");

    const handleChange = (_: React.SyntheticEvent, newValue: string) => {
        setActiveTab(newValue);
    };

    return (
        <Box className='container mx-auto' sx={{ width: '100%', typography: 'body1' }}>
            <TabContext value={activeTab}>
                {
                    !isReadMode &&
                    <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                        <TabList onChange={handleChange} aria-label="lab API tabs example">
                            <Tab label={t('updateTemplate')} value='Template' />
                            <Tab label={t('analyze')} value='Analyze' />
                        </TabList>
                    </Box>
                }
                <TabPanel value="Template">
                    <CreateEditTemplate />
                </TabPanel>
                <TabPanel value="Analyze">
                    <Analyze />
                </TabPanel>
            </TabContext>
        </Box>
    )
}

export default memo(Template)