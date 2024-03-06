import { Avatar, Textarea, Button } from "@material-tailwind/react";
import { useEffect, useState } from "react";
import { Post } from "../models/types/TwitterProps";
import { updatePostThunk } from "../redux/features/app-thunk";
import { useAppDispatch, useAppSelector } from "../redux/hook";
import { appActions } from "../redux/features/app-slice";

export const PostInputForm = ({ data }: { data: Post }) => {
  const dispatch = useAppDispatch();
  const appState = useAppSelector((state) => state.app);

  const [post, setPost] = useState("");

  const handleOpenDialog = () => {
    if (data.id === appState.editDialogState.id)
      dispatch(
        appActions.setOpenEditDialog({
          id: appState.editDialogState.id,
          isOpen: !appState.editDialogState.isOpen,
        })
      );
  };

  const onChangePost = ({ target }: { target: any }) => setPost(target.value);

  const onClickPosting = () => {
    const twittPost: Post = {
      id: data.id,
      name: data.name,
      twitt: post,
      twitted_by: data.twitted_by,
      likes: data.likes,
      comments: data.comments,
      created_at: data.created_at,
    };

    dispatch(updatePostThunk(twittPost));

    handleOpenDialog();
  };

  const onClickBatal = () => {
    handleOpenDialog();
  };

  useEffect(() => {
    setPost(data.twitt);
  }, []);

  return (
    <>
      <div className="flex flex-col w-full h-fit gap-2 px-4 py-">
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
            className="rounded-full text-base font-chirpRegular font-bold capitalize px-4 py-2 text-white border-[1px] border-gray-800"
            color="black"
            onClick={onClickBatal}
          >
            Batal
          </Button>
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
    </>
  );
};
