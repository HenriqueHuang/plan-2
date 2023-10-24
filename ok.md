//Incluir bibliotecas
#include <DHTesp.h>
#include <EspMQTTClient.h>

//Para saber mais sobre esta biblioteca, acessar https://github.com/plapointe6/EspMQTTClient

//Definicoes e constantes
char SSIDName[] = "Wokwi-GUEST"; //nome da rede WiFi
char SSIDPass[] = ""; //senha da rede WiFI

const int DHT_PIN = 15; //terminal do sensor de temperatura e umidade

char BrokerURL[] = "broker.hivemq.com"; //URL do broker MQTT
char BrokerUserName[] = ""; //nome do usuario para autenticar no broker MQTT
char BrokerPassword[] = ""; //senha para autenticar no broker MQTT
char MQTTClientName[] = "mqtt-mack-pub"; //nome do cliente MQTT
int BrokerPort = 1883; //porta do broker MQTT

String TopicoPrefixo = "TESTMACK1165744"; //prefixo do topico
String Topico_01 = TopicoPrefixo+"/Temperatura"; //nome do topico 01
String Topico_02 = TopicoPrefixo+"/Umidade"; //nome do topico 02

//Variaveis globais e objetos
DHTesp dhtSensor; //instancia o objeto dhtSensor a partir da classa DHTesp

EspMQTTClient clienteMQTT(SSIDName, SSIDPass, BrokerURL, BrokerUserName, BrokerPassword, MQTTClientName, BrokerPort); //inicializa o cliente MQTT

//Este prototipo de funcao deve estar sempre presente
void onConnectionEstablished() {
}

void enviarDados() {
  TempAndHumidity temp_umid = dhtSensor.getTempAndHumidity(); //instancia o objeto temp_umid a partir da classe TempAndHumidity
  
  //Serial.println("Temperatura: " + String(temp_umid.temperature, 2) + "°C");
  //Serial.println("Umidade: " + String(temp_umid.humidity, 1) + "%");
  //Serial.println("---");
    
  clienteMQTT.publish(Topico_01, String(temp_umid.temperature, 2) + "°C"); 
  clienteMQTT.publish(Topico_02, String(temp_umid.humidity, 1) + "%");
}

//Setup
void setup() {
  Serial.begin(9600);
  
  dhtSensor.setup(DHT_PIN, DHTesp::DHT22); //inicializa o sensor de temperatura e umidade

  clienteMQTT.enableDebuggingMessages(); //habilita mensagens de debug no monitor serial
  //clienteMQTT.enableHTTPWebUpdater(); // Enable the web updater. User and password default to values of MQTTUsername and MQTTPassword. These can be overridded with enableHTTPWebUpdater("user", "password").
  //clienteMQTT.enableOTA(); // Enable OTA (Over The Air) updates. Password defaults to MQTTPassword. Port is the default OTA port. Can be overridden with enableOTA("password", port).
  //clienteMQTT.enableLastWillMessage("TestClient/lastwill", "Vou ficar offline");
}

//Loop
void loop() {
  //clienteMQTT.enableMQTTPersistence(); //estabelece uma conexao persistente
  clienteMQTT.loop(); //funcao necessaria para manter a conexao com o broker MQTT ativa e coletar as mensagens recebidas
  enviarDados(); //funcao para publicar os dados no broker MQTT

  if (clienteMQTT.isWifiConnected() == 1) {
    Serial.println("Conectado ao WiFi!");
  } else {
    Serial.println("Nao conectado ao WiFi!");
  }

  if (clienteMQTT.isMqttConnected() == 1) {
    Serial.println("Conectado ao broker MQTT!");
  } else {
    Serial.println("Nao conectado ao broker MQTT!");
  }

  Serial.println("Nome do cliente: " + String(clienteMQTT.getMqttClientName())
    + " / Broker MQTT: " + String(clienteMQTT.getMqttServerIp())
    + " / Porta: " + String(clienteMQTT.getMqttServerPort())
  );

  delay(5000);
}

