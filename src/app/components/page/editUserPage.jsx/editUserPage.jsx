import React, { useEffect, useState } from "react";
import { validator } from "../../../utils/validator";
import TextField from "../../common/form/textField";
import SelectField from "../../common/form/selectField";
import RadioField from "../../common/form/radioField";
import MultiSelectField from "../../common/form/multiSelectField";
import { useSelector, useDispatch } from "react-redux";
import {
  getQualities,
  getQualitiesLoadingStatus
} from "../../../store/qualities";
import {
  getProfessions,
  getProfessionsLoadingStatus
} from "../../../store/professions";
import { getCurrentUserData, updateUser } from "../../../store/users";

const EditUserPage = () => {
  const dispatch = useDispatch();
  const currentUser = useSelector(getCurrentUserData());
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState();
  const professions = useSelector(getProfessions());
  const professionLoading = useSelector(getProfessionsLoadingStatus());
  const qualities = useSelector(getQualities());
  const qualitiesLoading = useSelector(getQualitiesLoadingStatus());
  const [errors, setErrors] = useState({});

  const professionsList = professions.map((p) => ({
    label: p.name,
    value: p._id
  }));

  const qualitiesList = qualities.map((q) => ({ label: q.name, value: q._id }));

  function getQualitiesListByIds(qualitiesIds) {
    const qualitiesArray = [];
    for (const qualId of qualitiesIds) {
      for (const quality of qualities) {
        if (quality._id === qualId) {
          qualitiesArray.push(quality);
          break;
        }
      }
    }
    return qualitiesArray;
  }

  const transformData = (data) => {
    const result = getQualitiesListByIds(data).map((qual) => ({
      label: qual.name,
      value: qual._id
    }));
    return result;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const isValid = validate();
    if (!isValid) return;
    dispatch(
      updateUser({
        ...data,
        qualities: data.qualities.map((q) => q.value)
      })
    );
  };

  useEffect(() => {
    if (!professionLoading && !qualitiesLoading && currentUser && !data) {
      setData({
        ...currentUser,
        qualities: transformData(currentUser.qualities)
      });
    }
  }, [professionLoading, qualitiesLoading, currentUser, data]);

  const validatorConfig = {
    email: {
      isRequired: {
        message: "Электронная почта обязательна для заполнения"
      },
      isEmail: {
        message: "Email введен некорректно"
      }
    },
    name: {
      isRequired: {
        message: "Введите ваше имя"
      }
    },
    qualities: {
      min: {
        message: "Выберите хотя бы одно качество",
        value: 1
      }
    }
  };

  useEffect(() => {
    if (data && isLoading) {
      setIsLoading(false);
    }
  }, [data]);

  const handleChange = (target) => {
    setData((prevState) => ({
      ...prevState,
      [target.name]: target.value
    }));
  };

  const validate = async () => {
    const errors = validator(data, validatorConfig);
    setErrors(errors);
    return Object.keys(errors).length === 0;
  };

  useEffect(() => {
    validate();
  }, [data]);

  const isValid = Object.keys(errors).length === 0;
  return (
    <div className="position-absolute top-50 start-50 translate-middle p-3 mb-2 bg-dark text-white d-flex justify-content-center align-items-center flex-column">
      {!isLoading && Object.keys(professions).length > 0 ? (
        <form
          className="d-flex justify-content-center align-items-center flex-column"
          onSubmit={handleSubmit}
        >
          <h2>
            <img
              src={currentUser.image}
              width="200"
              className="img-thumbnail"
              alt="..."
            />
          </h2>
          <TextField
            label="Имя"
            name="name"
            value={data.name}
            onChange={handleChange}
            error={errors.name}
          />
          <TextField
            label="Электронная почта"
            name="email"
            value={data.email}
            onChange={handleChange}
            error={errors.email}
          />
          <SelectField
            label="Выбери свою профессию"
            defaultOption={currentUser.profession}
            options={professionsList}
            name="profession"
            onChange={handleChange}
            value={currentUser.profession}
            error={errors.profession}
          />
          <RadioField
            options={[
              { name: "Male", value: "male" },
              { name: "Female", value: "female" },
              { name: "Other", value: "other" }
            ]}
            value={data.sex}
            name="sex"
            onChange={handleChange}
            label="Выберите ваш пол"
          />
          <MultiSelectField
            defaultValue={data.qualities}
            options={qualitiesList}
            onChange={handleChange}
            name="qualities"
            label="Выберите ваши качества"
            error={errors.qualities}
          />
          <div>
            <button
              type="button"
              className="btn btn-info me-4"
              // onClick={handleClick}
            >
              Все пользователи
            </button>
            {/* <Link to={`/users/${userIdEdit}`}> */}
            <button type="submit" disabled={!isValid} className="btn btn-info">
              Сохранить изменения
            </button>
            {/* </Link> */}
          </div>
        </form>
      ) : (
        "Загрузка пользователя..."
      )}
    </div>
  );
};

export default EditUserPage;
