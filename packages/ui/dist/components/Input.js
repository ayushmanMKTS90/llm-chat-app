'use client';
"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.Input = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const utils_1 = require("../utils");
const Input = React.forwardRef(({ className, type, label, error, helperText, id, ...props }, ref) => {
    const inputId = id || React.useId();
    const errorId = `${inputId}-error`;
    const helperId = `${inputId}-helper`;
    const describedBy = [error && errorId, helperText && helperId].filter(Boolean).join(' ') || undefined;
    return ((0, jsx_runtime_1.jsxs)("div", { className: "w-full", children: [label && ((0, jsx_runtime_1.jsx)("label", { htmlFor: inputId, className: "mb-1.5 block text-body-sm font-medium text-ink", children: label })), (0, jsx_runtime_1.jsx)("input", { type: type, id: inputId, className: (0, utils_1.cn)('flex h-10 w-full rounded-pill border bg-canvas px-4 py-2.5 text-body-md placeholder:text-mute transition-all duration-fast', 'focus:outline-none focus:ring-2 focus:ring-focus-ring focus:ring-offset-2 focus:border-transparent', 'disabled:cursor-not-allowed disabled:opacity-50', error && 'border-error focus:ring-error', className), ref: ref, "aria-invalid": error ? 'true' : 'false', "aria-describedby": describedBy, ...props }), error && ((0, jsx_runtime_1.jsx)("p", { id: errorId, className: "mt-1.5 text-caption-sm text-error", role: "alert", children: error })), helperText && !error && ((0, jsx_runtime_1.jsx)("p", { id: helperId, className: "mt-1.5 text-caption-sm text-mute", children: helperText }))] }));
});
exports.Input = Input;
Input.displayName = 'Input';
