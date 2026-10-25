'use client'

import { AlertTriangle } from 'lucide-react'

export default function ConfirmModal({ 
  title, 
  message, 
  onConfirm, 
  onCancel,
  confirmText = 'Confirm',
  cancelText = 'Cancel'
}) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
      <div className="bg-white border-2 border-black max-w-md w-full p-6 shadow-2xl">
        <div className="flex items-start gap-4 mb-6">
          <AlertTriangle className="w-6 h-6 flex-shrink-0" />
          <div>
            <h2 className="text-xl font-bold mb-2">{title}</h2>
            <p className="text-gray-600">{message}</p>
          </div>
        </div>
        
        <div className="flex gap-3 justify-end">
          <button
            onClick={onCancel}
            className="px-4 py-2 border-2 border-black hover:bg-gray-100 transition-colors"
          >
            {cancelText}
          </button>
          <button
            onClick={onConfirm}
            className="px-4 py-2 bg-black text-white border-2 border-black hover:bg-gray-800 transition-colors"
          >
            {confirmText}
          </button>
        </div>
      </div>
    </div>
  )
}
