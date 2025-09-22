import { ILoginResponse, IUser } from "@/interfaces/AuthInterface";
import { LOCAL_STORAGE_KEYS } from "@/interfaces/Constants";
import { authApi } from "@/services/routes/Auth";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface IAuthState {
  isAuthenticated: boolean;
  token: string | null;
  refreshToken: string | null;
  user: IUser | null;
  isLoading: boolean;
  isInitialized: boolean; // Novo estado para controlar se a auth foi inicializada
}

// Função auxiliar para verificar se estamos no cliente
const isClient = typeof window !== "undefined";

// Verificar se há token armazenado
const storedToken = isClient
  ? localStorage.getItem(LOCAL_STORAGE_KEYS.ACCESS_TOKEN)
  : null;

const initialState: IAuthState = {
  isAuthenticated: !!storedToken, // Se há token, está autenticado
  token: storedToken,
  user: null,
  refreshToken: isClient
    ? localStorage.getItem(LOCAL_STORAGE_KEYS.REFRESH_TOKEN)
    : null,
  isLoading: false,
  isInitialized: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCredentials: (state, action: PayloadAction<ILoginResponse>) => {
      const { accessToken, refreshToken } = action.payload;
      state.isAuthenticated = true;
      state.token = accessToken;
      state.refreshToken = refreshToken;

      if (isClient) {
        localStorage.setItem(LOCAL_STORAGE_KEYS.ACCESS_TOKEN, accessToken);
        localStorage.setItem(LOCAL_STORAGE_KEYS.REFRESH_TOKEN, refreshToken);
      }
    },
    setUser: (state, action: PayloadAction<IUser>) => {
      state.user = action.payload;
      state.isLoading = false;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    setInitialized: (state, action: PayloadAction<boolean>) => {
      state.isInitialized = action.payload;
    },
    logout: (state) => {
      state.isAuthenticated = false;
      state.token = null;
      state.user = null;
      state.refreshToken = null;
      state.isLoading = false;
      state.isInitialized = true; // Manter como inicializado após logout

      if (isClient) {
        localStorage.removeItem(LOCAL_STORAGE_KEYS.ACCESS_TOKEN);
        localStorage.removeItem(LOCAL_STORAGE_KEYS.REFRESH_TOKEN);
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addMatcher(authApi.endpoints.login.matchFulfilled, (state, action) => {
        const { accessToken, refreshToken } = action.payload;
        state.token = accessToken;
        state.refreshToken = refreshToken;
        state.isAuthenticated = true;

        if (isClient) {
          localStorage.setItem(LOCAL_STORAGE_KEYS.ACCESS_TOKEN, accessToken);
          localStorage.setItem(LOCAL_STORAGE_KEYS.REFRESH_TOKEN, refreshToken);
        }
      })
      .addMatcher(authApi.endpoints.getUser.matchFulfilled, (state, action) => {
        console.log("payload getUser", action.payload);
        state.user = action.payload;
        state.isLoading = false;
      });
  },
});

export const { setCredentials, logout, setUser, setLoading, setInitialized } =
  authSlice.actions;
export default authSlice.reducer;
