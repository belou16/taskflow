"use client";

import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";

export default function ModalTaskForm() {
  const router = useRouter();
  const [error, setError] = useState("");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");

    const form = event.currentTarget;
    const titre = (form.elements.namedItem("nameTask") as HTMLInputElement)
      .value;
    const date_limite = (
      form.elements.namedItem("limitDate") as HTMLInputElement
    ).value;
    const priorite = (form.elements.namedItem("priority") as HTMLSelectElement)
      .value;

    const response = await fetch("/api/taches", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        titre: titre,
        date_limite: date_limite,
        priorite: priorite,
        status: "a venir",
      }),
    });

    if (!response.ok) {
      setError("Erreur lors de la création de la tache");
      return;
    }

    form.reset();
    (document.getElementById("modalTaskForm") as HTMLDialogElement).close();
    router.refresh();
  }

  return (
    <dialog id="modalTaskForm" className="modal modal-bottom sm:modal-middle">
      <div className="modal-box">
        <div className="grid grid-cols-[1fr_auto] items-start">
          <div>
            <h3 className="font-bold text-xl">Créer une nouvelle Tache</h3>
          </div>

          <div>
            <form method="dialog">
              <button className="btn">X</button>
            </form>
          </div>
        </div>

        <form className="p-4" onSubmit={handleSubmit}>
          <fieldset className="fieldset">
            <label className="label">Nom de la tache</label>
            <input
              id="nameTask"
              name="nameTask"
              type="text"
              className="input validator"
              placeholder="Nom de la tache"
              required
            />
            <p className="validator-hint hidden">Required</p>
          </fieldset>

          <fieldset className="fieldset">
            <label className="fieldset">
              <span className="label">Date limite</span>
              <input
                id="limitDate"
                name="limitDate"
                type="date"
                className="input validator"
                required
              />
              <span className="validator-hint hidden">Required</span>
            </label>
          </fieldset>

          <fieldset className="fieldset">
            <label className="fieldset">
              <span className="label">Priorité</span>

              <select
                name="priority"
                id="priority"
                className="select"
                defaultValue=""
                required
              >
                <option value="" disabled={true}>
                  choix de la priorité
                </option>
                <option value="basse">Basse</option>
                <option value="normale">Normal</option>
                <option value="haute">Haute</option>
              </select>
              <span className="validator-hint hidden">Required</span>
            </label>
          </fieldset>

          {error && <p className="text-error mt-2">{error}</p>}

          <button className="btn btn-neutral mt-4" type="submit">
            Creer
          </button>
        </form>
      </div>
    </dialog>
  );
}
