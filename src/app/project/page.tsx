import ModalProjectForm from "@/components/formModal/ModalFormProject";
import AddProjectButton from "@/components/formModal/AddProjectButton";
import prisma from "../../../db/prisma";
import ProjectContainer from "@/components/projetContainer/ProjetContainer";
import { TaskType } from "@/components/utils/typeModel";

export const dynamic = "force-dynamic";

export default async function ProjectPage() {
  const projets = await prisma.pROJET.findMany({
    orderBy: { date_creation: "desc" },
  });

  const taches = await prisma.tACHES.findMany({
    orderBy: { date_limite: "asc" },
  });

  const tasks: TaskType[] = taches.map((tache) => ({
    id: tache.id_tache,
    id_project: tache.id_projet,
    titre: tache.titre,
    date_limite: tache.date_limite.toLocaleDateString(),
    priorite: tache.priorite,
    status: tache.status,
  }));

  return (
    <>
      <AddProjectButton />

      {projets.map((projet) => (
        <ProjectContainer
          key={projet.id_projet}
          project={{
            id: projet.id_projet,
            titre: projet.titre,
            description: projet.description,
            status: projet.status,
            date_creation: projet.date_creation?.toLocaleDateString() ?? "",
            date_modification:
              projet.date_modification?.toLocaleDateString() ?? "",
          }}
          task={tasks.filter((tache) => tache.id_project === projet.id_projet)}
        />
      ))}

      <ModalProjectForm />
    </>
  );
}
