import { prisma } from "@/server/db"
import Image from 'next/image'

export const revalidate = 300;

export default async function Index() {
	const images = await prisma.image.findMany()

	return (
		<div className="w-full h-full bg-white dark:bg-black">
			<h1 className="flex w-full py-8 items-center justify-center font-bold pb-0 text-5xl text-black dark:text-white">Alex&apos;s Dogs</h1>
			<div className="p-8 gap-8 columns-1 sm:columns-2 lg:columns-3 xl:w-2/3 mx-auto">
				{images.map((image) => (
					<div
						key={image.id}
					>
						<div className="rounded-sm hv:scale-[1.025] transition-all flex break-inside-avoid-column flex-col items-center justify-center w-full mb-8 hv:shadow-lg hv:shadow-white border dark:border-gray-600">
							<Image
								className="object-cover w-full max-h-full"
								alt={image.title}
								src={image.imageUrl}
								width={1000}
								height={1000}
							/>
							<div className="w-full p-2">
								<h2
									className="text-xl flex items-center justify-between text-black dark:text-white"
								>
									<i>{image.title}</i>
									<span className="text-gray-500 dark:text-gray-400 text-base">
										{image.createdAt.toLocaleDateString()}
									</span>
								</h2>
								<p className="text-gray-600 dark:text-gray-400">{image.description}</p>
							</div>
						</div>
					</div>
				))}
			</div>
		</div>
	)
}
