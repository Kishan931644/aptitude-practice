import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Mic, MicOff, ChevronLeft, ChevronRight } from "lucide-react"

// Mock questions and AI answers
const mockQuestions = [
    "Tell me about yourself.",
    "What is your greatest strength?",
    "Where do you see yourself in 5 years?",
]

const mockAIAnswers = [
    "When answering this question, focus on your professional background, key achievements, and how they relate to the position you're applying for. Keep it concise and relevant.",
    "Highlight a strength that is directly relevant to the job you're applying for. Provide a specific example of how you've used this strength in a professional setting.",
    "Discuss your career goals and how they align with the potential growth opportunities at the company. Show that you've done research on the company and industry trends.",
]

export default function MockInterview() {
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
    const [isRecording, setIsRecording] = useState(false)
    const [userAnswer, setUserAnswer] = useState("")
    const [showAIAnswer, setShowAIAnswer] = useState(false)
    const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition || window.mozSpeechRecognition || window.msSpeechRecognition)();
    recognition.lang = 'en-US';

    recognition.onstart = () => {
        setIsRecording(true);
    };

    recognition.onresult = (event) => {
        const transcript = event.results[0][0].transcript;
        setUserAnswer(transcript);
    };

    recognition.onend = () => {
        setIsRecording(false);
    };

    useEffect(() => {
        setUserAnswer("")
        setShowAIAnswer(false)
    }, [])

    const startRecording = async () => {
        try {
            recognition.start();
        } catch (error) {
            console.error("Error accessing microphone:", error)
        }
    }

    const stopRecording = () => {
        recognition.stop();
        setIsRecording(false)
    }

    const speak = () => {
        const utterance = new SpeechSynthesisUtterance("Welcome to this tutorial!");
        const voices = speechSynthesis.getVoices();
        utterance.voice = voices[0];

        speechSynthesis.speak(utterance);
    }

    const handlePrevious = () => {
        setCurrentQuestionIndex((prevIndex) => Math.max(0, prevIndex - 1))
    }

    const handleNext = () => {
        setCurrentQuestionIndex((prevIndex) => Math.min(mockQuestions.length - 1, prevIndex + 1))
    }

    return (
        <div className="container mx-auto p-4">
            <Card className="w-full max-w-2xl mx-auto">
                <CardHeader>
                    <CardTitle>Mock Interview</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="text-lg font-semibold">
                        Question {currentQuestionIndex + 1}: {mockQuestions[currentQuestionIndex]}
                    </div>
                    <div className="space-y-2">
                        <Button onClick={isRecording ? stopRecording : startRecording} className="w-full">
                            {isRecording ? <MicOff className="mr-2" /> : <Mic className="mr-2" />}
                            {isRecording ? "Stop Recording" : "Start Recording"}
                        </Button>
                    </div>
                    {userAnswer && (
                        <div>
                            <h3 className="font-semibold">Your Answer:</h3>
                            <p>{userAnswer}</p>
                        </div>
                    )}
                    {userAnswer && !showAIAnswer && (
                        <Button onClick={() => setShowAIAnswer(true)} className="w-full">
                            Show AI Suggestion
                        </Button>
                    )}
                    {showAIAnswer && (
                        <div>
                            <h3 className="font-semibold">AI Suggested Answer:</h3>
                            <p>{mockAIAnswers[currentQuestionIndex]}</p>
                        </div>
                    )}
                </CardContent>
                <CardFooter className="justify-between">
                    <Button onClick={handlePrevious} disabled={currentQuestionIndex === 0}>
                        <ChevronLeft className="mr-2" /> Previous
                    </Button>
                    <Button onClick={handleNext} disabled={currentQuestionIndex === mockQuestions.length - 1}>
                        Next <ChevronRight className="ml-2" />
                    </Button>
                </CardFooter>
            </Card>
        </div>
    )
}

