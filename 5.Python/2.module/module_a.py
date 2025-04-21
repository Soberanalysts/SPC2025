def function_a1():
    print('module_a: function_a1 호출됨')
    function_a2()
    
def function_a2():
    print('module_a: function_a2 호출됨')
    function_a3()
    
def function_a3():
    print('module_a: function_a3 호출됨')
    function_Hello()
    
def function_Hello():
    print('module_a: function_Hello 호출됨')
    function_goodbye()
    
def function_goodbye():
    print('module_a: function_goodbye 호출됨')
    