"use client";

import { useState } from "react";
import ProjetModalInformation from "./ProjectModalInformation";

type Projet = {
  id_projet: number;
  titre: string;
  description: string;
  status: string;
  date_creation: string | null;
  date_modification: string | null;
};

export default function ProjetsTable({ projets }: { projets: Projet[] }) {
  const [selected, setSelected] = useState<Projet | null>(null);

  function openProject(projet: Projet) {
    setSelected(projet);
    (
      document.getElementById("projetModalInformation") as HTMLDialogElement
    ).showModal();
  }

  return (
    <>
      <div className="overflow-x-auto">
        <table className="table table-zebra">
          <thead>
            <tr>
              <th>Titre</th>
              <th>Description</th>
              <th>Status</th>
              <th>Date de création</th>
              <th>Date de modification</th>
            </tr>
          </thead>
          <tbody>
            {projets.map((projet) => (
              <tr
                key={projet.id_projet}
                className="cursor-pointer hover"
                onClick={() => openProject(projet)}
              >
                <td>{projet.titre}</td>
                <td>{projet.description}</td>
                <td>{projet.status}</td>
                <td>
                  {projet.date_creation
                    ? new Date(projet.date_creation).toLocaleDateString()
                    : ""}
                </td>
                <td>
                  {projet.date_modification
                    ? new Date(projet.date_modification).toLocaleDateString()
                    : ""}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <ProjetModalInformation
        title={selected?.titre ?? ""}
        description={selected?.description ?? ""}
        status={selected?.status ?? ""}
        dateCreation={
          selected?.date_creation
            ? new Date(selected.date_creation).toLocaleDateString()
            : ""
        }
        dateModification={
          selected?.date_modification
            ? new Date(selected.date_modification).toLocaleDateString()
            : ""
        }
      />
    </>
  );
}
