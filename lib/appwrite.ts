import { Client, Account, Databases, Storage } from 'appwrite';

const client = new Client()
    .setEndpoint('https://cloud.appwrite.io/v1')
    .setProject('671e2c0b00385156f79a');

export const account = new Account(client);
export const databases = new Databases(client);
export const storage = new Storage(client);

export { client };
