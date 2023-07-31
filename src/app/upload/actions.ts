'use server';

import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3'
import { env } from '@/env.mjs'
import { prisma } from '@/server/db';

type File = {
	readonly name: string;
	readonly lastModified: number;
	arrayBuffer: () => Promise<ArrayBuffer>;
}

const s3 = new S3Client({
	region: env.S3_UPLOAD_REGION,
	credentials: {
		accessKeyId: env.S3_UPLOAD_KEY,
		secretAccessKey: env.S3_UPLOAD_SECRET,
	},
})

export async function uploadImages(input: FormData) {
	try {
		console.info('Uploading request...')
		console.info({ input })
		const file = input.get('imageFile') as File | null;
		if (!file) {
			return {
				ok: false,
				err: 'invalid file'
			}
		}
		const title = input.get('title')?.toString();
		if (!title) {
			return {
				ok: false,
				err: 'invalid title'
			}
		}
		const filename = title
			.trim()
			.toLowerCase()
			.replaceAll(/[ \-()\[\]\{\}'":;\/\\\?<>]/g, '_') + '.' +
			file.name.split('.').pop();
		const buffer = Buffer.from(await file.arrayBuffer())
		const params = {
			Bucket: env.S3_UPLOAD_BUCKET,
			Key: filename,
			Body: buffer,
		}
		const command = new PutObjectCommand(params)
		console.info({ params, buffer, command })
		const results = await s3.send(command);
		console.info({ imageUploadResults: results })
		const url = `https://s3.amazonaws.com/alexs-dogs/${encodeURIComponent(filename)}`
		await prisma.image.create({
			data: {
				title: title.toString(),
				description: input.get('description')?.toString(),
				imageUrl: url,
			}
		})
		return {
			ok: true,
		}
	} catch (e) {
		console.error(e)
		return {
			ok: false,
			err: e?.toString()
		}
	}
}
