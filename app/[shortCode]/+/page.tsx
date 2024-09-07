import { redirect } from 'next/navigation';
import styles from './page.module.scss'
import clientPromise from '@/lib/mongodb';
import { Link } from '@/interfaces/models/link';
import { Hit } from '@/interfaces/models/hit';

async function resolveCode(code: string) {
    const client = await clientPromise;
    const collection = client.db(process.env.MONGODB_DB as string).collection<Link>("links");
    const linkQuery = await collection.findOne({ code });

    return linkQuery ?? undefined;
}

export default async function page({params} : {params: { shortCode: string }}) {
    const resolvedURL = await resolveCode(params.shortCode);
    let hits = undefined;
    if (resolvedURL) {
        const client = await clientPromise;
        const collection = client.db(process.env.MONGODB_DB as string).collection<Hit>("hits");
        const hitsQuery = await collection.find({ code: params.shortCode }).toArray();
        hits = hitsQuery;
    }
    return (
        <h1>Stats for {params.shortCode}</h1>
    );
}
