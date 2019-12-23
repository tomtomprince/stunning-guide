import { string, object } from "yup";

export default object().shape({
    houseSelection: string()
    .required(),
    roomSelection: string()
    .required(),
    numPersons: string()
    .required(),
    moveInDate: string()
    .required(),
    termLength: string()
    .required(),
});