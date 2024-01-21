import Categories from "@/components/Categories";
import Companions from "@/components/Companions";
import SearchInput from "@/components/SearchInput";
import prismadb from "@/lib/prismadb";

interface PageProps {
  searchParams : {
    categoryId: string
    name: string
   
  }
}
const RootPage = async({searchParams}: PageProps) => {

 
  const data = await prismadb.companion.findMany({
    where: {
      categoryId: searchParams.categoryId,
     
    },
    orderBy: {
      createdAt: 'desc'
    },
    include: {
      _count: {
        select: {
           Message: true
        }
      }
    }
  })
  const categories = await prismadb.category.findMany();

  
  return (
    <div className="p-3 space-y-2 h-full">
      <SearchInput />
      <Categories data={categories} />
      <Companions data={data} />
    </div>
  );
};

export default RootPage;
