import { json, LinksFunction, MetaFunction } from "@remix-run/node";
import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useLoaderData,
} from "@remix-run/react";
import NavBar from "./components/NavBar";

export const meta: MetaFunction = () => ({
  charset: "utf-8",
  title: "New Remix App",
  viewport: "width=device-width,initial-scale=1",
});


import styles from "./styles/tailwind.css";

export const links: LinksFunction = () => {
  return [
    { rel: "stylesheet", href: styles },
    {rel: "preconnect", href:"https://fonts.googleapis.com"},
    {rel: "preconnect", href:"https://fonts.gstatic.com"},
    {href: "https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700;900&family=Work+Sans:ital,wght@0,300;0,400;0,500;0,700;1,400;1,500&display=swap", rel: "stylesheet"},
  ];
};

export async function loader() {
  return json({
    ENV: {
      SANITY_PROJECT_ID: process.env.SANITY_PROJECT_ID || "p6sl7ohb",
      SANITY_DATA_SET: process.env.SANITY_DATASET || "production",
    },
  });
}

export default function App() {
  const data = useLoaderData();

  return (
    <html lang="en">
      <head>
        <Meta />
        <Links />
      </head>
      <body className="main-bg">
        <NavBar />
        <Outlet />
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  );
}
