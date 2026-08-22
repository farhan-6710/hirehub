import React from "react";
import Image from "next/image";
import { PageBackgroundWrapper } from "../../shared/PageBackgroundWrapper";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { employerApi, type EmployerProfile } from "@/services/employerApi";
import { showToast } from "@/config/ToastConfig";

export function ProfileTab() {
  const [loading, setLoading] = React.useState(true);
  const [employerProfile, setEmployerProfile] =
    React.useState<EmployerProfile | null>(null);

  React.useEffect(() => {
    const run = async () => {
      try {
        setLoading(true);
        const data = await employerApi.getProfile();
        setEmployerProfile(data.employerProfile);
      } catch {
        showToast({
          type: "error",
          title: "Failed to load profile",
          description: "Please try again.",
        });
        setEmployerProfile(null);
      } finally {
        setLoading(false);
      }
    };

    void run();
  }, []);

  if (loading) {
    return (
      <PageBackgroundWrapper>
        <p className="text-muted-foreground">loading..</p>
      </PageBackgroundWrapper>
    );
  }

  if (!employerProfile) {
    return (
      <PageBackgroundWrapper>
        <div className="max-w-4xl mx-auto rounded-2xl border border-dashed border-border p-8 text-center bg-card/20">
          <h2 className="text-xl font-semibold text-foreground">
            No employer profile found.
          </h2>
          <p className="mt-2 text-sm text-muted-foreground">
            Complete employer signup to create your company profile.
          </p>
        </div>
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
            Manage your company details and public presence
          </p>
        </div>

        <div className="rounded-2xl border border-border bg-card/40 backdrop-blur-sm p-6 md:p-10 shadow-sm space-y-8">
          <div className="flex items-center gap-6 pb-6 border-b border-border">
            <div className="h-24 w-24 rounded-2xl bg-primary/10 border border-primary/20 shrink-0 overflow-hidden">
              {employerProfile.companyLogo ? (
                <Image
                  src={employerProfile.companyLogo}
                  alt={`${employerProfile.companyName} logo`}
                  width={96}
                  height={96}
                  className="h-full w-full object-cover"
                />
              ) : (
                <div className="h-full w-full flex items-center justify-center text-3xl font-bold text-primary">
                  {employerProfile.companyName.charAt(0)}
                </div>
              )}
            </div>
            <div>
              <h2 className="text-2xl font-bold">
                {employerProfile.companyName}
              </h2>
              <p className="text-muted-foreground">
                {employerProfile.industry}
              </p>
              <Button variant="outline" size="sm" className="mt-3">
                Upload Logo
              </Button>
            </div>
          </div>

          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">
                  Company Name
                </label>
                <Input defaultValue={employerProfile.companyName} />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">
                  Industry
                </label>
                <Input defaultValue={employerProfile.industry} />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">
                  Website
                </label>
                <Input defaultValue={employerProfile.website} />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">
                  Headquarters Location
                </label>
                <Input defaultValue={employerProfile.headquartersLocation} />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">
                Company Description
              </label>
              <Textarea
                defaultValue={employerProfile.companyDescription}
                className="min-h-30 bg-background/50"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">
                  Contact Email
                </label>
                <Input
                  defaultValue={employerProfile.contactEmail}
                  type="email"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">
                  Contact Phone
                </label>
                <Input defaultValue={employerProfile.contactPhone} type="tel" />
              </div>
            </div>
          </div>

          <div className="pt-4 flex justify-end">
            <Button>Save Changes</Button>
          </div>
        </div>
      </div>
    </PageBackgroundWrapper>
  );
}
