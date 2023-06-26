import { NextApiRequest, NextApiResponse } from 'next';
import { Client } from '@notionhq/client';

type Data = {
  message: string;
};

const notion = new Client({
  auth: process.env.NEXT_PUBLIC_SECRET_KEY,
});

const databaseId = process.env.NEXT_PUBLIC_DATABASE_ID as string;

async function addItem(name: string) {
  try {
    const response = await notion.pages.create({
      parent: { database_id: databaseId },
      properties: {
        title: [
          {
            text: {
              content: name,
            },
          },
        ],
      },
    });
    console.log(response);
  } catch (err) {
    console.error(JSON.stringify(err));
  }
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const { name } = req.query;
  if (name === null) {
    return res.status(400).json({ message: 'No name' });
  }

  try {
    await addItem(String(name));
    res.status(200).json({ message: `Success ${name} added` });
  } catch (err) {
    res.status(400).json({ message: `Failed ${name} added` });
  }
}
