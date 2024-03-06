import { ArrowLeft } from "@phosphor-icons/react";
import Layout from "../components/Layout";
import { StandarLayout } from "../components/StandarLayout";
import { Avatar, Button } from "@material-tailwind/react";
import PostCard from "../components/PostCard";
import { AuthProvider } from "../auth/Provider";
import { useAppDispatch, useAppSelector } from "../redux/hook";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { getProfileThunk } from "../redux/features/app-thunk";

export const Profile = () => {
  const authState = useAppSelector((state) => state.auth);
  const appState = useAppSelector((state) => state.app);

  const dispatch = useAppDispatch();

  const { id } = useParams();

  useEffect(() => {
    dispatch(getProfileThunk(id ?? appState.profileState.user!.id));
  }, []);

  if (appState.profileState.user === undefined) {
    return (
      <>
        <div>Not Found</div>
      </>
    );
  }

  return (
    <>
      <AuthProvider>
        <Layout>
          <StandarLayout>
            <div className="relative flex flex-col w-full h-fit">
              <div className="sticky z-20 top-0 w-full h-fit flex gap-9 px-4 items-center bg-black">
                <ArrowLeft size={20} weight="regular" />
                <div className="flex flex-col py-1">
                  <span className="text-xl font-chirpMedium font-medium">
                    {appState.profileState.user?.name}
                  </span>
                  <span className="text-xs font-chirpRegular text-gray-700">
                    1 Postingan
                  </span>
                </div>
              </div>
              <div className="flex flex-col w-full h-fit border-b-[1px] border-b-gray-800">
                <div className="h-64 w-full bg-blue-500"></div>
                <div className="flex flex-col py-3 px-4 gap-4">
                  <div className="h-[70px] w-full flex justify-end">
                    {appState.profileState.user?.id === authState.user?.id ? (
                      <Button
                        className="h-fit rounded-full text-white capitalize font-chirpRegular text-sm py-2 px-4 border-white"
                        variant="outlined"
                      >
                        Edit Profil
                      </Button>
                    ) : (
                      <Button
                        className="h-fit rounded-full text-white capitalize font-chirpRegular text-sm py-2 px-4 border-white"
                        color="blue"
                      >
                        Ikuti
                      </Button>
                    )}
                  </div>
                  <div className="flex flex-col">
                    <span className="text-xl font-chirpMedium font-medium">
                      {appState.profileState.user?.name}
                    </span>
                    <span className="text-sm font-chirpRegular text-gray-700">
                      @{appState.profileState.user?.id}
                    </span>
                  </div>
                  <div className="flex gap-5">
                    <div className="flex items-center gap-1">
                      <span className="text-sm font-chirpMedium">
                        {appState.profileState.user?.following.length}
                      </span>
                      <span className="text-sm font-chirpRegular text-gray-700">
                        Mengikuti
                      </span>
                    </div>
                    <div className="flex items-center gap-1">
                      <span className="text-sm font-chirpMedium">
                        {appState.profileState.user?.followed.length}
                      </span>
                      <span className="text-sm font-chirpRegular text-gray-700">
                        Pengikut
                      </span>
                    </div>
                  </div>
                </div>
                <div className="absolute shrink-0 h-fit w-fit top-44 left-5">
                  <Avatar
                    src="https://docs.material-tailwind.com/img/face-2.jpg"
                    alt="avatar"
                    className="w-36 h-36"
                  />
                </div>
              </div>
              {appState.profileState.posts?.map((data) => (
                <PostCard
                  key={data.id}
                  data={data}
                  isEditable={data.twitted_by === authState.user?.id}
                />
              ))}
            </div>
          </StandarLayout>
        </Layout>
      </AuthProvider>
    </>
  );
};
