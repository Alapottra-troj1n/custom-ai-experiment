"use client";
import qs from "query-string";
import { Search } from "lucide-react";
import { Input } from "./ui/input";
import { useRouter, useSearchParams } from "next/navigation";
import { ChangeEventHandler, useEffect, useState } from "react";
import { useDebounce } from "@/hooks/useDebounce";

const SearchInput = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const categoryId = searchParams.get("categoryId");
  const name = searchParams.get("name");

  const [value, setValue] = useState(name || "");

  const debounceValue = useDebounce<string>(value, 500);

  const onChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    console.log(e.target.value)
    setValue(e.target.value);
  };

  useEffect(() => {
    const query = {
      name: debounceValue,
      categoryId,
    };

   const url = qs.stringifyUrl(
      {
        url: window.location.href,
        query,
      },
      { skipEmptyString: true, skipNull: true }
    );

    router.push(url);
    
  }, [debounceValue, categoryId, router]);

  return (
    <div className="relative">
      <Search className="absolute h-4 w-4 text-muted-foreground top-3 left-4" />
      <Input onChange={onChange} value={value} className="pl-10 bg-primary/10" placeholder="Search..." />
    </div>
  );
};

export default SearchInput;
