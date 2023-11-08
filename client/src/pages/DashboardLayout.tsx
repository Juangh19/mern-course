import { Outlet } from 'react-router-dom';
import SmallSideBar from '../components/SmallSideBar';
import BigSideBar from '../components/BigSideBar';
import NavBar from '../components/NavBar';
import DashboardContextProvider from '../context/Dashboard';

// eslint-disable-next-line react-refresh/only-export-components

const DashboardLayout = () => {
	return (
		<DashboardContextProvider>
			<main className='flex flex-col md:flex-row'>
				{/* Small Side Bar */}
				<SmallSideBar />
				{/* Big Side Bar */}
				<BigSideBar />
				<div className='flex-1 min-h-[100svh] bg-[#eee] dark:bg-[#333] dark:text-white  '>
					{/* NavBar */}
					<NavBar />
					{/* Outlet */}
					<Outlet />
				</div>
			</main>
		</DashboardContextProvider>
	);
};
// eslint-disable-next-line react-refresh/only-export-components
export default DashboardLayout;
