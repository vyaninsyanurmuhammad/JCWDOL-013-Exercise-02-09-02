import { Dialog, DialogBody } from "@material-tailwind/react";
import { PostInputForm } from "./PostInputForm";
import { Post } from "../models/types/TwitterProps";
import { useAppDispatch, useAppSelector } from "../redux/hook";
import { appActions } from "../redux/features/app-slice";

export const PostDialog = ({ data }: { data: Post }) => {
  const dispatch = useAppDispatch();

  const appState = useAppSelector((state) => state.app);

  const handleOpenDialog = () => {
    if (data.id === appState.editDialogState.id)
      dispatch(
        appActions.setOpenEditDialog({
          id: appState.editDialogState.id,
          isOpen: !appState.editDialogState.isOpen,
        })
      );
  };

  return (
    <>
      <Dialog
        open={
          appState.editDialogState.id === data.id
            ? appState.editDialogState.isOpen
            : false
        }
        handler={handleOpenDialog}
        className="bg-black border-[1px] border-gray-800"
      >
        <DialogBody>
          <PostInputForm data={data} />
        </DialogBody>
      </Dialog>
    </>
  );
};
