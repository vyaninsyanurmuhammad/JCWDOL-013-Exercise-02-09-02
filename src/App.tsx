import { Avatar, Button, Textarea } from "@material-tailwind/react";
import Layout from "./components/Layout";
import PostCard from "./components/PostCard";
import { StandarLayout } from "./components/StandarLayout";
import { AuthProvider } from "./auth/Provider";
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "./redux/hook";
import { addPostThunk, getPostsThunk } from "./redux/features/app-thunk";
import { Post } from "./models/types/TwitterProps";
import { v4 as uuidv4 } from "uuid";

function App() {
  const authState = useAppSelector((state) => state.auth);
  const appState = useAppSelector((state) => state.app);

  const dispatch = useAppDispatch();

  const [post, setPost] = useState("");

  const onChangePost = ({ target }: { target: any }) => setPost(target.value);

  const onClickPosting = () => {
    const twittPost: Post = {
      id: uuidv4(),
      name: authState.user?.name ?? "",
      twitt: post,
      twitted_by: authState.user?.id ?? "",
      likes: [],
      comments: [],
      created_at: new Date().toLocaleString(),
    };

    dispatch(addPostThunk(twittPost));
  };

  const onClickGetLatestPost = () => {
    dispatch(getPostsThunk());
  };

  useEffect(() => {
    dispatch(getPostsThunk());
  }, []);

  return (
    <>
      <AuthProvider>
        <Layout>
          <StandarLayout>
            <div className="flex flex-col w-full h-fit gap-2 px-4 py-3 border-y-[1px] border-y-gray-800">
              <div className="flex w-full h-fit gap-2 ">
                <div className="shrink-0 h-fit w-fit pt-4">
                  <Avatar
                    src="https://docs.material-tailwind.com/img/face-2.jpg"
                    alt="avatar"
                    size="sm"
                  />
                </div>

                <div className="h-full w-full">
                  <Textarea
                    className="h-fit min-h-fit font-chirpRegular text-xl text-white placeholder:font-chirpRegular placeholder:text-xl placeholder-shown:border-b-gray-800"
                    variant="static"
                    placeholder="Apa yang sedang hangat dibicarakan?!"
                    color="blue"
                    value={post}
                    onChange={onChangePost}
                  ></Textarea>
                </div>
              </div>

              <div className="flex w-full h-fit justify-end items-center gap-3">
                <span className="font-chirpRegular">
                  <span className={`${post.length > 50 ? "text-red-600" : ""}`}>
                    {post.length}
                  </span>
                  /50
                </span>
                <Button
                  className="rounded-full text-base font-chirpRegular font-bold capitalize px-4 py-2"
                  color="blue"
                  disabled={!(post.length > 0) || !(post.length <= 50)}
                  onClick={() => onClickPosting()}
                >
                  Posting
                </Button>
              </div>
            </div>
            <Button
              className="text-base font-chirpRegular capitalize font-normal text-blue-600 w-full bg-black rounded-none border-b-[1px] border-b-gray-800"
              onClick={() => onClickGetLatestPost()}
            >
              Tampilkan Postingan Terbaru
            </Button>
            {appState.posts.map((data) => (
              <PostCard
                key={data.id}
                // twitt={data.twitt}
                // username={data.twitted_by}
                // name={data.twitted_by}
                // time={data.created_at}
                data={data}
                isEditable={data.twitted_by === authState.user?.id}

              />
            ))}
          </StandarLayout>
        </Layout>
      </AuthProvider>
    </>
  );
}

export default App;
