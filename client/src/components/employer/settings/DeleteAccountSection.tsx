import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import ConfirmationModal from "@/components/modals/ConfirmationModal";
import { useAuth } from "@/providers/authContext";
import { showToast } from "@/config/ToastConfig";

export function DeleteAccountSection() {
  const router = useRouter();
  const { deleteAccount } = useAuth();
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [deleting, setDeleting] = useState(false);

  const handleDelete = async () => {
    try {
      setDeleting(true);
      await deleteAccount();
      showToast({
        type: "success",
        title: "Account deleted",
        description: "Your account, jobs and applications were removed.",
      });
      router.replace("/");
    } catch (error) {
      showToast({
        type: "error",
        title: "Could not delete account",
        description: error instanceof Error ? error.message : "Please try again.",
      });
      setDeleting(false);
    }
  };

  return (
    <div className="flex items-center justify-between gap-4">
      <div>
        <h3 className="font-medium text-destructive">Delete Account</h3>
        <p className="text-sm text-muted-foreground">
          Permanently remove your account, your jobs and their applications
        </p>
      </div>
      <Button
        variant="destructive"
        size="sm"
        disabled={deleting}
        onClick={() => setConfirmOpen(true)}
      >
        {deleting ? "Deleting..." : "Delete"}
      </Button>

      <ConfirmationModal
        open={confirmOpen}
        onOpenChange={setConfirmOpen}
        title="Delete account?"
        description="This permanently deletes your account, every job you posted and all their applications. It cannot be undone."
        confirmLabel="Delete account"
        onConfirm={() => void handleDelete()}
        variant="destructive"
      />
    </div>
  );
}
