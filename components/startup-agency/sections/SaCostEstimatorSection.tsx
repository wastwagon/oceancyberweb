"use client";

import { motion } from "framer-motion";
import { SaSectionHeader } from "@/components/startup-agency/SaSectionHeader";
import { ProjectCostWizard } from "@/components/project-calculator/ProjectCostWizard";
import { fadeUpSoft } from "@/lib/scroll-reveal";

export function SaCostEstimatorSection() {
  return (
    <section className="sa-section relative z-10 border-t border-sa-border bg-sa-bg py-16 pb-24 md:py-32 md:pb-32">
      <div className="sa-container relative z-10">
        <div className="mx-auto mb-16 max-w-4xl">
          <motion.div {...fadeUpSoft}>
            <SaSectionHeader
              eyebrow="Investment"
              title={
                <>
                  Project
                  <span className="text-sa-primary"> investment estimator</span>
                </>
              }
              subtitle="Get an immediate sense of investment for your next web or mobile product. Adjust scope, platforms, and features to see real-time price ranges in Ghana cedis."
            />
          </motion.div>
        </div>

        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2, duration: 0.8 }}
          className="mx-auto max-w-3xl"
        >
          <div className="sa-card overflow-hidden">
             <div className="p-1 md:p-2">
                <ProjectCostWizard />
             </div>
          </div>
          <p className="mt-8 text-center text-[10px] uppercase tracking-widest text-sa-muted/40">
            * All estimates are indicative and subject to final technical scope approval.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
