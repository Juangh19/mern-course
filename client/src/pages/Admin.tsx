import { redirect, useLoaderData } from 'react-router-dom';
import customFetch from '../utils/customFetch';
import { toast } from 'react-toastify';
import axios from 'axios';

// eslint-disable-next-line react-refresh/only-export-components
export const loader = async () => {
	try {
		const response = await customFetch.get('/users/admin/app-stats');

		return response.data;
	} catch (error) {
		if (axios.isAxiosError(error)) {
			toast.error(error.response?.data.message);
		} else {
			toast.error('An error ocurred');
		}
		return redirect(`/dashboard`);
	}
};

const Admin = () => {
	const data = useLoaderData() as { users: number; jobs: number };

	return (
		<div>
			<div>total users: {data.users}</div>
			<div>total jobs: {data.jobs}</div>
		</div>
	);
};
export default Admin;
