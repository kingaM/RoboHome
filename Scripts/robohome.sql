CREATE DATABASE IF NOT EXISTS `robohome`;

CREATE TABLE IF NOT EXISTS robohome.rooms(id INT PRIMARY KEY AUTO_INCREMENT NOT NULL, name VARCHAR(45) NOT NULL);
CREATE TABLE IF NOT EXISTS robohome.types(id INT PRIMARY KEY AUTO_INCREMENT NOT NULL, name VARCHAR(45) NOT NULL);
CREATE TABLE IF NOT EXISTS robohome.items(id INT PRIMARY KEY AUTO_INCREMENT NOT NULL, name VARCHAR(45) NOT NULL, brand VARCHAR(45) NOT NULL, ip VARCHAR(45) NOT NULL, roomId INT NOT NULL, typeId INT NOT NULL, FOREIGN KEY (typeId) REFERENCES types(id) ON DELETE CASCADE ON UPDATE CASCADE, FOREIGN KEY (roomId) REFERENCES rooms(id) ON DELETE CASCADE ON UPDATE CASCADE);
CREATE TABLE IF NOT EXISTS robohome.methods(id INT PRIMARY KEY AUTO_INCREMENT NOT NULL, name VARCHAR(45) NOT NULL, signature VARCHAR(45) NOT NULL, type VARCHAR(45) NOT NULL, typeId INT, FOREIGN KEY (typeId) REFERENCES types(id) ON DELETE CASCADE ON UPDATE CASCADE);
CREATE TABLE IF NOT EXISTS robohome.events(id INT PRIMARY KEY AUTO_INCREMENT NOT NULL, name VARCHAR(45) NOT NULL, typeId INT NOT NULL, itemId INT, roomId INT, `trigger` VARCHAR(45) NOT NULL, enabled INT NOT NULL, FOREIGN KEY (typeId) REFERENCES types(id) ON DELETE CASCADE ON UPDATE CASCADE, FOREIGN KEY (itemId) REFERENCES items(id) ON DELETE CASCADE ON UPDATE CASCADE, FOREIGN KEY (roomId) REFERENCES rooms(id) ON DELETE CASCADE ON UPDATE CASCADE);
CREATE TABLE IF NOT EXISTS robohome.conditions(id INT PRIMARY KEY AUTO_INCREMENT NOT NULL, itemId INT NOT NULL, methodId INT NOT NULL, equivalence VARCHAR(45) NOT NULL, value INT NOT NULL, eventId INT NOT NULL, FOREIGN KEY (itemId) REFERENCES items(id) ON DELETE CASCADE ON UPDATE CASCADE, FOREIGN KEY (methodId) REFERENCES methods(id) ON DELETE CASCADE ON UPDATE CASCADE, FOREIGN KEY (eventId) REFERENCES events(id) ON DELETE CASCADE ON UPDATE CASCADE);
CREATE TABLE IF NOT EXISTS robohome.actions(id INT PRIMARY KEY AUTO_INCREMENT NOT NULL, itemId INT, roomId INT, eventId INT NOT NULL, methodId INT NOT NULL, FOREIGN KEY (itemId) REFERENCES items(id) ON DELETE CASCADE ON UPDATE CASCADE, FOREIGN KEY (roomId) REFERENCES rooms(id) ON DELETE CASCADE ON UPDATE CASCADE, FOREIGN KEY (methodId) REFERENCES methods(id) ON DELETE CASCADE ON UPDATE CASCADE, FOREIGN KEY (eventId) REFERENCES events(id) ON DELETE CASCADE ON UPDATE CASCADE);
CREATE TABLE IF NOT EXISTS robohome.users (id INT PRIMARY KEY AUTO_INCREMENT NOT NULL, name varchar(200) NOT NULL, email varchar(200) NOT NULL, openid varchar(200) NOT NULL);
CREATE TABLE IF NOT EXISTS robohome.whitelist (id INT PRIMARY KEY AUTO_INCREMENT NOT NULL, email varchar(200) NOT NULL);
CREATE TABLE IF NOT EXISTS robohome.energy (time TIMESTAMP DEFAULT CURRENT_TIMESTAMP, watts INT);

