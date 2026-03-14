import { useState, useRef, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Mic, Square, Save, Play, Pause, Trash2 } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Plushie } from '@/stores/useAppStore'

type Props = {
  plushie: Plushie
  onSaveAudio: (id: string, url: string) => void
  onRemoveAudio: (id: string) => void
}

export function PlushieCard({ plushie, onSaveAudio, onRemoveAudio }: Props) {
  const [isRecording, setIsRecording] = useState(false)
  const [audioBlob, setAudioBlob] = useState<Blob | null>(null)
  const [tempAudioUrl, setTempAudioUrl] = useState<string | null>(null)
  const [isPlaying, setIsPlaying] = useState(false)

  const mediaRecorderRef = useRef<MediaRecorder | null>(null)
  const audioChunksRef = useRef<Blob[]>([])
  const audioRef = useRef<HTMLAudioElement | null>(null)

  useEffect(() => {
    if (plushie.audioUrl && plushie.audioUrl !== 'mock-audio-url') {
      setTempAudioUrl(plushie.audioUrl)
      setAudioBlob(null)
    } else {
      setTempAudioUrl(null)
    }
  }, [plushie.audioUrl])

  useEffect(() => {
    return () => {
      if (mediaRecorderRef.current && mediaRecorderRef.current.state !== 'inactive') {
        mediaRecorderRef.current.stop()
      }
    }
  }, [])

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true })
      const mediaRecorder = new MediaRecorder(stream)
      mediaRecorderRef.current = mediaRecorder
      audioChunksRef.current = []

      mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) audioChunksRef.current.push(event.data)
      }

      mediaRecorder.onstop = () => {
        const blob = new Blob(audioChunksRef.current, { type: 'audio/webm' })
        setAudioBlob(blob)
        setTempAudioUrl(URL.createObjectURL(blob))
        stream.getTracks().forEach((track) => track.stop())
      }

      mediaRecorder.start()
      setIsRecording(true)
    } catch (error) {
      console.error('Error accessing microphone:', error)
    }
  }

  const stopRecording = () => {
    if (mediaRecorderRef.current && mediaRecorderRef.current.state !== 'inactive') {
      mediaRecorderRef.current.stop()
      setIsRecording(false)
    }
  }

  const saveRecording = () => {
    if (tempAudioUrl) {
      onSaveAudio(plushie.id, tempAudioUrl)
      setAudioBlob(null)
    }
  }

  const togglePlay = () => {
    if (!tempAudioUrl) return
    if (isPlaying) {
      audioRef.current?.pause()
      setIsPlaying(false)
    } else {
      if (!audioRef.current) {
        audioRef.current = new Audio(tempAudioUrl)
        audioRef.current.onended = () => setIsPlaying(false)
      }
      audioRef.current.src = tempAudioUrl
      audioRef.current.play()
      setIsPlaying(true)
    }
  }

  const discardRecording = () => {
    setAudioBlob(null)
    setTempAudioUrl(
      plushie.audioUrl && plushie.audioUrl !== 'mock-audio-url' ? plushie.audioUrl : null,
    )
  }

  const removeSavedAudio = () => {
    onRemoveAudio(plushie.id)
    setTempAudioUrl(null)
  }

  return (
    <Card className="border-4 border-orange-200 rounded-3xl bg-white/80 backdrop-blur-sm overflow-hidden hover:shadow-xl transition-all duration-300">
      <CardContent className="p-5 flex flex-col items-center text-center gap-4 h-full">
        <Link
          to={`/pelucias/${plushie.id}`}
          className="flex flex-col items-center gap-2 group w-full"
        >
          <div className="relative w-28 h-28 md:w-32 md:h-32 rounded-full overflow-hidden border-4 border-orange-300 group-hover:border-orange-500 transition-colors shadow-inner bg-orange-100">
            <img
              src={plushie.imageUrl}
              alt={plushie.name}
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
            />
          </div>
          <h3 className="font-display font-bold text-xl text-orange-950 truncate w-full px-2">
            {plushie.name}
          </h3>
        </Link>

        <div className="w-full mt-auto bg-orange-50/80 p-3 rounded-2xl border border-orange-100 flex flex-col items-center gap-3 min-h-[88px] justify-center">
          {isRecording ? (
            <div className="flex flex-col items-center gap-2 w-full animate-fade-in">
              <div className="flex items-center gap-2 text-red-500 font-bold animate-pulse">
                <div className="w-3 h-3 bg-red-500 rounded-full" /> Gravando...
              </div>
              <Button
                variant="destructive"
                className="w-full rounded-full h-10 font-bold"
                onClick={stopRecording}
              >
                <Square className="w-4 h-4 mr-2" /> Parar
              </Button>
            </div>
          ) : audioBlob ? (
            <div className="flex flex-col gap-2 w-full animate-fade-in">
              <div className="flex justify-between gap-2">
                <Button
                  variant="outline"
                  size="icon"
                  className="rounded-full border-orange-300 text-orange-600 w-10 h-10 shrink-0"
                  onClick={togglePlay}
                >
                  {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 ml-1" />}
                </Button>
                <Button
                  className="flex-1 rounded-full bg-green-500 hover:bg-green-600 text-white font-bold h-10"
                  onClick={saveRecording}
                >
                  <Save className="w-4 h-4 mr-1" /> Salvar
                </Button>
                <Button
                  variant="outline"
                  size="icon"
                  className="rounded-full border-red-200 text-red-500 hover:bg-red-50 w-10 h-10 shrink-0"
                  onClick={discardRecording}
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            </div>
          ) : tempAudioUrl ? (
            <div className="flex justify-between items-center gap-2 w-full animate-fade-in">
              <Button
                className="flex-1 rounded-full bg-orange-400 hover:bg-orange-500 text-white font-bold h-10"
                onClick={togglePlay}
              >
                {isPlaying ? (
                  <Pause className="w-4 h-4 mr-2" />
                ) : (
                  <Play className="w-4 h-4 ml-1 mr-2" />
                )}
                {isPlaying ? 'Pausar Voz' : 'Ouvir Voz'}
              </Button>
              <Button
                variant="outline"
                size="icon"
                className="rounded-full border-red-200 text-red-500 hover:bg-red-50 w-10 h-10 shrink-0"
                onClick={removeSavedAudio}
              >
                <Trash2 className="w-4 h-4" />
              </Button>
            </div>
          ) : (
            <Button
              className="w-full rounded-full bg-gradient-to-r from-orange-400 to-red-400 hover:from-orange-500 hover:to-red-500 text-white font-bold h-10 shadow-sm transition-transform hover:scale-105"
              onClick={startRecording}
            >
              <Mic className="w-4 h-4 mr-2" /> Gravar Voz
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
