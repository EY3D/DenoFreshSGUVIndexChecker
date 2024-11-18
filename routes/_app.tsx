import { type PageProps } from "$fresh/server.ts";
export default function App({ Component }: PageProps) {
  return (
    <html>
      <head>
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>SG UVINDEX CHECKER by EY3D</title>
        <link rel="stylesheet" href="/styles.css" />
      </head>
      <body>
        <div class="navbar bg-base-100">
          <div class="flex-1">
            <a class="btn btn-ghost text-xl" href="https://github.com/EY3D/">EY3D</a>
          </div>
          <div class="flex-none justify-start">
            <ul class="menu menu-horizontal px-1">
              <li><a href="/">Home</a></li>
              <li><a href="/about">About</a></li>
             </ul>
          </div>
        </div>
        <Component />
      </body>
      <footer class="footer footer-center bg-base-300 text-base-content p-4">
        <aside>
          <p>
            Copyright © {new Date().getFullYear()} - EY3D
          </p>
          <p>
            Powered by <a>https://data.gov.sg/</a> - Singapore's open data portal
          </p>
        </aside>
      </footer>
    </html>
  );
}
