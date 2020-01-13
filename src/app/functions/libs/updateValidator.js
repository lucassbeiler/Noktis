import {
  object, string, array, number, ref,
} from 'yup';

export default object().shape({
  email: string()
    .email(),
  bio: string()
    .max(150),
  age_range: array(number().min(18)),
  max_distance: number()
    .max(300),
  oldPassword: string(),
  password: string()
    .min(5)
    .max(64)
    .when('oldPassword', (oldPassword, field) => (oldPassword ? field.required() : field)),
  confirmPassword: string().when('password', (password, field) => (password ? field.required().oneOf([ref('password')]) : field)),
});
