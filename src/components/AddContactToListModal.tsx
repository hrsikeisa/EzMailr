import { Dispatch, SetStateAction, useState } from "react";
import { toast } from "react-hot-toast";
import { api } from "~/utils/api";
import AlertBlock from "./AlertBlock";
import FileUpload from "./FileUpload";
import InputWithLabel from "./InputWithLabel";
import LineTabs from "./LineTabs";
import Modal from "./Modal";

export default function AddContactToListModal({
  open,
  setOpen,
  listId,
}: {
  open: boolean;
  setOpen: Dispatch<SetStateAction<any>>;
  listId: string;
}) {
  const utils = api.useContext();
  const [inputValues, setInputValues] = useState({ email: "" });
  const addContactToList = api.contacts.addContactToList.useMutation({
    onSuccess: () => utils.lists.invalidate(),
  });
  const [tabs, setTabs] = useState([
    { name: "Single Contact", current: true },
    { name: "CSV Import", current: false },
  ]);

  return (
    <Modal
      buttonCancelText="Cancel"
      buttonActionText="Add"
      actionOnClick={() => {
        toast.promise(
          addContactToList.mutateAsync({ email: inputValues.email, listId }),
          {
            loading: "Adding contact...",
            success: () => {
              setOpen(false);
              return "Contact added!";
            },
            error: "Failed to add contact",
          },
          {
            position: "bottom-center",
          }
        );
      }}
      open={open}
      setOpen={setOpen}
      actionType="success"
    >
      <div className="mb-6 pr-5">
        <LineTabs tabs={tabs} setTabs={setTabs} />
        {tabs[0]?.current ? (
          <>
            <h2 className="mb-6 flex flex-col items-center pt-8 text-2xl font-semibold text-gray-800">
              Add new contact
            </h2>

            {addContactToList.error && (
              <div className="mb-4">
                <AlertBlock type="error" heading="Sorry, an error occured">
                  Please check or input or try again later.
                </AlertBlock>
              </div>
            )}
            <InputWithLabel
              type="email"
              label="Email Address"
              id="email"
              state={inputValues}
              setState={setInputValues}
            />
          </>
        ) : (
          <FileUpload listId={listId} />
        )}
      </div>
    </Modal>
  );
}
