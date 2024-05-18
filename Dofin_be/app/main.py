from config import app
import subprocess

import uvicorn


@app.get("/start-websocket-client")
async def start_websocket_client():
    subprocess.Popen(["python", "ws_client.py"])
    return {"message": "WebSocket client started"}


if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000)
