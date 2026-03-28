"use client";

import { Button } from "../../ui/button";
import { motion } from "framer-motion";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Modal from "@/components/modals/Modal";
import { useAuth } from "@/providers/authContext";

const HeroContent = () => {
  const router = useRouter();
  const { user } = useAuth();
  const [showEmployerLoginModal, setShowEmployerLoginModal] = useState(false);

  const isEmployer = Boolean(user?.roles.includes("employer"));

  const handlePostJobClick = () => {
    if (isEmployer) {
      router.push("/employer?tab=post-job");
      return;
    }

    setShowEmployerLoginModal(true);
  };

  return (
    <>
      <div className="relative flex flex-col items-center justify-center px-4 py-12 sm:py-18 text-center sm:px-6">
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="text-4xl font-black leading-tight text-foreground sm:text-5xl lg:text-6xl"
        >
          <span className="bg-linear-to-r from-primary to-chart-2 bg-clip-text text-transparent">
            Find Or Post{" "}
          </span>
          A Job That <br /> Fits Your{" "}
          <span className="bg-linear-to-r from-primary to-chart-2 bg-clip-text text-transparent">
            Intrest
          </span>{" "}
          And{" "}
          <span className="bg-linear-to-r from-primary to-chart-2 bg-clip-text text-transparent">
            Skill
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.2, ease: "easeOut" }}
          className="mt-6 text-base leading-relaxed text-muted-foreground sm:text-lg max-w-2xl"
        >
          Explore opportunities that match your skills or post jobs to connect
          with top talent. A unified platform built for both candidates and
          recruiters. Making job searching and hiring simple, fast, and
          effective.
        </motion.p>

        <motion.div
          initial="hidden"
          animate="visible"
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: { delayChildren: 0.3, staggerChildren: 0.12 },
            },
          }}
          className="mt-8 flex flex-wrap justify-center gap-3"
        >
          <motion.div
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: { opacity: 1, y: 0 },
            }}
            transition={{ duration: 0.45, ease: "easeOut" }}
          >
            <Button
              asChild
              type="button"
              size="2xl"
              variant="glow"
              className="rounded-full px-8 py-4 text-lg font-semibold sm:px-10 sm:text-3xl"
            >
              <Link href="/jobs">Find Jobs</Link>
            </Button>
          </motion.div>
          <motion.div
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: { opacity: 1, y: 0 },
            }}
            transition={{ duration: 0.45, ease: "easeOut" }}
          >
            <Button
              type="button"
              variant="outline"
              size="2xl"
              onClick={handlePostJobClick}
              className="rounded-full border border-primary! bg-glow-green-bg! hover:border-border! hover:bg-card! px-8 py-4 text-lg font-semibold text-foreground sm:px-10 sm:text-3xl duration-200"
            >
              Post a Job
            </Button>
          </motion.div>
        </motion.div>
      </div>

      <Modal
        open={showEmployerLoginModal}
        onOpenChange={setShowEmployerLoginModal}
        className="max-w-lg p-7"
        title="Login as Employer"
        description="Please login as an employer to post a job"
      >
        <div className="space-y-5">
          <h3 className="text-xl font-semibold text-foreground">
            Please login as an employer to post a job.
          </h3>
          <p className="text-sm text-muted-foreground leading-relaxed">
            Create an employer account to post a job, or use the credentials
            below to login as an employer.
          </p>

          <div className="rounded-xl border border-border bg-card/40 p-4 space-y-2 text-sm">
            <p>
              Email:{" "}
              <span className="text-primary font-semibold">
                employer@gmail.com
              </span>
            </p>
            <p>
              Password:{" "}
              <span className="text-secondary-foreground font-semibold">
                employer1234
              </span>
            </p>
          </div>

          <div className="flex flex-col-reverse sm:flex-row gap-3 sm:justify-end">
            <Button
              variant="outline"
              onClick={() => setShowEmployerLoginModal(false)}
            >
              Close
            </Button>
            <Button
              onClick={() => {
                setShowEmployerLoginModal(false);
                router.push("/employer?tab=post-job");
              }}
            >
              Go to Employer Login
            </Button>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default HeroContent;
