import PocketBase from 'pocketbase';

export const dynamic = 'auto',
    dynamicParams = true,
    revalidate = 10,
    fetchCache = 'auto',
    runtime = 'nodejs',
    preferredRegion = 'auto'

const db = new PocketBase('https://minerva-online.pockethost.io');

async function getDingen() {
    await db.admins.authWithPassword('abelvanhulst@gmail.com', '7g#Z5iVbQ&yTd8Not0tccSIwn5iwVRlDi45?$BtW');
    const collection = await db.collection('woorden_te_leer').getFullList()
    console.log(collection)
    return collection
}

export default async function Leren() {
    const dingen = await getDingen()
    return (
        <><h1>hi</h1>
            {dingen.map((ding) => {
                return <h1 key={ding.id}>{ding.hoofdstuk}{ding.na_hoofdstuk}</h1>
            })}
        </>
    )
}