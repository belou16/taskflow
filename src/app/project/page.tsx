import prisma from "../../../db/prisma";
import ProjetsTable from "@/components/projetContainer/ProjetsTable";

export const dynamic = "force-dynamic";

export default async function ProjectPage() {
  const projets = await prisma.pROJET.findMany({
    orderBy: { date_creation: "desc" },
  });

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Projets</h1>

      {projets.length === 0 ? (
        <p>Aucun projet pour le moment.</p>
      ) : (
        <ProjetsTable
          projets={projets.map((projet) => ({
            ...projet,
            date_creation: projet.date_creation?.toISOString() ?? null,
            date_modification: projet.date_modification?.toISOString() ?? null,
          }))}
        />
      )}
    </div>
  );
}
