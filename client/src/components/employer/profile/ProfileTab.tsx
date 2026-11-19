import { PageBackgroundWrapper } from "../../shared/PageBackgroundWrapper";
import { useEmployerProfile } from "@/hooks/useEmployerProfile";
import { ProfileForm } from "./ProfileForm";

export function ProfileTab() {
  const { profile, isNew, loading, saving, save } = useEmployerProfile();

  if (loading) {
    return (
      <PageBackgroundWrapper>
        <p className="text-muted-foreground">loading..</p>
      </PageBackgroundWrapper>
    );
  }

  return (
    <PageBackgroundWrapper>
      <div className="max-w-4xl mx-auto space-y-8 pb-12">
        <div className="flex flex-col gap-2">
          <h1 className="text-3xl font-bold tracking-tight text-foreground">
            Company Profile
          </h1>
          <p className="text-muted-foreground">
            {isNew
              ? "Add your company details. Company name and headquarters are needed before you can post a job."
              : "Manage your company details and public presence"}
          </p>
        </div>

        <div className="rounded-2xl border border-border bg-card/40 backdrop-blur-sm p-6 md:p-10 shadow-sm space-y-8">
          {!isNew && (
            <div className="flex items-center gap-6 pb-6 border-b border-border">
              <div className="h-24 w-24 rounded-2xl bg-primary/10 border border-primary/20 shrink-0 flex items-center justify-center text-3xl font-bold text-primary">
                {profile.companyName.charAt(0)}
              </div>
              <div>
                <h2 className="text-2xl font-bold">{profile.companyName}</h2>
                <p className="text-muted-foreground">{profile.industry}</p>
              </div>
            </div>
          )}

          <ProfileForm
            key={isNew ? "new" : "existing"}
            initialProfile={profile}
            saving={saving}
            submitLabel={isNew ? "Create Profile" : "Save Changes"}
            onSubmit={save}
          />
        </div>
      </div>
    </PageBackgroundWrapper>
  );
}
