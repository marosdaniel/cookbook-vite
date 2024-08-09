import { keys } from '@mantine/core';
import { ERole } from '../../../../store/Auth/types';
import { adminUserStyles, bloggerUserStyles, userUserStyles } from '../UnitsTab/styles';
import { RowData } from './types';

export const getUserRoleStyles = (role: ERole) => {
  switch (role) {
    case ERole.ADMIN:
      return adminUserStyles;
    case ERole.BLOGGER:
      return bloggerUserStyles;
    case ERole.USER:
    default:
      return userUserStyles;
  }
};

const filterData = (data: RowData[], search: string) => {
  const query = search.toLowerCase().trim();
  return data.filter(item => keys(data[0]).some(key => item[key].toLowerCase().includes(query)));
};

export const sortData = (
  data: RowData[],
  payload: { sortBy: keyof RowData | null; reversed: boolean; search: string },
) => {
  const { sortBy } = payload;

  if (!sortBy) {
    return filterData(data, payload.search);
  }

  return filterData(
    [...data].sort((a, b) => {
      if (payload.reversed) {
        return b[sortBy].localeCompare(a[sortBy]);
      }

      return a[sortBy].localeCompare(b[sortBy]);
    }),
    payload.search,
  );
};
