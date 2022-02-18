from http.server import HTTPServer, BaseHTTPRequestHandler
import json

allowed_symbols = [str(i) for i in range(0, 10)]
allowed_symbols.extend("+-*/()")


class MyHandler(BaseHTTPRequestHandler):
    def do_POST(self):
        try:
            content_length = int(self.headers["content-length"])
            body = self.rfile.read(content_length)
        except:
            body = None

        text = None
        if body != None and len(body) > 0:
            try:
                text = str(body, "utf-8")

            except:
                pass


        if text == None:
            answer = b''
        else:
            answer = text
            answer = bytes(answer, "utf-8")
            with open('data.json', encoding="utf8") as f:
                result = json.load(f)

            result[text] = text

            with open("data.json", "w", encoding="utf-8") as file:
                json.dump(result, file, indent=4, ensure_ascii=False)

        self.send_response(200 if text != None else 404)
        self.send_header("content-length", len(answer))
        self.end_headers()
        self.wfile.write(answer)

    def do_GET(self):

        try:
            print(self.path[1:])
            with open(f'{self.path[1:]}', "rb") as f:
                s = f.read()
            answer = s
        except:
            answer = bytes("No such file", "utf-8")

        self.send_response(200)
        self.send_header("content-length", len(answer))
        self.end_headers()
        self.wfile.write(answer)


HTTPServer(('', 8000), MyHandler).serve_forever()