Abstract. This article describes the development of a gas detector with API
connectivity, based on IoT. The project's objective is to create a versatile and
affordable system capable of detecting toxic and flammable gases and providing
real-time information about air quality in the environment where it is installed. The
article provides descriptions of the components used in building this detector, the
assembly process, and the programming for gas detection. Additionally, the creation
of an API for communication between the device and an external application is
presented, enabling remote monitoring and real-time data analysis. The article also
contributes to the expansion of gas detection, demonstrating the potential of the
platform technology as a versatile and accessible platform for the development of
low cost and easy implementation environmental monitoring devices.
Resumo. Este artigo descreve o projeto de um detector de gás com capacidade
de conexão via API, tendo como base IoT. O objetivo do projeto é criar um
sistema versátil e acessível que seja capaz de detectar gases (tóxicos e
inflamáveis) fornecer informações em tempo real sobre a qualidade do ar no
ambiente em que for instalado. O artigo descreve os componentes utilizados na
construção deste detector, o processo de montagem e a programação da
plataforma selecionada para a detecção de gases. Além disso, é apresentada a
criação de uma API para a comunicação entre o dispositivo e uma aplicação
externa, permitindo a monitorização remota e a análise dos dados em tempo real.
Este trabalho contribui para a expansão da detecção de gases, demonstrando o
potencial da tecnologia integrada com uma plataforma versátil e acessível para o
desenvolvimento de dispositivos de monitorização ambiental de baixo custo e fácil
implementação.
1. Introdução
Nosso trabalho tem como base os projetos desenvolvidos na forma de TCC pelos
graduandos Raphael Iannini Dutra dos Santos e Luis Henrique Mendonça Grassi.
O objetivo de ambos os trabalhos era o de desenvolver um sistema residencial para
monitorar possíveis focos de incêndios e vazamentos de gás via aplicativo. Ainda
nessa linha de monitoramento de gases, tem o artigo desenvolvido por Leandro
Augusto de Carvalho, Pedro Luiz de Paula Filho e Laércio Mantovani Frare, cujo
objetivo é o de desenvolver um monitoramento em espaços confinados, a fim de
evitar condições de insalubridade.
A detecção de gases tóxicos e inflamáveis é importante em diversos
cenários. A exposição a esses gases pode representar riscos para a saúde humana
e para o meio ambiente.
O gás GLP, também conhecido como gás de cozinha, desempenha um
papel significativo no Brasil. Segundo dados de O Gás LP (2013, apud GRASSI,
2017, p.11), constitui 3,2% da nossa matriz energética e estima-se que
aproximadamente 195 milhões de brasileiros façam uso desse recurso, direta ou
indiretamente. Essa fonte de energia é comercializada em botijões. Outro gás
presente nos domicílios brasileiros é o Gás Natural, e dados de O Gás LP (2013,
apud GRASSI, 2017, p.11) indicam que ele representa 7,2% da matriz energética
brasileira.
A ocorrência de incêndios é algo comum, não só no Brasil, e abrange de
estabelecimentos a residências. Segundo Sprinkler (2019, apud SANTOS, 2022, p.
16), em 2019 no Brasil foram contabilizadas 866 ocorrências de incêndios
estruturais. No ano seguinte, esse dado é mais preocupante. Segundo JRS (2021,
apud SANTOS, 2022, p.16), foram contabilizadas 1244 ocorrências, um aumento
de 43,7% em relação ao ano anterior. De acordo com FBN (2021, apud SANTOS,
2022, p.17), dados estatísticos do Corpo de Bombeiros do Estado de São Paulo
mostram que 3.585 registros de incêndios foram atendidos entre os meses de
janeiro e julho de 2021, o que dá uma média de 18 atendimentos a incêndios em
residências e empresas por dia no país. Diante desses cenários, torna-se relevante
a criação e implementação de sistemas de detecção de gases eficazes e
acessíveis.
O uso de APIs tornou-se uma ferramenta fundamental para a integração de
dispositivos e sistemas, facilitando a comunicação entre hardware e software.
Neste contexto, CARVALHO e col. (2020) propõem uma solução de baixo custo,
com a implantação de equipamentos sensores onde ocorrem o acúmulo de gases
nocivos, com objetivo de transmitir as leituras para um servidor de dados.
Desta forma, o presente artigo aborda o desenvolvimento de um protótipo
de detector a gás com base em IoT, também conhecido como Internet das Coisas,
usando uma API com o auxílio de um sensor de gás para fazer o monitoramento e
a detecção de vazamentos de gás de baixo custo e fácil instalação, para que possa
ser implementado principalmente em residências, a fim de evitar possíveis
princípios de incêndio.
Este artigo tem como objetivo apresentar o desenvolvimento e a
implementação deste protótipo, detalhando os componentes utilizados, o processo
de montagem, a programação na plataforma escolhida e a criação da API para
comunicação com a aplicação.
No decorrer deste artigo, discutiremos os principais desafios enfrentados
durante o desenvolvimento e os resultados obtidos. Espera-se que este projeto
contribua para o avanço da detecção de gases por meio da integração de
tecnologias IoT e API, oferecendo uma solução versátil e eficaz para a
monitorização da qualidade do ar em diversos contextos. Além disso, este trabalho
demonstra o potencial de aplicação da tecnologia de uma plataforma acessível e
flexível para o desenvolvimento de dispositivos de detecção e monitorização
ambiental, de forma que possa ser amplamente utilizado e implementado a fim de
evitar situações de risco.

com base nesse texto e no código, refazer o código que eu enviei para ficar de acordo com o texto sobre o detector/sensor de gás
