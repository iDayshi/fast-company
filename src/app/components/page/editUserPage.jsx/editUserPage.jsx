import React, { useEffect, useState } from "react";
import api from "../../../api";
import TextField from "../../common/form/textField";
import SelectField from "../../common/form/selectField";
import RadioField from "../../common/form/radioField";
import MultiSelectField from "../../common/form/multiSelectField";
import { Link, useHistory } from "react-router-dom";

const EditUserPage = (userId) => {
  const history = useHistory();
  const { userIdEdit } = userId;
  const [data, setData] = useState();
  const [qualities, setQualities] = useState({});
  const [professions, setProfession] = useState();

  useEffect(() => {
    api.users.getById(userIdEdit).then((data) => setData(data));
  }, []);

  useEffect(() => {
    api.professions.fetchAll().then((data) => {
      const professionsList = Object.keys(data).map((professionName) => ({
        label: data[professionName].name,
        value: data[professionName]._id
      }));
      setProfession(professionsList);
    });
    api.qualities.fetchAll().then((data) => {
      const qualitiesList = Object.keys(data).map((optionName) => ({
        label: data[optionName].name,
        value: data[optionName]._id,
        color: data[optionName].color
      }));
      setQualities(qualitiesList);
    });
  }, []);

  const handleChange = (target) => {
    if (target.name === "profession") {
      setData((PrevState) => ({
        ...PrevState,
        [target.name]: getProfessionById(target.value)
      }));
    } else {
      setData((PrevState) => ({
        ...PrevState,
        [target.name]: target.value
      }));
    }
  };

  const getProfessionById = (id) => {
    for (const prof of professions) {
      if (prof.value === id) {
        return { _id: prof.value, name: prof.label };
      }
    }
  };

  const handleClick = () => {
    history.push("/users");
  };

  const handleEdit = () => {
    api.users.update(userIdEdit, data);
  };

  if (professions) {
    return (
      <div className="position-absolute top-50 start-50 translate-middle p-3 mb-2 bg-dark text-white d-flex justify-content-center align-items-center flex-column">
        <h2>
          <img
            src={`/avatars/${data._id}.jpg`}
            className="img-thumbnail"
            alt="..."
          />
        </h2>
        <TextField
          label="Имя Фамилия"
          name="name"
          value={data.name}
          onChange={handleChange}
        />
        <TextField
          label="Электронная почта"
          name="email"
          value={data.email}
          onChange={handleChange}
        />
        <SelectField
          label="Профессия"
          defaultOption="Choose..."
          options={professions}
          name="profession"
          onChange={handleChange}
          value={data.profession}
        />
        <RadioField
          options={[
            { name: "Мужской", value: "male" },
            { name: "Женский", value: "female" },
            { name: "Другой", value: "other" }
          ]}
          value={data.sex}
          name="sex"
          onChange={handleChange}
          label="Выберите ваш пол"
        />
        <MultiSelectField
          options={qualities}
          onChange={handleChange}
          defaultValue={data.qualities}
          name="qualities"
          label="Выберите ваши качества"
        />
        <div>
          <button
            type="button"
            className="btn btn-info me-4"
            onClick={handleClick}
          >
            Все пользователи
          </button>
          <Link to={`/users/${userIdEdit}`}>
            <button
              type="button"
              onClick={() => handleEdit()}
              className="btn btn-info"
            >
              Сохранить изменения
            </button>
          </Link>
        </div>
      </div>
    );
  } else {
    return <h1>Загрузка пользователя...</h1>;
  }
};

export default EditUserPage;
