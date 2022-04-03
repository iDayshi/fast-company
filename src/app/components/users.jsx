import React from 'react';
import User from './user';

const Users = ({ users, ...rest }) => {
  return (
    <>
      <tr key={rest._id}>
        <User {...rest} />
        <td>
          <button
            key={rest._id}
            className="btn btn-outline-danger btn-lg"
            onClick={() => rest.onDelete(rest._id)}
          >
            Удалить
          </button>
        </td>
      </tr>
    </>
  );
};

export default Users;
