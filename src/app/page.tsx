"use client";

import ModalProjectForm from "@/components/formModal/ModalFormProject";
import ModalTaskForm from "@/components/formModal/ModalFormTask";

export default function Home() {
  return (
    <>
      <button
        className="btn"
        onClick={() =>
          (document.getElementById(
            "modalProjectForm",
          ) as HTMLDialogElement)!.showModal()
        }
      >
        Ajouter un Projet
      </button>

      <button
        className="btn"
        onClick={() =>
          (document.getElementById(
            "modalTaskForm",
          ) as HTMLDialogElement)!.showModal()
        }
      >
        Ajouter une tache
      </button>

      <ModalProjectForm />
      <ModalTaskForm />
    </>
  );
}
