import { memo, useEffect } from 'react'
import { Outlet } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { setSearchResults } from '../../redux/features/template.slice'
import { useGetTemplatesQuery } from '../../service/api/template.api'
import Navbar from '../../components/Navbar'
import { RootState } from '../../redux'

const Dashboard = () => {
    const dispatch = useDispatch()
    const { searchtext } = useSelector((state: RootState) => state.templates)
    const { data: allData } = useGetTemplatesQuery({ search: searchtext })

    useEffect(() => {
        if (allData) {
            dispatch(setSearchResults(allData))
        }
    }, [allData])

    return (
        <div className='flex flex-col gap-3'>
            <Navbar />
            <Outlet/>
        </div>
    )
}

export default memo(Dashboard)
