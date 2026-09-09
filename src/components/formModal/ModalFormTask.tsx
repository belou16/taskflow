"use client";

export default function ModalTaskForm() {
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

        <form className="p-4">
          <fieldset className="fieldset">
            <label className="label">Nom de la tache</label>
            <input
              id="nameTask"
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
                defaultValue="choix de la priorité"
              >
                <option disabled={true}>choix de la priorité</option>
                <option value="basse">Basse</option>
                <option value="basse">Normal</option>
                <option value="basse">Haute</option>
              </select>
              <span className="validator-hint hidden">Required</span>
            </label>
          </fieldset>

          <button className="btn btn-neutral mt-4" type="submit">
            Creer
          </button>
        </form>
      </div>
    </dialog>
  );
}
