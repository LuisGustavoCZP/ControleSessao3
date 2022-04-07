# ControleSessao3
 
Referências:
'crypto' - 

Exercicios:
1) O que é e pra que serve um 'hash'?
R: É um algorítmo matemático caótico, mas não aleatório, que transforma dados de comprimento variável para uma string de tamanho fixo. Sua utilização é ampla e inclui garantir a integridade de um arquivo ou dado, checar rapidamente igualdade entre grandes conjuntos de dados e até criptografia de informações.

2) Qual a importância do tipo de 'hash' escolhido? Dê exemplos.
R: Dependendo o uso um pode ser mais apropriado que outro. Por exemplo: 
- Para gerar um identificador único, como um UUID ou um GUID.
- O MD5 para checar a integridade dos dados.
- O SHA para integridade (SHA-1) ou criptografia (SHA-2 e SHA-3) de dados. 

3) Qual a vantagem/desvantagem da utilização de bcrypt? Quando escolher o seu uso?
R: A principal desvantagem é a velocidade, pois é um algorítmo bastante robusto justamente por ser mais seguro, o que nos leva a vantagem que é difícil quebrar inclusive por força bruta. Seu uso é justamente a segurança, criptografia de senhas e dados altamente sensíveis.

4) Criar uma página na qual o usuário, ao fazer o login, receba um cookie no qual contenha um 'hash' de identificação gerado utilizando-se 'crypto' e 'bcrypt'.