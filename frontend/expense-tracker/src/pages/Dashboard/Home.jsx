import React from 'react'
import DashboardLayout from '../../components/layout/DashboardLayout'
import { useUserAuth } from '../../hooks/useUserAuth'

const Home = () => {

  useUserAuth();
  return (
    <DashboardLayout activeMenu="dashboard">
      <div className="my-5 mx-auto ">
        
        <div className=''></div>
      </div>
    </DashboardLayout>
  )
}

export default Home