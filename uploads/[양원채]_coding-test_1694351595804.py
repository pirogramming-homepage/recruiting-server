from cryptography.fernet import Fernet

def generate_key():
    return Fernet.generate_key()

def encrypt(text, key):
    fernet = Fernet(key)
    encoded_text = text.encode('utf-8')
    encrypted_text = fernet.encrypt(encoded_text)
    return encrypted_text

def decrypt(encrypted_text, key):
    fernet = Fernet(key)
    decrypted_text = fernet.decrypt(encrypted_text).decode('utf-8')
    return decrypted_text

# 예시
key = generate_key()
text = "안녕하세요, Hello!"

encrypted_text = encrypt(text, key)
decrypted_text = decrypt(encrypted_text, key)

print("원본 텍스트:", text)
print("암호화된 텍스트:", encrypted_text)
print("복호화된 텍스트:", decrypted_text)
