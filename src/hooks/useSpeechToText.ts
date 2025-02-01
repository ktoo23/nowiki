import { useState, useEffect, useRef } from 'react'

const useSpeechToText = () => {
    const [transcript, setTranscript] = useState('')
    const [listening, setListening] = useState(false)
    const recognition = useRef<SpeechRecognition | null>(null)

    // Web Speech API 초기화
    useEffect(() => {
        if (!('webkitSpeechRecognition' in window)) {
            console.error('Web Speech API is not supported in this browser.')
            return
        }

        const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition
        recognition.current = new SpeechRecognition()

        recognition.current.lang = 'ko-KR'
        recognition.current.interimResults = true // 중간 결과 허용
        recognition.current.maxAlternatives = 1 // 후보 텍스트 최대 1개로 제한

        recognition.current.onresult = (event: SpeechRecognitionEvent) => {
            let finalTranscript = ''

            for (let i = event.resultIndex; i < event.results.length; i++) {
                const transcriptPart = event.results[i][0].transcript

                // 최종 결과만 추가
                if (event.results[i].isFinal) {
                    finalTranscript += transcriptPart
                } else {
                    // 중간 결과는 따로 다룰 수 있음
                    // finalTranscript += transcriptPart;
                }
            }

            setTranscript(finalTranscript) // 최종 결과만 업데이트
        }

        recognition.current.onstart = () => {
            setListening(true)
        }

        recognition.current.onend = () => {
            setListening(false)
        }

        recognition.current.onerror = (event) => {
            console.error('Speech recognition error:', event.error)
            setListening(false)
        }
    }, [])

    const toggleListening = () => {
        if (listening) {
            recognition.current?.stop()
        } else {
            setTranscript('') // 기존 텍스트 초기화
            recognition.current?.start()
        }
    }

    const resetTranscript = () => {
        setTranscript('')
    }

    return { transcript, listening, toggleListening, resetTranscript }
}

export default useSpeechToText
