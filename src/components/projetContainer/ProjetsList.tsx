"use client";

import { useState } from "react";
import ProjectContainer from "./ProjetContainer";
import ProjetModalInformation from "./ProjectModalInformation";

type Projet = {
  id_projet: number;
  titre: string;
  description: string;
  status: string;
  date_creation: string | null;
  date_modification: string | null;
};

export default function ProjetsList({ projets }: { projets: Projet[] }) {
  const [selected, setSelected] = useState<Projet | null>(null);

  function openInfo(projet: Projet) {
    setSelected(projet);
    (
      document.getElementById("projetModalInformation") as HTMLDialogElement
    ).showModal();
  }

  return (
    <>
      {projets.map((projet) => (
        <ProjectContainer
          key={projet.id_projet}
          title={projet.titre}
          status={projet.status}
          task={[]}
          onInfoClick={() => openInfo(projet)}
        />
      ))}

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
