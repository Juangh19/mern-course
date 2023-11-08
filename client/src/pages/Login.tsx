import {
	Form,
	Link,
	redirect,
	useNavigate,
	useNavigation,
} from 'react-router-dom';
import { Logo } from '../components';
import customFetch from '../utils/customFetch';
import axios from 'axios';
import { toast } from 'react-toastify';

// eslint-disable-next-line react-refresh/only-export-components
export const action = async ({ request }: { request: Request }) => {
	const formData = await request.formData();
	const data = Object.fromEntries(formData);
	try {
		await customFetch.post('/auth/login', data);
		toast.success('Logged in successfully');
		return redirect('/dashboard');
	} catch (error) {
		const message = axios.isAxiosError(error)
			? error.response?.data.message
			: 'An error ocurred';

		toast.error(message);

		return error;
	}
};

const Login = () => {
	const navigate = useNavigate();
	const navigation = useNavigation();

	const loginDemoUser = async () => {
		try {
			await customFetch.post('/auth/login', {
				email: 'test@test.com',
				password: 'secret123',
			});
			toast.success('Test mode enabled');
			navigate('/dashboard');
		} catch (error) {
			const message = axios.isAxiosError(error)
				? error.response?.data.message
				: 'An error ocurred';

			toast.error(message);

			return error;
		}
	};

	return (
		<div className='grid bg-gray-200 place-items-center dark:bg-[#333333] px-8 py-4 min-h-[100svh]'>
			<div className='w-full max-w-xl px-8 py-8 bg-white dark:bg-[#3f3f3f] dark:text-white border-t-4 rounded-lg shadow-md border-t-primary '>
				<Logo className='mx-auto mb-4' />
				<h1 className='text-lg font-semibold text-center'>Login </h1>
				<Form method='post' className='flex flex-col max-w-sm gap-4 mx-auto'>
					<div className='flex flex-col gap-1'>
						<label htmlFor='email'>Email</label>
						<input
							type='email'
							name='email'
							required
							id='email'
							autoComplete='off'
							placeholder='johndoe@gmail.com'
							className='px-4 py-2 bg-gray-100 dark:bg-[#333333] dark:border-gray-500 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent'
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
							className='px-4 py-2 bg-gray-100 dark:bg-[#333333] dark:border-gray-500 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent'
						/>
					</div>
					<button
						type='submit'
						disabled={navigation.state === 'submitting'}
						className='px-4 py-2 mt-6 text-lg font-semibold text-white rounded bg-primary'
					>
						{navigation.state === 'submitting' ? 'Loading...' : 'Login'}
					</button>
					<button
						type='button'
						className='px-4 py-2 text-lg font-semibold text-white rounded bg-primary'
						onClick={loginDemoUser}
					>
						Explore the app
					</button>
					<Link
						to='/register'
						className='text-sm font-medium text-center underline text-primary'
					>
						Not a member yet? Register
					</Link>
				</Form>
			</div>
		</div>
	);
};
export default Login;
