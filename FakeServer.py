import json
from http.server import HTTPServer, BaseHTTPRequestHandler
from urllib.parse import urlparse, parse_qs, unquote
from pathlib import PurePosixPath
import time
from random import *


class Serv(BaseHTTPRequestHandler):
    def _set_headers(self):
        self.send_response(200)
        self.send_header("Content-type", "text/html")
        self.end_headers()

    def do_GET(self):
        # simulate random delay
        time.sleep(randint(1, 500) / 1000)

        # different outputs depending on the path called
        current_path = PurePosixPath(unquote(urlparse(self.path).path)).parts[-1]
        if current_path == 'python':
            self._set_headers()
            response = 'Python is cool'
            self.wfile.write(response.encode('utf-8'))

        elif current_path == 'text' or current_path == 'txet':
            self._set_headers()
            args = parse_qs(urlparse(self.path).query)
            response = 'No valid response'
            text = 'No text' if 'text' not in args else args['text'][0]
            text = text[::-1] if self.path.startswith('/txet') else text
            asJson = False if 'json' not in args else json.loads(args['json'][0].lower())
            response = f'{{text: "{text}"}}' if asJson else text
            self.wfile.write(response.encode('utf-8'))

        elif current_path == 'json':
            self.path = '/src/JSON Files/data_file_1.json'
            try:
                file_to_open = open(self.path[1:]).read()
                self._set_headers()
                self.wfile.write(bytes(file_to_open, 'utf-8'))
            except:
                file_to_open = "File not found"
                self.send_response(404)
                self.end_headers()

        else:
            self._set_headers()
            response = 'Path unknown'
            self.wfile.write(response.encode('utf-8'))


httpd = HTTPServer(('localhost', 8088), Serv)
httpd.serve_forever()
