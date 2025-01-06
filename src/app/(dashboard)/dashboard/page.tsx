import TransactionsTable from "@/components/transfers/TransactionsTable";

export default function Page({
  searchParams,
}: {
  searchParams: { q?: string };
}) {
  return <TransactionsTable searchParams={searchParams} />;
}
