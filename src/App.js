import { RouterProvider } from "react-router-dom";
import "./App.css";
import router from "./Router/Routes/Routes";
import AuthProvider from "./contexts/AuthProvider/AuthProvider";
import { Toaster } from "react-hot-toast";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

function App() {
  const queryClient = new QueryClient();
  return (
    <div className="max-w-screen-xl mx-auto ">
      <Toaster />
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <RouterProvider router={router}></RouterProvider>
        </AuthProvider>
      </QueryClientProvider>
    </div>
  );
}

export default App;
