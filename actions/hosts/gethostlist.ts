"use server";

type HostList = {
  publisher: string;
  browser: string;
  auth: string;
  payments: string;
};

export default async function GetHostList(): Promise<HostList> {
  return {
    publisher: process.env.HOST,
    browser: process.env.BROWSER_HOST,
    auth: process.env.AUTH_HOST,
    payments: process.env.PAYMENTS_HOST,
  } as HostList;
}
