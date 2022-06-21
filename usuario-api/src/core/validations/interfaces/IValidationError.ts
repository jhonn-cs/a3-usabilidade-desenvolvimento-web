export default interface IValidationError {
    message: string,
    field: string,
    value?: any
}