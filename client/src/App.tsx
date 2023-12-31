import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import {
	HomeLayout,
	Landing,
	Register,
	Login,
	DashboardLayout,
	Error,
	AddJob,
	Stats,
	AllJobs,
	Profile,
	Admin,
	EditJob,
} from './pages';

import ThemeContextProvider from './context/Theme';

import { action as registerAction } from './pages/Register';
import { action as loginAction } from './pages/Login';
import { action as addJobAction } from './pages/AddJob';
import { action as editJobAction } from './pages/EditJob';
import { action as deleteJobAction } from './pages/DeleteJob';
import { action as profileAction } from './pages/Profile';

import { loader as dashboardLoader } from './context/Dashboard';
import { loader as allJobsLoader } from './pages/AllJobs';
import { loader as editJobLoader } from './pages/EditJob';
import { loader as adminLoader } from './pages/Admin';

const router = createBrowserRouter([
	{
		path: '/',
		element: <HomeLayout />,
		errorElement: <Error />,
		children: [
			{
				index: true,
				element: <Landing />,
			},
			{
				path: '/register',
				element: <Register />,
				action: registerAction,
			},
			{
				path: '/login',
				element: <Login />,
				action: loginAction,
			},
			{
				path: '/dashboard',
				element: <DashboardLayout />,
				loader: dashboardLoader,
				children: [
					{
						index: true,
						element: <AddJob />,
						action: addJobAction,
					},
					{
						path: 'stats',
						element: <Stats />,
					},
					{
						path: 'all-jobs',
						element: <AllJobs />,
						loader: allJobsLoader,
					},
					{
						path: 'profile',
						element: <Profile />,
						action: profileAction,
					},
					{
						path: 'admin',
						element: <Admin />,
						loader: adminLoader,
					},
					{
						path: 'edit-job/:id',
						element: <EditJob />,
						loader: editJobLoader,
						action: editJobAction,
					},
					{
						path: 'delete-job/:id',
						action: deleteJobAction,
					},
				],
			},
		],
	},
]);

const App = () => {
	return (
		<div>
			<ThemeContextProvider>
				<RouterProvider router={router} />
			</ThemeContextProvider>{' '}
		</div>
	);
};
export default App;
