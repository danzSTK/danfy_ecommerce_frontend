import { ILoginRequest } from "@/interfaces/AuthInterface";
import { LOCAL_STORAGE_KEYS } from "@/interfaces/Constants";
import { useAppDispatch, useAppSelector } from "@/lib/redux/hooks";
import {
  logout,
  setCredentials,
  setLoading,
  setUser,
  setInitialized,
} from "@/lib/redux/slices/authSlice";

import { RootState } from "@/lib/redux/store";
import { useLoginMutation } from "@/services/routes/Auth";
import { useLazyGetUserByIdQuery } from "@/services/routes/User";
import { decodeJWT } from "@/utils/decodeJWT";
import { useCallback } from "react";

import { toast } from "sonner";

export const useAuth = () => {
  const dispatch = useAppDispatch();
  const { isAuthenticated, user, token, isLoading, isInitialized } =
    useAppSelector((state: RootState) => state.auth);

  const [loginMutation] = useLoginMutation();
  const [triggerGetUser] = useLazyGetUserByIdQuery();

  const login = async (credentials: ILoginRequest) => {
    try {
      dispatch(setLoading(true));

      const loginResult = await loginMutation(credentials).unwrap();

      const decodedToken = decodeJWT(loginResult.accessToken);

      if (decodedToken?.sub) {
        const userResult = await triggerGetUser(decodedToken.sub).unwrap();
        dispatch(setUser(userResult));

        toast.success("Login realizado com sucesso!");

        return loginResult;
      }

      return null;
    } catch (error) {
      localStorage.removeItem(LOCAL_STORAGE_KEYS.ACCESS_TOKEN);
      localStorage.removeItem(LOCAL_STORAGE_KEYS.REFRESH_TOKEN);
      throw error;
    } finally {
      dispatch(setLoading(false));
    }
  };

  const logoutUser = () => {
    dispatch(logout());
  };

  const checkAuth = useCallback(async () => {
    // Verificar se estamos no cliente e se já foi inicializado
    if (typeof window === "undefined" || isInitialized) return;

    const storedToken = localStorage.getItem(LOCAL_STORAGE_KEYS.ACCESS_TOKEN);

    if (storedToken) {
      const decodedToken = decodeJWT(storedToken);

      if (decodedToken?.sub) {
        try {
          dispatch(setLoading(true));
          // Verificar se token ainda é válido e buscar usuário
          const userResult = await triggerGetUser(decodedToken.sub).unwrap();
          dispatch(setUser(userResult));
          dispatch(
            setCredentials({
              accessToken: storedToken,
              refreshToken:
                localStorage.getItem(LOCAL_STORAGE_KEYS.REFRESH_TOKEN) || "",
            })
          );
        } catch (error) {
          // Token inválido, fazer logout
          console.log("Token inválido, fazendo logout.", error);
          dispatch(logout());
        } finally {
          dispatch(setLoading(false));
        }
      }
    }

    // Marcar como inicializado
    dispatch(setInitialized(true));
  }, [dispatch, triggerGetUser, isInitialized]);

  return {
    login,
    logoutUser,
    checkAuth,
    isAuthenticated,
    user,
    token,
    isLoading,
    isInitialized,
  };
};
