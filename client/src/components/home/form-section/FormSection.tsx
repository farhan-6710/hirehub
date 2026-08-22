import { Button } from "@/components/ui/button";
import BlurryBlobSectionWrapper from "@/components/shared/BlurryBlobSectionWrapper";

export default function FormSection() {
  return (
    <BlurryBlobSectionWrapper
      id="contact"
      className="bg-card"
      contentClassName="px-4 py-12 sm:px-6 lg:px-10"
      containerClassName="flex flex-col gap-8"
      firstBlobColor="bg-primary/25"
      secondBlobColor="bg-chart-2/20"
      firstBlobClassName="h-28 w-28 left-2 top-2 sm:left-6 lg:left-10"
      secondBlobClassName="h-24 w-24 right-3 bottom-3 top-auto sm:right-8 lg:right-12"
    >
      <div className="mx-auto flex max-w-2xl flex-col items-center gap-3 text-center">
        <p className="flex items-center gap-2 text-sm font-medium tracking-[0.18em] text-primary uppercase">
          <span className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-primary/15 text-primary">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="h-3.5 w-3.5"
            >
              <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
            </svg>
          </span>
          Contact
        </p>
        <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">
          Reach Out To Our Team
        </h2>
        <p className="text-muted-foreground">
          Questions, hiring plans, or partnership ideas, send us a message and
          we&apos;ll respond shortly.
        </p>
      </div>

      <div className="grid w-full gap-8 rounded-3xl border border-border bg-background/40 p-6 sm:p-8 lg:grid-cols-2 lg:gap-10 lg:p-10">
        <div className="flex flex-col justify-center gap-4">
          <p className="text-sm font-medium tracking-[0.18em] text-primary uppercase">
            Reach Out To Us
          </p>
          <h3 className="text-3xl font-semibold tracking-tight sm:text-4xl">
            Let&apos;s Talk About Your Hiring Goals
          </h3>
          <p className="text-muted-foreground">
            Share your requirements and our team will get back to you with the
            right plan and timeline.
          </p>
          <div className="space-y-1 text-sm text-muted-foreground">
            <p>Email: hello@hirehub.app</p>
            <p>Support: support@hirehub.app</p>
            <p>Hours: Mon - Fri, 9:00 AM to 6:00 PM</p>
          </div>
        </div>

        <form className="grid gap-4" action="#" method="post">
          <input
            type="text"
            name="name"
            placeholder="Full name"
            className="h-11 rounded-lg border border-border bg-background px-4 text-sm text-foreground outline-none transition-colors duration-200 placeholder:text-muted-foreground/80 focus:border-primary"
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Work email"
            className="h-11 rounded-lg border border-border bg-background px-4 text-sm text-foreground outline-none transition-colors duration-200 placeholder:text-muted-foreground/80 focus:border-primary"
            required
          />
          <input
            type="text"
            name="subject"
            placeholder="Subject"
            className="h-11 rounded-lg border border-border bg-background px-4 text-sm text-foreground outline-none transition-colors duration-200 placeholder:text-muted-foreground/80 focus:border-primary"
            required
          />
          <textarea
            name="message"
            placeholder="Tell us what you need"
            rows={5}
            className="rounded-lg border border-border bg-background px-4 py-3 text-sm text-foreground outline-none transition-colors duration-200 placeholder:text-muted-foreground/80 focus:border-primary"
            required
          />
          <div className="pt-1">
            <Button type="submit" size="lg" variant="glow" className="w-full">
              Send Message
            </Button>
          </div>
        </form>
      </div>
    </BlurryBlobSectionWrapper>
  );
}
