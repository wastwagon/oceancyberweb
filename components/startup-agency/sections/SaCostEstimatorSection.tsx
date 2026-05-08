"use client";

import { motion } from "framer-motion";
import { Calculator } from "lucide-react";
import { ProjectCostWizard } from "@/components/project-calculator/ProjectCostWizard";
import { fadeUpSoft } from "@/lib/scroll-reveal";

export function SaCostEstimatorSection() {
  return (
    <section className="sa-section relative z-10 border-t border-sa-border bg-sa-bg py-20 md:py-32">
      <div className="sa-container relative z-10">
        <div className="mx-auto max-w-4xl text-center mb-16">
          <motion.div {...fadeUpSoft}>
            <span className="sa-eyebrow mb-6 inline-flex items-center gap-2">
              <Calculator className="h-4 w-4" aria-hidden />
              Investment
            </span>
            <h2 className="sa-title mb-6">
              Project
              <span className="text-sa-primary"> investment estimator</span>
            </h2>
            <p className="sa-subtitle mx-auto">
              Get an immediate sense of investment for your next web or mobile product. 
              Adjust scope, platforms, and features to see real-time price ranges in Ghana cedis.
            </p>
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
