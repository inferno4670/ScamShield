import React, { useCallback, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { UploadCloud, X, Film, Image } from 'lucide-react';

interface UploadBoxProps {
    onFileSelect: (file: File | null) => void;
}

const ACCEPTED_TYPES = ['image/jpeg', 'image/png', 'video/mp4'];
const ACCEPT_STRING = '.jpg,.jpeg,.png,.mp4';

export const UploadBox: React.FC<UploadBoxProps> = ({ onFileSelect }) => {
    const [dragging, setDragging] = useState(false);
    const [file, setFile] = useState<File | null>(null);
    const [preview, setPreview] = useState<string | null>(null);
    const [error, setError] = useState<string | null>(null);
    const inputRef = useRef<HTMLInputElement>(null);

    const handleFile = useCallback(
        (incoming: File | null) => {
            setError(null);
            if (!incoming) return;
            if (!ACCEPTED_TYPES.includes(incoming.type)) {
                setError('Unsupported file. Please upload JPG, PNG, or MP4.');
                return;
            }
            setFile(incoming);
            setPreview(URL.createObjectURL(incoming));
            onFileSelect(incoming);
        },
        [onFileSelect]
    );

    const handleDrop = useCallback(
        (e: React.DragEvent<HTMLDivElement>) => {
            e.preventDefault();
            setDragging(false);
            const dropped = e.dataTransfer.files[0] ?? null;
            handleFile(dropped);
        },
        [handleFile]
    );

    const handleRemove = () => {
        setFile(null);
        if (preview) URL.revokeObjectURL(preview);
        setPreview(null);
        setError(null);
        onFileSelect(null);
        if (inputRef.current) inputRef.current.value = '';
    };

    const isVideo = file?.type === 'video/mp4';

    return (
        <div className="w-full">
            <AnimatePresence mode="wait">
                {!file ? (
                    <motion.div
                        key="dropzone"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.3 }}
                        className={`relative rounded-2xl border-2 border-dashed transition-all duration-300 cursor-pointer
                            ${dragging
                                ? 'border-primary/80 bg-primary/10 scale-[1.01] shadow-neon-cyan'
                                : 'border-white/10 bg-white/[0.02] hover:border-primary/40 hover:bg-white/[0.04]'
                            }`}
                        onDragOver={(e) => { e.preventDefault(); setDragging(true); }}
                        onDragLeave={() => setDragging(false)}
                        onDrop={handleDrop}
                        onClick={() => inputRef.current?.click()}
                    >
                        <input
                            ref={inputRef}
                            type="file"
                            accept={ACCEPT_STRING}
                            className="hidden"
                            onChange={(e) => handleFile(e.target.files?.[0] ?? null)}
                        />
                        <div className="flex flex-col items-center justify-center gap-4 py-16 px-6 text-center">
                            <motion.div
                                animate={dragging ? { scale: 1.15, rotate: -5 } : { scale: 1, rotate: 0 }}
                                transition={{ type: 'spring', stiffness: 300 }}
                                className="w-16 h-16 rounded-2xl bg-white/[0.03] border border-white/10 flex items-center justify-center shadow-glass"
                            >
                                <UploadCloud className="w-8 h-8 text-primary" />
                            </motion.div>
                            <div>
                                <p className="text-base font-semibold text-gray-200">
                                    {dragging ? 'Drop it here' : 'Drag & drop or click to upload'}
                                </p>
                                <p className="text-sm text-gray-500 mt-1">
                                    Supports JPG, PNG, MP4 (short videos)
                                </p>
                            </div>
                        </div>

                        {/* Glow accent when dragging */}
                        {dragging && (
                            <motion.div
                                className="absolute inset-0 rounded-2xl pointer-events-none"
                                style={{ boxShadow: '0 0 40px rgba(0, 255, 200, 0.15)' }}
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                            />
                        )}
                    </motion.div>
                ) : (
                    <motion.div
                        key="preview"
                        initial={{ opacity: 0, scale: 0.97 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.97 }}
                        transition={{ duration: 0.3 }}
                        className="relative rounded-2xl overflow-hidden border border-white/10 bg-white/[0.02] shadow-glass"
                    >
                        {/* Preview Content */}
                        <div className="relative w-full max-h-72 flex items-center justify-center bg-black/30 overflow-hidden">
                            {isVideo ? (
                                <video
                                    src={preview!}
                                    controls
                                    className="max-h-72 w-full object-contain"
                                />
                            ) : (
                                <img
                                    src={preview!}
                                    alt="Preview"
                                    className="max-h-72 w-full object-contain"
                                />
                            )}
                        </div>

                        {/* File Info Bar */}
                        <div className="flex items-center justify-between px-4 py-3 border-t border-white/[0.05] bg-white/[0.02]">
                            <div className="flex items-center gap-3">
                                {isVideo
                                    ? <Film className="w-4 h-4 text-primary" />
                                    : <Image className="w-4 h-4 text-primary" />
                                }
                                <div>
                                    <p className="text-sm font-medium text-gray-200 truncate max-w-[180px]">{file.name}</p>
                                    <p className="text-xs text-gray-500">{(file.size / 1024).toFixed(1)} KB</p>
                                </div>
                            </div>
                            <motion.button
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.9 }}
                                onClick={handleRemove}
                                className="w-8 h-8 rounded-lg bg-white/[0.05] hover:bg-red-500/20 border border-white/10 hover:border-red-500/30 flex items-center justify-center transition-colors"
                            >
                                <X className="w-4 h-4 text-gray-400 hover:text-red-400" />
                            </motion.button>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Error */}
            <AnimatePresence>
                {error && (
                    <motion.p
                        initial={{ opacity: 0, y: -4 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0 }}
                        className="mt-2 text-sm text-red-400 text-center"
                    >
                        {error}
                    </motion.p>
                )}
            </AnimatePresence>
        </div>
    );
};
