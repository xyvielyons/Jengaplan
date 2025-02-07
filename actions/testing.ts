'use server'
import prisma from "@/lib/prisma"

export const getData = async (collectionName: string) => {
    const data = await (prisma as any)[collectionName]?.findMany();

    if (!data) {
        console.error(`Collection ${collectionName} not found`);
        return [];
    }

    console.log(data);
    return data;
};

export const getUniqueTopics = async(data: { TOPIC: string }[]) => {
    const seen = new Set<string>();
    return data
        .map(item => item.TOPIC)
        .filter(topic => (seen.has(topic) ? false : seen.add(topic)));
};

