import React from 'react';
import Qualitie from './qualitie';
import BookMark from './bookmark';

const User = ({ user, ...rest }) => {
  const { name, qualities, completedMeetings, rate, bookmark, profession } =
    rest;
  return (
    <>
      <td>{name}</td>
      <td>
        {qualities.map((qualitie) => (
          <Qualitie key={qualitie._id} {...qualitie} />
        ))}
      </td>
      <td key={profession._id}>{profession.name}</td>
      <td>{completedMeetings}</td>
      <td>{rate}/5</td>
      <td>
        <BookMark status={bookmark} {...rest} />
      </td>
    </>
  );
};

export default User;
