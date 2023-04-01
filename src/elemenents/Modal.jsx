const Modal = ({ handleModalCancel, handleModalConfirm }) => {
  return (
    <div className="modal is-active">
      <div className="modal-background" onClick={handleModalCancel}></div>
      <div className="modal-card">
        <header className="modal-card-head">
          <p className="modal-card-title">Confirm Delete</p>
          <button className="delete" onClick={handleModalCancel}></button>
        </header>
        <section className="modal-card-body">
          <p>Are you sure you want to delete this record?</p>
        </section>
        <footer clasNames="modal-card-foot">
          <button className="button is-danger" onClick={handleModalConfirm}>
            Delete
          </button>
          <button className="button" onClick={handleModalCancel}>
            Cancel
          </button>
        </footer>
      </div>
    </div>
  );
};

export default Modal;
