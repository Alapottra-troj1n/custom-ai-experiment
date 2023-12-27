"use client";
import { cn } from "@/lib/utils";
import { Category } from "@prisma/client";
import qs from "query-string";
import { useRouter, useSearchParams } from "next/navigation";

interface CategoryProps {
  data: Category[];
}
const Categories = ({ data }: CategoryProps) => {
  
  const router = useRouter();
  const searchParams = useSearchParams();

  const categoryId = searchParams.get("categoryId");
 

  const onClick = (id: string | null) => {
    const query = { categoryId: id };
    const url = qs.stringifyUrl(
      {
        url: window.location.href,
        query,
      },
      { skipNull: true }
    );
    router.push(url);
   
  };

  return (
    <div className="overflow-x-auto w-full space-x-2 flex p-1">
      <button
        onClick={() => onClick(null)}
        className={cn(`
            flex items-center text-center text-xs md:text-sm px-2 
            md:px-4 py-2 md:py-3 rounded-md bg-primary/10 hover:opacity-75 transition

    `,!categoryId && 'bg-primary/30')}
      >
        Newest
      </button>
      {data.map((category) => (
        <button
          key={category.id}
          onClick={() => onClick(category.id)}
          className={cn(`
            flex items-center text-center text-xs md:text-sm 
            px-2 md:px-4 py-2 md:py-3 rounded-md bg-primary/10 hover:opacity-75 transition

    `,categoryId===category.id && 'bg-primary/30')}
        >
          {category.name}
        </button>
      ))}
    </div>
  );
};

export default Categories;
