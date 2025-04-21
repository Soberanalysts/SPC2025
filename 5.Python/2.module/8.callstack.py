import module_a

def start_program():
    print('메인에서 이 함수 호출')
    module_a.function_a1()
    
if __name__ == '__main__':
    print(__name__)
    start_program()
    
    