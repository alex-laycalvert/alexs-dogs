import { getServerAuthSession } from '@/server/auth'
import Form from "./form";
import { redirect } from 'next/navigation';

export default async function Upload() {
	const session = await getServerAuthSession()

	if (!session) {
		redirect('/api/auth/signin')
	}

	return (
		<div className="w-full h-full">
			<Form />
		</div>
	);
}
