import {
  Avatar,
  IconButton,
  Menu,
  MenuHandler,
  MenuItem,
  MenuList,
} from "@material-tailwind/react";
import {
  BookmarkSimple,
  ChartBar,
  ChatCircle,
  DotsThree,
  Heart,
  PencilSimple,
  Repeat,
  Trash,
  UploadSimple,
} from "@phosphor-icons/react";
import { Post } from "../models/types/TwitterProps";
import { useAppDispatch, useAppSelector } from "../redux/hook";
import { deletePostThunk } from "../redux/features/app-thunk";
import { PostDialog } from "./PostDialog";
import { appActions } from "../redux/features/app-slice";
import { Link } from "react-router-dom";

const PostCard = ({
  data,
  isEditable,
}: {
  data: Post;
  isEditable: boolean;
}) => {
  const dispatch = useAppDispatch();
  const appState = useAppSelector((state) => state.app);

  const onClickDelete = (id: string) => dispatch(deletePostThunk(id));

  const handleOpenDialog = () =>
    dispatch(
      appActions.setOpenEditDialog({
        id: data.id,
        isOpen: !appState.editDialogState.isOpen,
      })
    );

  return (
    <>
      <PostDialog data={data} />

      <div className="flex flex-row gap-2 border-b-[1px] border-gray-800 px-4 py-3">
        <div className="shrink-0 h-fit w-fit">
          <Avatar
            src="https://docs.material-tailwind.com/img/face-2.jpg"
            alt="avatar"
            size="sm"
          />
        </div>
        <div className="flex flex-col w-full h-fit">
          <div className="flex flex-row w-full h-fit justify-between">
            <div className="flex flex-row gap-[6px] items-center">
              <Link to={`/${data.twitted_by}`}>
                <span className="text-base font-chirpRegular">{data.name}</span>
              </Link>
              <span className="text-sm font-chirpRegular text-gray-700">
                @{data.twitted_by}
              </span>
              <span className="text-sm font-chirpRegular text-gray-700">·</span>
              <span className="text-sm font-chirpRegular text-gray-700">
                {data.created_at}
              </span>
            </div>

            <Menu placement="bottom-end">
              <MenuHandler>
                <IconButton
                  size="sm"
                  className="bg-black"
                  disabled={!isEditable}
                >
                  <DotsThree size={19} className="text-gray-600" />
                </IconButton>
              </MenuHandler>

              <MenuList className="bg-black border-[1px] border-gray-800 w-72">
                <MenuItem
                  className="flex flex-row gap-3 items-center !bg-black hover:!bg-gray-900 text-red-500 font-chirpRegular font-semibold hover:!text-red-500"
                  onMouseDown={() => onClickDelete(data.id)}
                >
                  <Trash size={19} /> Delete
                </MenuItem>
                <MenuItem
                  className="flex flex-row gap-3 items-center !bg-black hover:!bg-gray-900 text-white font-chirpRegular font-semibold hover:!text-white"
                  onMouseDown={handleOpenDialog}
                >
                  <PencilSimple size={19} /> <span>Edit</span>
                </MenuItem>
              </MenuList>
            </Menu>
          </div>

          <p className="font-chirpRegular">{data.twitt}</p>

          <div className="flex w-full justify-between items-center">
            <div className="flex gap-1 text-gray-700">
              <ChatCircle size={19} weight="bold" />
              <span className="text-sm font-chirpRegular">
                {data.comments.length}
              </span>
            </div>
            <div className="flex gap-1 text-gray-700">
              <Repeat size={19} weight="bold" />
              <span className="text-sm font-chirpRegular">0</span>
            </div>
            <div className="flex gap-1 text-gray-700">
              <Heart size={19} weight="bold" />
              <span className="text-sm font-chirpRegular">
                {data.likes.length}
              </span>
            </div>
            <div className="flex gap-1 text-gray-700">
              <ChartBar size={19} weight="bold" />
              <span className="text-sm font-chirpRegular">0</span>
            </div>

            <div className="flex text-gray-700">
              <div className="p-2">
                <BookmarkSimple size={19} weight="bold" />
              </div>
              <div className="p-2">
                <UploadSimple size={19} weight="bold" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PostCard;
