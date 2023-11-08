import main from '../assets/images/main.svg';
import logo from '../assets/images/logo.svg';
import { Link } from 'react-router-dom';

const Landing = () => {
	return (
		<div className='min-h-[100svh] dark:bg-[#3f3f3f] dark:text-white flex flex-col'>
			<nav className='w-full max-w-4xl px-8 py-4 mx-auto'>
				<img src={logo} alt='Jobify' />
			</nav>
			<div className='flex items-center flex-1 w-full max-w-4xl gap-8 px-8 mx-auto h-fit'>
				<div className='flex min-w-[315px] flex-col flex-1 gap-6'>
					<h1 className='text-5xl font-semibold'>
						Job <span className='text-primary'>Tracking</span> App
					</h1>
					<p className='text-sm opacity-80'>
						Lorem ipsum dolor sit amet consectetur adipisicing elit. Quaerat
						voluptatibus, quod, voluptatem, eum consequatur quas molestiae
						voluptatum voluptates natus magnam quibusdam? Quisquam, voluptatum
						voluptates. Quos, voluptatibus! Quas, voluptates. Quos,
						voluptatibus!
					</p>
					<div className='flex gap-4'>
						<Link
							className='px-4 py-2 text-lg font-semibold text-white rounded bg-primary'
							to='/register'
						>
							Register
						</Link>
						<Link
							className='px-4 py-2 text-lg font-semibold text-white rounded bg-primary'
							to='/login'
						>
							Login / Demo User
						</Link>
					</div>
				</div>
				<div className='flex-1 hidden sm:block'>
					<img className='w-full h-full' src={main} alt='Job hunt' />
				</div>
			</div>
		</div>
	);
};
export default Landing;
