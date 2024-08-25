import { useCallback, useMemo } from 'react';
import useApi from './useApi';

const useServiceApi = () => {
  const { request } = useApi();

  const listClients = useCallback(async () => {
    return request('get', '/clients/');
  }, [request]);

  const viewClientProfile = useCallback(async (clientId) => {
    return request('get', `/client-profile/${clientId}/`);
  }, [request]);

  const manageSubscriptions = useCallback(async () => {
    return request('get', '/subscriptions/');
  }, [request]);

  const registerInsuranceCompany = useCallback(async (data, e) => {
    if (e) e.preventDefault();
    return request('post', '/register/', data);
  }, [request]);

  const login = useCallback(async (data, e) => {
    if (e) e.preventDefault();
    return request('post', '/login/', data);
  }, [request]);

  const createInsurancePlan = useCallback(async (data, e) => {
    if (e) e.preventDefault();
    return request('post', '/plans/create/', data);
  }, [request]);

  const updateClaimStatus = useCallback(async (subscriptionId, data, e) => {
    if (e) e.preventDefault();
    return request('post', `/claims/update-status/${subscriptionId}/`, data);
  }, [request]);

  const requestClientData = useCallback(async (clientId, data, e) => {
    if (e) e.preventDefault();
    return request('post', `/data-request/${clientId}/`, data);
  }, [request]);

  const updateInsuranceProfile = useCallback(async (data, e) => {
    if (e) e.preventDefault();
    return request('put', '/update-profile/', data, {
      headers: { 'Content-Type': 'multipart/form-data' }
    });
  }, [request]);

  const getClaims = useCallback(async () => {
    return request('get', '/claims/');
  }, [request]);

  const getPlans = useCallback(async () => {
    return request('get', '/plans/');
  }, [request]);

  const getPlanByID = useCallback(async (id) => {
    return request('get', `/plan/${id}`, );
  }, [request]);

  return useMemo(() => ({
    listClients,
    viewClientProfile,
    manageSubscriptions,
    registerInsuranceCompany,
    login,
    createInsurancePlan,
    updateClaimStatus,
    requestClientData,
    updateInsuranceProfile,
    getClaims,
    getPlans,
    getPlanByID
  }), [
    listClients,
    viewClientProfile,
    manageSubscriptions,
    registerInsuranceCompany,
    login,
    createInsurancePlan,
    updateClaimStatus,
    requestClientData,
    updateInsuranceProfile,
    getClaims,
    getPlans,
    getPlanByID,
  ]);
};

export default useServiceApi;
