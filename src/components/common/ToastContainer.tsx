import React from 'react';
import { CheckCircle, AlertCircle, Info, AlertTriangle, X } from 'lucide-react';
import { useStore } from '../../store/useStore';

export const ToastContainer: React.FC = () => {
  const { toasts, removeToast } = useStore();

  if (toasts.length === 0) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-2 max-w-sm w-full pointer-events-none">
      {toasts.map((toast) => {
        const icons = {
          success: <CheckCircle className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />,
          error: <AlertCircle className="w-4 h-4 text-rose-500 shrink-0 mt-0.5" />,
          warning: <AlertTriangle className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />,
          info: <Info className="w-4 h-4 text-teal-500 shrink-0 mt-0.5" />
        };

        const bgColors = {
          success: 'bg-emerald-950/90 text-emerald-100 border-emerald-800',
          error: 'bg-rose-950/90 text-rose-100 border-rose-800',
          warning: 'bg-amber-950/90 text-amber-100 border-amber-800',
          info: 'bg-slate-900/90 text-slate-100 border-slate-700'
        };

        return (
          <div
            key={toast.id}
            className={`pointer-events-auto p-3 rounded-2xl shadow-xl border backdrop-blur-md flex items-start gap-2.5 text-xs transition-all duration-300 animate-in slide-in-from-bottom-5 ${bgColors[toast.type]}`}
          >
            {icons[toast.type]}
            <p className="flex-1 leading-snug font-medium">{toast.message}</p>
            <button
              onClick={() => removeToast(toast.id)}
              className="opacity-70 hover:opacity-100 transition p-0.5"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        );
      })}
    </div>
  );
};
