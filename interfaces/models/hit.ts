interface Hit {
    code: string, // reference
    timestamp: Date,
    agent?: string | undefined,
    referrer?: string | undefined,
    country?: string | undefined,
    os?: { name: string | undefined, version: string | undefined } | undefined,
}

export type {
    Hit,
}