import { IFormikProps } from '../types';

export interface IProps {
  values: IFormikProps;
  setFieldValue: (field: string, value: any, shouldValidate?: boolean) => void;
}
