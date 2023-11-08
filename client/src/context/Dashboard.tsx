/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useState } from 'react';
import { redirect, useLoaderData, useNavigate } from 'react-router-dom';
import customFetch from '../utils/customFetch';
import { toast } from 'react-toastify';

interface DashboardContextProps {
	user: {
		name: string;
		email: string;
		lastName: string;
		location: string;
		role: string;
		avatar?: string;
		avatarPublicId?: string;
	};
	showSideBar: boolean;
	setShowSideBar: (value: boolean) => void;
	toggleSideBar: () => void;
	logoutUser: () => void;
}

interface loaderData {
	user: {
		name: string;
		email: string;
		lastName: string;
		location: string;
		role: string;
	};
}

export const loader = async () => {
	try {
		const { data } = await customFetch.get('/users/current-user');

		return data;
	} catch (error) {
		return redirect('/login');
	}
};

const DashboardContext = createContext<DashboardContextProps | null>(null);

export default function DashboardContextProvider({
	children,
}: {
	children: React.ReactNode;
}) {
	const { user } = useLoaderData() as loaderData;

	const navigate = useNavigate();

	const [showSideBar, setShowSideBar] = useState(false);

	const toggleSideBar = () => {
		setShowSideBar(!showSideBar);
	};

	const logoutUser = async () => {
		navigate('/');
		await customFetch.get('/auth/logout');
		toast.success('Logged out successfully');
	};

	return (
		<DashboardContext.Provider
			value={{ user, showSideBar, setShowSideBar, toggleSideBar, logoutUser }}
		>
			{children}
		</DashboardContext.Provider>
	);
}

export function useDashboardContext() {
	const context = useContext(DashboardContext);
	if (!context) {
		throw new Error(
			'useDashboardContext must be used within a DashboardContextProvider'
		);
	}
	return context;
}
