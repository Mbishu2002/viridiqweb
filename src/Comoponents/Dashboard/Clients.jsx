import React, { useMemo } from 'react';
import { useTable, useFilters, useGlobalFilter, usePagination } from 'react-table';
import { Avatar, Box, Grid, TextField, Typography, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

// Dummy clients data
const dummyClients = [
  { id: 1, name: 'John Doe', email: 'john.doe@example.com', status: 'Active', riskProfile: 'Low' },
  { id: 2, name: 'Jane Smith', email: 'jane.smith@example.com', status: 'Inactive', riskProfile: 'Medium' },
  { id: 3, name: 'Alice Johnson', email: 'alice.johnson@example.com', status: 'Active', riskProfile: 'High' },
  { id: 4, name: 'Bob Brown', email: 'bob.brown@example.com', status: 'Active', riskProfile: 'Low' },
];

// A default UI for global filtering
const GlobalFilter = ({ globalFilter, setGlobalFilter }) => (
  <TextField
    fullWidth
    value={globalFilter || ''}
    onChange={e => setGlobalFilter(e.target.value || undefined)}
    placeholder="Search"
  />
);

const Clients = () => {
  const navigate = useNavigate();

  const data = useMemo(() => dummyClients, []);

  const columns = useMemo(
    () => [
      {
        Header: '',
        accessor: 'avatar',
        Cell: ({ row }) => (
          <Avatar sx={{ bgcolor: 'primary.main' }}>
            {row.original.name.charAt(0).toUpperCase()}
          </Avatar>
        ),
      },
      {
        Header: 'Name',
        accessor: 'name',
      },
      {
        Header: 'Email',
        accessor: 'email',
      },
    ],
    []
  );

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    prepareRow,
    page,
    nextPage,
    previousPage,
    canNextPage,
    canPreviousPage,
    pageOptions,
    state,
    setGlobalFilter,
  } = useTable(
    {
      columns,
      data,
      initialState: { pageIndex: 0, pageSize: 5 },
    },
    useFilters,
    useGlobalFilter,
    usePagination
  );

  const { globalFilter, pageIndex } = state;

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>
        Clients
      </Typography>
      <Grid container spacing={2} alignItems="center" sx={{ mb: 2 }}>
        <Grid item xs={12} sm={6}>
          <GlobalFilter globalFilter={globalFilter} setGlobalFilter={setGlobalFilter} />
        </Grid>
      </Grid>
      <Box sx={{ height: 400, width: '100%' }}>
        <table {...getTableProps()} style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            {headerGroups.map(headerGroup => (
              <tr {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map(column => (
                  <th
                    {...column.getHeaderProps()}
                    style={{
                      borderBottom: 'solid 3px red',
                      background: 'aliceblue',
                      color: 'black',
                      fontWeight: 'bold',
                      padding: '10px',
                    }}
                  >
                    {column.render('Header')}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody {...getTableBodyProps()}>
            {page.map(row => {
              prepareRow(row);
              return (
                <tr
                  {...row.getRowProps()}
                  onClick={() => navigate(`/dashboard/clients/${row.original.id}`)} // Use base path
                  style={{ cursor: 'pointer' }}
                >
                  {row.cells.map(cell => (
                    <td
                      {...cell.getCellProps()}
                      style={{
                        padding: '10px',
                        borderBottom: 'solid 1px gray',
                        background: 'white',
                      }}
                    >
                      {cell.render('Cell')}
                    </td>
                  ))}
                </tr>
              );
            })}
          </tbody>
        </table>
        <div style={{ marginTop: '20px' }}>
          <Button onClick={() => previousPage()} disabled={!canPreviousPage}>
            Previous
          </Button>
          <span>
            Page{' '}
            <strong>
              {pageIndex + 1} of {pageOptions.length}
            </strong>{' '}
          </span>
          <Button onClick={() => nextPage()} disabled={!canNextPage}>
            Next
          </Button>
        </div>
      </Box>
    </Box>
  );
};

export default Clients;
