import React from 'react'
import { useSelector } from 'react-redux'
import DeliveryBoyDeshboard from '../components/deliveryBoyDeshboard'
import OwenerDashboard from '../components/owenerDashboard'
import UserDashboard from '../components/userDashboard'

export default function Home() {

const {userData} = useSelector(state => state.user)

return (
    <div className='w-[100vw] min-h-[100vh] pt-[100px] flex flex-col items-center bg-[#fff9f6]'>
    {userData?.role == "user" && <UserDashboard />}
    {userData?.role == "owner" && <OwenerDashboard />}
    {userData?.role == "deliveryBoy" && <DeliveryBoyDeshboard />}
    </div>
  )
}
