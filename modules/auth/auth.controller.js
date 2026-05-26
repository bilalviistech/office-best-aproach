import asyncHandler from "../../middlewares/asynchandler.middleware.js";
import * as authService from "./auth.service.js";
import { Response } from "../../utils/response.js";

export const register = asyncHandler(async (req, res, next) => {
  const session = req.session;
  const result = await authService.register(req.body, session);
  Response(res, true, result);
}, true);

export const verifyEmail = asyncHandler(async (req, res) => {
  const session = req.session;
  const result = await authService.verifyEmail(req.body, session);
  Response(res, true, result);
}, true);

export const login = asyncHandler(async (req, res, next) => {
  const { email, password } = req.body;
  const result = await authService.login({ email, password });
  Response(res, true, result);
});

export const logout = asyncHandler(async (req, res, next) => {
  const result = await authService.logout(req.token);
  Response(res, true, result);
});

export const getUser = asyncHandler(async (req, res, next) => {
  const result = await authService.getUser(req.userID);
  Response(res, true, result);
});