INSERT INTO robohome.`types` (name) VALUES ('motionSensor');
INSERT INTO robohome.`types` (name) VALUES ('lightSensor');
INSERT INTO robohome.`types` (name) VALUES ('temperatureSensor');
INSERT INTO robohome.`types` (name) VALUES ('energyMonitor');
INSERT INTO robohome.`types` (name) VALUES ('button');
INSERT INTO robohome.`types` (name) VALUES ('door');
INSERT INTO robohome.`types` (name) VALUES ('window');
INSERT INTO robohome.`types` (name) VALUES ('curtain');
INSERT INTO robohome.`types` (name) VALUES ('plug');
INSERT INTO robohome.`types` (name) VALUES ('light');
INSERT INTO robohome.`types` (name) VALUES ('radiator');


INSERT INTO robohome.`methods` (name, signature, type, typeId) VALUES ('Motion Detected', 'getState', 'status', 1);
INSERT INTO robohome.`methods` (name, signature, type, typeId) VALUES ('Light Intensity', 'getState', 'status', 2);
INSERT INTO robohome.`methods` (name, signature, type, typeId) VALUES ('Temperature in Degrees', 'getState', 'status', 3);
INSERT INTO robohome.`methods` (name, signature, type, typeId) VALUES ('Energy Level', 'getState', 'status', 4);
INSERT INTO robohome.`methods` (name, signature, type, typeId) VALUES ('Button Pressed', 'getState', 'status', 5);
INSERT INTO robohome.`methods` (name, signature, type, typeId) VALUES ('Opened', 'getState', 'status', 6);
INSERT INTO robohome.`methods` (name, signature, type, typeId) VALUES ('Open', 'open', 'action', 6);
INSERT INTO robohome.`methods` (name, signature, type, typeId) VALUES ('Close', 'close', 'action', 6);
INSERT INTO robohome.`methods` (name, signature, type, typeId) VALUES ('Open By', 'setOpen', 'action', 6);
INSERT INTO robohome.`methods` (name, signature, type, typeId) VALUES ('Opened', 'getState', 'status', 7);
INSERT INTO robohome.`methods` (name, signature, type, typeId) VALUES ('Open', 'open', 'action', 7);
INSERT INTO robohome.`methods` (name, signature, type, typeId) VALUES ('Close', 'close', 'action', 7);
INSERT INTO robohome.`methods` (name, signature, type, typeId) VALUES ('Open By', 'setOpen', 'action', 7);
INSERT INTO robohome.`methods` (name, signature, type, typeId) VALUES ('Opened', 'getState', 'status', 8);
INSERT INTO robohome.`methods` (name, signature, type, typeId) VALUES ('Open', 'open', 'action', 8);
INSERT INTO robohome.`methods` (name, signature, type, typeId) VALUES ('Close', 'close', 'action', 8);
INSERT INTO robohome.`methods` (name, signature, type, typeId) VALUES ('Open By', 'setOpen', 'action', 8);
INSERT INTO robohome.`methods` (name, signature, type, typeId) VALUES ('On', 'getState', 'state', 9);
INSERT INTO robohome.`methods` (name, signature, type, typeId) VALUES ('Turn On', 'on', 'action', 9);
INSERT INTO robohome.`methods` (name, signature, type, typeId) VALUES ('Turn Off', 'off', 'action', 9);
INSERT INTO robohome.`methods` (name, signature, type, typeId) VALUES ('Lights on', 'getState', 'state', 10);
INSERT INTO robohome.`methods` (name, signature, type, typeId) VALUES ('Turn On', 'on', 'action', 10);
INSERT INTO robohome.`methods` (name, signature, type, typeId) VALUES ('Turn Off', 'off', 'action', 10);
INSERT INTO robohome.`methods` (name, signature, type, typeId) VALUES ('Temperature in Degrees', 'getState', 'state', 11);
INSERT INTO robohome.`methods` (name, signature, type, typeId) VALUES ('Set Temperature', 'setTemperature', 'state', 11);

-- SAMPLE DATA

INSERT INTO `robohome`.`rooms` (`name`) VALUES ('Lounge');
INSERT INTO `robohome`.`rooms` (`name`) VALUES ('Kitchen');
INSERT INTO `robohome`.`rooms` (`name`) VALUES ('Bathroom');
INSERT INTO `robohome`.`rooms` (`name`) VALUES ('Bedroom 1');
INSERT INTO `robohome`.`rooms` (`name`) VALUES ('Bedroom 2');
INSERT INTO `robohome`.`rooms` (`name`) VALUES ('Office');

