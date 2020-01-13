import { object, string, number } from 'yup';

export default object().shape({
  name: string()
    .required()
    .max(40),
  email: string()
    .email()
    .required()
    .max(70),
  password: string()
    .required()
    .min(5),
  birth_timestamp: number()
    .required(),
  sex: string()
    .required()
    .max(1),
  bio: string()
    .max(150),
  latitude: string(),
  longitude: string(),
  phone: string(),
});
