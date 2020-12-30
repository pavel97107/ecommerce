import React from "react";

export default ({ handleSubmit, name, setName, title }) => (
  <form onSubmit={handleSubmit}>
    <div className="form-group">
      <label>Name</label>
      <input
        type="text"
        className="form-control"
        value={name}
        onChange={({ target }) => setName(target.value)}
        autoFocus
        required
      />
      <br />
      <button
        disabled={!name || name.length < 2}
        className="btn btn-outline-primary"
      >
        {title}
      </button>
    </div>
  </form>
);
