import { PageBackgroundWrapper } from "../../shared/PageBackgroundWrapper";
import { ChangePasswordForm } from "./ChangePasswordForm";
import { DeleteAccountSection } from "./DeleteAccountSection";

export function SettingsTab() {
  return (
    <PageBackgroundWrapper>
      <div className="max-w-4xl mx-auto space-y-8 pb-12">
        <div className="flex flex-col gap-2">
          <h1 className="text-3xl font-bold tracking-tight text-foreground">
            Settings
          </h1>
          <p className="text-muted-foreground">Manage your account</p>
        </div>

        <div className="rounded-2xl border border-border bg-card/40 backdrop-blur-sm p-6 md:p-10 shadow-sm space-y-8">
          <section className="space-y-4">
            <h2 className="text-xl font-semibold border-b border-border pb-2">
              Change Password
            </h2>
            <ChangePasswordForm />
          </section>

          <section className="space-y-4 pt-4">
            <h2 className="text-xl font-semibold border-b border-border pb-2">
              Danger Zone
            </h2>
            <DeleteAccountSection />
          </section>
        </div>
      </div>
    </PageBackgroundWrapper>
  );
}
