import React, { useContext } from 'react'
import { UserContext } from '../../context/UserContext'
import Navbar from "./Navbar"
import SideMenu from './SideMenu'

const DashboardLayout = ({children, activeMenu}) => {
    const { user } = useContext(UserContext)
    return (
        <div className='min-h-screen flex flex-col bg-gray-50'>
            <Navbar activeMenu={activeMenu} />
            
            {user && (
                <div className='flex flex-1 '> {/* Add pt-16 for navbar height */}
                    <div className='hidden lg:block w-64 flex-shrink-0 sticky top-16 h-[calc(100vh-64px)]'>
                        <SideMenu activeMenu={activeMenu} />
                    </div>
                    <main className='flex-1 p-6 overflow-auto lg:ml-0'> {/* Remove max-width container */}
                        <div className='mx-auto lg:mx-0'> {/* Adjust horizontal alignment */}
                            {children}
                        </div>
                    </main>
                </div>
            )}
        </div>
    )
}

export default DashboardLayout