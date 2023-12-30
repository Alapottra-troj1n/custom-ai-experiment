import prismadb from "@/lib/prismadb";
import CompanionForm from "./_components/CompanionForm";

interface CompanionIdPageProps {
  params: {
    companionId: string;
  };
}

const CompanionIdPage = async ({ params }: CompanionIdPageProps) => {
  //TODO check subscription

  const companion = prismadb.companion.findUnique({
    where: {
      id: params.companionId,
    },
  });

  const categories = prismadb.category.findMany();

  return (
    <div>
      <CompanionForm initialData={companion} categories={categories} />
    </div>
  );
};

export default CompanionIdPage;
