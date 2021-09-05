import { access } from 'fs/promises';

export default async (path: string) : Promise<boolean> =>
{
    try {
        await access(path);
        // The check succeeded
        return true;
    } catch (error) {
        // The check failed
        return false;
    }
};
