import random

# 1에서 100까지의 무작위 숫자 선택
answer = random.randint(1, 100)

# 사용자에게 게임 규칙 설명
print("1에서 100 사이의 숫자를 맞추는 게임입니다.")
print("정답을 맞출 때까지 계속하세요!")

# 사용자 입력 및 게임 루프
attempts = 0
while True:
    try:
        user_guess = int(input("숫자를 입력하세요: "))
        attempts += 1

        if user_guess < answer:
            print("좀 더 큰 숫자를 입력하세요.")
        elif user_guess > answer:
            print("좀 더 작은 숫자를 입력하세요.")
        else:
            print(f"축하합니다! 정답을 맞췄습니다. 정답은 {answer}입니다.")
            print(f"{attempts}번 만에 정답을 맞췄습니다.")
            break

    except ValueError:
        print("올바른 숫자를 입력하세요.")

# 게임 종료 메시지
print("게임이 종료되었습니다. 다시 플레이하려면 다시 실행하세요.")
