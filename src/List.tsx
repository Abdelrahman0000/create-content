
import React from 'react';
import { FaEdit, FaTrash } from 'react-icons/fa';

interface Item {
  id: string;
  firstName: string;
  lastName: string;
  status: string;
}

interface Props {
  items: Item[];
  removeItem: (id: string) => void;
  editItem: (id: string) => void;
  setShowBox: (show: boolean) => void;
}

export default function List({ items, removeItem, editItem, setShowBox }: Props) {
  const editItem1 = (id: string) => {
    editItem(id);
    setShowBox(true);
  };

  return (
    <div className='grocery-list'>
      {items.map((item) => {
        const { id, firstName, lastName, status } = item;
        return (
          <article className='grocery-item' key={id}>
            <p className='title'>
              fullname : {firstName} {lastName}
            </p>

            <div className='status-container'>
              <span style={{ color: '#F465A8' }}>status : </span>
              {status === 'active' ? (
                <span className='status-active'></span>
              ) : (
                <span className='status-inactive'>Inactive</span>
              )}
            </div>

            <div className='btn-container'>
              <button
                className='edit-btn'
                type='button'
                onClick={() => editItem1(id)}
              >
                <FaEdit />
              </button>
              <button
                className='delete-btn'
                type='button'
                onClick={() => removeItem(id)}
              >
                <FaTrash />
              </button>
            </div>
          </article>
        );
      })}
    </div>
  );
}