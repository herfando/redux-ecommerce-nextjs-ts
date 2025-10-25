'use client';

import { ReactNode } from 'react';
import { Provider } from 'react-redux';
import { store } from './store';
import Navbar from '../components/Navbar';
import '../styles/globals.css';

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <Provider store={store}>
      <html lang="en">
        <body>
          <Navbar />
          {children}
        </body>
      </html>
    </Provider>
  );
}
