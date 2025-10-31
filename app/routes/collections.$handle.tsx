import { useLoaderData, type MetaFunction } from '@remix-run/react';
import { Pagination, getPaginationVariables } from '@shopify/hydrogen';
import { json, redirect, type LoaderFunctionArgs } from '@shopify/remix-oxygen';
import type { RecommendedProductFragment } from 'storefrontapi.generated';
import ProductCard from '~/components/widgets/ProductCard';
import { RECOMMENDED_PRODUCT_FRAGMENT } from './_index';

export const meta: MetaFunction<typeof loader> = ({ data }) => {
  return [{ title: `Workoutfoods | ${data?.collection.title ?? ''} Collection` }];
};

export async function loader({ request, params, context }: LoaderFunctionArgs) {
  const { handle } = params;
  const { storefront } = context;
  const paginationVariables = getPaginationVariables(request, {
    pageBy: 100,
  });

  if (!handle) {
    return redirect('/collections');
  }

  const { collection } = await storefront.query(COLLECTION_QUERY, {
    variables: { handle, ...paginationVariables },
  });

  if (!collection) {
    throw new Response(`Collection ${handle} not found`, {
      status: 404,
    });
  }
  return json({ collection });
}

export default function Collection() {
  const { collection } = useLoaderData<typeof loader>();

  return (
    <Pagination connection={collection.products}>
      {({ nodes, isLoading, PreviousLink, NextLink }) => (
        <>
          <PreviousLink>
            {isLoading ? 'Loading...' : <span>↑ Load previous</span>}
          </PreviousLink>
          <ProductsGrid products={nodes} collection={collection} />
          <br />
          <NextLink>
            {isLoading ? 'Loading...' : <span>Load more ↓</span>}
          </NextLink>
        </>
      )}
    </Pagination>
  );
}

function ProductsGrid({ products, collection }: { products: RecommendedProductFragment[], collection: any }) {  return (
    <div className="h-full overflow-auto">
      <div className='lg:max-w-[90%] mx-auto px-0 sm:px-8 lg:px-[100px] mb-8'>
        <div className="flex justify-between items-center my-4 md:my-8 px-6 sm:px-0 text-[11.5px]">
          <span className="block">
            <span className='font-inter-bold'>{collection.title}</span><br />
            {collection.description}
          </span>
        </div>
        <div className="border-b">
          <div className="xl:container mx-auto flex flex-col">
            {products
              .filter((p) =>
                p.images.nodes.find((img) => img.altText?.includes('featured')),
              )
              .map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-3 3xl:grid-cols-4 4xl:grid-cols-5 border-t border-l-0	sm:border-l border-black">
          {products
            .filter((p) =>
              p.images.nodes.find((img) => !img.altText?.includes('featured')),
            )
            .map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
        </div>
      </div>
    </div>
  );
}

const COLLECTION_QUERY = `#graphql
  ${RECOMMENDED_PRODUCT_FRAGMENT}
  query Collection(
    $handle: String!
    $country: CountryCode
    $language: LanguageCode
    $first: Int
    $last: Int
    $startCursor: String
    $endCursor: String
  ) @inContext(country: $country, language: $language) {
    collection(handle: $handle) {
      id
      handle
      title
      description
      products(
        first: $first,
        last: $last,
        before: $startCursor,
        after: $endCursor
      ) {
        nodes {
          ...RecommendedProduct
        }
        pageInfo {
          hasPreviousPage
          hasNextPage
          endCursor
          startCursor
        }
      }
    }
  }
` as const;
