import { Form, useNavigation } from 'react-router-dom';
import { useDashboardContext } from '../context/Dashboard';
import { toast } from 'react-toastify';
import customFetch from '../utils/customFetch';
import axios from 'axios';

// eslint-disable-next-line react-refresh/only-export-components
export const action = async ({ request }: { request: Request }) => {
	const formData = await request.formData();
	const imageFile = formData.get('avatar') as File;
	if (imageFile && imageFile.size > 500000) {
		toast.error('Image size should be less than 0.5 MB');
		return null;
	}
	try {
		await customFetch.patch('/users/update-user', formData);
		toast.success('Profile updated successfully');
	} catch (error) {
		if (axios.isAxiosError(error)) {
			toast.error(error.response?.data.message);
		} else {
			toast.error('An error ocurred');
		}
	}
	return null;
};

const Profile = () => {
	const { user } = useDashboardContext();
	const { name, lastName, email, location } = user;
	const navigation = useNavigation();
	return (
		<div className='rounded-lg bg-[#fcfcfc] dark:bg-[#3f3f3f] mx-auto px-8 w-[90%] max-w-4xl mt-8 py-12 '>
			<h1 className='mb-8 text-xl '>Profile</h1>
			<Form
				method='post'
				encType='multipart/form-data'
				className='grid place-items-end      grid-cols-[repeat(auto-fill,_minmax(180px,_1fr))] gap-4 '
			>
				<div className='flex flex-col w-full gap-2'>
					<label htmlFor='imageFile'>Image (Max 0.5 MB)</label>
					<input
						className='rounded text-sm  dark:bg-[#333] border border-[#aaa] px-1 py-1 outline-none'
						type='file'
						id='avatar'
						name='avatar'
						accept='image/*'
					/>
				</div>
				<div className='flex flex-col w-full gap-2'>
					<label htmlFor='name'>Name</label>
					<input
						className='rounded text-sm  dark:bg-[#333] border border-[#aaa] px-1 py-1 outline-none'
						type='text'
						id='name'
						name='name'
						defaultValue={name}
					/>
				</div>
				<div className='flex flex-col w-full gap-2'>
					<label htmlFor='lastName'>Last Name</label>
					<input
						className='rounded text-sm  dark:bg-[#333] border border-[#aaa] px-1 py-1 outline-none'
						type='text'
						id='lastName'
						name='lastName'
						defaultValue={lastName}
					/>
				</div>
				<div className='flex flex-col w-full gap-2'>
					<label htmlFor='email'>Email</label>
					<input
						className='rounded text-sm  dark:bg-[#333] border border-[#aaa] px-1 py-1 outline-none'
						type='text'
						id='email'
						name='email'
						defaultValue={email}
					/>
				</div>
				<div className='flex flex-col w-full gap-2'>
					<label htmlFor='location'>Location</label>
					<input
						className='rounded text-sm  dark:bg-[#333] border border-[#aaa] px-1 py-1 outline-none'
						type='text'
						id='location'
						name='location'
						defaultValue={location}
					/>
				</div>
				<button
					className='w-full h-8 px-4 py-1 transition border-[#aaa] border rounded  hover:opacity-80 bg-primary'
					disabled={navigation.state === 'submitting'}
					type='submit'
				>
					Submit
				</button>
			</Form>
		</div>
	);
};
export default Profile;
