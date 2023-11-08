import { Form, Link, useSubmit } from 'react-router-dom';
import { JOB_SORT_BY, JOB_STATUS, JOB_TYPE } from '../utils/constants';

const SearchContainer = ({
	searchValues,
}: {
	searchValues: Record<string, string>;
}) => {
	const submit = useSubmit();

	const debounce = (onChange: (form: HTMLFormElement) => void) => {
		let timeout: NodeJS.Timeout;
		return (e: React.ChangeEvent<HTMLInputElement>) => {
			const form = e.currentTarget.form as HTMLFormElement;
			clearTimeout(timeout);
			timeout = setTimeout(() => onChange(form), 2000);
		};
	};
	return (
		<div className='rounded-lg dark:bg-[#3f3f3f] bg-[#fcfcfc] mx-auto px-8 w-[90%] max-w-4xl mt-8 py-12 '>
			<h1 className='mb-8 text-xl '>Search Form</h1>
			<Form className='grid place-items-end      grid-cols-[repeat(auto-fill,_minmax(180px,_1fr))] gap-4 '>
				<div className='flex flex-col w-full gap-2'>
					<label htmlFor='search'>Search</label>
					<input
						className='rounded dark:bg-[#333] border border-[#aaa] px-1 py-1 outline-none'
						type='text'
						id='search'
						name='search'
						onChange={debounce((form) => {
							submit(form);
						})}
						defaultValue={searchValues.search || ''}
					/>
				</div>

				<div className='flex flex-col w-full gap-2'>
					<label htmlFor='jobStatus'>Job Status</label>
					<select
						className='rounded cursor-pointer dark:bg-[#333] border border-[#aaa] px-1 py-1 outline-none'
						name='jobStatus'
						id='jobStatus'
						onChange={(e) => {
							submit(e.currentTarget.form);
						}}
						defaultValue={searchValues.jobStatus || 'all'}
					>
						<option value='all'>all</option>
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
						onChange={(e) => {
							submit(e.currentTarget.form);
						}}
						defaultValue={searchValues.jobType || 'all'}
					>
						<option value='all'>all</option>
						{Object.values(JOB_TYPE).map((type) => (
							<option key={type} value={type}>
								{type}
							</option>
						))}
					</select>
				</div>
				<div className='flex flex-col w-full gap-2'>
					<label htmlFor='sort'>Sort</label>
					<select
						className='rounded cursor-pointer dark:bg-[#333] border border-[#aaa] px-1 py-1 outline-none'
						name='sort'
						id='sort'
						onChange={(e) => {
							submit(e.currentTarget.form);
						}}
						defaultValue={searchValues.sort || 'newest'}
					>
						{Object.values(JOB_SORT_BY).map((type) => (
							<option key={type} value={type}>
								{type}
							</option>
						))}
					</select>
				</div>
				<Link
					className='w-full h-8 px-4 py-1 text-center transition rounded hover:opacity-80 bg-primary'
					to='/dashboard/all-jobs'
				>
					Reset Values
				</Link>
			</Form>
		</div>
	);
};
export default SearchContainer;
