import * as React from 'react';
import Drawer from '@mui/material/Drawer';
import MenuIcon from '@mui/icons-material/Menu';
import { drawerListItems } from '../../constants';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux';
import { useTranslator } from '../../hooks/useTranslator';

const CustomDrawer = () => {
    const { userRole } = useSelector((state: RootState) => state.users);
    const { t } = useTranslator('dashboard');
    const [open, setOpen] = React.useState(false);

    const toggleDrawer = (newOpen: boolean) => () => {
        setOpen(newOpen);
    };

    const DrawerList = (
        <div
            className="w-80 h-full bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 text-white relative overflow-hidden"
            role="presentation"
            onClick={toggleDrawer(false)}
        >
            <div className="absolute inset-0 opacity-10">
                <div className="absolute top-0 left-0 w-32 h-32 bg-white rounded-full blur-3xl transform -translate-x-16 -translate-y-16"></div>
                <div className="absolute bottom-0 right-0 w-24 h-24 bg-blue-300 rounded-full blur-2xl transform translate-x-12 translate-y-12"></div>
            </div>

            <div className="relative z-10 px-8 py-10">
                <div className="mb-8">
                    <h2 className="text-3xl font-bold bg-gradient-to-r from-white to-blue-200 bg-clip-text text-transparent mb-2">
                        {t('title')}
                    </h2>
                    <div className="w-16 h-1 bg-gradient-to-r from-blue-400 to-indigo-400 rounded-full"></div>
                </div>

                <nav className="flex flex-col gap-2">
                    {drawerListItems.map((item) => (
                        <NavLink
                            key={item.link}
                            to={item.link}
                            className={({ isActive }) =>
                                `group relative block px-5 py-4 rounded-xl transition-all duration-300 text-base font-medium overflow-hidden backdrop-blur-sm
                                ${isActive
                                    ? 'bg-gradient-to-r from-white/20 to-blue-400/20 text-white shadow-lg shadow-blue-500/25 border border-white/20'
                                    : 'hover:bg-gradient-to-r hover:from-white/10 hover:to-blue-400/10 hover:text-white hover:shadow-md hover:shadow-blue-500/20 hover:border hover:border-white/10'
                                }`
                            }
                        >
                            {({ isActive }) => (
                                <>
                                    <div className="relative z-10 flex items-center gap-3">
                                        <div className={`w-2 h-2 rounded-full transition-all duration-300 ${isActive ? 'bg-white shadow-lg shadow-white/50' : 'bg-blue-300/50 group-hover:bg-white/70'
                                            }`}></div>
                                        <span className="transition-transform duration-300 group-hover:translate-x-1">
                                            {t(item.title)}
                                        </span>
                                    </div>
                                    <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-400 to-white transition-all duration-300 group-hover:w-full"></div>
                                </>
                            )}
                        </NavLink>
                    ))}

                    {userRole === "ADMIN" && (
                        <NavLink
                            to={'/dashboard/user-managment'}
                            className={({ isActive }) =>
                                `group relative block px-5 py-4 rounded-xl transition-all duration-300 text-base font-medium overflow-hidden backdrop-blur-sm
                                ${isActive
                                    ? 'bg-gradient-to-r from-white/20 to-blue-400/20 text-white shadow-lg shadow-blue-500/25 border border-white/20'
                                    : 'hover:bg-gradient-to-r hover:from-white/10 hover:to-blue-400/10 hover:text-white hover:shadow-md hover:shadow-blue-500/20 hover:border hover:border-white/10'
                                }`
                            }
                        >
                            {({ isActive }) => (
                                <>
                                    <div className="relative z-10 flex items-center gap-3">
                                        <div className={`w-2 h-2 rounded-full transition-all duration-300 ${isActive ? 'bg-white shadow-lg shadow-white/50' : 'bg-blue-300/50 group-hover:bg-white/70'
                                            }`}></div>
                                        <span className="transition-transform duration-300 group-hover:translate-x-1">
                                            {t('userManagement')}
                                        </span>
                                    </div>
                                    <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-400 to-white transition-all duration-300 group-hover:w-full"></div>
                                </>
                            )}
                        </NavLink>
                    )}
                </nav>
            </div>
        </div>
    );

    return (
        <div>
            <button
                onClick={toggleDrawer(true)}
                className="group relative flex items-center gap-3 bg-gradient-to-r from-slate-800 to-blue-800 hover:from-slate-700 hover:to-blue-700 text-white px-6 py-3 rounded-xl shadow-lg shadow-blue-900/30 transition-all duration-300 overflow-hidden backdrop-blur-sm border border-white/10"
            >
                <div className="absolute inset-0 bg-gradient-to-r from-white/0 to-white/10 transform -translate-x-full group-hover:translate-x-0 transition-transform duration-500"></div>

                <div className="relative z-10 flex items-center gap-3">
                    <MenuIcon className="transition-transform duration-300 group-hover:rotate-180" />
                    <span className="font-medium">Menu</span>
                </div>

                <div className="absolute inset-0 rounded-xl border-2 border-transparent bg-gradient-to-r from-blue-400/50 to-indigo-400/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300" style={{
                    mask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
                    maskComposite: 'exclude'
                }}></div>
            </button>

            <Drawer
                anchor="left"
                open={open}
                onClose={toggleDrawer(false)}
                PaperProps={{
                    sx: {
                        backgroundColor: 'transparent',
                        boxShadow: 'none',
                    }
                }}
            >
                {DrawerList}
            </Drawer>
        </div>
    );
};

export default CustomDrawer;
