"use client";

type Props = {
  projetId: number;
};

export default function AddTaskButton({ projetId }: Props) {
  return (
    <button
      className="btn"
      onClick={() =>
        (document.getElementById(
          `modalTaskForm-${projetId}`,
        ) as HTMLDialogElement)!.showModal()
      }
    >
      Ajouter une tache
    </button>
  );
}
