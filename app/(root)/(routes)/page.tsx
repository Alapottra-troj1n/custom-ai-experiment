import Categories from "@/components/Categories";
import SearchInput from "@/components/SearchInput";
import prismadb from "@/lib/prismadb";

const RootPage = async() => {

  const categories = await prismadb.category.findMany();

  
  return (
    <div className="p-3 space-y-2 h-full">
      <SearchInput />
      <Categories data={categories} />
    </div>
  );
};

export default RootPage;
