import { BrowserRouter, Routes, Route } from "react-router-dom";

import {
  MainLayout,
  RegisterClient,
  ClientList,
} from "src/components/containers";

export const MainRoutes = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<MainLayout />}>
            <Route index element={<ClientList />} />
            <Route path="register" element={<RegisterClient edit={false} />} />
            <Route path="client/:id" element={<RegisterClient edit={true} />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
};
