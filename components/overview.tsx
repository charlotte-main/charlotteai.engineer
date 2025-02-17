import { motion } from "framer-motion";
import Link from "next/link";

import { MessageIcon, VercelIcon } from "./icons";

export const Overview = () => {
  return (
    <motion.div
      key="overview"
      className="max-w-3xl mx-auto md:mt-20"
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.98 }}
      transition={{ delay: 0.5 }}
    >
      <div className="h-5 rounded-xl p-6 flex flex-col gap-8 leading-relaxed text-center ">
        <p>
          Hey I&apos;m{" "}
          <Link
            className="rounded-md bg-muted px-1 py-0.5"
            href="https://github.com/charlotte-main"
          >
            Charlotte!
          </Link>{" "}
          this is my interactive CV
          <br />
          have a lil chat to find out whether I&apos;m the right fit for your
          company
        </p>
      </div>
    </motion.div>
  );
};
