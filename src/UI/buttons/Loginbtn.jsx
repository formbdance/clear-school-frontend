import { useDispatch } from "react-redux";
import { setModal } from "@userSlice";

export const Loginbtn = () => {
  const dispatch = useDispatch();

  return (
    <button
      className="w-full h-full cursor-pointer"
      onClick={() => dispatch(setModal())}
    >
      <p>Войти</p>
    </button>
  );
};
