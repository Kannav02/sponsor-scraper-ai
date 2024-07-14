from youtube_transcript_api import YouTubeTranscriptApi

def getCaptions(id):
    outputText=""
    outputTime=""
    data=YouTubeTranscriptApi.get_transcript(id)
    for i in data:
        outputText+=i['text']+" # "
        outputTime+=str(round(i["start"]/60,2))+" # "

    return {"transcription":outputText,"timestamp":outputTime}

