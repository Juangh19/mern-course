import { Link, Form, redirect, useNavigation } from 'react-router-dom';
import { Logo } from '../components';
import customFetch from '../utils/customFetch';
import { toast } from 'react-toastify';
import axios from 'axios';

// eslint-disable-next-line react-refresh/only-export-components
export const action = async ({ request }: { request: Request }) => {
	const formData = await request.formData();
	const data = Object.fromEntries(formData);
	console.log(data);

	try {
		await customFetch.post('/auth/register', data);
		toast.success('Account created successfully');
		return redirect('/login');
	} catch (error) {
		const message = axios.isAxiosError(error)
			? error.response?.data.message
			: 'An error ocurred';

		toast.error(message);

		return error;
	}
};

const Register = () => {
	const navigation = useNavigation();

	console.log(navigation);

	return (
		<div className='grid bg-gray-200 dark:text-white dark:bg-[#333333] place-items-center px-8 py-4 min-h-[100svh]'>
			<div className='w-full max-w-xl px-8 py-8 bg-white dark:bg-[#3f3f3f] border-t-4 rounded-lg shadow-md border-t-primary '>
				<Logo className='mx-auto mb-4' />
				<h1 className='text-lg font-semibold text-center'>Register </h1>
				<Form method='post' className='flex flex-col max-w-sm gap-4 mx-auto'>
					<div className='flex flex-col gap-1'>
						<label htmlFor='name'>Name</label>
						<input
							type='text'
							name='name'
							required
							id='name'
							autoComplete='off'
							placeholder='John Doe'
							className='px-4 py-2 bg-gray-100 dark:bg-[#333333] border border-gray-300 dark:border-gray-500 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent'
						/>
					</div>
					<div className='flex flex-col gap-1'>
						<label htmlFor='lastName'>Last Name</label>
						<input
							type='text'
							name='lastName'
							required
							id='lastName'
							autoComplete='off'
							placeholder='John Doe'
							className='px-4 py-2 bg-gray-100 dark:bg-[#333333] border border-gray-300 dark:border-gray-500 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent'
						/>
					</div>
					<div className='flex flex-col gap-1'>
						<label htmlFor='location'>Location</label>
						<input
							type='text'
							name='location'
							required
							id='location'
							autoComplete='off'
							placeholder='John Doe'
							className='px-4 py-2 bg-gray-100 dark:bg-[#333333] border border-gray-300 dark:border-gray-500 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent'
						/>
					</div>
					<div className='flex flex-col gap-1'>
						<label htmlFor='email'>Email</label>
						<input
							type='email'
							name='email'
							required
							id='email'
							autoComplete='off'
							placeholder='johndoe@gmail.com'
							className='px-4 py-2 bg-gray-100 dark:bg-[#333333] border border-gray-300 dark:border-gray-500 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent'
						/>
					</div>
					<div className='flex flex-col gap-1'>
						<label htmlFor='password'>Password</label>
						<input
							type='password'
							name='password'
							required
							id='password'
							autoComplete='off'
							placeholder='********'
							className='px-4 py-2 bg-gray-100 dark:bg-[#333333] border border-gray-300 dark:border-gray-500 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent'
						/>
					</div>
					<button
						disabled={navigation.state === 'submitting'}
						type='submit'
						className='px-4 py-2 mt-6 text-lg font-semibold text-white rounded bg-primary'
					>
						{navigation.state === 'submitting' ? 'Submitting...' : 'Submit'}
					</button>
					<Link
						to='/login'
						className='text-sm font-medium text-center underline text-primary'
					>
						Already have an account? Login
					</Link>
				</Form>
			</div>
		</div>
	);
};
export default Register;
