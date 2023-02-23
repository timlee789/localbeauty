import React from 'react';

function Registration() {
  return (
    <div>
      <form onSubmit={submitHandler}>
        <input
          type="text"
          id="name"
          ref={refName}
          placeholder="Name"
          required
        />
        <input
          type="text"
          id="tel"
          ref={refName}
          placeholder="Phone Number"
          required
        />
        <input
          type="text"
          id="email"
          ref={refName}
          placeholder="E-mail"
          required
        />
        <button>Submit</button>
      </form>
    </div>
  );
}

export default Registration;
