import type { NextApiRequest, NextApiResponse } from "next";
import { version as pjsonVersion } from "package.json";

type Response = {
  version: string;
};

export default async function handler(req: NextApiRequest, res: NextApiResponse<Response>): Promise<void> {
  return res.status(200).json({ version: pjsonVersion });
}
