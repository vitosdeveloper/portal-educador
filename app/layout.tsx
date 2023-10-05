import './globals.css';
import type { Metadata } from 'next';
import { Roboto } from 'next/font/google';
import { isJwtValid } from './utils/isJwtValid';
import { redirect } from 'next/navigation';

const roboto = Roboto({
  weight: ['100', '300', '400', '500', '700', '900'],
  style: ['normal', 'italic'],
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'Portal Educador',
  description: 'Gerenciador de notas para colégioss',
  viewport: 'initial-scale=1, width=device-width',
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const route = (children as { props: { childProp: { segment: string } } })
    .props.childProp.segment;
  const isLoggedIn = isJwtValid();
  const isMainPage = route === '__PAGE__';
  if (!isLoggedIn && !isMainPage) redirect('/');
  if (isLoggedIn && isMainPage) redirect('/turmas');

  return (
    <html lang='en'>
      <body className={roboto.className}>{children}</body>
    </html>
  );
}
