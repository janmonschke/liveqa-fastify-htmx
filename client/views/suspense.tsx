import { Suspense } from "@kitajs/html/suspense";
import { RouteProps } from "../../types";

export const path = "/sus";

export default function ({ rid }: RouteProps) {
  return (
    <div>
      <h1>Sync</h1>
      <AsyncComp />
    </div>
  );
}

async function delay(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function AsyncComp() {
  await delay(5000);
  const rand = Math.random().toString();
  return <p>Done {rand}</p>;
}
