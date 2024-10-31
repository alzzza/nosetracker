import { Client, Account, Databases, Storage } from './appwrite';

const client = new Client()
    .setEndpoint('https://cloud.appwrite.io/v1')
    .setProject('${{ env.PROJECT_ID }}');

export const account = new Account(client);
export const databases = new Databases(client);
export const storage = new Storage(client);

export { client };
