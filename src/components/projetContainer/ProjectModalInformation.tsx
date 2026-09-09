"use client";

type Props = {
  title: string;
  description: string;
  dateCreation: string;
  dateModification: string;
  status: string;
};

export default function ProjetModalInformation({
  title = "Erreur titre manquant",
  description = "Erreur description manquante",
  dateCreation,
  dateModification,
  status = "Erreur status manquant",
}: Props) {
  return (
    <dialog
      id="projetModalInformation"
      className="modal modal-bottom sm:modal-middle"
    >
      <div className="modal-box">
        <div className="grid grid-cols-[1fr_auto] items-start">
          <div>
            <h3 className="font-bold text-xl">{title}</h3>
          </div>

          <div>
            <form method="dialog">
              <button className="btn">X</button>
            </form>
          </div>
        </div>

        <fieldset className="fieldset bg-base-200 border-base-300 rounded-box w-xs border p-4">
          <legend className="fieldset-legend">description</legend>
          <p className="">{description}</p>
        </fieldset>

        <div className="overflow-x-auto">
          <table className="table table-zebra">
            <thead>
              <tr>
                <th>Creation</th>
                <th>Modification</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>{dateCreation}</td>
                <td>{dateModification}</td>
                <td>{status}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </dialog>
  );
}
