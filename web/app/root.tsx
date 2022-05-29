import { json, LinksFunction, MetaFunction } from "@remix-run/node";
import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useLoaderData,
  useLocation,
  useMatches,
} from "@remix-run/react";
import { useEffect } from "react";
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
    { rel: "preconnect", href: "https://fonts.googleapis.com" },
    { rel: "preconnect", href: "https://fonts.gstatic.com" },
    {
      href: "https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700;900&family=Work+Sans:ital,wght@0,300;0,400;0,500;0,700;1,400;1,500&display=swap",
      rel: "stylesheet",
    },
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
  let location = useLocation();
  let matches = useMatches();

  let isMount = true;
  useEffect(() => {
    let mounted = isMount;
    isMount = false;
    if ("serviceWorker" in navigator) {
      if (navigator.serviceWorker.controller) {
        navigator.serviceWorker.controller?.postMessage({
          type: "REMIX_NAVIGATION",
          isMount: mounted,
          location,
          matches,
          manifest: window.__remixManifest,
        });
      } else {
        let listener = async () => {
          await navigator.serviceWorker.ready;
          navigator.serviceWorker.controller?.postMessage({
            type: "REMIX_NAVIGATION",
            isMount: mounted,
            location,
            matches,
            manifest: window.__remixManifest,
          });
        };
        navigator.serviceWorker.addEventListener("controllerchange", listener);
        return () => {
          navigator.serviceWorker.removeEventListener(
            "controllerchange",
            listener
          );
        };
      }
    }
  }, [location]);

  return (
    <html lang="en">
      <head>
        <Meta /> 
        <link rel="manifest" href="/resources/manifest.json" />
        <Links />
      </head>
      <body className="main-bg">
        <NavBar /> <Outlet /> <ScrollRestoration /> <Scripts /> <LiveReload />
      </body>
    </html>
  );
}
