export default class UnauthorizedException extends Error {
    constructor(message: string) {
        super(message);
        Object.setPrototypeOf(this, UnauthorizedException.prototype);
    }
}