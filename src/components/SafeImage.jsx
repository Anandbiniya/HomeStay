import { useState } from 'react'

/**
 * Image with graceful failure handling.
 * Does not substitute unrelated stock photos when a source fails.
 */
export default function SafeImage({
  src,
  alt,
  className = '',
  loading = 'lazy',
  decoding = 'async',
  fetchPriority,
  onLoad,
  onError,
}) {
  const [failed, setFailed] = useState(false)

  if (!src || failed) {
    return (
      <div
        className={`flex items-center justify-center bg-[linear-gradient(160deg,#d7e0d4_0%,#b7c7b2_55%,#8fa88a_100%)] text-center text-sm text-pine/70 ${className}`}
        role="img"
        aria-label={alt || 'Image unavailable'}
      >
        <span className="px-4 py-6">Photo unavailable</span>
      </div>
    )
  }

  return (
    <img
      src={src}
      alt={alt}
      className={className}
      loading={loading}
      decoding={decoding}
      fetchPriority={fetchPriority}
      onLoad={onLoad}
      onError={() => {
        if (import.meta.env.DEV) {
          console.warn('[SafeImage] failed to load', src)
        }
        setFailed(true)
        onError?.()
      }}
    />
  )
}
