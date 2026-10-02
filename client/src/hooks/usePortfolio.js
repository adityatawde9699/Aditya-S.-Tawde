import { createContext, useContext } from 'react';
import { getPortfolio } from '../services/api';
import { useApi } from './useApi';

export const PortfolioContext = createContext(null);
export function usePortfolioData() {
  return useApi(getPortfolio, { cacheTime: 300000 });
}
export function usePortfolio() {
  return useContext(PortfolioContext)?.data || {};
}
