import Link from 'next/link';
import PocketBase from 'pocketbase';

export const revalidate = 60

const db = new PocketBase(process.env.POCKETBASE_SERVER)

export default async function Woorden() {
    await db.admins.authWithPassword(process.env.POCKETBASE_ADMIN_EMAIL, process.env.POCKETBASE_ADMIN_PASSWORD);
    const collection = await db.collection('woorden').getFullList(200 /* batch size */, {
        sort: '-eerste_taal'
    });
    db.authStore.clear();
    const woorden = collection.reverse()
    return (
        <>
            <h1>Alle woorden:</h1>
            {woorden.map((woord) => {
                return <Link key={woord.id} href={'/woorden/' + woord.id + "/"}><h1>{woord.eerste_taal} - {woord.andere_taal}</h1></Link>
            })}
        </>
    )
}