import { Form, redirect, useNavigation } from 'react-router-dom';
import { useDashboardContext } from '../context/Dashboard.js';
import { JOB_STATUS, JOB_TYPE } from '../utils/constants.js';
import customFetch from '../utils/customFetch.js';
import { toast } from 'react-toastify';
import axios from 'axios';

// eslint-disable-next-line react-refresh/only-export-components
export const action = async ({ request }: { request: Request }) => {
	const formData = await request.formData();
	const data = Object.fromEntries(formData);
	try {
		await customFetch.post('/jobs', data);
		toast.success('Job added successfully');
		return redirect('/dashboard/all-jobs');
	} catch (error) {
		if (axios.isAxiosError(error)) {
			toast.error(error.response?.data.message);
		} else {
			toast.error('An error ocurred');
		}
		return null;
	}
};

const AddJob = () => {
	const navigation = useNavigation();
	const { user } = useDashboardContext();

	return (
		<div className='rounded-lg bg-[#fcfcfc] dark:bg-[#3f3f3f] mx-auto px-8 w-[90%] max-w-4xl mt-8 py-12 '>
			<h1 className='mb-8 text-xl '>Add Job</h1>
			<Form
				method='post'
				className='grid place-items-end      grid-cols-[repeat(auto-fill,_minmax(180px,_1fr))] gap-4 '
			>
				<div className='flex flex-col w-full gap-2'>
					<label htmlFor='position'>Position</label>
					<input
						className='rounded dark:bg-[#333] border border-[#aaa] px-1 py-1 outline-none'
						type='text'
						id='position'
						name='position'
					/>
				</div>
				<div className='flex flex-col w-full gap-2'>
					<label htmlFor='company'>Company</label>
					<input
						className='rounded dark:bg-[#333] border border-[#aaa] px-1 py-1 outline-none'
						type='text'
						id='company'
						name='company'
					/>
				</div>
				<div className='flex flex-col w-full gap-2'>
					<label htmlFor='location'>Location</label>
					<input
						className='rounded dark:bg-[#333] border border-[#aaa] px-1 py-1 outline-none'
						type='text'
						id='location'
						name='jobLocation'
						defaultValue={user.location}
					/>
				</div>
				<div className='flex flex-col w-full gap-2'>
					<label htmlFor='jobStatus'>Job Status</label>
					<select
						className='rounded cursor-pointer dark:bg-[#333] border border-[#aaa] px-1 py-1 outline-none'
						name='jobStatus'
						id='jobStatus'
					>
						{Object.values(JOB_STATUS).map((status) => (
							<option key={status} value={status}>
								{status}
							</option>
						))}
					</select>
				</div>
				<div className='flex flex-col w-full gap-2'>
					<label htmlFor='jobType'>Job Type</label>
					<select
						className='rounded cursor-pointer dark:bg-[#333] border border-[#aaa] px-1 py-1 outline-none'
						name='jobType'
						id='jobType'
					>
						{Object.values(JOB_TYPE).map((type) => (
							<option key={type} value={type}>
								{type}
							</option>
						))}
					</select>
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
export default AddJob;
