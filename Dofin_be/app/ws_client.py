# websocket_client.py
import asyncio
import websockets
import json


async def connect_and_receive():
    uri = "ws://localhost:4000/fireAnt"
    while True:
        try:
            async with websockets.connect(uri) as websocket:
                while True:
                    message = await websocket.recv()
                    msg_json = json.loads(message)
                    list_of_dicts = msg_json.get("UpdateQuote", None)
                    symbols_to_filter = {"SSI", "VND", "MBS", "PAN"}
                    filtered_objects = [
                        d for d in list_of_dicts if d["Symbol"] in symbols_to_filter
                    ]
                    msg = dict(message)

                    print(f"Received message: {type(filtered_objects)}")
        except websockets.ConnectionClosedError as e:
            print(f"Connection closed with error: {e}. Reconnecting in 5 seconds...")
            await asyncio.sleep(5)
        except Exception as e:
            print(f"An unexpected error occurred: {e}. Reconnecting in 5 seconds...")
            await asyncio.sleep(5)


if __name__ == "__main__":
    asyncio.run(connect_and_receive())
