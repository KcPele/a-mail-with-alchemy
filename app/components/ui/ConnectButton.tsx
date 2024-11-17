"use client";
import {
  useAuthModal,
  useLogout,
  useSignerStatus,
  useUser,
} from "@account-kit/react";
import Loading from "components/ui/loading";

export function ConnectButton() {
  const user = useUser();
  const { openAuthModal } = useAuthModal();
  const signerStatus = useSignerStatus();
  const { logout } = useLogout();

  return (
    <>
      {signerStatus.isInitializing ? (
        <Loading />
      ) : user ? (
        <div className="flex items-center gap-2 p-2">
          <p className="text-xl font-bold">Success!</p>
          {user.email ?? "anon"}.
          <button
            className="bg-red-500 text-white shadow hover:bg-red-600 h-9 px-4 py-2 rounded-md transition-colors"
            onClick={() => logout()}
          >
            Log out
          </button>
        </div>
      ) : (
        <button
          className="bg-blue-500 text-white shadow hover:bg-blue-600 h-9 px-4 py-2 rounded-md transition-colors"
          onClick={openAuthModal}
        >
          Login
        </button>
      )}
    </>
  );
}
