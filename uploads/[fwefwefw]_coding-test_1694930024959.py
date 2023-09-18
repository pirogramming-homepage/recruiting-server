def isHangul(ch): #주어진 문자가 한글인지 아닌지 리턴해주는 함수
    JAMO_START_LETTER = ord(u'가')
    JAMO_END_LETTER = ord(u'힣')
    return ord(ch) >= JAMO_START_LETTER and ord(ch) <= JAMO_END_LETTER

def isChosung(ch):
    # 주어진 문자가 종성인지 아닌지 리턴
    JONGSUNG_START_LETTER = ord('ㄱ')
    JONGSUNG_END_LETTER = ord('ㅎ')
    return ord(ch) >= JONGSUNG_START_LETTER and ord(ch) <= JONGSUNG_END_LETTER

#Constants
CHOSUNG_START_LETTER = 4352
JAMO_START_LETTER = ord(u'가')
JAMO_END_LETTER = ord(u'힣')
JAMO_CYCLE = ord(u'까') - ord(u'가')
CHOSUNG_BETWEEN_JONGSUNG = ord('ㄱ') - 4352

print(CHOSUNG_BETWEEN_JONGSUNG)

text = "대한민국 ㅁ세가"
for ch in text:
    if isHangul(ch): #한글인 경우에만 초성을 추출하고 그렇지 않은 경우엔 문자를 그대로 출력합니다.
        print(chr((ord(ch) - JAMO_START_LETTER)//JAMO_CYCLE + CHOSUNG_START_LETTER))
    elif isChosung(ch):
        print(ord(ch) - CHOSUNG_BETWEEN_JONGSUNG)
    else:
        print(ch)

print(ord('ㄱ'), ord('가'), chr(4352), ord('ㄷ'))

test = 'hello'
print(test)
test += 'p'
print(test)
