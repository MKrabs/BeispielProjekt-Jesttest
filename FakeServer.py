from http.server import HTTPServer, BaseHTTPRequestHandler
from urllib.parse import urlparse, parse_qs
import time

class Serv(BaseHTTPRequestHandler):
    def _set_headers(self):
        self.send_response(200)
        self.send_header("Content-type", "text/html")
        self.end_headers()

    def do_GET(self):
        time.sleep(2)
        if self.path == '/':
            self.path = '/src/JSON Files/data_file_1.json'
            try:
                file_to_open = open(self.path[1:]).read()
                self._set_headers()
                self.wfile.write(bytes(file_to_open, 'utf-8'))
            except:
                file_to_open = "File not found"
                self.send_response(404)
                self.end_headers()
        if self.path.startswith('/vue'):
            self._set_headers()
            response = 'Python is cool'
            args = parse_qs(urlparse(self.path).query)
            if 'text' in args:
                response = "Message recieved: " + args['text'][0]
            self.wfile.write(response.encode('utf-8'))


httpd = HTTPServer(('localhost', 8088), Serv)
httpd.serve_forever()
