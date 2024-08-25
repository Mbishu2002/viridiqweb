import React, { useEffect, useMemo, useState } from 'react';
import { useTable, useFilters, useGlobalFilter, usePagination } from 'react-table';
import { Avatar, Box, Grid, TextField, Typography, Button, CircularProgress, Alert } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import useServiceApi from '../Config/service';

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
  const { listClients } = useServiceApi();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadClients = async () => {
      try {
        const clientsData = await listClients();
        setData(clientsData);
      } catch (err) {
        setError('Failed to fetch clients.');
      } finally {
        setLoading(false);
      }
    };

    loadClients();
  }, []);

  const columns = useMemo(
    () => [
      {
        Header: 'Profile Image',
        accessor: 'profile_image',
        Cell: ({ value, row }) => {
          const hasImage = !!value;
          const initial = row.original.first_name.charAt(0).toUpperCase();
          return hasImage ? (
            <Avatar src={value} sx={{ width: 40, height: 40 }} />
          ) : (
            <Avatar sx={{ bgcolor: 'primary.main', width: 40, height: 40 }}>
              {initial}
            </Avatar>
          );
        },
      },
      {
        Header: 'Name',
        accessor: 'first_name',
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

  if (loading) return <CircularProgress sx={{ display: 'block', mx: 'auto', mt: 3 }} />;
  if (error) return <Alert severity="error">{error}</Alert>;

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
      {data.length === 0 ? (
        <Typography variant="body1">
          No clients available.
        </Typography>
      ) : (
        <Box sx={{ height: '400px', width: '100%' }}>
          <table {...getTableProps()} style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              {headerGroups.map(headerGroup => (
                <tr {...headerGroup.getHeaderGroupProps()}>
                  {headerGroup.headers.map(column => (
                    <th
                      {...column.getHeaderProps()}
                      style={{
                        borderBottom: 'solid 2px #ccc',
                        background: '#f4f4f4',
                        color: '#333',
                        padding: '8px',
                        textAlign: 'left',
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
                    onClick={() => navigate(`/dashboard/clients/${row.original.id}`)}
                    style={{ cursor: 'pointer' }}
                  >
                    {row.cells.map(cell => (
                      <td
                        {...cell.getCellProps()}
                        style={{
                          padding: '8px',
                          borderBottom: 'solid 1px #ddd',
                          background: '#fff',
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
          <Box sx={{ marginTop: '20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Button onClick={() => previousPage()} disabled={!canPreviousPage}>
              Previous
            </Button>
            <Typography>
              Page{' '}
              <strong>
                {pageIndex + 1} of {pageOptions.length}
              </strong>
            </Typography>
            <Button onClick={() => nextPage()} disabled={!canNextPage}>
              Next
            </Button>
          </Box>
        </Box>
      )}
    </Box>
  );
};

export default Clients;
