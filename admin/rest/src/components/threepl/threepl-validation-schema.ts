import * as yup from 'yup';

export const ThreeplValidationSchema = yup.object().shape({
  name: yup.string().required('form:error-name-required'),
 
});
