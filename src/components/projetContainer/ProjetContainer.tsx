"use client";

import { useRouter } from "next/navigation";
import ProjetModalInformation from "./ProjectModalInformation";
import AddTaskButton from "../formModal/AddTaskButton";
import ModalTaskForm from "../formModal/ModalFormTask";
import { ProjectType, TaskType } from "../utils/typeModel";

type Props = {
  project: ProjectType;
  task: TaskType[];
};

export default function ProjectContainer({ project, task }: Props) {
  const router = useRouter();

  const todoCount = task.filter(
    (elt) => elt.status.toLowerCase() === "a faire",
  ).length;
  const inProgressCount = task.filter(
    (elt) => elt.status.toLowerCase() === "en cours",
  ).length;
  const completedCount = task.filter(
    (elt) => elt.status.toLowerCase() === "terminer",
  ).length;

  return (
    <div className="bg-base-300 p-5 rounded-xl m-15">
      <div className="grid grid-cols-[auto_1fr_auto]">
        <button
          className="btn btn-ghost"
          onClick={() =>
            (document.getElementById(
              `projetModalInformation-${project.id}`,
            ) as HTMLDialogElement)!.showModal()
          }
        >
          <span className="border rounded-full border-white px-2">i</span>
        </button>

        <h1 className="font-bold text-xl flex justify-center">
          {project.titre}
        </h1>

        <button
          className="btn  p-5"
          onClick={() => router.push(`/project/${project.id}`)}
        >
          Voir plus
        </button>
      </div>

      <span>tache: </span>
      <div className="overflow-x-auto">
        <table className="table table-zebra">
          <thead>
            <tr>
              <th>A faire</th>
              <th>En cours</th>
              <th>Terminer</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{todoCount}</td>
              <td>{inProgressCount}</td>
              <td>{completedCount}</td>
            </tr>
          </tbody>
        </table>
      </div>

      <AddTaskButton projetId={project.id} />

      <ProjetModalInformation project={project} />
      <ModalTaskForm projetId={project.id} />
    </div>
  );
}
