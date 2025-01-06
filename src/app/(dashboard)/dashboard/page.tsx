import TransactionsTable from "@/components/transfers/TransactionsTable";

export default async function Page(
  props: {
    searchParams: Promise<{ q?: string }>;
  }
) {
  const searchParams = await props.searchParams;
  return <TransactionsTable searchParams={searchParams} />;
}
