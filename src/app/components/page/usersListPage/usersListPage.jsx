import React, { useState, useEffect } from "react";
import Pagination from "../../common/pagination";
import { paginate } from "../../../utils/paginate";
import PropTypes from "prop-types";
import GroupList from "../../common/groupList";
import SearchStatus from "../../ui/searchStatus";
import UserTable from "../../ui/usersTable";
import _ from "lodash";
import { searchUser } from "../../../utils/searhUsers";
import { useUser } from "../../../hooks/useUsers";
import { useProfessions } from "../../../hooks/useProfession";
import { useAuth } from "../../../hooks/useAuth";

const UsersListPage = (props) => {
  const { users } = useUser();
  const { currentUser } = useAuth();
  const { isLoading: professionLoading, professions } = useProfessions();
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedProf, setSelectedProf] = useState();
  const [sortBy, setSortBy] = useState({ iter: "name", order: "asc" });
  const [findUser, setFilterUser] = useState("");

  const pageSize = 7;

  const handleToogleBookMark = (id) => {
    users.map((user) => {
      if (user._id === id) {
        user.bookmark = !user.bookmark;
      }
      return user;
    });
  };

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

  const changeUsers = (event) => {
    setFilterUser(event.target.value);
  };

  if (!users) {
    return (
      <div className="container d-flex justify-content-center align-items-center m-10">
        <h2>
          <div className="spinner-grow text-info" role="status">
            <span className="visually m-5">Загрузка пользователей...</span>
          </div>
        </h2>
      </div>
    );
  } else {
    function filterUsers(data) {
      let filteredUsers = selectedProf
        ? data.filter((user) => user.profession.name === selectedProf.name)
        : data;

      filteredUsers = findUser
        ? searchUser(filteredUsers, findUser)
        : filteredUsers;
      return filteredUsers.filter((u) => u._id !== currentUser._id);
    }

    const count = filterUsers(users).length;

    const sortedUsers = _.orderBy(
      filterUsers(users),
      [sortBy.path],
      [sortBy.order]
    );

    const userCrop = paginate(sortedUsers, currentPage, pageSize);

    const clearFilter = () => {
      setFilterUser("");
      setSelectedProf();
    };

    if (!users.length) {
      return (
        <h2>
          <span className="badge bg-danger">Все пошли спать!</span>
        </h2>
      );
    }

    if (!userCrop.length && filterUsers(users).length > 0) {
      setCurrentPage(currentPage - 1);
    }

    return (
      <div className="d-flex flex-column align-items-center ">
        <div className="container d-flex flex-column justify-content-center align-items-center">
          <SearchStatus length={count} reset={clearFilter} />
          {professions && !professionLoading && (
            <div className="list-group">
              <GroupList
                selectedItem={selectedProf}
                items={professions}
                onItemSelect={handleProfessionSelect}
              />
              <button className="btn btn-danger m-2" onClick={clearFilter}>
                Все пользователи
              </button>
            </div>
          )}
          <h3>Поиск пользователя</h3>
          <input
            type="text"
            onChange={changeUsers}
            className="m-2 w-80 info"
            placeholder="Введите имя"
            value={findUser}
          />
          {count > 0 && (
            <UserTable
              users={userCrop}
              onSort={handleSort}
              selectedSort={sortBy}
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
UsersListPage.propTypes = {
  users: PropTypes.array
};

export default UsersListPage;
