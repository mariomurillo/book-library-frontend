import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Layout from './components/Layout';
import BookDetails from './pages/BookDetails';
import BookForm from './pages/BookForm';
import BookList from './pages/BookList';

const queryClient = new QueryClient();

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        index: true,
        element: <BookList />,
      },
      {
        path: "book/:isbn",
        element: <BookDetails />,
      },
      {
        path: "add-book",
        element: <BookForm />,
      },
      {
        path: "edit-book/:isbn",
        element: <BookForm />,
      },
    ],
  },
]);

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  )
}

export default App
