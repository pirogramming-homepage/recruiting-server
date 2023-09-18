import base64
import hashlib
from Crypto.Cipher import AES # 대칭키를 사용하기 위한 모듈 임포트

BS = 16 # blocksize를 16바이트로 고정시켜야 함(AES의 특징)

# AES에서는 블럭사이즈가 128bit 즉 16byte로 고정되어 있어야 하므로 문자열을 encrypt()함수 인자로 전달시
# 입력 받은 데이터의 길이가 블럭사이즈의 배수가 아닐때 아래와 같이 패딩을 해주어야 한다.
# 패딩: 데이터의 길이가 블럭사이즈의 배수가 아닐때 마지막 블록값을 추가해 블록사이즈의 배수로 맞추어 주는 행위
pad = (lambda s: s+ (BS - len(s) % BS) * chr(BS - len(s) % BS).encode())
unpad = (lambda s: s[:-ord(s[len(s)-1:])])

class AESCipher(object):
    def encrypt(self, message): # 암호화 함수
        message = message.encode() # 문자열 인코딩
        raw = pad(message) # 인코딩된 문자열을 패딩처리
        cipher = AES.new(self.key, AES.MODE_CBC, self.__iv().encode('utf8')) # AES 암호화 알고리즘 처리(한글처리를 위해 encode('utf8') 적용)
        enc = cipher.encrypt(raw) # 패딩된 문자열을 AES 알고리즘으로 암호화
        return base64.b64encode(enc).decode('utf-8') # 암호화된 문자열을 base64 인코딩 후 리턴

    def decrypt(self, enc): # 복호화 함수 -> 암호화의 역순으로 진행
        enc = base64.b64decode(enc) # 암호화된 문자열을 base64 디코딩 후
        cipher = AES.new(self.key, AES.MODE_CBC, self.__iv().encode('utf8')) # AES암호화 알고리즘 처리(한글처리를 위해 encode('utf8') 적용)
        dec = cipher.decrypt(enc) # base64 디코딩된 암호화 문자열을 복호화
        return unpad(dec).decode('utf-8') # 복호화된 문자열에서 패딩처리를 풀고(unpading) 리턴
    
    def __iv(self):
        return chr(0) * 16
    
    def __init__(self, key):
        self.key = hashlib.sha256(key.encode()).digest() # 키가 쉽게 노출되는 것을 막기 위해 키를 어렵게 처리하는 과정으로 보통 해시를 적용
        print("AES Key(Key문장 암호화) : ", self.key)


print("-"*100, "\n")
key = "aesKey"
msg = "원본 메시지 입니다."
print("AES KEY: ", key)
print("원본 메시지: ", msg)


aes = AESCipher(key) # 1. 대칭키 암복호화 처리를 위해 AESCipher클래스의 객체(인스턴스)를 생성(해시(256bit)가 적용된 키값을 얻어옴)
print(aes)

encrypt = aes.encrypt(msg) # 2.입력한 메시지를 AES 대칭키 암호화 방식으로 암호화
print()
print("원본 메시지를 AES키로 암호화한 결과: ", encrypt)

decrypt = aes.decrypt(encrypt) # 3.암호화된 메시지를 AES 대칭키 암호화 방식으로 복호화
print()
print("암호화된 메시지를 복호화한 결과: ", decrypt)
