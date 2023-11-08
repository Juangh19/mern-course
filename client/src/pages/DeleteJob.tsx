import { Params, redirect } from 'react-router-dom';
import customFetch from '../utils/customFetch';
import { toast } from 'react-toastify';
import axios from 'axios';

export const action = async ({ params }: { params: Params }) => {
	console.log(params.id);

	try {
		await customFetch.delete(`jobs/${params.id}`);
		toast.success(`Job deleted successfully`);
	} catch (error) {
		if (axios.isAxiosError(error)) {
			toast.error(error.response?.data.message);
		} else {
			toast.error('An error ocurred');
		}
	}
	return redirect(`/dashboard/all-jobs`);
};
