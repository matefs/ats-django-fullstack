// src/app/layout.jsx
import { LocalStorageProvider } from './context/LocalStorageContext';

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <LocalStorageProvider>{children}</LocalStorageProvider>
      </body>
    </html>
  );
}
