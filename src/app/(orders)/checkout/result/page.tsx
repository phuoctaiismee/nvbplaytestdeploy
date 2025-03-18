import dynamic from "next/dynamic";

const ResultCheckoutFeature = dynamic(
  () => import("@/features/result-checkout")
);
const CheckoutResultPage = async ({
  searchParams,
}: {

  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) => {
  const orderId = (await searchParams).orderId;
  const status = (await searchParams).status;
  return <ResultCheckoutFeature orderId={orderId + ""} status={status + ""} />;
};

export default CheckoutResultPage;