INSERT INTO `robohome`.`items` (`name`, `brand`, `ip`, `roomId`, `typeId`) VALUES ('Lounge Door', 'mock', '192.168.0.100', 1, 6);
INSERT INTO `robohome`.`items` (`name`, `brand`, `ip`, `roomId`, `typeId`) VALUES ('Lounge Curtain', 'mock', '192.168.0.101', 1, 8);
INSERT INTO `robohome`.`items` (`name`, `brand`, `ip`, `roomId`, `typeId`) VALUES ('Lounge Motion', 'mock', '192.168.0.102', 1, 1);
INSERT INTO `robohome`.`items` (`name`, `brand`, `ip`, `roomId`, `typeId`) VALUES ('Lounge Light', 'mock', '192.168.0.103', 1, 10);
INSERT INTO `robohome`.`items` (`name`, `brand`, `ip`, `roomId`, `typeId`) VALUES ('Kitchen Window', 'mock', '192.168.0.104', 2, 7);
INSERT INTO `robohome`.`items` (`name`, `brand`, `ip`, `roomId`, `typeId`) VALUES ('Kitchen Plug', 'mock', '192.168.0.105', 2, 9);
INSERT INTO `robohome`.`items` (`name`, `brand`, `ip`, `roomId`, `typeId`) VALUES ('Kitchen Light', 'mock', '192.168.0.106', 2, 10);
INSERT INTO `robohome`.`items` (`name`, `brand`, `ip`, `roomId`, `typeId`) VALUES ('Bathroom Curtain', 'mock', '192.168.0.107', 3, 8);
INSERT INTO `robohome`.`items` (`name`, `brand`, `ip`, `roomId`, `typeId`) VALUES ('Bathroom Motion', 'mock', '192.168.0.108', 3, 1);
INSERT INTO `robohome`.`items` (`name`, `brand`, `ip`, `roomId`, `typeId`) VALUES ('Bedroom Motion', 'mock', '192.168.0.109', 4, 1);
INSERT INTO `robohome`.`items` (`name`, `brand`, `ip`, `roomId`, `typeId`) VALUES ('Bedroom Light', 'mock', '192.168.0.110', 4, 10);
INSERT INTO `robohome`.`items` (`name`, `brand`, `ip`, `roomId`, `typeId`) VALUES ('Bedroom Light', 'mock', '192.168.0.111', 5, 10);
INSERT INTO `robohome`.`items` (`name`, `brand`, `ip`, `roomId`, `typeId`) VALUES ('Bedroom Light', 'mock', '192.168.0.112', 5, 10);
INSERT INTO `robohome`.`items` (`name`, `brand`, `ip`, `roomId`, `typeId`) VALUES ('Office Plug', 'mock', '192.168.0.113', 6, 9);
INSERT INTO `robohome`.`items` (`name`, `brand`, `ip`, `roomId`, `typeId`) VALUES ('Office Plug', 'mock', '192.168.0.114', 6, 9);

INSERT INTO `robohome`.`events` (`name`, `typeId`, `itemId`, `roomId`, `trigger`, `enabled`) VALUES ('Event1', 6, NULL, 1, 'opened', 1);
INSERT INTO `robohome`.`events` (`name`, `typeId`, `itemId`, `roomId`, `trigger`, `enabled`) VALUES ('Event2', 1, NULL, 1, 'motion detected', 1);
INSERT INTO `robohome`.`events` (`name`, `typeId`, `itemId`, `roomId`, `trigger`, `enabled`) VALUES ('Event3', 7, NULL, 2, 'opened', 1);
INSERT INTO `robohome`.`events` (`name`, `typeId`, `itemId`, `roomId`, `trigger`, `enabled`) VALUES ('Event4', 10, NULL, 2, 'on', 1);
INSERT INTO `robohome`.`events` (`name`, `typeId`, `itemId`, `roomId`, `trigger`, `enabled`) VALUES ('Event5', 1, NULL, 4, 'motion detected', 1);

INSERT INTO `robohome`.`conditions` (`itemId`, `methodId`, `equivalence`, `value`, `eventId`) VALUES (2, 14, '=', 1, 1);
INSERT INTO `robohome`.`conditions` (`itemId`, `methodId`, `equivalence`, `value`, `eventId`) VALUES (4, 21, '=', 1, 1);

INSERT INTO `robohome`.`actions` (`itemId`, `roomId`, `eventId`, `methodId`) VALUES (NULL, 4, 1, 22);
INSERT INTO `robohome`.`actions` (`itemId`, `roomId`, `eventId`, `methodId`) VALUES (2, NULL, 1, 16);