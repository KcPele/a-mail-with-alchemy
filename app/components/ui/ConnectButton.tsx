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
            className="akui-btn akui-btn-primary"
            onClick={() => logout()}
          >
            Log out
          </button>
        </div>
      ) : (
        <button className="akui-btn akui-btn-primary" onClick={openAuthModal}>
          Login
        </button>
      )}
    </>
  );
}
