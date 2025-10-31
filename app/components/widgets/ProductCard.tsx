import { Image } from '@shopify/hydrogen';
import { parse } from 'node-html-parser';
import { useMemo } from 'react';
import { RecommendedProductFragment } from 'storefrontapi.generated';
import { twJoin } from 'tailwind-merge';
import { Link } from '@remix-run/react';

interface ProductCardProps {
  product: RecommendedProductFragment;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const img = useMemo(() => product.images.nodes[0], [product]);

  const description = useMemo(() => {
    const html = parse(product.descriptionHtml);
    return html.querySelector('#desc')?.textContent?.trim();
  }, [product]);

  return (
    <Link to={`/products/${product.handle}`}
      className={twJoin(
        'group flex flex-col items-center justify-between p-6',
        'relative border-r-0 sm:border-r border-b border-black'
      )}
    >
      <div className="w-full text-[11.5px] font-inter-light truncate">
        <h1 className=" text-[14px] tracking-[0.3px] mb-2">
          {product.title}
        </h1>
        <p className="font-inter-bold">
          {description}
        </p>
        <p>
          {product.collections.nodes.map((collection) => collection.title).join(', ')}
        </p>
        <p>
          {product.tags.join(', ')}
        </p>
      </div>
      <div className="flex w-full flex-grow my-4">
        {img && (
          <div className="mx-auto">
            <Image
              data={img}
              alt={'image'}
              className={'w-full h-full'}
            />
          </div>
        )}
      </div>
    </Link>
  );
};

export default ProductCard;
