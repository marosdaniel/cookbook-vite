import { FormikTouched, FormikErrors } from 'formik';
import { TIngredient } from '../../../../store/Recipe/types';
import { IFormikProps } from '../types';

export interface IProps {
  ingredients: TIngredient[] | [];
  handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleBlur: (event: React.FocusEvent<HTMLInputElement>) => void;
  values: IFormikProps;
  touched: FormikTouched<IFormikProps>;
  errors: FormikErrors<IFormikProps>;
  setFieldValue: (field: string, value: any, shouldValidate?: boolean) => void;
  isEditMode?: boolean;
}
