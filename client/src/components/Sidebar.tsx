import {Sidebar} from "flowbite-react";
import {HiArrowSmRight, HiUser} from "react-icons/hi";
import {Link, useLocation} from "react-router-dom";
import {useEffect, useState} from "react";


const DashboardSidebar = () => {
  const location = useLocation();
  const [tab, setTab] = useState<string>('');
  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const urlTab = urlParams.get('tab');
    if (urlTab)
      setTab(urlTab)
  }, [location.search]);

  return (
    <Sidebar className='w-full md:w-56'>
      <Sidebar.Items>
        <Sidebar.ItemGroup>
          <Link to={'/dashboard?tab=profile'}>
            <Sidebar.Item active={tab === 'profile'} label={'User'} labelColor='dark' icon={HiUser} as='div'>
              Profile
            </Sidebar.Item>
          </Link>
          <Sidebar.Item icon={HiArrowSmRight} className='cursor-pointer'>
            Sign Out
          </Sidebar.Item>

        </Sidebar.ItemGroup>
      </Sidebar.Items>

    </Sidebar>
  )
}

export default DashboardSidebar;