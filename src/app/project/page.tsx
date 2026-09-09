import prisma from "../../../db/prisma";
import ProjetsList from "@/components/projetContainer/ProjetsList";

export const dynamic = "force-dynamic";

export default async function ProjectPage() {
  const projets = await prisma.pROJET.findMany({
    orderBy: { date_creation: "desc" },
    include: {
      CONTENIR: {
        include: {
          TACHES: true,
        },
      },
    },
  });

  const projetsAvecTaches = projets.map((projet) => ({
    id_projet: projet.id_projet,
    titre: projet.titre,
    description: projet.description,
    status: projet.status,
    date_creation: projet.date_creation?.toISOString() ?? null,
    date_modification: projet.date_modification?.toISOString() ?? null,
    taches: projet.CONTENIR.map((lien) => ({
      titre: lien.TACHES.titre,
      date_limite: lien.TACHES.date_limite.toLocaleDateString(),
      priorite: lien.TACHES.priorite,
      status: lien.TACHES.status,
    })),
  }));

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Projets</h1>

      {projetsAvecTaches.length === 0 ? (
        <p>Aucun projet pour le moment.</p>
      ) : (
        <ProjetsList projets={projetsAvecTaches} />
      )}
    </div>
  );
}
