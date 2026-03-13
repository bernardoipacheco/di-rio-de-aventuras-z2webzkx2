import { useState, useRef, useEffect } from 'react'
import { Mic, Play } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { cn } from '@/lib/utils'

interface OriginStoryRecorderProps {
  onAudioReady: (url: string | null) => void
}

export function OriginStoryRecorder({ onAudioReady }: OriginStoryRecorderProps) {
  const [isRecording, setIsRecording] = useState(false)
  const [audioUrl, setAudioUrl] = useState<string | null>(null)
  const mediaRecorderRef = useRef<MediaRecorder | null>(null)
  const audioChunksRef = useRef<Blob[]>([])
  const mockTimeoutRef = useRef<NodeJS.Timeout | null>(null)

  useEffect(() => {
    return () => {
      if (mediaRecorderRef.current && mediaRecorderRef.current.state === 'recording') {
        mediaRecorderRef.current.stop()
        mediaRecorderRef.current.stream.getTracks().forEach((t) => t.stop())
      }
      if (mockTimeoutRef.current) {
        clearTimeout(mockTimeoutRef.current)
      }
    }
  }, [])

  const startRecording = async () => {
    if (isRecording) return
    if (mockTimeoutRef.current) clearTimeout(mockTimeoutRef.current)

    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true })
      mediaRecorderRef.current = new MediaRecorder(stream)
      audioChunksRef.current = []

      mediaRecorderRef.current.ondataavailable = (e) => {
        if (e.data.size > 0) audioChunksRef.current.push(e.data)
      }

      mediaRecorderRef.current.onstop = () => {
        const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/webm' })
        const url = URL.createObjectURL(audioBlob)
        setAudioUrl(url)
        onAudioReady(url)
      }

      mediaRecorderRef.current.start()
      setIsRecording(true)
    } catch (err) {
      console.error('Error accessing microphone', err)
      setIsRecording(true)
      mockTimeoutRef.current = setTimeout(() => {
        if (isRecording) {
          stopRecording()
        }
      }, 3000)
    }
  }

  const stopRecording = () => {
    if (!isRecording) return

    if (mediaRecorderRef.current && mediaRecorderRef.current.state === 'recording') {
      mediaRecorderRef.current.stop()
      mediaRecorderRef.current.stream.getTracks().forEach((t) => t.stop())
    } else {
      if (mockTimeoutRef.current) clearTimeout(mockTimeoutRef.current)
      const mockUrl = 'mock-audio-url'
      setAudioUrl(mockUrl)
      onAudioReady(mockUrl)
    }
    setIsRecording(false)
  }

  const playAudio = () => {
    if (audioUrl && audioUrl !== 'mock-audio-url') {
      const audio = new Audio(audioUrl)
      audio.play()
    }
  }

  return (
    <div className="flex flex-col items-center gap-4 bg-orange-50/80 p-8 rounded-3xl border-4 border-orange-100 mt-6">
      <Label className="text-xl font-display font-bold text-orange-900 mb-2 text-center">
        História de Origem
      </Label>

      <div className="flex items-center justify-center gap-6 w-full">
        <Button
          onMouseDown={startRecording}
          onMouseUp={stopRecording}
          onMouseLeave={stopRecording}
          onTouchStart={startRecording}
          onTouchEnd={stopRecording}
          onTouchCancel={stopRecording}
          className={cn(
            'w-24 h-24 rounded-full shadow-xl transition-all duration-300 border-4 select-none touch-none',
            isRecording
              ? 'bg-red-500 hover:bg-red-600 border-red-300 animate-pulse-glow scale-110'
              : 'bg-gradient-to-br from-orange-400 to-red-500 border-white hover:scale-105',
          )}
        >
          <Mic
            className={cn(
              'w-10 h-10 text-white transition-transform duration-300',
              isRecording && 'scale-110',
            )}
          />
        </Button>

        {audioUrl && !isRecording && (
          <Button
            onClick={playAudio}
            className="w-16 h-16 rounded-full bg-green-500 hover:bg-green-600 border-4 border-white shadow-lg hover:scale-105 transition-transform animate-fade-in"
          >
            <Play className="w-8 h-8 text-white ml-1" />
          </Button>
        )}
      </div>
      <p className="text-base font-bold text-orange-700 text-center">
        {isRecording
          ? 'Gravando a História de Origem...'
          : 'Segure para Gravar a História de Origem'}
      </p>
    </div>
  )
}
