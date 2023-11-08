import { FaAlignLeft } from 'react-icons/fa';
import { Logo } from '.';
import { useTheme } from '../context/Theme';
import { useDashboardContext } from '../context/Dashboard';
import { FaUserCircle, FaCaretDown } from 'react-icons/fa';
import { BsFillSunFill, BsFillMoonFill } from 'react-icons/bs';
import { useState } from 'react';

const NavBar = () => {
	const { toggleTheme, theme } = useTheme();
	const { toggleSideBar, user, logoutUser } = useDashboardContext();
	const [showLogOut, setShowLogOut] = useState(false);

	return (
		<div className='bg-[#fcfcfc] py-6 px-8 dark:bg-[#3f3f3f] flex justify-between text-black dark:text-white sticky top-0 '>
			<button type='button' onClick={() => toggleSideBar()}>
				<FaAlignLeft className='text-xl text-primary' />
			</button>
			<div>
				<Logo className='block w-24 md:hidden' />
				<h2 className='hidden w-24 md:block'>Dashboard</h2>
			</div>
			{/* <div onClick={() => toggleTheme()}>toggle&logout</div> */}
			<div className='flex gap-4'>
				<button onClick={() => toggleTheme()}>
					{theme === 'dark' ? (
						<BsFillSunFill className='text-xl text-yellow-300' />
					) : (
						<BsFillMoonFill className='text-xl text-blue-300' />
					)}
				</button>
				<div className='relative'>
					<button
						className='flex items-center gap-2 px-2 py-1 text-sm rounded opacity-95 hover:opacity-100 bg-primary'
						onClick={() => setShowLogOut(!showLogOut)}
					>
						{user.avatar ? (
							<img
								src={user?.avatar}
								alt={user?.name}
								className='w-6 h-6 rounded-full'
							/>
						) : (
							<FaUserCircle className='w-6 h-6' />
						)}
						{user?.name}
						<FaCaretDown
							className={`${
								showLogOut ? 'rotate-180' : ''
							} transition-transform`}
						/>
					</button>
					<button
						className={`absolute  bg-primary  w-full rounded transition-[bottom,z-index,padding]  ${
							showLogOut
								? 'visible -bottom-10 py-1 z-10'
								: 'bottom-0 invisible  -z-10'
						}`}
						onClick={logoutUser}
					>
						Logout
					</button>
				</div>
			</div>
		</div>
	);
};
export default NavBar;
