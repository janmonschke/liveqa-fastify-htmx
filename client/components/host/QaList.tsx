import { escapeHtml } from "@kitajs/html";
import { db } from "../../db.server";
import { qaAdmin } from "../../urls";

export async function QaList({ hostId }: { hostId: string }) {
  const qas = await db.qA.findMany({
    where: {
      hostId,
    },
  });

  return (
    <>
      {qas.length > 0 ? (
        <ul>
          {qas.map((qa) => (
            <li>
              <h3 class="subtitle is-5">
                <a href={qaAdmin(qa.id)}>{escapeHtml(qa.title)}</a>
              </h3>
            </li>
          ))}
        </ul>
      ) : (
        <p>You have not yet created a QA</p>
      )}
    </>
  );
}
