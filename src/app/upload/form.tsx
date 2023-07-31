"use client";
import { useRef, useState } from 'react'
import { uploadImages } from './actions'
import Image from 'next/image';

export default function Form() {
	const [image, setImage] = useState<File | null>(null)
	const form = useRef<HTMLFormElement>(null)

	async function handleSubmit(data: FormData) {
		console.info('uploading...');
		const response = await uploadImages(data);
		if (!response.ok) {
			console.error(response.err);
			alert('Error:' + response.err);
		} else {
			form.current?.reset();
			setImage(null);
		}
	}

	return (
		<form
			className="py-4 w-1/2 mx-auto space-y-4"
			ref={form}
			action={(data) => {
				handleSubmit(data).catch(console.error)
			}}
		>
			<input type="file" name="imageFile" onChange={(e) => {
				setImage(e.target.files?.[0] ?? null)
			}} required />
			{image && (<>
				<Image
					className="w-full"
					alt="image"
					src={URL.createObjectURL(image)}
					width={1000}
					height={1000}
				/>
				<div>
					<input className="border rounded w-full px-2 py-1" type="text" name="title" placeholder="Title" required />
				</div>
				<div>
					<textarea className="border rounded w-full px-2 py-1" name="description" placeholder="Description" required />
				</div>
				<div className="w-full flex justify-end">
					<button
						className="border-2 border-blue-600 text-white bg-blue-600 rounded hover:text-blue-600 hover:bg-white transition-colors px-2 py-1 font-bold"
						type='submit'
					>
						UPLOAD
					</button>
				</div>
			</>)}
		</form>
	);
}
