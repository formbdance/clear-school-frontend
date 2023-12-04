import { useState } from "react";
import { auth } from "@fire";
import { saveOrder } from "../../feature/sliceAssets/orderSlice";
import { useDispatch, useSelector } from "react-redux";
export const Create = () => {
  const user = useSelector((state) => state.userStates.uuid);
  const dispatch = useDispatch();
  const [orderForm, setOrderForm] = useState({
    uuid: user,
    workType: "",
    workclassName: "",
    name: "",
    currentdate: false,
    datetime: "",
    price: "",
    originals: "",
    description: "",
    inWork: false,
  });

  const handleClearForm = () => {
    setOrderForm({
      uuid: user,
      workType: "",
      workclassName: "",
      name: "",
      currentdate: false,
      datetime: "",
      price: "",
      originals: "",
      description: "",
      inWork: false,
    });
  };

  const formChecker = () => {
    for (let i = 0; i < Object.keys(orderForm).length; i++) {
      if (orderForm[Object.keys(orderForm)[i]] === "") {
        return false;
      }
    }
    return true;
  };

  const handleOrder = () => {
    const inputCheck = formChecker();
    if (!inputCheck) {
      alert("Заполните все поля!");
    } else {
      try {
        if (auth.currentUser.uid === user) {
          dispatch(saveOrder(orderForm));
        } else {
          alert("relogin pls");
        }
      } catch (err) {
        console.log(err);
      } finally {
        handleClearForm();
      }
    }
  };

  return (
    <section className=" text-yaDark-medium py-8">
      <div className="container mx-auto  bg-white ">
        <div className="flex justify-center">
          <div className="w-full rounded ">
            <h2 className="text-2xl  font-bold px-12 p-3 bg-white">
              Размещение заказа
            </h2>
            <hr />
            <div className="grid grid-cols-1 md:grid-cols-2 px-12 py-3 gap-10 ">
              <div className="flex flex-col gap-5 order-2 md:order-1">
                <div className="flex flex-col gap-5 mt-2">
                  <div className="relative h-11 w-full min-w-[200px]">
                    <input
                      placeholder="Разработка"
                      value={orderForm.workType}
                      onChange={(e) =>
                        setOrderForm({ ...orderForm, workType: e.target.value })
                      }
                      className={`${
                        orderForm.workType
                          ? "border-gray-200 placeholder-gray-700"
                          : "border-red-500 placeholder-red-500 placeholder-opacity-50"
                      } peer h-full w-full border-b bg-transparent pt-4 pb-1.5 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border-blue-gray-200 focus:border-yaDark focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50`}
                    />
                    <label className="after:content[' '] pointer-events-none absolute left-0 -top-2.5 flex h-full w-full select-none text-md font-semibold leading-tight text-blue-gray-500 transition-all after:absolute after:-bottom-2.5 after:block after:w-full after:scale-x-0 after:border-b-2 after:border-yaDark after:transition-transform after:duration-300 peer-placeholder-shown:leading-tight peer-placeholder-shown:text-blue-gray-500 peer-focus:leading-tight peer-focus:text-yaDark peer-focus:after:scale-x-100 peer-focus:after:border-yaDark peer-disabled:text-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500">
                      Тип работы
                    </label>
                  </div>
                  <div className="relative h-11 w-full min-w-[200px]">
                    <input
                      placeholder="Веб-разработка"
                      value={orderForm.workclassName}
                      onChange={(e) =>
                        setOrderForm({
                          ...orderForm,
                          workclassName: e.target.value,
                        })
                      }
                      className={`${
                        orderForm.workclassName
                          ? "border-gray-200 placeholder-gray-700"
                          : "border-red-500 placeholder-red-500 placeholder-opacity-50"
                      } peer h-full w-full border-b bg-transparent pt-4 pb-1.5 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border-blue-gray-200 focus:border-yaDark focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50`}
                    />
                    <label className="after:content[' '] pointer-events-none absolute left-0 -top-2.5 flex h-full w-full select-none text-md font-semibold leading-tight text-blue-gray-500 transition-all after:absolute after:-bottom-2.5 after:block after:w-full after:scale-x-0 after:border-b-2 after:border-yaDark after:transition-transform after:duration-300 peer-placeholder-shown:leading-tight peer-placeholder-shown:text-blue-gray-500 peer-focus:leading-tight peer-focus:text-yaDark peer-focus:after:scale-x-100 peer-focus:after:border-yaDark peer-disabled:text-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500">
                      Предмет
                    </label>
                  </div>
                  <div className="relative h-11 w-full min-w-[200px]">
                    <input
                      placeholder="Название заказа"
                      value={orderForm.name}
                      onChange={(e) =>
                        setOrderForm({ ...orderForm, name: e.target.value })
                      }
                      className={`${
                        orderForm.name
                          ? "border-gray-200 placeholder-gray-700"
                          : "border-red-500 placeholder-red-500 placeholder-opacity-50"
                      } peer h-full w-full border-b bg-transparent pt-4 pb-1.5 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border-blue-gray-200 focus:border-yaDark focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50`}
                    />
                    <label className="after:content[' '] pointer-events-none absolute left-0 -top-2.5 flex h-full w-full select-none text-md font-semibold leading-tight text-blue-gray-500 transition-all after:absolute after:-bottom-2.5 after:block after:w-full after:scale-x-0 after:border-b-2 after:border-yaDark after:transition-transform after:duration-300 peer-placeholder-shown:leading-tight peer-placeholder-shown:text-blue-gray-500 peer-focus:leading-tight peer-focus:text-yaDark peer-focus:after:scale-x-100 peer-focus:after:border-yaDark peer-disabled:text-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500">
                      Название
                    </label>
                  </div>
                </div>
                <div className="flex justify-between items-center">
                  <p className="font-medium">Срок сдачи:</p>
                  <input
                    type="date"
                    value={orderForm.datetime}
                    onChange={(e) =>
                      setOrderForm({ ...orderForm, datetime: e.target.value })
                    }
                    className={`${
                      orderForm.datetime
                        ? "border-gray-200 placeholder-gray-700"
                        : "border-red-500 placeholder-red-500 placeholder-opacity-50"
                    } peer h-full w-2/4 lg:w-1/4 border-b bg-transparent pt-4 pb-1.5 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border-blue-gray-200 focus:border-yaDark focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50`}
                  />
                </div>
                <div className="flex flex-col gap-5">
                  <div className="relative h-11 w-full min-w-[200px]">
                    <input
                      placeholder="2321"
                      value={orderForm.price}
                      onChange={(e) =>
                        setOrderForm({ ...orderForm, price: e.target.value })
                      }
                      className={`${
                        orderForm.price
                          ? "border-gray-200 placeholder-gray-700"
                          : "border-red-500 placeholder-red-500 placeholder-opacity-50"
                      } peer h-full w-full border-b bg-transparent pt-4 pb-1.5 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border-blue-gray-200 focus:border-yaDark focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50`}
                    />
                    <label className="after:content[' '] pointer-events-none absolute left-0 -top-2.5 flex h-full w-full select-none text-md font-semibold leading-tight text-blue-gray-500 transition-all after:absolute after:-bottom-2.5 after:block after:w-full after:scale-x-0 after:border-b-2 after:border-yaDark after:transition-transform after:duration-300 peer-placeholder-shown:leading-tight peer-placeholder-shown:text-blue-gray-500 peer-focus:leading-tight peer-focus:text-yaDark peer-focus:after:scale-x-100 peer-focus:after:border-yaDark peer-disabled:text-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500">
                      Цена
                    </label>
                  </div>
                  <div className="relative h-11 w-full min-w-[200px]">
                    <input
                      placeholder="Свободная"
                      value={orderForm.originals}
                      onChange={(e) =>
                        setOrderForm({
                          ...orderForm,
                          originals: e.target.value,
                        })
                      }
                      className={`${
                        orderForm.originals
                          ? "border-gray-200 placeholder-gray-700"
                          : "border-red-500 placeholder-red-500 placeholder-opacity-50"
                      } peer h-full w-full border-b bg-transparent pt-4 pb-1.5 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border-blue-gray-200 focus:border-yaDark focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50`}
                    />
                    <label className="after:content[' '] pointer-events-none absolute left-0 -top-2.5 flex h-full w-full select-none text-md font-semibold leading-tight text-blue-gray-500 transition-all after:absolute after:-bottom-2.5 after:block after:w-full after:scale-x-0 after:border-b-2 after:border-yaDark after:transition-transform after:duration-300 peer-placeholder-shown:leading-tight peer-placeholder-shown:text-blue-gray-500 peer-focus:leading-tight peer-focus:text-yaDark peer-focus:after:scale-x-100 peer-focus:after:border-yaDark peer-disabled:text-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500">
                      Требуемая оригинальность
                    </label>
                  </div>
                  <div className="mt-4 ">
                    <button
                      onClick={handleOrder}
                      className="text-white duration-300 hover:bg-yaOrange-medium  text-lg px-6 py-3 bg-yaOrange rounded-lg font-semibold"
                    >
                      Разместить заказ
                    </button>
                  </div>
                </div>
              </div>
              <div className="flex flex-col justify-between gap-4 bg-4 order-1 md:order-2">
                <div className="flex flex-col gap-1  h-full">
                  <p className="font-medium">Описание работы</p>
                  <textarea
                    value={orderForm.description}
                    onChange={(e) =>
                      setOrderForm({
                        ...orderForm,
                        description: e.target.value,
                      })
                    }
                    className={`${
                      orderForm.description ? "border" : "border-red-500"
                    } border w-full rounded outline-none px-3 py-2 h-48 md:h-full`}
                  ></textarea>
                </div>
                <div className="flex flex-col gap-2 items-start">
                  <button className="bg-yaDark text-gray-100 px-6 py-2 rounded-lg hover:bg-yaDark-medium duration-300">
                    Добавить файлы
                  </button>
                  <div className="w-full flex flex-col gap-2">
                    <p className="font-medium">Добавленные файлы:</p>
                    <p className="text-gray-400 w-full">
                      Нет добавленных файлов
                    </p>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-3 ">
                      <div></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
