import Modal from "@/components/modals/Modal";

interface UserProfileModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  name: string;
  email?: string;
  role?: string;
}

export function UserProfileModal({ open, onOpenChange, name, email, role }: UserProfileModalProps) {
  return (
    <Modal
      open={open}
      onOpenChange={onOpenChange}
      className="max-w-lg p-6"
      title="Profile"
      description="View your profile details"
    >
      <div className="space-y-6">
        <div className="space-y-1">
          <h3 className="text-xl font-semibold text-foreground">Profile</h3>
          <p className="text-sm text-muted-foreground">View your account details.</p>
        </div>

        <div className="rounded-xl border border-border bg-card/30 p-4 space-y-2">
          <p className="text-sm text-muted-foreground">Name</p>
          <p className="font-medium text-foreground">{name}</p>
          <p className="text-sm text-muted-foreground pt-2">Email</p>
          <p className="font-medium text-foreground">{email}</p>
          <p className="text-sm text-muted-foreground pt-2">Role</p>
          <p className="font-medium text-foreground capitalize">{role ?? "candidate"}</p>
        </div>
      </div>
    </Modal>
  );
}
