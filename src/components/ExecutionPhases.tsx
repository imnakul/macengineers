import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { EXECUTION } from "@/data/execution";

/**
 * The nine-phase delivery sequence, printed as a schedule rather than clicked through.
 *
 * An earlier pass made this a tab stepper. It hid eight of the nine phases behind a
 * control and turned the one thing a plant manager wants to scan — the whole sequence,
 * and the approval that closes each step — into a task. A drawing schedule shows every
 * row at once and lets the ruled grid do the work, so that is what this is: one line per
 * phase, the gate set on the right where a title block would carry it.
 */
export function ExecutionPhases(): React.JSX.Element {
  return (
    <section
      id="process"
      aria-labelledby="execution-heading"
      className="scroll-mt-24 px-5 py-28 md:px-13 md:py-44"
    >
      <div className="mx-auto max-w-[1180px]">
        <Reveal>
          <SectionHeading
            id="execution-heading"
            eyebrow={EXECUTION.eyebrow}
            title={EXECUTION.headline}
            body={EXECUTION.body}
          />
        </Reveal>

        <ol className="mt-16 flex flex-col md:mt-20">
          {EXECUTION.phases.map((phase, phaseIndex) => (
            <li key={phase.index}>
              <Reveal delay={Math.min(phaseIndex, 4) * 0.04}>
                <div className="grid gap-7 border-t border-hairline py-9 md:grid-cols-12 md:gap-10 md:py-11">
                  <div className="flex flex-col md:col-span-5">
                    <div className="flex items-baseline gap-4">
                      <span
                        aria-hidden="true"
                        className="font-mono text-[11px] leading-none tracking-tech text-accent"
                      >
                        {phase.index}
                      </span>
                      <h3 className="text-[22px] leading-tight font-block tracking-display text-ink-strong md:text-[26px]">
                        {phase.title}
                      </h3>
                    </div>
                    <p className="mt-4 max-w-[42ch] text-[15px] leading-[23px] font-regular tracking-glide text-ink-muted">
                      {phase.summary}
                    </p>
                  </div>

                  <div className="md:col-span-4">
                    <ul className="flex flex-col gap-2.5">
                      {phase.outputs.map((output) => (
                        <li
                          key={output}
                          className="relative pl-6 text-[14px] leading-[22px] font-regular tracking-glide text-ink"
                        >
                          <span
                            aria-hidden="true"
                            className="absolute top-[11px] left-0 h-px w-3 bg-hairline-strong"
                          />
                          {output}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="flex flex-col md:col-span-3">
                    <span className="font-mono text-[10px] leading-none tracking-tech text-ink-muted uppercase">
                      {EXECUTION.gateLabel}
                    </span>
                    <span className="mt-3 text-[15px] leading-[21px] font-block tracking-glide text-ink-strong">
                      {phase.gate}
                    </span>
                  </div>
                </div>
              </Reveal>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
