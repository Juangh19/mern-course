import { FaTimes } from 'react-icons/fa';
import { Logo } from '.';
import links from '../utils/Links';
import { NavLink } from 'react-router-dom';
import { useDashboardContext } from '../context/Dashboard';

const SmallSideBar = () => {
	const { showSideBar, setShowSideBar, user } = useDashboardContext();
	return (
		<div
			className={`fixed inset-0 ${
				showSideBar ? 'z-50 opacity-100' : 'invisible -z-10 opacity-0'
			}  block px-8 py-4 bg-black transition-all duration-100  md:hidden bg-opacity-70`}
		>
			<div className='dark:bg-[#3f3f3f] bg-[#fcfcfc] overflow-hidden flex flex-col overflow-y-auto h-full rounded-md'>
				<button className='mt-2 ml-2' onClick={() => setShowSideBar(false)}>
					<FaTimes className='w-8 h-8 text-primary opacity-70 hover:opacity-90 ' />
				</button>
				<Logo className='mx-auto mb-8 w-36' />
				<div className='grid flex-1 place-content-center'>
					<div className='flex flex-col gap-6 mx-auto max-w-max '>
						{links.map((link) => {
							if (link.text === 'admin' && user.role !== 'admin') {
								return;
							}
							return (
								<NavLink
									key={link.text}
									className={({ isActive }) =>
										`flex items-center gap-2 ${
											isActive ? 'text-primary' : 'text-black dark:text-white'
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
				</div>
			</div>
		</div>
	);
};
export default SmallSideBar;
