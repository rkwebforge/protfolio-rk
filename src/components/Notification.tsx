import { AnimatePresence, motion } from "framer-motion";
import { AlertCircle, AlertTriangle, CheckCircle, Info, X } from "lucide-react";
import React from "react";

export type NotificationType = "success" | "error" | "warning" | "info";

interface NotificationProps {
  type: NotificationType;
  title: string;
  message?: string;
  isVisible: boolean;
  onClose: () => void;
  autoClose?: boolean;
  duration?: number;
}

const iconMap = {
  success: CheckCircle,
  error: AlertCircle,
  warning: AlertTriangle,
  info: Info,
};

// Left border colour by type (semantic green/red, accent for everything else)
const accentBorderMap = {
  success: "border-l-green-400",
  error: "border-l-red-400",
  warning: "border-l-accent",
  info: "border-l-accent",
};

const iconColorMap = {
  success: "text-green-400",
  error: "text-red-400",
  warning: "text-accent",
  info: "text-accent",
};

const toastMotion = {
  initial: { opacity: 0, y: -8 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.2 } },
  exit: { opacity: 0, y: -8, transition: { duration: 0.15 } },
};

const Notification: React.FC<NotificationProps> = ({
  type,
  title,
  message,
  isVisible,
  onClose,
  autoClose = true,
  duration = 5000,
}) => {
  const Icon = iconMap[type];

  React.useEffect(() => {
    if (autoClose && isVisible) {
      const timer = setTimeout(() => {
        onClose();
      }, duration);

      return () => clearTimeout(timer);
    }
    return undefined;
  }, [isVisible, autoClose, duration, onClose]);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          className={`fixed top-4 right-4 left-4 z-50 overflow-hidden rounded-md border border-l-[3px] border-rule bg-raised text-fg sm:left-auto sm:w-96 ${accentBorderMap[type]}`}
          variants={toastMotion}
          initial="initial"
          animate="animate"
          exit="exit"
        >
          <div className="p-4">
            <div className="flex items-start">
              <div className="shrink-0">
                <Icon className={`h-5 w-5 ${iconColorMap[type]}`} />
              </div>
              <div className="ml-3 w-0 flex-1">
                <p className="text-sm font-medium text-white">{title}</p>
                {message && <p className="mt-1 text-sm text-fg">{message}</p>}
              </div>
              <div className="ml-4 flex shrink-0">
                <button
                  type="button"
                  aria-label="Close notification"
                  className="inline-flex rounded-md p-1.5 text-muted transition-colors hover:text-accent"
                  onClick={onClose}
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Notification;
