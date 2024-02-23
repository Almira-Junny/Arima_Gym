import { useEffect, useState } from "react";

export const useSelection = (items = []) => {
  const [selected, setSelected] = useState([]);

  useEffect(() => {
    setSelected([]);
  }, []);

  const handleSelectAll = () => {
    setSelected([...items]);
  };

  const handleSelectOne = (item) => {
    setSelected((prevState) => [...prevState, item]);
  };

  const handleDeselectAll = () => {
    setSelected([]);
  };

  const handleDeselectOne = (item) => {
    setSelected((prevState) => {
      return prevState.filter((_item) => _item !== item);
    });
  };

  return {
    handleDeselectAll,
    handleDeselectOne,
    handleSelectAll,
    handleSelectOne,
    selected,
  };
};
