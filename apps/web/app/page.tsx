'use client';

import type { Link } from '@repo/api';
import { Button } from '@repo/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@repo/ui/card';
import Image, { type ImageProps } from 'next/image';
import { useState, useEffect } from 'react';

type Props = Omit<ImageProps, 'src'> & {
  srcLight: string;
  srcDark: string;
};

const ThemeImage = (props: Props) => {
  const { srcLight, srcDark, ...rest } = props;

  return (
    <>
      <Image {...rest} src={srcLight} className="imgLight" />
      <Image {...rest} src={srcDark} className="imgDark" />
    </>
  );
};

function useLinks() {
  const [links, setLinks] = useState<Link[]>([]);
  const [loading, setLoading] = useState(true);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    async function fetchLinks() {
      try {
        const apiUrl =
          process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000';
        const res = await fetch(`${apiUrl}/links`, {
          cache: 'no-store',
        });

        if (!res.ok) {
          throw new Error('Failed to fetch links');
        }

        const data = await res.json();
        setLinks(data);
      } catch (error) {
        console.error('Error fetching links:', error);
        setLinks([]);
      } finally {
        setLoading(false);
      }
    }

    if (mounted) {
      fetchLinks();
    }
  }, [mounted]);

  return { links, loading, mounted };
}

export default function Home() {
  const { links, loading, mounted } = useLinks();

  // Show loading state during initial mount
  if (!mounted) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading application...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <main className="container mx-auto px-4 py-8">
        <div className="flex flex-col items-center text-center space-y-8">
          <ThemeImage
            className="w-48 h-12"
            srcLight="turborepo-dark.svg"
            srcDark="turborepo-light.svg"
            alt="Turborepo logo"
            width={180}
            height={38}
            priority
          />

          <Card className="max-w-2xl w-full">
            <CardHeader>
              <CardTitle className="text-3xl font-bold">
                Bond Yield Calculator
              </CardTitle>
              <CardDescription>
                Calculate bond yields with precision using our advanced
                financial calculator
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <h3 className="text-lg font-semibold">Get Started</h3>
                  <p className="text-gray-600">
                    Edit{' '}
                    <code className="bg-gray-100 px-2 py-1 rounded text-sm">
                      apps/web/app/page.tsx
                    </code>{' '}
                    to customize your bond yield calculator
                  </p>
                </div>
                <div className="space-y-2">
                  <h3 className="text-lg font-semibold">Real-time Updates</h3>
                  <p className="text-gray-600">
                    Save and see your changes instantly with hot reload
                  </p>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button asChild>
                  <a
                    href="https://vercel.com/new/clone?demo-description=Learn+to+implement+a+monorepo+with+a+two+Next.js+sites+that+has+installed+three+local+packages.&demo-image=%2F%2Fimages.ctfassets.net%2Fe5382hct74si%2F4K8ZISWAzJ8X1504ca0zmC%2F0b21a1c6246add355e55816278ef54bc%2FBasic.png&demo-title=Monorepo+with+Turborepo&demo-url=https%3A%2F%2Fexamples-basic-web.vercel.sh%2F&from=templates&project-name=Monorepo+with+Turborepo&repository-name=monorepo-turborepo&repository-url=https%3A%2F%2Fgithub.com%2Fvercel%2Fturborepo%2Ftree%2Fmain%2Fexamples%2Fbasic&root-directory=apps%2Fdocs&skippable-integrations=1&teamSlug=vercel&utm_source=create-turbo"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2"
                  >
                    <Image
                      src="/vercel.svg"
                      alt="Vercel logomark"
                      width={20}
                      height={20}
                    />
                    Deploy now
                  </a>
                </Button>
                <Button variant="outline" asChild>
                  <a
                    href="https://turborepo.dev/docs?utm_source"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Read our docs
                  </a>
                </Button>
              </div>

              <Button
                onClick={() => alert('Hello from your web app!')}
                className="w-full sm:w-auto"
              >
                Test Alert
              </Button>

              {!loading && links.length > 0 ? (
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">Available Links</h3>
                  <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
                    {links.map((link: Link) => (
                      <Button
                        key={link.id}
                        variant="outline"
                        asChild
                        className="justify-start"
                      >
                        <a
                          href={link.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          title={link.description}
                        >
                          {link.title}
                        </a>
                      </Button>
                    ))}
                  </div>
                </div>
              ) : loading ? (
                <div className="bg-gray-50 p-6 rounded-lg mt-8">
                  <p className="text-gray-600 text-center">Loading links...</p>
                </div>
              ) : (
                <div className="bg-gray-50 p-6 rounded-lg mt-8">
                  <p className="text-gray-600 text-center">
                    No links available. Make sure NestJS API is running on{' '}
                    {process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000'}
                    .
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </main>

      <footer className="border-t bg-gray-100 mt-16">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <a
              href="https://vercel.com/templates?search=turborepo&utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors"
            >
              <Image
                aria-hidden
                src="/window.svg"
                alt="Window icon"
                width={16}
                height={16}
              />
              Examples
            </a>
            <a
              href="https://turborepo.dev?utm_source=create-turbo"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors"
            >
              <Image
                aria-hidden
                src="/globe.svg"
                alt="Globe icon"
                width={16}
                height={16}
              />
              Go to turborepo.dev →
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
