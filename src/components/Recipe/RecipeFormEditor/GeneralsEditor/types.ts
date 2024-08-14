import { FormikErrors, FormikTouched } from 'formik';
import { IFormikProps } from '../types';

export interface IProps {
  handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleBlur: (event: React.FocusEvent<HTMLInputElement>) => void;
  values: IFormikProps;
  touched: FormikTouched<IFormikProps>;
  errors: FormikErrors<IFormikProps>;
  setFieldValue: (field: string, value: any, shouldValidate?: boolean) => void;
}
