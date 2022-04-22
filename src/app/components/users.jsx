import React, { useState, useEffect } from "react";
import Pagination from "./pagination";
import { paginate } from "../utils/paginate";
import PropTypes from "prop-types";
import GroupList from "./groupList";
import api from "../api";
import SearchStatus from "./searchStatus";
import UserTable from "./usersTable";
import _ from "lodash";

const Users = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [profession, setProfession] = useState();
  const [selectedProf, setSelectedProf] = useState();
  const [sortBy, setSortBy] = useState({ iter: "name", order: "asc" });

  const pageSize = 8;

  const [users, setUsers] = useState();

  useEffect(() => {
    api.users.default.fetchAll().then((user) => setUsers(user));
  }, []);

  const handleDelete = (userId) => {
    setUsers((prevState) => prevState.filter((user) => user._id !== userId));
  };

  const handleToogleBookMark = (id) => {
    setUsers(
      users.map((user) => {
        if (user._id === id) {
          user.bookmark = !user.bookmark;
        }
        return user;
      })
    );
  };

  useEffect(() => {
    api.professions.fetchAll().then((data) => setProfession(data));
  }, []);

  useEffect(() => {
    setCurrentPage(1);
  }, [selectedProf]);

  const handleProfessionSelect = (items) => {
    setSelectedProf(items);
  };

  const handlePageChange = (pageIndex) => {
    setCurrentPage(pageIndex);
  };

  const handleSort = (item) => {
    setSortBy(item);
  };

  if (!users) {
    return (
      <div className="d-flex justify-content-center align-items-center  min-vh-100 min-vw-100">
        <h2>
          <div className="spinner-grow text-info" role="status">
            <span className="visually m-5">2сек...</span>
          </div>
        </h2>
      </div>
    );
  } else {
    const filteredUsers = selectedProf
      ? users.filter((user) => user.profession.name === selectedProf.name)
      : users;
    const count = filteredUsers.length;

    const sortedUsers = _.orderBy(filteredUsers, [sortBy.path], [sortBy.order]);

    const userCrop = paginate(sortedUsers, currentPage, pageSize);

    const clearFilter = () => {
      setSelectedProf();
    };

    if (!users.length) {
      return (
        <h2>
          <span className="badge bg-danger">Все пошли спать!</span>
        </h2>
      );
    }

    if (!userCrop.length && filteredUsers.length > 0) {
      setCurrentPage(currentPage - 1);
    }

    return (
      <div className="d-flex">
        {profession && (
          <div className="d-flex flex-column slex-shrink-0 p-3">
            <GroupList
              selectedItem={selectedProf}
              items={profession}
              onItemSelect={handleProfessionSelect}
            />
            <button className="btn btn-secondary mt-2" onClick={clearFilter}>
              Очистить
            </button>
          </div>
        )}
        <div className="d-flex flex-column">
          <SearchStatus length={count} reset={clearFilter} />
          {count > 0 && (
            <UserTable
              users={userCrop}
              onSort={handleSort}
              selectedSort={sortBy}
              onDelete={handleDelete}
              onToggleBookMark={handleToogleBookMark}
            />
          )}
          <div className="d-flex justify-content-center">
            <Pagination
              itemsCount={count}
              pageSize={pageSize}
              currentPage={currentPage}
              onPageChange={handlePageChange}
            />
          </div>
        </div>
      </div>
    );
  }
};

Users.propTypes = {
  users: PropTypes.array
};

export default Users;
