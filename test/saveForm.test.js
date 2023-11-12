const recruitModel = require('../models/recruitModel.js');
const recruitController = require('../controllers/recruitController.js');
const db = require('../config/db.js');

const data = {
  attend: 'true',
  workshop: 'false',
  reason: '참석이 어렵습니다. 정말로 어렵습니다! 하지만 뽑아 주세요...',
  personal_info: 'true',
  deposit: 'true',
  email: 'ywonchae62@gmail.com',
  name: '이름이름이름',
  gender: 'W',
  university: '대학대학대학',
  major: '전공전공전공',
  minor: '',
  course: '',
  level: '3',
  address: '주소주소주소',
  phone: '124-1241-2413',
  interview: [ '토요일 오후' ],
  q1_introduce: 'wefwef',
  q2_experience: 'wf',
  q3_idea: 'fwefw',
  q4_performance: 'f',
  q5_patience: 'wef',
  q6_plan: 'wef',
  coding_test_fileDest: 'gggeg.txt',
  coding_test_file: {},
  coding_test_content: `
  import random

class Player:
  #플레이어 객체를 초기화
  def __init__(self, name):
      self.name = name
      self.bingo_cnt = 0
      self.table = []
  
  def __str__(self) -> str:
      #플레이어 객체를 문자열로 나타냄
      return f"{self.name}"


class Game:
  #게임 객체를 초기화
  def __init__(self):
      self.players = [] # 플레이어들의 목록
      self.deck = [i for i in range(1, 10)] # 숫자 생성
      #초기 플레이어 3명 생성
      self.players.append(Player("노영진"))
      self.players.append(Player("민세원"))
      self.players.append(Player("안정근"))

  def start_game(self):
      """
      - [ 게임 시작 전 ] 초기 설정을 하고, 플레이어의 처음 빙고판을 출력하는 함수입니다.
      - 1-(1) 플레이어 이름을 입력받고 플레이 순서를 랜덤하게 섞어주세요
      - 1-(2) 랜덤한 숫자로 플레이어들의 빙고판을 세팅하고 출력합니다. 
      - 동일 클래스의 game()에서 호출됩니다.
      """
      print("=============================")
      print("      빙고게임 시작 ^_^      ")
      print("=============================")

      # TODO 1-(1): 사용자로부터 플레이어의 이름을 입력받아 플레이어들의 목록에 추가하고, 순서를 랜덤하게 섞어주세요!

      ##### END OF TODO 1-(1)(문제와 본 라인 사이에 코드를 작성하세요.) #####

      # TODO 1-(2): 각각의 플레이어들의 빙고판을 생성한 후, 출력해 주세요. (단, 각 플레이어들의 빙고판은 1부터 9까지의 숫자들이 중복없이 구성되어야 합니다.)

      ##### END OF TODO 1-(2)(문제와 본 라인 사이에 코드를 작성하세요.) #####


  def set_next_player(self, round_num):
      """ 
      - [ 게임 진행 ] round_num을 매개변수로 받아서 해당 라운드의 플레이어를 지정하는 함수 입니다. (round_num은 play_game에 정의되어 있습니다)
      - 2-(1) round_num이 플레이어들의 수보다 크더라도 에러가 나지 않도록 모든 플레이어들이 차례대로 지정될 수 있도록 구현하세요.
      - 2-(2) 해당 라운드에 지정된 플레이어 객체를 return해 주세요.
      - 동일 클래스의 play_game()에서 호출됩니다.
      """
      # TODO 2-(1): 리스트의 값의 개수를 초과해서 반복해도 리스트의 길이를 벗어나지 않도록 해주세요

      ##### END OF TODO 2-(1)(문제와 본 라인 사이에 코드를 작성하세요.) #####
      
      # TODO 2-(2): 다음 순서의 플레이어 객체를 return해 주세요.

      ##### END OF TODO 2-(2)(문제와 본 라인 사이에 코드를 작성하세요.) #####


  def count_bingo(self):
      """ 
      - [ 게임 진행 ] player의 빙고 개수를 업데이트 하는 함수입니다.
      - 각각의 플레이어들을 순회하면서 bingo_cnt를 카운트해주세요.
      - 플레이어의 빙고 개수를 초기화하고
      - 3-(1),(2),(3),(4) 각각 빙고를 체크합니다.
      - 동일 클래스의 play_game()에서 호출됩니다.
      """
      for player in self.players:
          # 플레이어의 빙고 개수를 초기화합니다.
          player.bingo_cnt = 0
          
          # TODO 3-(1): 플레이어의 빙고판 가로를 확인해 주세요
          
          ##### END OF TODO 3-(1)(문제와 본 라인 사이에 코드를 작성하세요.) #####

          # TODO 3-(2): 플레이어의 빙고판 세로를 확인해 주세요
          
          ##### END OF TODO 3-(2)(문제와 본 라인 사이에 코드를 작성하세요.) #####

          # TODO 3-(3): 플레이어의 빙고판 대각선(좌상단 -> 우하단) 확인
          
          ##### END OF TODO 3-(3)(문제와 본 라인 사이에 코드를 작성하세요.) #####

          # TODO 3-(4): 플레이어의 빙고판 대각선(우상단 -> 좌하단) 확인
          
          ##### END OF TODO 3-(4)(문제와 본 라인 사이에 코드를 작성하세요.) #####


  def do_bingo(self, picked_num):
      """ 
      - [ 게임 진행 ] 빙고판에서 선택한 숫자를 매개변수로 받아서 0으로 바꾸는 메서드입니다. (picked_num은 play_game함수에 정의되어 있습니다.)
      - 4-(1) 플레이어들을 순회하면서 빙고!인 숫자를 숫자 0으로 바꿔주세요.
      - 동일 클래스의 play_game에서 호출됩니다.
      """ 
      # TODO 4-(1): 플레이어들을 순회하면서 빙고!인 숫자를 숫자 0으로 바꿔주세요. 

      ##### END OF TODO 4-(1)(문제와 본 라인 사이에 코드를 작성하세요.) #####


  def play_game(self):
      """
      - [ 게임 진행 ] 부분을 담당하는 함수 입니다.
      - 라운드를 시작하고 각 플레이어의 순서를 결정하여 게임을 진행합니다. 
      - 동일 클래스의 game()에서 호출됩니다.
      """
      print("=============================")
      print("          게임 순서          ")
      print("=============================")

      play_order = ", ".join(map(str, self.players))
      print(f"게임은 {play_order} 순으로 진행됩니다.\n")

      round_num = 0
      while True:
          round_num += 1

          print("=============================")
          print(f"       ROUND {round_num} - START")
          print("=============================")

          # 이번 라운드의 플레이어를 set_next_player를 이용하여 변수에 할당하고 출력
          next_player = self.set_next_player(round_num)
          print(f"이번은 {next_player} 차례입니다. ^_^ \n")
          
          #이번 라운드 플레이어가 사용자인 경우 -> 사용자로부터 숫자 입력받기 // next_player가 안정근 | 노영진 | 민세원 인 경우 -> deck에서 랜덤하게 하나 뽑기
          if next_player.name == self.my_player: 
              while True: #(happy to) while로 이미 뽑은 숫자 입력하는 경우 예외처리
                  picked_num = int(input(f'당신의 차례입니다. 남은 숫자 중 하나를 입력해주세요. 남은 숫자: {sorted(self.deck)}'))
                  if picked_num in self.deck:
                      break
                  else:
                      print('이미 부른 숫자입니다.')
          else:
              picked_num = random.choice(self.deck)

          #한번 뽑은 숫자를 또 뽑을 수 없기 때문에 뽑은 숫자를 deck에서 삭제해줍니다.
          self.deck.remove(picked_num)
          print(f'{next_player}(이)가 {picked_num}을 선택했습니다.')

          #do_bingo함수를 이용하여 선택한 숫자 빙고판에서 0으로 바꿉니다. 
          self.do_bingo(picked_num) 

          # 빙고 수를 세는 부분입니다.
          self.count_bingo()

          #빙고를 화면에 표시하는 부분입니다.
          for player in self.players:
              print(f'>> {player.name} (현재 빙고: {player.bingo_cnt})')
              for row in player.table:
                  print(row)
              print()

          print("=============================")
          print(f"       ROUND {round_num} - END")
          print("=============================")
          
          #플레이어 중 3빙고 이상 달성한 플레이어 있을 경우 함수가 종료됩니다.
          for player in self.players:
              if player.bingo_cnt >= 3: return
          print()
  
  
  def game_result(self):
      """
      - [게임 종료] 게임 결과를 출력하는 메서드입니다.
      - (1) 빙고 개수를 기준으로 내림차순으로 정렬하되, 만약 빙고 개수가 같다면 이름을 기준으로 오름차순으로 정렬해 주세요. (* 동점자 처리 주의!!)
      - (2) 사용자의 경우 이름 옆에 *을 붙여서 출력해주세요.(ex. *홍길동*)
      """
      print("=============================")
      print("     게임 순위 - 빙고 개수")
      print("=============================")

      # TODO 5-(1): 빙고 개수를 기준으로 내림차순 출력. 빙고 개수가 같다면 이름을 기준으로 오름차순 출력 (빙고 개수와 이름이 같은 경우는 고려하지 않습니다.)
      # lambda함수에 대해 공부해 보세요! 물론 lambda 함수를 사용하지 않고 구현해도 좋습니다. 

      ##### END OF TODO 5-(1)(문제와 본 라인 사이에 코드를 작성하세요.) #####

      # TODO 5-(2): 사용자의 경우 이름 옆에 *을 붙여서 출력해주세요.(ex. *홍길동*) 점수가 같으면 등수도 같도록 반드시 동점자 처리를 해주세요.

      ##### END OF TODO 5-(2)(문제와 본 라인 사이에 코드를 작성하세요.) #####
  


  def game(self):
      """
      - 게임 운영을 위한 함수입니다. 
      - 별도의 코드 작성이 필요 없습니다. 
      """
      self.start_game()
      self.play_game()
      self.game_result()


if __name__ == "__main__":  
  """
  - 코드를 실행하는 부분입니다. 
  - 역시 별도의 코드 작성이 필요 없습니다. 
  """
  game = Game()

  game.game()
  `,
  doyouknowpiro: 'etc',
  doyouknowValue: '알게된경로경로경로',
  piro_level: 20
}

test('워크샵 불참 제출 서류 폼을 DB에 저장합니다', async () => {
  const result = await recruitModel.createRecruitForm(data);
  expect(result).toEqual({status: "success"});
});
test('코딩테스트 파일 내용을 포함한 이메일을 전송합니다', async () => {
  const req = {body: data}
  const result = await recruitController.sendMail(req);
  expect(result).toEqual({ 'status': true });
});

afterAll(async () => {
  // Close the database connection
  await db.end();
});