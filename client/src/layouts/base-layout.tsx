import Head from "next/head";

interface BaseLayoutProps {
  title: string;
  description?: string;
  imageURL?: string;
  children: React.ReactNode;
}
export const BaseLayout: React.FC<BaseLayoutProps> = ({
  title,
  description = "A community/discussion-first approach to discussing books that allows connects readers ",
  imageURL = "/book.png",
  children,
}) => {
  return (
    <>
      <Head>
        <meta charSet="utf-8" />
        <meta httpEquiv="Content-Type" content="text/html; charset=utf-8" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, shrink-to-fit=no"
        />
        <link rel="icon" href="/favicon.ico" />
        <meta name="robots" content="index,follow" />
        <meta property="og:type" content="website" />

        {description && (
          <>
            <meta name="description" content={description} />
            <meta property="og:description" content={description} />
            <meta name="twitter:description" content={description} />
          </>
        )}

        {imageURL ? (
          <>
            <meta name="twitter:card" content="summary_large_image" />
            <meta name="twitter:image" content={imageURL} />
            <meta property="og:image" content={imageURL} />
          </>
        ) : (
          <meta name="twitter:card" content="summary" />
        )}
        <meta property="og:title" content={title} />
        <meta name="twitter:title" content={title} />
        <title>{title}</title>
      </Head>
      {children}
    </>
  );
};
