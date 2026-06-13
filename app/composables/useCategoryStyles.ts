const CATEGORY_DOT: Record<string, string> = {
  Politics: "#dc2626",
  Business: "#2563eb",
  Technology: "#7c3aed",
  Sports: "#16a34a",
  Health: "#db2777",
  Entertainment: "#f97316",
  Education: "#0891b2",
  Agriculture: "#65a30d",
}

const CATEGORY_TEXT_CLASS: Record<string, string> = {
  Politics: "text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-950/40",
  Business: "text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/40",
  Technology: "text-violet-600 dark:text-violet-400 bg-violet-50 dark:bg-violet-950/40",
  Sports: "text-green-600 dark:text-green-400 bg-green-50 dark:bg-green-950/40",
  Health: "text-pink-600 dark:text-pink-400 bg-pink-50 dark:bg-pink-950/40",
  Entertainment: "text-orange-600 dark:text-orange-400 bg-orange-50 dark:bg-orange-950/40",
  Education: "text-cyan-600 dark:text-cyan-400 bg-cyan-50 dark:bg-cyan-950/40",
  Agriculture: "text-lime-700 dark:text-lime-400 bg-lime-50 dark:bg-lime-950/40",
}

export function useCategoryStyles() {
  function categoryDot(cat: string): string {
    return CATEGORY_DOT[cat] ?? "#64748b"
  }

  function categoryTextClass(cat: string): string {
    return (
      CATEGORY_TEXT_CLASS[cat] ??
      "text-slate-600 dark:text-slate-400 bg-slate-100 dark:bg-slate-800"
    )
  }

  return { categoryDot, categoryTextClass }
}
