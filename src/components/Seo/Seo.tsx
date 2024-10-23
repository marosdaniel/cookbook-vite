import { Helmet } from 'react-helmet-async';
import { getBrowserLocale } from '../../utils/getBrowserLocale';
import { IProps } from './types';

const Seo = ({
  title,
  description,
  type,
  name,
  url,
  image,
  locale = getBrowserLocale(),
  keywords,
  canonicalUrl,
  publishedTime,
  modifiedTime,
  author,
}: IProps) => {
  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      {keywords && <meta name="keywords" content={keywords} />}
      <link rel="canonical" href={canonicalUrl} />

      {/* Open Graph tags */}
      <meta property="og:type" content={type} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={url} />
      {image && <meta property="og:image" content={image} />}
      <meta property="og:locale" content={locale} />
      <meta property="og:site_name" content={name} />

      {/* Twitter tags */}
      <meta name="twitter:creator" content={name} />
      <meta name="twitter:card" content={image ? 'summary_large_image' : 'summary'} />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      {image && <meta name="twitter:image" content={image} />}

      {type === 'article' && (
        <>
          {publishedTime && <meta property="article:published_time" content={publishedTime} />}
          {modifiedTime && <meta property="article:modified_time" content={modifiedTime} />}
          {author && <meta property="article:author" content={author} />}
        </>
      )}

      <script type="application/ld+json">
        {JSON.stringify({
          '@context': 'http://schema.org',
          '@type': type === 'article' ? 'Article' : 'WebPage',
          name: title,
          description: description,
          url: url,
          ...(image && { image: image }),
          ...(author && {
            author: {
              '@type': 'Person',
              name: author,
            },
          }),
          ...(publishedTime && { datePublished: publishedTime }),
          ...(modifiedTime && { dateModified: modifiedTime }),
        })}
      </script>
    </Helmet>
  );
};

export default Seo;
