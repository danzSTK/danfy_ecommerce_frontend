## Redux Toolkit com Next.js (App Router) — Resumo Rápido

### ✨ configureStore
```ts
import { configureStore } from "@reduxjs/toolkit";

export const store = configureStore({
  reducer: {
    // seus reducers aqui
  },
});
```
- Cria a store principal onde vive o estado global.
- Os reducers das suas features são registrados aqui.

---

### 🧱 createSlice
```ts
import { createSlice } from "@reduxjs/toolkit";

const exampleSlice = createSlice({
  name: "example",
  initialState: { count: 0 },
  reducers: {
    increment: (state) => {
      state.count += 1;
    },
  },
});

export const { increment } = exampleSlice.actions;
export default exampleSlice.reducer;
```
- Define um pedaço de estado + as actions para modificá-lo.
- Gera automaticamente as actions e o reducer.

---

### 🧠 initialState
```ts
const initialState = {
  count: 0,
};
```
- Define os valores iniciais do slice.

---

### 🏠 Provider
```tsx
import { Provider } from "react-redux";
import { store } from "@/lib/store";

export function Providers({ children }) {
  return <Provider store={store}>{children}</Provider>;
}
```
- Permite que a árvore React tenha acesso ao Redux.
- Usado geralmente em `layout.tsx`.

---

### 🧽 useDispatch e useSelector
```tsx
import { useDispatch, useSelector } from "react-redux";
import type { RootState, AppDispatch } from "@/lib/store";

const dispatch = useDispatch<AppDispatch>();
const count = useSelector((state: RootState) => state.example.count);
```
- `useDispatch` envia uma ação para atualizar o estado.
- `useSelector` lê dados da store.

---

### 🗂️ Tipagem com TypeScript
```ts
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
```
- Garante intellisense e checagem de tipos com `useDispatch` e `useSelector`.

---

### ✨ Exemplo completo no componente
```tsx
const dispatch = useDispatch<AppDispatch>();
const count = useSelector((state: RootState) => state.counter.count);

return (
  <>
    <button onClick={() => dispatch(increment())}>+</button>
    <p>{count}</p>
  </>
);
```

---

Quer adicionar exemplos com **RTK Query** também?
Ou gerar uma versão para imprimir / exportar como PDF depois?
