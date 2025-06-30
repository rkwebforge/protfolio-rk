import { AnimatePresence, motion } from 'framer-motion';
import { AlertCircle, AlertTriangle, CheckCircle, Info, X } from 'lucide-react';
import React from 'react';
import { notificationSlide } from '../utils/animations';

export type NotificationType = 'success' | 'error' | 'warning' | 'info';

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

const colorMap = {
  success: 'border-green-500 bg-green-900/90 text-green-100 backdrop-blur-sm',
  error: 'border-red-500 bg-red-900/90 text-red-100 backdrop-blur-sm',
  warning:
    'border-yellow-500 bg-yellow-900/90 text-yellow-100 backdrop-blur-sm',
  info: 'border-blue-500 bg-blue-900/90 text-blue-100 backdrop-blur-sm',
};

const iconColorMap = {
  success: 'text-green-400',
  error: 'text-red-400',
  warning: 'text-yellow-400',
  info: 'text-blue-400',
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
          className={`fixed right-4 top-4 z-50 w-96 overflow-hidden rounded-lg border shadow-lg ${colorMap[type]}`}
          variants={notificationSlide}
          initial='initial'
          animate='animate'
          exit='exit'
          layout
        >
          <div className='p-4'>
            <div className='flex items-start'>
              <div className='flex-shrink-0'>
                <Icon className={`h-5 w-5 ${iconColorMap[type]}`} />
              </div>
              <div className='ml-3 w-0 flex-1'>
                <p className='text-sm font-medium'>{title}</p>
                {message && (
                  <p className='mt-1 text-sm opacity-90'>{message}</p>
                )}
              </div>
              <div className='ml-4 flex flex-shrink-0'>
                <motion.button
                  className='inline-flex rounded-md p-1.5 hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-transparent'
                  onClick={onClose}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <X className='h-4 w-4 text-current opacity-70 hover:opacity-100' />
                </motion.button>
              </div>
            </div>
          </div>
          {autoClose && (
            <motion.div
              className='h-1 bg-current opacity-20'
              initial={{ width: '100%' }}
              animate={{ width: '0%' }}
              transition={{ duration: duration / 1000, ease: 'linear' }}
            />
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Notification;
