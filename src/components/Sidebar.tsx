import { Avatar, Button } from "@material-tailwind/react";
import {
  // Article,
  // Bell,
  // BookmarkSimple,
  DotsThree,
  // DotsThreeCircle,
  // EnvelopeSimple,
  House,
  // MagnifyingGlass,
  TwitterLogo,
  User,
  // Users,
  // X,
} from "@phosphor-icons/react";
import { NavLink } from "react-router-dom";
import { useAppSelector } from "../redux/hook";

export default function SideBar() {
  const authState = useAppSelector((state) => state.auth);

  const sidebarList = [
    { icon: House, text: "Beranda", url: "/" },
    // { icon: MagnifyingGlass, text: "Jelajah", url: "/explore" },
    // { icon: Bell, text: "Notifikasi", url: "/notifications" },
    // { icon: EnvelopeSimple, text: "Pesan", url: "/messages" },
    // { icon: Article, text: "Daftar", url: "/list" },
    // { icon: BookmarkSimple, text: "Markah", url: "/bookmarks" },
    // { icon: Users, text: "Komunitas", url: "/communities" },
    // { icon: X, text: "Premium", url: "/premium" },
    { icon: User, text: "Profil", url: `/${authState.user?.id}` },
    // { icon: DotsThreeCircle, text: "Lainnya", url: "/others" },
  ];

  return (
    <>
      <div className="flex flex-col w-full min-w-fit max-w-[594px] h-full justify-between items-end px-2 overflow-y-auto">
        <div className="flex flex-col w-[259px] h-full justify-between">
          <div className="flex flex-col w-[259px] gap-5">
            <div className="flex flex-col w-full">
              <div className="w-full p-4">
                <TwitterLogo size={26} weight="fill" />
              </div>
              <div className="flex flex-col">
                {sidebarList.map((data) => {
                  const Icon = data.icon;

                  return (
                    <NavLink
                      key={data.text}
                      className="flex flex-row gap-5 p-4 w-full"
                      to={data.url}
                    >
                      {({ isActive }) => (
                        <>
                          <Icon
                            size={26}
                            weight={isActive ? "fill" : "regular"}
                          />
                          <span
                            className={`font-chirpRegular text-xl ${
                              isActive ? "font-bold" : "font-normal"
                            }`}
                          >
                            {data.text}
                          </span>
                        </>
                      )}
                    </NavLink>
                  );
                })}
              </div>
            </div>

            <div>
              <Button
                className="w-[233px] py-3 rounded-full capitalize font-chirpRegular text-base"
                color="blue"
              >
                Posting
              </Button>
            </div>
          </div>
          <div className="w-full h-fit flex items-center justify-between p-3 my-3">
            <div className="flex w-full items-center gap-3">
              <div className="shrink-0 h-fit w-fit">
                <Avatar
                  src="https://docs.material-tailwind.com/img/face-2.jpg"
                  alt="avatar"
                  size="sm"
                />
              </div>

              <div className="flex flex-col">
                <span className="text-base font-chirpRegular">
                  {authState.user?.name}
                </span>
                <span className="text-sm font-chirpRegular text-gray-700">
                  @{authState.user?.id}
                </span>
              </div>
            </div>

            <DotsThree size={20} />
          </div>
        </div>
      </div>
    </>
  );
}
