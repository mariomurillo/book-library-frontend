import { Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <div className="min-h-screen bg-background font-sans antialiased">
      <header className="bg-primary text-primary-foreground p-4">
        <h1 className="text-2xl font-bold">Book Library</h1>
      </header>
      <main className="container mx-auto p-4">
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;