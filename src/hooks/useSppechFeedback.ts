const useSpeechFeedback = () => {
    const speak = (text: string) => {
        const utterance = new SpeechSynthesisUtterance(text);
        utterance.lang = "ko-KR";
        speechSynthesis.speak(utterance);
    };

    return { speak };
};

export default useSpeechFeedback;
