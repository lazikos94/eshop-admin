const Modal = ({ handleModalCancel, handleModalConfirm, title }) => {
  return (
    <div className="modal is-active">
      <div className="modal-background" onClick={handleModalCancel}></div>
      <div className="modal-card">
        <header className="modal-card-head">
          <p className="modal-card-title">Confirm {title}</p>
          <button className="delete" onClick={handleModalCancel}></button>
        </header>
        <section className="modal-card-body">
          <p>Are you sure you want to {title.toLowerCase()} this record?</p>
        </section>
        <footer className="modal-card-foot is-flex is-justify-content-space-between is-align-items-center py-3">
          <div>
            <button className="button is-danger is-large" onClick={handleModalConfirm}>
              {title}
            </button>
          </div>
          <div>
            <button className="button is-large" onClick={handleModalCancel}>
              Abort
            </button>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default Modal;