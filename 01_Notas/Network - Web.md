#Network


[[Web]]: Teia (Rede Mundial de Computadores)

A informação se move de um computador para outro em forma de bits, bits são a linguagem de maquina representada por (0 e 1) , os dados são enviado por vários meios, cabo, sinal sem fio ( Ondas de radio ou sinal de Satellite).

O Cliente solicita acessa uma pagina, exemplo https://www.youtube.com/

Para essa informação ser enviada do cliente ao https://www.youtube.com/ é usado vários protocolos, um deles é o [[http]] (Hypertext Transfer Protocol) responsavel por definir os metodos de comunicação entre cliente e servidor, também temos o [[HTTPS]] ele também é responsável por criptografar os dados que são enviados pela rede de computadores, garantido que ninguém externo possa ler esses dados.

Para se comunicar entre um cliente servido temos que dividir a mensagem entre cliente servido em pequenos pedaços, pra isso temo o protocolo TCP/IP (Transmission Control Protocol/Internet Protocol), **TCP:** Garante que os dados cheguem ao destino de forma correta e completa. **IP:** Endereça os dispositivos na rede para a entrega dos dados.

Porém na internet o computador não tem nome e sim IP, para identifica a qual computado a [[URL]] (exemplo: https://www.youtube.com/) se refere, temos Servidores no caminho responsáveis por entender a URL e devolver o endereço IP do computador (servido) em que a pagina que estamos tentando acessa esta guardada.

Proxy: Dispositivos no caminho da comunicação que são responsáveis por gerencia e permitir o trafego de dados pela rede, podendo ser vario durante o trafego da informação.

Por fim o servidor (computador que armazena grande quantidade de informações) recebe a mensagem enviada pelo cliente(seu computador pessoal), e responde de forma positiva com os dados ou de forma negativa com alguma mensagem de erro, e código de response

