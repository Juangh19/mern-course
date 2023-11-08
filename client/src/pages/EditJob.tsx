import {
	Form,
	Params,
	redirect,
	useLoaderData,
	useNavigation,
	useParams,
} from 'react-router-dom';
import { JOB_STATUS, JOB_TYPE } from '../utils/constants';
import customFetch from '../utils/customFetch';
import { JobProps } from '../components/JobsContainer';
import axios from 'axios';
import { toast } from 'react-toastify';

// eslint-disable-next-line react-refresh/only-export-components
export const loader = async ({ params }: { params: Params }) => {
	const userId = params.id;
	try {
		const { data } = await customFetch.get(`/jobs/${userId}`);

		return { actualJob: data };
	} catch (error) {
		if (axios.isAxiosError(error)) {
			toast.error(error.response?.data.message);
		} else {
			toast.error('An error ocurred');
		}
		return redirect('/dashboard/all-jobs');
	}
};

// eslint-disable-next-line react-refresh/only-export-components
export const action = async ({
	request,
	params,
}: {
	request: Request;
	params: Params;
}) => {
	const formData = await request.formData();
	const data = Object.fromEntries(formData);
	const userId = params.id;

	try {
		await customFetch.patch(`/jobs/${userId}`, data);
		toast.success('Job edited successfully');
		return redirect('/dashboard/all-jobs');
	} catch (error) {
		if (axios.isAxiosError(error)) {
			toast.error(error.response?.data.message);
		} else {
			toast.error('An error ocurred');
		}
		return redirect(`/dashboard/edit-job/${userId}`);
	}
};

const EditJob = () => {
	//obtain user from url params
	const userId = useParams<{ userId: string }>().userId;
	console.log(userId);
	const { actualJob } = useLoaderData() as {
		actualJob: {
			job: JobProps;
		};
	};

	const navigation = useNavigation();
	return (
		<div className='rounded-lg bg-[#fcfcfc] dark:bg-[#3f3f3f] mx-auto px-8 w-[90%] max-w-4xl mt-8 py-12 '>
			<h1 className='mb-8 text-xl '>Edit Job</h1>
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
						defaultValue={actualJob.job.position}
					/>
				</div>
				<div className='flex flex-col w-full gap-2'>
					<label htmlFor='company'>Company</label>
					<input
						className='rounded dark:bg-[#333] border border-[#aaa] px-1 py-1 outline-none'
						type='text'
						id='company'
						name='company'
						defaultValue={actualJob.job.company}
					/>
				</div>
				<div className='flex flex-col w-full gap-2'>
					<label htmlFor='location'>Location</label>
					<input
						className='rounded dark:bg-[#333] border border-[#aaa] px-1 py-1 outline-none'
						type='text'
						id='location'
						name='jobLocation'
						defaultValue={actualJob.job.jobLocation}
					/>
				</div>
				<div className='flex flex-col w-full gap-2'>
					<label htmlFor='jobStatus'>Job Status</label>
					<select
						className='rounded cursor-pointer dark:bg-[#333] border border-[#aaa] px-1 py-1 outline-none'
						name='jobStatus'
						id='jobStatus'
						defaultValue={actualJob.job.jobStatus}
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
						defaultValue={actualJob.job.jobType}
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
export default EditJob;
