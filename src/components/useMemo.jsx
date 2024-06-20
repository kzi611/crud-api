import React, { useMemo } from 'react';
import ButtonEdit from './Button/buttonEdit';
import ButtonDelete from './Button/buttonDelete';

const useMemoColumns = (handleDeleteUser, handleOpenUpdateModal, renderStatus) => {
  return useMemo(
    () => [
      {
        Header: 'ID User',
        accessor: 'id',
      },
      {
        Header: 'Name',
        accessor: 'name',
      },
      {
        Header: 'Phone',
        accessor: 'phone',
      },
      {
        Header: 'Email',
        accessor: 'email',
      },
      {
        Header: 'Status',
        accessor: 'status',
        Cell: ({ row }) => renderStatus(row),
      },
      {
        Header: 'Action',
        accessor: 'action',
        Cell: ({ row }) => (
          <>
            <ButtonEdit onClick={() => handleOpenUpdateModal(row.original)} label="Edit" />
            <ButtonDelete onClick={() => handleDeleteUser(row.original.id)} label="Delete" />
          </>
        ),
      },
    ],
    [handleDeleteUser, handleOpenUpdateModal, renderStatus]
  );
};

export default useMemoColumns;