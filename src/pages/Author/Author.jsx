import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getOrders } from "../../feature/sliceAssets/orderSlice";

export const Author = () => {
  const dispatch = useDispatch();
  const orders = useSelector((state) => state.orderState.orderList);
  const loadStatus = useSelector((state) => state.orderState.deleteStatus);
  const user = useSelector((state) => state.userStates.uuid);

  useEffect(() => {
    document.body.style.backgroundColor = "#f1f1f1";
    document.body.style.overflow = "auto";
  }, []);
  useEffect(() => {
    dispatch(getOrders(user));
  }, [dispatch, loadStatus, user]);

  return (
    <section className="mt-12">
      <div className="container mx-auto max-w-7xl">
        <div className="flex justify-center">
          <div className="w-full ">
            <h2 className="text-2xl text-yaDark font-bold px-6 xl:px-0">
              Мои заказы
            </h2>
            <div className="mt-4 flex flex-col gap-3 px-6 xl:px-0">
              {Array.isArray(orders) && orders.length > 0 ? (
                orders.map((i) => (
                  <Link to={`/author/order/${i._id}`} key={i._id}>
                    <div className="bg-white rounded py-3 px-6 flex justify-center text-center sm:text-left sm:justify-between gap-3 flex-wrap sm:flex-nowrap">
                      <div>
                        {!i.inWork ? (
                          <p className="text-sm sm:text-lg font-medium">
                            Заказ #{i._id}
                          </p>
                        ) : (
                          <p className="text-sm sm:text-lg text-green-500">
                            Заказ #{i._id}
                          </p>
                        )}
                        <p className="mt-1 text-gray-400">{i.name}</p>
                      </div>
                      {!i.inWork ? (
                        <div className="text-yaOrange-light font-medium">
                          Поиск исполнителей
                        </div>
                      ) : (
                        <div className="flex flex-col justify-between ">
                          <div className="font-medium flex gap-2 justify-end">
                            <p>Цена:</p>
                            <p className="text-green-500">{i.price} P</p>
                          </div>
                          <p className="mt-1 text-gray-400">Исполнитель: Ник</p>
                        </div>
                      )}
                    </div>
                  </Link>
                ))
              ) : (
                <p className="text-gray-300">Нет заказов...</p>
              )}

              {/*<div className="bg-white rounded py-3 px-6 flex justify-between">
                <div>
                  <p className="text-lg font-medium text-red-400">Заказ #229</p>
                  <p className="mt-1 text-gray-400">Предмет, тип задачи</p>
                </div>
                <div className="text-red-400 font-medium text-right">
                  Заказ отменён
                </div>
              </div>*/}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
