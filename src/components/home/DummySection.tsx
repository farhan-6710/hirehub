import { DUMMY_CONTENT } from "@/constants/data";
import React from "react";

const DummySection = () => {
  return (
    <section className="flex flex-col items-center gap-6 px-4 py-8 sm:px-6">
      <div className="flex flex-col items-center gap-2 text-center text-muted-foreground">
        <h2 className="text-2xl text-foreground sm:text-3xl">
          Component <span className="text-primary">Heading</span>
        </h2>
        <p className="text-sm sm:text-base">
          This is a dummy component heading to demonstrate and showcase the
          theming setup.
        </p>
      </div>
      <div className="grid w-full grid-cols-[repeat(auto-fit,minmax(280px,1fr))] gap-4 sm:gap-6">
        {Array.from({ length: 20 }).map((item, idx) => {
          return (
            <div
              key={idx}
              className="rounded-2xl border border-border bg-card p-6 transition-colors duration-300 hover:cursor-pointer hover:border-primary hover:bg-glow-green-bg"
            >
              {DUMMY_CONTENT}
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default DummySection;
