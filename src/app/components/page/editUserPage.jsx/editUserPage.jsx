import React, { useEffect, useState } from "react";
import { validator } from "../../../utils/validator";
import TextField from "../../common/form/textField";
import SelectField from "../../common/form/selectField";
import RadioField from "../../common/form/radioField";
import MultiSelectField from "../../common/form/multiSelectField";
import { useProfessions } from "../../../hooks/useProfession";
import { useQualities } from "../../../hooks/useQualities";
import { useAuth } from "../../../hooks/useAuth";
import { useHistory } from "react-router-dom";
// import _ from "lodash";

const EditUserPage = () => {
  const history = useHistory();
  const { currentUser, editUser } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState({
    _id: "",
    name: "",
    email: "",
    profession: "",
    sex: "",
    qualities: []
  });
  const { professions } = useProfessions();
  const { qualities } = useQualities();
  const [qualityTransform, setQualityTransform] = useState();
  const [professionTransform, setProfessionTransform] = useState();
  const [errors, setErrors] = useState({});

  const getQualities = (elements) => {
    const qualitiesArray = [];
    for (const elem of elements) {
      if (elem.value) {
        qualitiesArray.push(elem.value);
      } else {
        qualitiesArray.push(elem);
      }
    }
    return qualitiesArray;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const isValid = validate();
    if (!isValid) return;
    try {
      setIsLoading(false);
      await editUser(data);
      history.push("/users/" + currentUser._id);
      setIsLoading(false);
    } catch (error) {
      setErrors(error);
    } finally {
      setIsLoading(true);
    }
  };

  useEffect(() => {
    setIsLoading(true);
    setData(() => ({
      name: currentUser.name,
      email: currentUser.email,
      sex: currentUser.sex,
      qualities: currentUser.qualities,
      profession: currentUser.profession
    }));

    const qualitiesList = Object.values(qualities).map((quality) => ({
      value: quality._id,
      label: quality.name,
      color: quality.color
    }));

    const professionList = Object.values(professions).map((prof) => ({
      value: prof._id,
      label: prof.name
    }));

    setProfessionTransform(professionList);
    setQualityTransform(qualitiesList);
  }, []);

  useEffect(() => {
    if (data._id) setIsLoading(false);
  }, [data]);

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
    validate();
  }, [data]);

  const handleChange = (target) => {
    if (target.name === "qualities") {
      setData((prevState) => ({
        ...prevState,
        qualities: getQualities(target.value)
      }));
    } else {
      setData((prevState) => ({
        ...prevState,
        [target.name]: target.value
      }));
    }
  };

  const validate = async () => {
    const errors = validator(data, validatorConfig);
    setErrors(errors);
    return Object.keys(errors).length === 0;
  };
  const isValid = Object.keys(errors).length === 0;
  return (
    <div className="position-absolute top-50 start-50 translate-middle p-3 mb-2 bg-dark text-white d-flex justify-content-center align-items-center flex-column">
      {isLoading ? (
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
            options={professionTransform}
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
            options={qualityTransform}
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
