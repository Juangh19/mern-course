import { HiChevronDoubleLeft, HiChevronDoubleRight } from 'react-icons/hi';
import { useLocation, useNavigate } from 'react-router-dom';

const PageBtnContainer = ({
	currentPage,
	numOfPages,
}: {
	currentPage: number;
	numOfPages: number;
}) => {
	console.log(currentPage, numOfPages);
	const { pathname, search } = useLocation();
	const navigate = useNavigate();

	console.log(search);

	const handlePageChange = (page: number) => {
		const searchParams = new URLSearchParams(search);
		searchParams.set('page', page.toString());
		navigate(`${pathname}?${searchParams.toString()}`);
	};

	console.log(currentPage, 'current');

	const renderPageButtons = () => {
		const pageButtons = [];
		// for (let i = 1; i <= numOfPages; i++) {
		// 	pageButtons.push(
		// 		<button
		// 			onClick={() => handlePageChange(i)}
		// 			key={i}
		// 			className={`px-4 text-primary   py-2  ${
		// 				currentPage === i
		// 					? 'bg-primary text-white'
		// 					: 'bg-secondary  hover:bg-primary hover:text-white hover:bg-opacity-80 '
		// 			}`}
		// 		>
		// 			{i}
		// 		</button>
		// 	);
		// }
		pageButtons.push(
			<button
				onClick={() => handlePageChange(1)}
				key={1}
				className={`px-4 text-primary   py-2  ${
					currentPage === 1
						? 'bg-primary text-white'
						: 'bg-secondary  hover:bg-primary hover:text-white hover:bg-opacity-80 '
				}`}
			>
				{1}
			</button>
		);

		if (currentPage > 3) {
			pageButtons.push(
				<button disabled className='px-4 py-2 bg-secondary text-primary '>
					...
				</button>
			);
		}

		if (currentPage - 1 > 1) {
			pageButtons.push(
				<button
					onClick={() => handlePageChange(currentPage - 1)}
					key={currentPage - 1}
					className={`px-4 text-primary   py-2  ${
						currentPage === currentPage - 1
							? 'bg-primary text-white'
							: 'bg-secondary  hover:bg-primary hover:text-white hover:bg-opacity-80 '
					}`}
				>
					{currentPage - 1}
				</button>
			);
		}
		if (currentPage !== 1 && currentPage !== numOfPages) {
			pageButtons.push(
				<button
					onClick={() => handlePageChange(currentPage)}
					key={currentPage}
					className={`px-4 text-primary   py-2  ${
						currentPage === currentPage
							? 'bg-primary text-white'
							: 'bg-secondary  hover:bg-primary hover:text-white hover:bg-opacity-80 '
					}`}
				>
					{currentPage}
				</button>
			);
		}
		if (currentPage + 1 < numOfPages) {
			pageButtons.push(
				<button
					onClick={() => handlePageChange(currentPage + 1)}
					key={currentPage + 1}
					className={`px-4 text-primary   py-2  ${
						currentPage === currentPage + 1
							? 'bg-primary text-white'
							: 'bg-secondary  hover:bg-primary hover:text-white hover:bg-opacity-80 '
					}`}
				>
					{currentPage + 1}
				</button>
			);
		}
		if (currentPage < numOfPages - 2) {
			pageButtons.push(
				<button disabled className='px-4 py-2 bg-secondary text-primary '>
					...
				</button>
			);
		}

		if (numOfPages > 1) {
			pageButtons.push(
				<button
					onClick={() => handlePageChange(numOfPages)}
					key={numOfPages}
					className={`px-4 text-primary   py-2  ${
						currentPage === numOfPages
							? 'bg-primary text-white'
							: 'bg-secondary  hover:bg-primary hover:text-white hover:bg-opacity-80 '
					}`}
				>
					{numOfPages}
				</button>
			);
		}
		return pageButtons;
	};

	return (
		<div className='flex items-center gap-4 pt-4 pb-8 font-semibold'>
			<button
				onClick={() => {
					let prevPage = currentPage - 1;
					if (prevPage < 1) prevPage = 1;
					handlePageChange(prevPage);
				}}
				className='flex items-center gap-2 bg-[#3f3f3f] shadow-md py-2 px-4 rounded-lg hover:bg-primary transition text-primary hover:text-white'
			>
				<HiChevronDoubleLeft />
				Prev
			</button>
			<div className='overflow-hidden rounded-lg'>{renderPageButtons()}</div>
			<button
				onClick={() => {
					let nextPage = currentPage + 1;
					if (nextPage > numOfPages) nextPage = numOfPages;
					handlePageChange(nextPage);
				}}
				className='flex items-center gap-2 bg-[#3f3f3f] shadow-md py-2 px-4 rounded-lg hover:bg-primary transition text-primary hover:text-white'
			>
				Next
				<HiChevronDoubleRight />
			</button>
		</div>
	);
};
export default PageBtnContainer;
