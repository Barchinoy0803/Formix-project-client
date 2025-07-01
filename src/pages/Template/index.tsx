import TabContext from '@mui/lab/TabContext'
import TabList from '@mui/lab/TabList'
import TabPanel from '@mui/lab/TabPanel'
import { Box, Tab } from '@mui/material'
import { memo, useState } from 'react'
import CreateEditTemplate from '../CreateEditTemplate'
import Analyze from '../Analyze'

const Template = () => {
    const [activeTab, setActiveTab] = useState<string>("Template")

    const handleChange = (_: React.SyntheticEvent, newValue: string) => {
        setActiveTab(newValue);
    };

    return (
        <div>
            <Box className='container mx-auto' sx={{ width: '100%', typography: 'body1' }}>
                <TabContext value={activeTab}>
                    <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                        <TabList onChange={handleChange} aria-label="lab API tabs example">
                            <Tab label="Update template" value='Template' />
                            <Tab label="Analyze" value='Analyze' />
                        </TabList>
                    </Box>
                    <TabPanel value="Template">
                        <CreateEditTemplate />
                    </TabPanel>
                    <TabPanel value="Analyze">
                        <Analyze />
                    </TabPanel>
                </TabContext>
            </Box>
        </div>
    )
}

export default memo(Template)