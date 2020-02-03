import React, { useCallback, useState } from 'react';
import AddModal from './TaskFormModal';

export default function AddButton({ taskDispatch, taskActions }) {

  const [isAddOpen, setIsAddOpen] = useState(false);

  const openAdd = useCallback((e) => {
    e.preventDefault();
    setIsAddOpen(true);
  }, [setIsAddOpen]);
  
  return (
    <>
      <button onClick={openAdd}>Add New Task</button>
      {isAddOpen && <AddModal {...{ isOpen: isAddOpen, setIsOpen: setIsAddOpen, taskDispatch, taskActions }} />}
    </>
  );

}