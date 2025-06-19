import * as React from 'react';
import Drawer from '@mui/material/Drawer';
import MenuIcon from '@mui/icons-material/Menu';
import { drawerListItems } from '../../constants';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux';
import LanguageSwitcher from '../LanguageSwitcher';
import { useTranslator } from '../../hooks/useTranslator';

const CustomDrawer = () => {
    const { userRole } = useSelector((state: RootState) => state.users)
    const { t } = useTranslator('dashboard')
    const [open, setOpen] = React.useState(false);

    const toggleDrawer = (newOpen: boolean) => () => {
        setOpen(newOpen);
    };

    const DrawerList = (
        <div
            className="w-72 h-full bg-gradient-to-b from-blue-800 to-blue-600 text-white px-6 py-8"
            role="presentation"
            onClick={toggleDrawer(false)}
        >
            <h2 className="text-2xl font-bold mb-6 border-b border-blue-400 pb-3">{t('title')}</h2>
            <div className="flex flex-col gap-3">
                {drawerListItems.map((item) => (
                    <NavLink
                        key={item.link}
                        to={item.link}
                        className={({ isActive }) =>
                            `block px-3 py-2 rounded-lg transition-all duration-300 text-lg font-medium
                            ${isActive
                                ? 'bg-white text-blue-800 shadow'
                                : 'hover:bg-blue-500 hover:text-white'}`
                        }
                    >
                        {t(item.title)}
                    </NavLink>
                ))}
                {
                    userRole === "ADMIN" &&
                    <NavLink
                        to={'/dashboard/user-managment'}
                        className={({ isActive }) =>
                            `block px-3 py-2 rounded-lg transition-all duration-300 text-lg font-medium
                            ${isActive
                                ? 'bg-white text-blue-800 shadow'
                                : 'hover:bg-blue-500 hover:text-white'}`
                        }
                    >
                        {t('userManagement')}
                    </NavLink>
                }
                <LanguageSwitcher />
            </div>
        </div>
    );

    return (
        <div >
            <button
                onClick={toggleDrawer(true)}
                className="flex items-center gap-2 bg-blue-700 hover:bg-blue-800 text-white px-4 py-2 rounded-lg shadow transition-all duration-300"
            >
                <MenuIcon />
            </button>
            <Drawer anchor="left" open={open} onClose={toggleDrawer(false)}>
                {DrawerList}
            </Drawer>
        </div>
    );
};

export default CustomDrawer;
