import { NextApiRequest, NextApiResponse } from 'next';
import { Client } from '@notionhq/client';

type Data = {
  items?: any;
  message: string;
};

const notion = new Client({
  auth: process.env.NEXT_PUBLIC_SECRET_KEY,
});

const databaseId = process.env.NEXT_PUBLIC_DATABASE_ID as string;

async function getItems() {
  try {
    const response = await notion.databases.query({
      database_id: databaseId,
      sorts: [{ property: 'price', direction: 'ascending' }],
    });
    console.log(response);
    return response;
  } catch (err) {
    console.error(JSON.stringify(err));
  }
}

export default async function handler(res: NextApiResponse<Data>) {
  try {
    const response = await getItems();
    res.status(200).json({ items: response?.results, message: `Success ` });
  } catch (err) {
    res.status(400).json({ message: `Failed` });
  }
}
