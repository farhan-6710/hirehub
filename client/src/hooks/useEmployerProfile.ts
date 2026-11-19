import { useEffect, useState } from "react";
import { employerApi, type EmployerProfile } from "@/services/employerApi";
import { showToast } from "@/config/ToastConfig";
import { useAuth } from "@/providers/authContext";
import { getApiErrorMessage } from "@/utils/apiError";

export const EMPTY_EMPLOYER_PROFILE: EmployerProfile = {
  companyName: "",
  companyLogo: "",
  industry: "",
  headquartersLocation: "",
  website: "",
  companyDescription: "",
  contactEmail: "",
  contactPhone: "",
};

export function useEmployerProfile() {
  const { refreshUser } = useAuth();
  const [profile, setProfile] = useState<EmployerProfile>(EMPTY_EMPLOYER_PROFILE);
  const [isNew, setIsNew] = useState(true);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    const load = async () => {
      try {
        const data = await employerApi.getProfile();
        setIsNew(!data.employerProfile);
        setProfile(data.employerProfile ?? EMPTY_EMPLOYER_PROFILE);
      } catch (error) {
        showToast({
          type: "error",
          title: "Failed to load profile",
          description: getApiErrorMessage(error, "Please try again."),
        });
      } finally {
        setLoading(false);
      }
    };

    void load();
  }, []);

  const save = async (next: EmployerProfile) => {
    try {
      setSaving(true);
      const data = await employerApi.saveProfile(next);
      setProfile(data.employerProfile);
      setIsNew(false);
      // Post Job reads company name and location from the signed-in user.
      await refreshUser();
      showToast({
        type: "success",
        title: "Profile saved",
        description: "Your company details are up to date.",
      });
    } catch (error) {
      showToast({
        type: "error",
        title: "Could not save profile",
        description: getApiErrorMessage(error, "Please try again."),
      });
    } finally {
      setSaving(false);
    }
  };

  return { profile, isNew, loading, saving, save };
}
