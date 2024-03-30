import {useLocation} from "react-router-dom";
import {useEffect, useState} from "react";
import DashboardSidebar from "../components/Sidebar.tsx";
import Profile from "../components/Profile.tsx";

const Dashboard = () => {
  const location = useLocation();
  const [tab, setTab] = useState<string>('');
  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const urlTab = urlParams.get('tab');
    if (urlTab)
      setTab(urlTab)
  }, [location.search]);

  return (
    <div className='min-h-screen flex flex-col md:flex-row'>
      <div className='md:w-56'>
        <DashboardSidebar/>
      </div>
      {tab === 'profile' && <Profile/>}
    </div>
  )
}

export default Dashboard;