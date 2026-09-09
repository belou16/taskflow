import { notFound } from "next/navigation";
import prisma from "../../../../db/prisma";
import ModalTaskForm from "@/components/formModal/ModalFormTask";
import AddTaskButton from "@/components/formModal/AddTaskButton";
import TaskContainer from "@/components/taskContainer/TaskContainer";
import { TaskType } from "@/components/utils/typeModel";

export const dynamic = "force-dynamic";

type Params = { params: Promise<{ id: string }> };

export default async function ProjectDetailPage({ params }: Params) {
  const { id } = await params;
  const projetId = Number(id);

  const projet = await prisma.pROJET.findUnique({
    where: { id_projet: projetId },
  });

  if (!projet) {
    notFound();
  }

  const taches = await prisma.tACHES.findMany({
    where: { id_projet: projetId },
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
      <h1 className="text-2xl font-bold p-5">{projet.titre}</h1>

      <AddTaskButton projetId={projetId} />

      <div className="grid grid-cols-3 h-full int">
        <div className="bg-base-300 rounded-xl p-2 m-5">
          <h1 className="border-b flex justify-center text-xl p-5">A faire</h1>
          <TaskContainer tasks={tasks} status="a faire" />
        </div>

        <div className="bg-base-300 rounded-xl p-2 m-5">
          <h1 className="border-b flex justify-center text-xl p-5">En cours</h1>
          <TaskContainer tasks={tasks} status="en cours" />
        </div>

        <div className="bg-base-300 rounded-xl p-2 m-5">
          <h1 className="border-b flex justify-center text-xl p-5">Terminer</h1>
          <TaskContainer tasks={tasks} status="terminer" />
        </div>
      </div>

      <ModalTaskForm projetId={projetId} />
    </>
  );
}
