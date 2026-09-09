"use client";

import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";

export default function ModalProjectForm() {
  const router = useRouter();
  const [error, setError] = useState("");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");

    const form = event.currentTarget;
    const titre = (form.elements.namedItem("nameProject") as HTMLInputElement)
      .value;
    const description = (
      form.elements.namedItem("descProject") as HTMLTextAreaElement
    ).value;

    const response = await fetch("/api/projets", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        titre: titre,
        description: description,
        status: "a venir",
      }),
    });

    if (!response.ok) {
      setError("Erreur lors de la création du projet");
      return;
    }

    form.reset();
    (document.getElementById("modalProjectForm") as HTMLDialogElement).close();
    router.refresh();
  }

  return (
    <dialog id="modalProjectForm" className="modal modal-bottom sm:modal-middle">
      <div className="modal-box">
        <div className="grid grid-cols-[1fr_auto] items-start">
          <div>
            <h3 className="font-bold text-xl">Créer un nouveau Projet</h3>
          </div>

          <div>
            <form method="dialog">
              <button className="btn">X</button>
            </form>
          </div>
        </div>

        <form className="p-4" onSubmit={handleSubmit}>
          <fieldset className="fieldset">
            <label className="label">Nom du projet</label>
            <input
              id="nameProject"
              name="nameProject"
              type="text"
              className="input validator"
              placeholder="Nom du Projet"
              required
            />
            <p className="validator-hint hidden">Required</p>
          </fieldset>

          <label className="fieldset">
            <span className="label">Description</span>
            <textarea
              id="descProject"
              name="descProject"
              className="textarea validator"
              placeholder="description du projet"
              required
            ></textarea>
            <span className="validator-hint hidden">Required</span>
          </label>

          {error && <p className="text-error mt-2">{error}</p>}

          <button className="btn btn-neutral mt-4" type="submit">
            Creer
          </button>
        </form>
      </div>
    </dialog>
  );
}
