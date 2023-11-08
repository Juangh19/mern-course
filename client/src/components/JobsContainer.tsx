import { FaLocationArrow } from 'react-icons/fa';
import { BiSolidBriefcase } from 'react-icons/bi';
import { FaCalendarDay } from 'react-icons/fa';
import { JOB_STATUS, JOB_TYPE } from '../utils/constants';
import { Form, Link } from 'react-router-dom';
import PageBtnContainer from './PageBtnContainer';

export interface JobProps {
	_id: string;
	position: string;
	company: string;
	jobStatus: JOB_STATUS;
	jobType: JOB_TYPE;
	jobLocation: string;
	createdAt: string;
	createdBy: string;
}

const JobsContainer = ({
	data,
}: {
	data: {
		jobs: JobProps[];
		totalJobs: number;
		numOfPages: number;
		currentPage: number;
	};
}) => {
	console.log(data);

	const { jobs, totalJobs, numOfPages, currentPage } = data;

	const formateDate = (date: string) => {
		return new Date(date).toLocaleDateString(undefined, {
			year: 'numeric',
			month: 'short',
			day: 'numeric',
		});
	};

	return (
		<div className='w-[90%] max-w-4xl  mx-auto '>
			<h2 className='px-4 mb-4 font-bold'>
				{totalJobs} Job{totalJobs > 1 && 's'} Found
			</h2>
			<div className='grid grid-cols-[repeat(auto-fill,_minmax(250px,_1fr))] gap-4'>
				{jobs.map((job) => (
					<div
						key={job._id}
						className='dark:bg-[#3f3f3f] capitalize bg-[#fcfcfc] rounded-lg'
					>
						<div className='flex items-center justify-start gap-8 px-4 py-4'>
							<div className='grid w-16 h-16 rounded-lg bg-primary place-items-center'>
								{job.company.slice(0, 1).toLocaleUpperCase()}
							</div>
							<div>
								<h3 className='font-semibold'>{job.position}</h3>
								<p className='opacity-90'>{job.company}</p>
							</div>
						</div>
						<hr />
						<div className='grid gap-4 grid-cols-[repeat(auto-fill,_minmax(100px,_1fr))] text-sm  px-4 py-4'>
							<div className='flex items-center '>
								<FaLocationArrow className='inline-block mr-2' />
								<span>{job.jobLocation}</span>
							</div>
							<div className='flex items-center '>
								<BiSolidBriefcase className='inline-block mr-2' />
								<span>{job.jobType}</span>
							</div>
							<div className='flex items-center '>
								<FaCalendarDay className='inline-block mr-2' />
								<span>{formateDate(job.createdAt)}</span>
							</div>
							{job.jobStatus === JOB_STATUS.INTERVIEW ? (
								<div className='px-2 py-[0.125rem] text-blue-800 bg-blue-200 rounded w-fit'>
									{job.jobStatus}
								</div>
							) : job.jobStatus === JOB_STATUS.DECLINED ? (
								<div className='px-2 py-[0.125rem] text-red-800 bg-red-200 rounded w-fit'>
									{job.jobStatus}
								</div>
							) : job.jobStatus === JOB_STATUS.PENDING ? (
								<div className='px-2 py-[0.125rem] text-yellow-800 bg-yellow-200 rounded w-fit'>
									{job.jobStatus}
								</div>
							) : null}
						</div>
						<div className='flex px-4 mb-4 text-sm'>
							<Link
								to={`../edit-job/${job._id}`}
								className='px-3 py-1 mr-2 rounded bg-primary '
							>
								Edit
							</Link>
							<Form
								method='post'
								action={`../delete-job/${job._id}`}
								className='px-3 py-1 rounded cursor-pointer bg-primary '
							>
								<button type='submit'>Delete</button>
							</Form>
						</div>
					</div>
				))}
			</div>
			<div className='flex flex-row-reverse '>
				{numOfPages > 1 && (
					<PageBtnContainer currentPage={currentPage} numOfPages={numOfPages} />
				)}
			</div>
		</div>
	);
};
export default JobsContainer;
