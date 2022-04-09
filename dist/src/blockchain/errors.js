"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NotImplementedError = exports.ChainsIsNotInitializedError = exports.UnknownChainError = exports.RpcEndpointsEmptyError = void 0;
class RpcEndpointsEmptyError extends Error {
}
exports.RpcEndpointsEmptyError = RpcEndpointsEmptyError;
class UnknownChainError extends Error {
}
exports.UnknownChainError = UnknownChainError;
class ChainsIsNotInitializedError extends Error {
}
exports.ChainsIsNotInitializedError = ChainsIsNotInitializedError;
class NotImplementedError extends Error {
}
exports.NotImplementedError = NotImplementedError;
//# sourceMappingURL=errors.js.map