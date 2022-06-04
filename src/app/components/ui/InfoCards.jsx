import React from "react";
import PropTypes from "prop-types";
import UserCard from "./userCard";
import QualitiesCard from "../ui/qualities/qualitiesCard";
import MeetingsCard from "../ui/meetingsCard";

const InfoCards = ({ user }) => {
  return (
    <>
      <UserCard
        name={user.name}
        userId={user._id}
        profession={user.profession.name}
        userRate={user.rate}
      />
      <QualitiesCard qualities={user.qualities} />
      <MeetingsCard completedMeetings={user.completedMeetings} />
    </>
  );
};

export default InfoCards;

InfoCards.propTypes = {
  user: PropTypes.object
};
