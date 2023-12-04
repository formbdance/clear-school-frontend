import { auth } from "@fire";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { destroyDB } from "../../feature/api/api";
import {
  getPerson,
  updateUsername,
} from "../../feature/sliceAssets/personSlice";
export const Settings = () => {
  const dispatch = useDispatch();
  const uuid = useSelector((state) => state.userStates.uuid);
  const person = useSelector((state) => state.personState.currentPerson);
  const [userEmail, setUserEmail] = useState("");
  const [currentName, setCurrentName] = useState("");
  const [username, setUsername] = useState("");
  const handlerOnLeave = () => {
    auth.signOut();
  };

  useEffect(() => {
    console.log("huis");
    dispatch(getPerson(uuid));
  }, [dispatch, uuid]);

  const handleUsername = () => {
    dispatch(
      updateUsername({
        uuid: person[0].uuid,
        username: username,
      })
    );
    setUsername("");
  };

  useEffect(() => {
    if (person.length > 0) {
      setUserEmail(person[0].email);
      setCurrentName(person[0].username);
    }
  }, [person]);

  return (
    <section className="mt-12">
      <div className="container mx-auto max-w-7xl sm:px-6 sm:py-3">
        <div className="rounded bg-white px-6 py-3">
          <div className="px-6 py-3">
            <h2 className="text-2xl font-bold">Настройки</h2>
          </div>
          <hr />
          <div className="flex justify-between px-6 py-3 w-full md:w-4/6 items-center gap-x-2 flex-wrap">
            <div className="flex flex-col gap-2">
              <p className="font-semibold">
                Username:{" "}
                {!currentName ? (
                  <span className="font-normal text-gray-300">
                    Вы не указали никнейм ¯\_(ツ)_/¯
                  </span>
                ) : (
                  <span className="font-normal">@{currentName}</span>
                )}
              </p>
              <p className="font-semibold">
                E-mail:{" "}
                {!userEmail ? (
                  <span className="font-normal text-gray-300">
                    У вас нет email
                  </span>
                ) : (
                  <span className="font-normal ">{userEmail}</span>
                )}
              </p>
            </div>
            <div>
              <p>
                <span className="font-semibold">id:</span> 1
              </p>
            </div>
          </div>
          <hr />

          <div className="px-6 py-3">
            <h2 className="text-2xl">Никнейм</h2>
            <div className="flex gap-2 flex-col w-full md:w-4/6 mt-3">
              <input
                onChange={(e) => setUsername(e.target.value)}
                value={username}
                placeholder="Ваш никнейм"
                className="border rounded pl-3 pr-1 py-2"
              />

              <div>
                <button
                  onClick={handleUsername}
                  className="bg-green-500 hover:bg-green-400 duration-300 rounded px-6 py-2 text-white"
                >
                  Сохранить
                </button>
              </div>
            </div>
          </div>
          <hr />

          <div className="px-6 py-3">
            <h2 className="text-2xl">Образование</h2>
            <div className="flex gap-2 flex-col w-full md:w-4/6 mt-3">
              <input
                placeholder="Учебное заведение"
                className="border rounded pl-3 pr-1 py-2"
              />
              <div className="flex gap-2 bg flex-wrap sm:flex-nowrap">
                <input
                  placeholder="Факультет"
                  className="border rounded pl-3 pr-1 py-2 w-full"
                />
                <input
                  placeholder="Специальность"
                  className="border rounded pl-3 pr-1 py-2 w-full"
                />
              </div>
              <div className="flex gap-2 bg flex-wrap sm:flex-nowrap">
                <input
                  placeholder="Статус (выпадающий список)"
                  className="border rounded pl-3 pr-1 py-2 w-full"
                />
                <input
                  placeholder="Курс"
                  className="border rounded pl-3 pr-1 py-2 w-full"
                />
              </div>
              <div>
                <button className="bg-green-500 hover:bg-green-400 duration-300 rounded px-6 py-2 text-white">
                  Сохранить
                </button>
              </div>
            </div>
          </div>
          <hr />
          <div className="px-6 py-3 ">
            <h2 className="text-2xl">Пароль</h2>
            <div className="flex flex-col gap-y-3 flex-wrap">
              <div className="w-full sm:w-4/6 md:w-3/6 lg:w-2/6 xl:w-2/6 flex flex-col gap-2 mt-3">
                <input
                  placeholder="Новый пароль"
                  className="border rounded pl-3 pr-1 py-2"
                />
                <input
                  placeholder="Новый пароль ещё раз"
                  className="border rounded pl-3 pr-1 py-2"
                />
                <input
                  placeholder="Старый пароль"
                  className="border rounded pl-3 pr-1 py-2"
                />
              </div>
              <div className="flex gap-2 sm:justify-between justify-center  w-full flex-wrap">
                <div className="w-full  sm:w-4/6 md:w-3/6 lg:w-2/6 xl:w-2/6 gap-2 flex justify-between flex-wrap">
                  <button className="w-full sm:w-fit bg-green-500 hover:bg-green-400 duration-300 rounded px-4 lg:px-6 py-2 text-white ">
                    Сохранить
                  </button>
                  <button className="w-full sm:w-fit bg-yaOrange-medium hover:bg-yaOrange-light  duration-300 rounded px-4 lg:px-6 py-2 text-white">
                    Сменить пароль
                  </button>
                </div>
                <div className="w-full  sm:w-fit mt-3 sm:mt-0 gap-3 flex">
                  <button
                    onClick={destroyDB}
                    className="w-full sm:w-fit text-lg rounded px-2 py-1 bg-red-500 hover:bg-red-600 duration-300 text-white"
                  >
                    Удалить БД
                  </button>
                  <button
                    onClick={handlerOnLeave}
                    className="w-full sm:w-fit text-lg rounded px-2 py-1 bg-red-500 hover:bg-red-600 duration-300 text-white"
                  >
                    выйти
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
