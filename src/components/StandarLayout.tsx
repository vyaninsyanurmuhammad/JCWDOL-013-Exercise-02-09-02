import { Input } from "@material-tailwind/react";
import { MagnifyingGlass } from "@phosphor-icons/react";
import { ReactNode } from "react";

export const StandarLayout = ({ children }: { children: ReactNode }) => {
  return (
    <>
      <div className="w-full h-full flex flex-row">
        <div className="flex flex-col shrink-0 h-full w-[598px] overflow-y-auto scroll-smooth no-scrollbar border-x-[1px] border-x-gray-800">
          {children}
        </div>
        <div className="w-full h-full px-8">
          <div className="relative flex w-[350px] p-1">
            <Input
              className="font-chirpRegular text-white !border-0 focus:!border-2 !bg-gray-900 focus:!border-t-blue-500 rounded-full pl-14 placeholder:opacity-100 placeholder:font-chirpRegular"
              labelProps={{
                className: "hidden",
              }}
              containerProps={{
                className: "h-11",
              }}
              color="blue"
              placeholder="Cari"
              crossOrigin={undefined}
            />
            <div className="flex shrink-0 !absolute top-2/4 left-6 -translate-y-2/4">
              <MagnifyingGlass size={16} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
