import React from "react";
import { PageBackgroundWrapper } from "../../shared/PageBackgroundWrapper";
import { Button } from "@/components/ui/button";

export function SettingsTab() {
  return (
    <PageBackgroundWrapper>
      <div className="max-w-4xl mx-auto space-y-8 pb-12">
        <div className="flex flex-col gap-2">
          <h1 className="text-3xl font-bold tracking-tight text-foreground">
            Settings
          </h1>
          <p className="text-muted-foreground">
            Manage your account preferences and notifications
          </p>
        </div>

        <div className="rounded-2xl border border-border bg-card/40 backdrop-blur-sm p-6 md:p-10 shadow-sm space-y-8">
          {/* Notifications */}
          <div className="space-y-4">
            <h2 className="text-xl font-semibold border-b border-border pb-2">
              Notifications
            </h2>
            <div className="space-y-4 pt-2">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-medium text-foreground">Email Alerts</h3>
                  <p className="text-sm text-muted-foreground">
                    Receive an email when a candidate applies
                  </p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    className="sr-only peer"
                    defaultChecked
                  />
                  <div className="w-11 h-6 bg-muted-foreground/30 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                </label>
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-medium text-foreground">Weekly Digest</h3>
                  <p className="text-sm text-muted-foreground">
                    Get a weekly summary of your job listings activity
                  </p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    className="sr-only peer"
                    defaultChecked
                  />
                  <div className="w-11 h-6 bg-muted-foreground/30 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                </label>
              </div>
            </div>
          </div>

          {/* Account Settings */}
          <div className="space-y-4 pt-4">
            <h2 className="text-xl font-semibold border-b border-border pb-2">
              Account
            </h2>
            <div className="space-y-4 pt-2">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-medium text-foreground">
                    Change Password
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    Update your account password
                  </p>
                </div>
                <Button variant="outline" size="sm">
                  Update
                </Button>
              </div>
              <div className="flex items-center justify-between pt-4 border-t border-border/50">
                <div>
                  <h3 className="font-medium text-red-500">Delete Account</h3>
                  <p className="text-sm text-muted-foreground">
                    Permanently remove your account and data
                  </p>
                </div>
                <Button variant="destructive" size="sm">
                  Delete
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </PageBackgroundWrapper>
  );
}
