"use client";

import { Button } from "../../ui/button";
import { motion } from "framer-motion";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "@/providers/authContext";
import { useEmployerAccess } from "@/providers/EmployerAccessContext";

const HeroContent = () => {
  const router = useRouter();
  const { user } = useAuth();
  const { openEmployerAccessModal } = useEmployerAccess();

  const isEmployer = Boolean(user?.roles.includes("employer"));

  const handlePostJobClick = () => {
    if (isEmployer) {
      router.push("/employer?tab=dashboard");
      return;
    }

    openEmployerAccessModal();
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
    </>
  );
};

export default HeroContent;
