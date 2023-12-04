import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { deleteOrder, getOneOrder } from "../../feature/sliceAssets/orderSlice";
import { Confirm } from "./Addons/Confirm";
import { Chat } from "./Addons/Chat";

export const Order = () => {
  const dispatch = useDispatch();
  const params = useParams();
  const orders = useSelector((state) => state.orderState.oneOrder);
  const user = useSelector((state) => state.userStates.uuid);
  useEffect(() => {
    dispatch(getOneOrder(params.id));
  }, [dispatch, params.id]);

  const handleDelOrder = (order) => {
    dispatch(deleteOrder(order));
  };

  if (orders.length > 0) {
    return (
      <section className="py-8 px-6 xl:px-0">
        <div className="container mx-auto max-w-7xl ">
          <h2 className="text-md sm:text-xl md:text-2xl font-bold px-6  xl:px-0 text-center">
            Заказ #{params.id}
          </h2>

          <div className="bg-white rounded py-3 px-6 flex justify-center gap-2 sm:justify-between mt-4 flex-wrap sm:flex-nowrap">
            <div className="flex flex-col justify-center">
              <p className="text-md sm:text-lg font-medium text-center sm:text-left">
                {orders[0].name}
              </p>
              <p className="text-xs sm:text-md mt-1 text-gray-400 text-center sm:text-left">
                {orders[0].workclassName}, {orders[0].workType}
              </p>
            </div>
            <div className="flex flex-col justify-between items-end">
              <div className="font-medium flex gap-2">
                <p>Предложение заказчика:</p>
                <p className="text-green-500">{orders[0].price} P</p>
              </div>
              {user !== orders[0].uuid ? (
                <div className="flex gap-4 mt-2 flex-wrap justify-center">
                  <button className="bg-green-500 rounded px-3 py-1 text-white w-full sm:w-fit">
                    Откликнутся
                  </button>
                </div>
              ) : (
                <div className="flex gap-4 mt-2 flex-wrap sm:flex-nowrap whitespace-nowrap w-full justify-center sm:justify-between">
                  <button className="bg-yaOrange rounded px-3 py-1 text-white w-full sm:w-fit">
                    Изменить
                  </button>
                  <Link
                    to="/author"
                    onClick={() => handleDelOrder(orders[0]._id)}
                    className="bg-red-500 rounded px-3 py-1 text-white w-full sm:w-fit text-center"
                  >
                    Удалить заказ
                  </Link>
                </div>
              )}
            </div>
          </div>
          <div className="mt-6">
            <h2 className="text-center text-md sm:text-xl md:text-2xl font-bold mt-2">
              Описание
            </h2>
            <div className="bg-white rounded grid grid-cols-1 md:grid-cols-2 px-6 py-3 place-content-center mt-3 gap-4">
              <div className="flex flex-col gap-2 items-center md:items-start text-center sm:text-left">
                <h3 className="font-semibold text-lg">Техническое задание:</h3>
                <p>{orders[0].description}</p>
              </div>
              <div className="flex flex-col gap-2 items-center md:items-start">
                <h3 className="font-semibold text-lg">Прикреплённые файлы:</h3>
                <p className="text-gray-500">Пусто</p>
              </div>
            </div>
          </div>
          {user !== orders[0].uuid ? (
            <div className="mt-6">
              <h2 className="text-center text-md sm:text-xl md:text-2xl font-bold mt-2 mb-3">
                Чат с заказчиком
              </h2>

              <Chat />
            </div>
          ) : (
            <Confirm />
          )}
        </div>
      </section>
    );
  }
};
