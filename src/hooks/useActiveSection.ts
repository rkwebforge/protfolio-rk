import { useEffect, useState } from "react";

/**
 * Track which section of a long page is being read: the last one whose top
 * has passed the middle of the viewport. Returns null when disabled.
 */
export function useActiveSection(
  ids: readonly string[],
  enabled = true,
): string | null {
  const [active, setActive] = useState<string | null>(null);

  useEffect(() => {
    if (!enabled || ids.length === 0) return;

    const update = () => {
      const marker = window.innerHeight / 2;
      let current = ids[0] ?? null;
      for (const id of ids) {
        const el = document.getElementById(id);
        if (el && el.getBoundingClientRect().top <= marker) current = id;
      }
      // At the very bottom, the last (often short) section should be active
      if (
        window.innerHeight + window.scrollY >=
        document.documentElement.scrollHeight - 2
      ) {
        current = ids[ids.length - 1] ?? current;
      }
      setActive(current);
    };

    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, [ids, enabled]);

  return enabled ? active : null;
}
