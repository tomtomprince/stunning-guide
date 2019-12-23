import { string, object} from "yup";

export default object().shape({
    firstName: string()
    .required(),
    lastName: string()
    .required(),
    email: string().email()
    .required(),
    phone: string()
    .required()
});