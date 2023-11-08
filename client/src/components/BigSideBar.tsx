import { NavLink } from 'react-router-dom';
import { Logo } from '.';
import { useDashboardContext } from '../context/Dashboard';
import links from '../utils/Links';

const BigSideBar = () => {
	const { setShowSideBar, showSideBar, user } = useDashboardContext();

	return (
		<div
			className={`hidden md:block sticky top-0 ${
				showSideBar ? '-ml-56' : 'ml-0'
			} dark:bg-[#3f3f3f] bg-[#fcfcfc] h-[100svh] transition-[margin-left] duration-200 w-56 `}
		>
			<header className='py-4'>
				<Logo className='mx-auto w-28' />
			</header>
			<nav className='mt-12'>
				<div className='flex flex-col gap-6 mx-auto max-w-max '>
					{links.map((link) => {
						if (link.text === 'admin' && user.role !== 'admin') {
							return;
						}
						return (
							<NavLink
								key={link.text}
								className={({ isActive }) =>
									`flex capitalize items-center text-xl gap-2 ${
										isActive
											? 'text-primary opacity-95 scale-105 '
											: 'text-black dark:text-white hover:translate-x-2 transition-transform  opacity-80 hover:opacity-95'
									}`
								}
								end
								onClick={() => setShowSideBar(false)}
								to={link.path}
							>
								<div className='flex items-center gap-2' key={link.text}>
									{link.icon}
									<h2>{link.text}</h2>
								</div>
							</NavLink>
						);
					})}
				</div>
			</nav>
		</div>
	);
};
export default BigSideBar;
