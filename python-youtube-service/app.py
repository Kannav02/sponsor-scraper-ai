from flask import Flask, request, jsonify
from controllers.youtube_video import getCaptions

app=Flask(__name__)
# what does the __name__ do?


@app.route("/api/yt", methods=["POST"])
def yt():
    data=request.json
    output=getCaptions(data["id"])

    return {"videoId":data["id"],"transcriptions":output["transcription"],"time":output["timestamp"]}

if __name__=="__main__":
    app.run(debug=True, host="0.0.0.0", port=3002)