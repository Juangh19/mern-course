import { redirect, useLoaderData } from 'react-router-dom';
import JobsContainer, { JobProps } from '../components/JobsContainer';
import SearchContainer from '../components/SearchContainer';
import customFetch from '../utils/customFetch';

// eslint-disable-next-line react-refresh/only-export-components
export const loader = async ({ request }: { request: Request }) => {
	const params = Object.fromEntries([
		...new URL(request.url).searchParams.entries(),
	]);

	try {
		const { data } = await customFetch.get('/jobs', {
			params,
		});

		return { data, searchValues: { ...params } };
	} catch (error) {
		return redirect('/dashboard');
	}
};

const AllJobs = () => {
	const data = useLoaderData() as {
		data: {
			jobs: JobProps[];
			totalJobs: number;
			numOfPages: number;
			currentPage: number;
		};
		searchValues: Record<string, string>;
	};

	return (
		<div>
			<SearchContainer searchValues={data.searchValues} />
			<br /> <br />
			<JobsContainer data={data.data} />
		</div>
	);
};
export default AllJobs;
