import { NextURL } from "next/dist/server/web/next-url";
import { NextRequest, NextResponse, userAgent } from "next/server";
import clientPromise from "@/lib/mongodb";
import { Link } from "@/interfaces/models/link";
import { Hit } from "@/interfaces/models/hit";

async function resolveCode(code: string) {
    const client = await clientPromise;
    const collection = client.db(process.env.MONGODB_DB as string).collection<Link>("links");
    const linkQuery = await collection.findOne({ code });

    return linkQuery?.targetURL ?? undefined;
}

export async function GET(request: NextRequest, { params }: { params: { shortCode: string }}) {
    const resolvedURL = await resolveCode(params.shortCode);
    if (!resolvedURL) {
        return NextResponse.redirect(new URL('/404', request.nextUrl));
    }
    // register hit
    const client = await clientPromise;
    const collection = client.db(process.env.MONGODB_DB as string).collection<Hit>("hits");

    const agent = request.headers.get('User-Agent');
    const referrer = request.headers.get('Referrer');
    const country = request.geo?.country ?? null;
    const osInfo = userAgent(request).os ? {
        name: userAgent(request).os.name ?? undefined,
        version: userAgent(request).os.version ?? undefined,
    } : null;

    const reqHit: Hit = Object.assign({
            code: params.shortCode,
            timestamp: new Date(),
        },
        agent === null ? null : { agent },
        referrer === null ? null : { referrer },
        country === null ? null : { country },
        osInfo === null ? null : { osInfo },
    );

    console.log(reqHit);
    try {
        const result = await collection.insertOne(reqHit);
        console.log(`Document created w/ ${result.insertedId}`);
    } catch (e) {
        return NextResponse.json(e);
    }
    // uses 307
    return NextResponse.redirect(new URL(resolvedURL));
}